import type { Request, Response } from "express";
import * as CompanyService from "../services/company.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import type { CompanyMember } from "@prisma/client";

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
    const company = await CompanyService.getCompanyProfile(slug);
    const { id, createdAt, updatedAt, ...safeCompany } = company as any;
    res.status(200).json({ company: safeCompany }); 
        res.status(200).json({ company: safeCompany });
    },
);

export const companyInviteMember = asyncHandler(
  async (req: Request, res: Response) => {
    const invitedMember = await CompanyService.companyInviteMember(
      (req as any).user.id,
      req.params.slug as string,
      req.body.email as string,
    );
    res.status(200).json({ member: invitedMember });
  },
);

export const companyGetMembers = asyncHandler(
  async (req: Request, res: Response) => {
    const members = await CompanyService.getCompanyMembers(req.params.slug as string);
    res.status(200).json({ members });
  }
);
