import prisma from "../lib/prisma.ts";
import { Prisma, PostingStatus } from "@prisma/client";
import { slugify } from "../utils/slug.ts";
import { log } from "../utils/auditLog.ts";

export const getPostings = async () => {
  return prisma.posting.findMany({
    where: { status: "open" },
    include: { company: true },
  });
};

export const getPostingById = async (id: string) => {
  const posting = await prisma.posting.findUnique({
    where: { id },
    include: { company: true },
  });
  if (!posting) {
    const error: any = new Error("Posting not found");
    error.status = 404;
    throw error;
  }
  return posting;
};

export const createPosting = async (
  userId: string,
  data: Prisma.PostingCreateInput,
) => {
  const membership = await prisma.companyMember.findFirst({
    where: { userId },
  });
  if (!membership) {
    const error: any = new Error("User does not belong to a company");
    error.status = 403;
    throw error;
  }

  const posting = await prisma.posting.create({
    data: {
      ...data,
      slug: slugify(data.title as string),
      company: { connect: { id: membership.companyId } },
      creator: { connect: { id: userId } },
    },
  });

  await log(userId, "create", "Posting", posting.id);
  return posting;
};

export const editPostingById = async (
  id: string,
  userId: string,
  data: Prisma.PostingUpdateInput,
) => {
  const posting = await prisma.posting.findUnique({ where: { id } });
  if (!posting) {
    const error: any = new Error("Posting not found");
    error.status = 404;
    throw error;
  }

  const updated = await prisma.posting.update({ where: { id }, data });
  await log(userId, "update", "Posting", id);
  return updated;
};

export const updatePostingStatus = async (
  id: string,
  userId: string,
  status: PostingStatus,
) => {
  const posting = await prisma.posting.findUnique({ where: { id } });
  if (!posting) {
    const error: any = new Error("Posting not found");
    error.status = 404;
    throw error;
  }

  const updated = await prisma.posting.update({
    where: { id },
    data: { status },
  });
  await log(userId, "update", "Posting", id, { status });
  return updated;
};

export const deletePosting = async (id: string, userId: string) => {
  const posting = await prisma.posting.findUnique({ where: { id } });
  if (!posting) {
    const error: any = new Error("Posting not found");
    error.status = 404;
    throw error;
  }

  await prisma.posting.delete({ where: { id } });
  await log(userId, "delete", "Posting", id);
};
