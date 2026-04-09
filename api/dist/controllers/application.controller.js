import * as ApplicationService from "../services/application.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApplicationStatus } from "@prisma/client";
export const getApplications = asyncHandler(async (req, res) => {
    const applications = await ApplicationService.getApplications(req.user.id);
    res.status(200).json({ applications });
});
export const updateApplicationStatus = asyncHandler(async (req, res) => {
    const updatedApplication = await ApplicationService.updateApplicationStatus(req.user.id, req.params.id, req.body.status);
    res.status(200).json({ application: updatedApplication });
});
export const applicationWithdraw = asyncHandler(async (req, res) => {
    const updatedApplication = await ApplicationService.withdrawApplication(req.user.id, req.params.id);
    res.status(204).json({ application: updatedApplication });
});
//# sourceMappingURL=application.controller.js.map