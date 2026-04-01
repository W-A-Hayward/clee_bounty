import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import * as PostingService from "../services/posting.service.ts";

export const getPostings = asyncHandler(async (res: Response) => {
  const postings = await PostingService.getPostings();
  res.status(200).json({ postings });
});

export const getPostingById = asyncHandler(
  async (req: Request, res: Response) => {
    const posting = await PostingService.getPostingById(req.params.id as string);
    res.status(200).json({ posting });
  },
);

export const createPosting = asyncHandler(
  async (req: Request, res: Response) => {
    const posting = await PostingService.createPosting(
      (req as any).user.id,
      req.body,
    );
    res.status(201).json({ posting });
  },
);

export const editPostingById = asyncHandler(
  async (req: Request, res: Response) => {
    const posting = await PostingService.editPostingById(
      req.params.id as string,
      (req as any).user.id,
      req.body,
    );
    res.status(200).json({ posting });
  },
);

export const patchPostingStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const posting = await PostingService.updatePostingStatus(
      req.params.id as string,
      (req as any).user.id,
      req.body.status,
    );
    res.status(200).json({ posting });
  },
);

export const deletePosting = asyncHandler(
  async (req: Request, res: Response) => {
    await PostingService.deletePosting(req.params.id as string, (req as any).user.id);
    res.status(204).send();
  },
);

// student applies to a posting
export const applyToPosting = asyncHandler(
  async (req: Request, res: Response) => {
    const application = await PostingService.applyToPosting(
      (req as any).user.id,
      req.params.id as string,
      req.body,
    );
    res.status(201).json({ application });
  },
);

// company views applicants for their posting
export const getPostingApplications = asyncHandler(
  async (req: Request, res: Response) => {
    const applications = await PostingService.getPostingApplications(
      (req as any).user.id,
      req.params.id as string,
    );
    res.status(200).json({ applications });
  },
);
