import prisma from "../lib/prisma.ts";
import { log } from "../utils/auditLog.ts";
import { Prisma } from "@prisma/client";

export const updateCompany = async (
  userId: string,
  data: Prisma.CompanyUpdateInput,
) => {
  const membership = await prisma.companyMember.findFirst({
    where: { userId },
  });

  if (!membership) {
    const error: any = new Error("No company found for this user");
    error.status = 404;
    throw error;
  }

  const updatedCompany = await prisma.company.update({
    where: { id: membership.companyId },
    data,
  });

  await log(userId, "update", "company", membership.companyId, { data });

  return updatedCompany;
};
