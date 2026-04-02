import prisma from "../lib/prisma.ts";
import { Prisma } from "@prisma/client";
import { log } from "../utils/auditLog.ts";

export const updateStudentProfile = async (
  userId: string,
  data: Prisma.StudentProfileUpdateInput,
) => {
  const profile = await prisma.studentProfile.findUnique({ where: { userId } });
  if (!profile) {
    const error: any = new Error("Student profile not found");
    error.status = 404;
    throw error;
  }

  const updated = await prisma.studentProfile.update({
    where: { userId },
    data,
  });

  await log(userId, "update", "StudentProfile", profile.id);
  return updated;
};

export const updateResumeUrl = async (userId: string, resumeUrl: string) => {
  const profile = await prisma.studentProfile.findUnique({ where: { userId } });
  if (!profile) {
    const error: any = new Error("Student profile not found");
    error.status = 404;
    throw error;
  }

  return prisma.studentProfile.update({
    where: { userId },
    data: { resumeUrl },
  });
};

export const getStudentPublicProfile = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { studentProfile: true },
  });

  if (!user || user.role !== "student") {
    const error: any = new Error("Student not found");
    error.status = 404;
    throw error;
  }

  // strip sensitive fields before returning
  const { passwordHash, microsoftOid, tenantId, ...safeUser } = user;
  return safeUser;
};
