import type { Request, Response } from "express";
import * as StudentService from "../services/student.service.ts";
import { asyncHandler } from "../utils/asyncHandler.ts";

export const uploadResume = asyncHandler(async (req: Request, res: Response) => {
  if (!req.file) {
    const error: any = new Error("No file uploaded");
    error.status = 400;
    throw error;
  }

  const fileUrl = `/uploads/${req.file.filename}`;
  const profile = await StudentService.updateResumeUrl(
    (req as any).user.id,
    fileUrl,
  );
  res.status(200).json({ profile });
});

export const updateProfile = asyncHandler(async (req: Request, res: Response) => {
  const profile = await StudentService.updateProfile(
    (req as any).user.id,
    req.body,
  );
  res.status(200).json({ profile });
});
