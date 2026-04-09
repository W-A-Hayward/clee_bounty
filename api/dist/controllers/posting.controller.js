import { asyncHandler } from "../utils/asyncHandler.js";
import * as PostingService from "../services/posting.service.js";
export const getPostings = asyncHandler(async (res) => {
    const postings = await PostingService.getPostings();
    res.status(200).json({ postings });
});
export const getPostingById = asyncHandler(async (req, res) => {
    const posting = await PostingService.getPostingById(req.params.id);
    res.status(200).json({ posting });
});
export const createPosting = asyncHandler(async (req, res) => {
    const posting = await PostingService.createPosting(req.user.id, req.body);
    res.status(201).json({ posting });
});
export const editPostingById = asyncHandler(async (req, res) => {
    const posting = await PostingService.editPostingById(req.params.id, req.user.id, req.body);
    res.status(200).json({ posting });
});
export const patchPostingStatus = asyncHandler(async (req, res) => {
    const posting = await PostingService.updatePostingStatus(req.params.id, req.user.id, req.body.status);
    res.status(200).json({ posting });
});
export const deletePosting = asyncHandler(async (req, res) => {
    await PostingService.deletePosting(req.params.id, req.user.id);
    res.status(204).send();
});
// student applies to a posting
export const applyToPosting = asyncHandler(async (req, res) => {
    const application = await PostingService.applyToPosting(req.user.id, req.params.id, req.body);
    res.status(201).json({ application });
});
// company views applicants for their posting
export const getPostingApplications = asyncHandler(async (req, res) => {
    const applications = await PostingService.getPostingApplications(req.user.id, req.params.id);
    res.status(200).json({ applications });
});
//# sourceMappingURL=posting.controller.js.map