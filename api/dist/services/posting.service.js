import prisma from "../lib/prisma.js";
import { Prisma, PostingStatus } from "@prisma/client";
import { slugify } from "../utils/slug.js";
import { log } from "../utils/auditLog.js";
import { createNotification } from "../utils/notification.js";
import { NotificationType } from "@prisma/client";
export const getPostings = async () => {
    return prisma.posting.findMany({
        where: { status: "open" },
        include: { company: true },
    });
};
export const getPostingById = async (id) => {
    const posting = await prisma.posting.findUnique({
        where: { id },
        include: { company: true },
    });
    if (!posting) {
        const error = new Error("Posting not found");
        error.status = 404;
        throw error;
    }
    return posting;
};
export const createPosting = async (userId, data) => {
    const slug = slugify(data.title);
    const existing = await prisma.posting.findUnique({ where: { slug } });
    if (existing) {
        const error = new Error("A posting with this title already exists");
        error.status = 409;
        throw error;
    }
    const membership = await prisma.companyMember.findFirst({
        where: { userId },
    });
    if (!membership) {
        const error = new Error("User does not belong to a company");
        error.status = 403;
        throw error;
    }
    const posting = await prisma.posting.create({
        data: {
            ...data,
            slug: slugify(data.title),
            company: { connect: { id: membership.companyId } },
            creator: { connect: { id: userId } },
        },
    });
    await log(userId, "create", "Posting", posting.id);
    return posting;
};
export const editPostingById = async (id, userId, data) => {
    const membership = await prisma.companyMember.findFirst({
        where: { userId },
    });
    const posting = await prisma.posting.findUnique({ where: { id } });
    if (!posting) {
        const error = new Error("Posting not found");
        error.status = 404;
        throw error;
    }
    if (posting.companyId !== membership?.companyId) {
        const error = new Error("You do not own this posting");
        error.status = 403;
        throw error;
    }
    const updated = await prisma.posting.update({ where: { id }, data });
    await log(userId, "update", "Posting", id);
    return updated;
};
export const updatePostingStatus = async (id, userId, status) => {
    const posting = await prisma.posting.findUnique({ where: { id } });
    if (!posting) {
        const error = new Error("Posting not found");
        error.status = 404;
        throw error;
    }
    const updated = await prisma.posting.update({
        where: { id },
        data: { status },
    });
    await log(userId, "update", "Posting", id, { status });
    return updated;
};
export const deletePosting = async (id, userId) => {
    const posting = await prisma.posting.findUnique({ where: { id } });
    if (!posting) {
        const error = new Error("Posting not found");
        error.status = 404;
        throw error;
    }
    await prisma.posting.delete({ where: { id } });
    await log(userId, "delete", "Posting", id);
};
export const applyToPosting = async (studentId, postingId, data) => {
    // make sure the posting exists and is open
    const posting = await prisma.posting.findUnique({ where: { id: postingId } });
    if (!posting) {
        const error = new Error("Posting not found");
        error.status = 404;
        throw error;
    }
    if (posting.status !== "open") {
        const error = new Error("This posting is not accepting applications");
        error.status = 400;
        throw error;
    }
    // make sure the student hasn't already applied
    const existing = await prisma.application.findUnique({
        where: { postingId_studentUserId: { postingId, studentUserId: studentId } },
    });
    if (existing) {
        const error = new Error("You have already applied to this posting");
        error.status = 409;
        throw error;
    }
    const application = await prisma.application.create({
        data: {
            ...data,
            posting: { connect: { id: postingId } },
            student: { connect: { id: studentId } },
        },
    });
    // notify the company that someone applied
    await createNotification(posting.createdBy, NotificationType.application_submitted, "New application", `A student applied to ${posting.title}`, `/company/postings/${postingId}`);
    await log(studentId, "create", "Application", application.id);
    return application;
};
export const getPostingApplications = async (userId, postingId) => {
    // make sure the posting exists
    const posting = await prisma.posting.findUnique({
        where: { id: postingId },
        include: { company: { include: { members: true } } },
    });
    if (!posting) {
        const error = new Error("Posting not found");
        error.status = 404;
        throw error;
    }
    // make sure the user belongs to the company that owns the posting
    const isMember = posting.company.members.some((m) => m.userId === userId);
    if (!isMember) {
        const error = new Error("You do not have access to this posting");
        error.status = 403;
        throw error;
    }
    return prisma.application.findMany({
        where: { postingId },
        include: {
            student: {
                include: { studentProfile: true }, // include student profile for CV, skills etc.
            },
        },
        orderBy: { appliedAt: "desc" },
    });
};
//# sourceMappingURL=posting.service.js.map