import * as CompanyService from "../services/company.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
export const companyUpdate = asyncHandler(async (req, res) => {
    const updatedCompany = await CompanyService.updateCompany(req.user.id, req.body);
    res.status(200).json({ company: updatedCompany });
});
export const companyPublicProfile = asyncHandler(async (req, res) => {
    const company = await CompanyService.getCompanyProfile(req.params.slug);
    res.status(200).json({ company });
});
export const companyInviteMember = asyncHandler(async (req, res) => {
    const invitedMember = await CompanyService.companyInviteMember(req.user.id, req.params.slug, req.body.email);
    res.status(201).json({ member: invitedMember });
});
export const companyGetMembers = asyncHandler(async (req, res) => {
    const members = await CompanyService.getCompanyMembers(req.params.slug);
    res.status(200).json({ members });
});
//# sourceMappingURL=company.controller.js.map