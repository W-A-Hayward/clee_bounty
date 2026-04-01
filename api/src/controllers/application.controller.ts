import type { Request, Response } from "express";
import * as ApplicationService from "../services/application.service.ts";
import { asyncHandler } from "../utils/asyncHandler.ts";
import { ApplicationStatus } from "@prisma/client";

export const getApplications = asyncHandler(
  async (req: Request, res: Response) => {
    const applications = await ApplicationService.getApplications(
      (req as any).user.id,
    );
    res.status(200).json({ applications });
  },
);

export const updateApplicationStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const updatedApplication = await ApplicationService.updateApplicationStatus(
      (req as any).user.id,
      req.params.id as string,
      req.body.status as ApplicationStatus,
    );
    res.status(200).json({ application: updatedApplication });
  },
);

export const applicationWithdraw = asyncHandler(
  async (req: Request, res: Response) => {
    const updatedApplication = await ApplicationService.withdrawApplication(
      (req as any).user.id,
      req.params.id as string,
    );
    res.status(204).json({ application: updatedApplication });
  },
);
