import prisma from "../lib/prisma.ts";
import { Prisma, PostingStatus } from "@prisma/client";
import { slugify } from "../utils/slug.ts";
import { log } from "../utils/auditLog.ts";
import { createNotification } from "../utils/notification.ts";
import { NotificationType } from "@prisma/client";

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
  const slug = slugify(data.title as string);
  const existing = await prisma.posting.findUnique({ where: { slug } });
  if (existing) {
    const error: any = new Error("A posting with this title already exists");
    error.status = 409;
    throw error;
  }

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
  const membership = await prisma.companyMember.findFirst({
    where: { userId },
  });

  const posting = await prisma.posting.findUnique({ where: { id } });
  if (!posting) {
    const error: any = new Error("Posting not found");
    error.status = 404;
    throw error;
  }
  if (posting.companyId !== membership?.companyId) {
    const error: any = new Error("You do not own this posting");
    error.status = 403;
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

export const applyToPosting = async (
  studentId: string,
  postingId: string,
  data: Prisma.ApplicationCreateInput,
) => {
  // make sure the posting exists and is open
  const posting = await prisma.posting.findUnique({ where: { id: postingId } });
  if (!posting) {
    const error: any = new Error("Posting not found");
    error.status = 404;
    throw error;
  }
  if (posting.status !== "open") {
    const error: any = new Error("This posting is not accepting applications");
    error.status = 400;
    throw error;
  }

  // make sure the student hasn't already applied
  const existing = await prisma.application.findUnique({
    where: { postingId_studentUserId: { postingId, studentUserId: studentId } },
  });
  if (existing) {
    const error: any = new Error("You have already applied to this posting");
    error.status = 409;
    throw error;
  }

  const application = await prisma.application.create({
    data: {
      ...data,
      posting: { connect: { id: postingId } },
      student: { connect: { id: studentId } },
    },
  });

  // notify the company that someone applied
  await createNotification(
    posting.createdBy,
    NotificationType.application_submitted,
    "New application",
    `A student applied to ${posting.title}`,
    `/company/postings/${postingId}`,
  );

  await log(studentId, "create", "Application", application.id);
  return application;
};

export const getPostingApplications = async (
  userId: string,
  postingId: string,
) => {
  // make sure the posting exists
  const posting = await prisma.posting.findUnique({
    where: { id: postingId },
    include: { company: { include: { members: true } } },
  });
  if (!posting) {
    const error: any = new Error("Posting not found");
    error.status = 404;
    throw error;
  }

  // make sure the user belongs to the company that owns the posting
  const isMember = posting.company.members.some((m) => m.userId === userId);
  if (!isMember) {
    const error: any = new Error("You do not have access to this posting");
    error.status = 403;
    throw error;
  }

  return prisma.application.findMany({
    where: { postingId },
    include: {
      student: {
        include: { studentProfile: true }, // include student profile for CV, skills etc.
      },
    },
    orderBy: { appliedAt: "desc" },
  });
};
