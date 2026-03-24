import { Request, type Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import * as PostingService from "../services/posting.service.ts";

export const getPostings = asyncHandler(async (req: Request, res: Response) => {
  const postings = await PostingService.getPostings();
  res.status(200).json({ postings });
});

export const getPostingById = asyncHandler(
  async (req: Request, res: Response) => {
    const posting = await PostingService.getPostingById(req.params.id);
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
      req.params.id,
      (req as any).user.id,
      req.body,
    );
    res.status(200).json({ posting });
  },
);

export const patchPostingStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const posting = await PostingService.updatePostingStatus(
      req.params.id,
      (req as any).user.id,
      req.body.status,
    );
    res.status(200).json({ posting });
  },
);

export const deletePosting = asyncHandler(
  async (req: Request, res: Response) => {
    await PostingService.deletePosting(req.params.id, (req as any).user.id);
    res.status(204).send();
  },
);
