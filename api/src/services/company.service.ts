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

  await log(slug, "update", "company", JSON.stringify(data));

  return updatedCompany;
};

export const getCompanyProfile = async (slug: string) => {
  const company = await prisma.company.findUnique({
    where: { slug },
  });

  if (!company) {
    const error: any = new Error("Company not found");
    error.status = 404;
    throw error;
  }

  return company;
};
