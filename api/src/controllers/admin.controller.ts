import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.ts";
import * as AdminService from "../services/admin.service.ts";

export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await AdminService.getUsers();
  res.status(200).json({ users });
});

export const updateUserStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await AdminService.updateUserStatus(
      req.params.id as string,
      req.body.isActive,
      (req as any).user.id,
    );
    res.status(200).json({ user });
  },
);

export const getCompanies = asyncHandler(
  async (req: Request, res: Response) => {
    const companies = await AdminService.getCompanies();
    res.status(200).json({ companies });
  },
);

export const verifyCompany = asyncHandler(
  async (req: Request, res: Response) => {
    const company = await AdminService.verifyCompany(
      req.params.id as string,
      req.body.isVerified,
      (req as any).user.id,
    );
    res.status(200).json({ company });
  },
);

export const getPostings = asyncHandler(async (req: Request, res: Response) => {
  const postings = await AdminService.getPostings();
  res.status(200).json({ postings });
});

export const getAuditLogs = asyncHandler(
  async (req: Request, res: Response) => {
    const logs = await AdminService.getAuditLogs();
    res.status(200).json({ logs });
  },
);
