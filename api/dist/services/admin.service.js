import prisma from "../lib/prisma.js";
import { log } from "../utils/auditLog.js";
import { createNotification } from "../utils/notification.js";
import { NotificationType } from "@prisma/client";
export const getUsers = async () => {
    return prisma.user.findMany({
        select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            role: true,
            isActive: true,
            createdAt: true,
            lastLoginAt: true,
            // never return passwordHash, microsoftOid, tenantId
        },
        orderBy: { createdAt: "desc" },
    });
};
export const updateUserStatus = async (targetUserId, isActive, adminId) => {
    const user = await prisma.user.findUnique({ where: { id: targetUserId } });
    if (!user) {
        const error = new Error("User not found");
        error.status = 404;
        throw error;
    }
    // prevent admin from deactivating themselves
    if (targetUserId === adminId) {
        const error = new Error("You cannot change your own status");
        error.status = 400;
        throw error;
    }
    const updated = await prisma.user.update({
        where: { id: targetUserId },
        data: { isActive },
    });
    // notify the user their account status changed
    await createNotification(targetUserId, NotificationType.admin_action, isActive ? "Account reactivated" : "Account deactivated", isActive
        ? "Your account has been reactivated"
        : "Your account has been deactivated by an admin");
    await log(adminId, "update", "User status", targetUserId);
    return updated;
};
export const getCompanies = async () => {
    return prisma.company.findMany({
        include: { members: true },
        orderBy: { createdAt: "desc" },
    });
};
export const verifyCompany = async (companyId, isVerified, adminId) => {
    const company = await prisma.company.findUnique({
        where: { id: companyId },
        include: { members: true },
    });
    if (!company) {
        const error = new Error("Company not found");
        error.status = 404;
        throw error;
    }
    const updated = await prisma.company.update({
        where: { id: companyId },
        data: { isVerified },
    });
    // find the company admin to notify
    const companyAdmin = company.members.find((m) => m.memberRole === "admin");
    if (companyAdmin) {
        await createNotification(companyAdmin.userId, NotificationType.company_verified, isVerified ? "Company verified" : "Company verification removed", isVerified
            ? "Your company has been verified"
            : "Your company verification has been removed", `/company/profile`);
    }
    await log(adminId, "update", "Company verification", companyId);
    return updated;
};
export const getPostings = async () => {
    return prisma.posting.findMany({
        include: { company: true },
        orderBy: { createdAt: "desc" },
    });
};
export const getAuditLogs = async () => {
    return prisma.auditLog.findMany({
        orderBy: { createdAt: "desc" },
        include: {
            actor: {
                select: { id: true, email: true, firstName: true, lastName: true }
            }
        },
    });
};
//# sourceMappingURL=admin.service.js.map