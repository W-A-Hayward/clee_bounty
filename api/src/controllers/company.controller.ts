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
