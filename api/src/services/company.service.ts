import prisma from "../lib/prisma.ts";
import { log } from "../utils/auditLog.ts";
import { Prisma } from "@prisma/client";

export const updateCompany = async (
  slug: string,
  data: Prisma.CompanyUpdateInput,
) => {

  const updatedCompany = await prisma.company.update({
    where: { slug: slug },
    data,
  });
  if (!updatedCompany) {
    const error: any = new Error("Company not found");
    error.status = 404;
    throw error;
  }
  await log(slug, "update", "company", JSON.stringify(data));

  return updatedCompany; 
};

// for public profile
export const getCompanyProfile = async (slug: string) => {
  return prisma.company.findUnique({
    where: { slug },
    include: { postings: true },
  });
};

// for member operations
export const getCompanyWithMembers = async (slug: string) => {
  return prisma.company.findUnique({
    where: { slug },
    include: { members: true },
  });
};

// company.service.ts
export const companyInviteMember = async (adminId: string, slug: string, email: string) => {
  const company = await prisma.company.findUnique({
    where: { slug },
    include: { members: true },
  });

  if (!company) {
    const error: any = new Error("Company not found");
    error.status = 404;
    throw error;
  }

  // find the user to invite by email
  const userToInvite = await prisma.user.findUnique({ where: { email } });
  if (!userToInvite) {
    const error: any = new Error("User not found");
    error.status = 404;
    throw error;
  }

  const alreadyMember = company.members.find((m) => m.userId === userToInvite.id);
  if (alreadyMember) {
    const error: any = new Error("User already a member");
    error.status = 400;
    throw error;
  }

  return prisma.companyMember.create({
    data: { companyId: company.id, userId: userToInvite.id, invitedBy: adminId },
  });
};

export const getCompanyMembers = async (slug: string) => {
  const members = await prisma.companyMember.findMany({
    where: { company : { slug } },
    include: { user: true },
  });
  if (!members) {
    const error: any = new Error("Members not found");
    error.status = 404;
    throw error;
  }
  return members;
};
