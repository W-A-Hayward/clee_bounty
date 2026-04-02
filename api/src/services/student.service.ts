import prisma from "../lib/prisma.ts";
import type { StudentProfile } from "@prisma/client";

export const updateResumeUrl = async (userId: string, resumeUrl: string) => {
  const update = await prisma.studentProfile.update({
    where: { userId },
    data: { resumeUrl },
  });

  if (!update) {
    const error: any = new Error("Profile not found");
    error.status = 404;
    throw error;
  }

  return update;
};

export const updateProfile = async (userId: string, data: StudentProfile) => {
  const update = await prisma.studentProfile.update({
    where: { userId },
    data,
  });

  if (!update) {
    const error: any = new Error("Profile not found");
    error.status = 404;
    throw error;
  }

  return update;
};
