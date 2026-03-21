import type { Request, Response } from "express";
import * as CompanyService from "../services/company.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const companyUpdate = asyncHandler(
  async (req: Request, res: Response) => {
    const updatedCompany = await CompanyService.updateCompany(
      (req as any).user.id,
      req.body,
    );
    res.status(200).json({ company: updatedCompany });
  },
);

export const companyPublicProfile = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.params.slug) {
      res.status(400).json({ error: "Missing slug" });
      return;
    }
    const { slug } = req.params;

    if (Array.isArray(slug)) {
      res.status(400).json({ error: "Invalid slug" });
      return;
    }
    const { id, createdAt, updatedAt, ...safeCompany } = await CompanyService.getCompanyProfile(slug);
    res.status(200).json({ company: safeCompany });
  },
);
