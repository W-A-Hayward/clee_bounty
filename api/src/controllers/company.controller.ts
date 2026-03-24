import type { Request, Response } from "express";
import * as CompanyService from "../services/company.service.ts";
import { asyncHandler } from "../utils/asyncHandler.ts";

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
    const company = await CompanyService.getCompanyProfile(
      req.params.slug as string,
    );
    res.status(200).json({ company });
  },
);

export const companyInviteMember = asyncHandler(
  async (req: Request, res: Response) => {
    const invitedMember = await CompanyService.companyInviteMember(
      (req as any).user.id,
      req.params.slug as string,
      req.body.email as string,
    );
    res.status(201).json({ member: invitedMember });
  },
);

export const companyGetMembers = asyncHandler(
  async (req: Request, res: Response) => {
    const members = await CompanyService.getCompanyMembers(
      req.params.slug as string,
    );
    res.status(200).json({ members });
  },
);
