import { asyncHandler } from "../utils/asyncHandler.js";
import * as AdminService from "../services/admin.service.js";
export const getUsers = asyncHandler(async (req, res) => {
    const users = await AdminService.getUsers();
    res.status(200).json({ users });
});
export const updateUserStatus = asyncHandler(async (req, res) => {
    const user = await AdminService.updateUserStatus(req.params.id, req.body.isActive, req.user.id);
    res.status(200).json({ user });
});
export const getCompanies = asyncHandler(async (req, res) => {
    const companies = await AdminService.getCompanies();
    res.status(200).json({ companies });
});
export const verifyCompany = asyncHandler(async (req, res) => {
    const company = await AdminService.verifyCompany(req.params.id, req.body.isVerified, req.user.id);
    res.status(200).json({ company });
});
export const getPostings = asyncHandler(async (req, res) => {
    const postings = await AdminService.getPostings();
    res.status(200).json({ postings });
});
export const getAuditLogs = asyncHandler(async (req, res) => {
    const logs = await AdminService.getAuditLogs();
    res.status(200).json({ logs });
});
//# sourceMappingURL=admin.controller.js.map