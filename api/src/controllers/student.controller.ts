import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.ts";
import * as StudentService from "../services/student.service.ts";

export const updateProfile = asyncHandler(async (req: Request, res: Response) => {
  const profile = await StudentService.updateStudentProfile(
    (req as any).user.id,
    req.body,
  );
  res.status(200).json({ profile });
});

export const uploadResume = asyncHandler(async (req: Request, res: Response) => {
  if (!(req as any).file) {
    const error: any = new Error("No file uploaded");
    error.status = 400;
    throw error;
  }

  const fileUrl = `/uploads/${(req as any).file.filename}`;
  const profile = await StudentService.updateResumeUrl(
    (req as any).user.id,
    fileUrl,
  );
  res.status(200).json({ profile });
});

export const getPublicProfile = asyncHandler(async (req: Request, res: Response) => {
  const profile = await StudentService.getStudentPublicProfile(req.params.id as string);
  res.status(200).json({ profile });
});
