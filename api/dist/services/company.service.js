import prisma from "../lib/prisma.js";
import { log } from "../utils/auditLog.js";
import { Prisma } from "@prisma/client";
export const updateCompany = async (userId, data) => {
    const membership = await prisma.companyMember.findFirst({
        where: { userId },
    });
    if (!membership) {
        const error = new Error("Company not found");
        error.status = 404;
        throw error;
    }
    const updatedCompany = await prisma.company.update({
        where: { id: membership.companyId },
        data,
    });
    await log(userId, "update", "company", membership.companyId, { data });
    return updatedCompany;
};
// for public profile
export const getCompanyProfile = async (slug) => {
    return prisma.company.findUnique({
        where: { slug },
        include: { postings: true },
    });
};
// for member operations
export const getCompanyWithMembers = async (slug) => {
    return prisma.company.findUnique({
        where: { slug },
        include: { members: true },
    });
};
// company.service.ts
export const companyInviteMember = async (adminId, slug, email) => {
    const company = await prisma.company.findUnique({
        where: { slug },
        include: { members: true },
    });
    if (!company) {
        const error = new Error("Company not found");
        error.status = 404;
        throw error;
    }
    // find the user to invite by email
    const userToInvite = await prisma.user.findUnique({ where: { email } });
    if (!userToInvite) {
        const error = new Error("User not found");
        error.status = 404;
        throw error;
    }
    if (userToInvite.role === "student") {
        const error = new Error("Cannot invite a student as a company member");
        error.status = 400;
        throw error;
    }
    const alreadyMember = company.members.find((m) => m.userId === userToInvite.id);
    if (alreadyMember) {
        const error = new Error("User already a member");
        error.status = 400;
        throw error;
    }
    return prisma.companyMember.create({
        data: {
            companyId: company.id,
            userId: userToInvite.id,
            invitedBy: adminId,
        },
    });
};
export const getCompanyMembers = async (slug) => {
    const members = await prisma.companyMember.findMany({
        where: { company: { slug } },
        include: { user: true },
    });
    return members;
};
//# sourceMappingURL=company.service.js.map