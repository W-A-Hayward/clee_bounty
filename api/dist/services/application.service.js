import prisma from "../lib/prisma.js";
import { log } from "../utils/auditLog.js";
import { ApplicationStatus } from "@prisma/client";
export const getApplications = async (userId) => {
    const applications = await prisma.application.findMany({
        where: { studentUserId: userId },
        include: { posting: true },
    });
    if (!applications) {
        const error = new Error("Applications not found");
        error.status = 404;
        throw error;
    }
    return applications;
};
export const updateApplicationStatus = async (applicationId, userId, status) => {
    // find the application and include the posting and its company
    const application = await prisma.application.findUnique({
        where: { id: applicationId },
        include: {
            posting: {
                include: { company: { include: { members: true } } }
            }
        }
    });
    if (!application) {
        const error = new Error("Application not found");
        error.status = 404;
        throw error;
    }
    // check that the user is a member of the company that owns the posting
    const isMember = application.posting.company.members.some((m) => m.userId === userId);
    if (!isMember) {
        const error = new Error("You do not have access to this application");
        error.status = 403;
        throw error;
    }
    await log(userId, "update", "application", applicationId, { status });
    return prisma.application.update({
        where: { id: applicationId },
        data: { status },
    });
};
export const withdrawApplication = async (applicationId, userId) => {
    const application = await prisma.application.delete({
        where: { id: applicationId, studentUserId: userId },
    });
    if (!application) {
        const error = new Error("Application not found for user");
        error.status = 404;
        throw error;
    }
    await log(userId, "delete", "application", applicationId);
    return application;
};
//# sourceMappingURL=application.service.js.map