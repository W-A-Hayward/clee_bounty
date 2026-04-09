import bcrypt from "bcryptjs";
import prisma from "../lib/prisma.js";
import { signToken, verifyToken } from "../utils/jwt.js";
import { getMicrosoftUser } from "../utils/microsoft.js";
import { slugify } from "../utils/slug.js";
export const registerCompany = async (data) => {
    // check email not already taken
    const existing = await prisma.user.findUnique({
        where: { email: data.email },
    });
    if (existing) {
        const error = new Error("Email already in use");
        error.status = 409;
        throw error;
    }
    const passwordHash = await bcrypt.hash(data.password, 12);
    // create the user and company in one transaction
    const result = await prisma.$transaction(async (tx) => {
        const user = await tx.user.create({
            data: {
                email: data.email,
                passwordHash,
                firstName: data.firstName,
                lastName: data.lastName,
                displayName: `${data.firstName} ${data.lastName}`,
                role: "company_admin",
                authProvider: "email_password",
            },
        });
        const company = await tx.company.create({
            data: {
                name: data.companyName,
                slug: slugify(data.companyName),
                members: {
                    create: {
                        userId: user.id,
                        memberRole: "admin",
                    },
                },
            },
        });
        return { user, company };
    });
    const token = signToken({ id: result.user.id, role: result.user.role });
    return { token, user: result.user, company: result.company };
};
export const loginCompany = async (data) => {
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user ||
        !user.passwordHash ||
        !(await bcrypt.compare(data.password, user.passwordHash))) {
        const error = new Error("Invalid credentials");
        error.status = 401;
        throw error;
    }
    if (!["company_admin", "company_member"].includes(user.role)) {
        const error = new Error("Not a company account");
        error.status = 403;
        throw error;
    }
    await prisma.user.update({
        where: { id: user.id },
        data: { lastLoginAt: new Date() },
    });
    const token = signToken({ id: user.id, role: user.role });
    return { token, user };
};
export const refreshToken = async (oldToken) => {
    let payload;
    try {
        payload = verifyToken(oldToken);
    }
    catch {
        const error = new Error("Invalid token");
        error.status = 401;
        throw error;
    }
    // make sure user still exists and is active
    const user = await prisma.user.findUnique({ where: { id: payload.id } });
    if (!user || !user.isActive) {
        const error = new Error("User not found");
        error.status = 401;
        throw error;
    }
    const token = signToken({ id: user.id, role: user.role });
    return { token, user };
};
export const loginStudentMicrosoft = async (accessToken) => {
    const msUser = await getMicrosoftUser(accessToken);
    if (!msUser.email) {
        const error = new Error("Could not retrieve email from Microsoft account");
        error.status = 400;
        throw error;
    }
    const user = await prisma.user.upsert({
        where: { microsoftOid: msUser.oid },
        update: {
            lastLoginAt: new Date(),
            firstName: msUser.firstName,
            lastName: msUser.lastName,
            displayName: msUser.displayName,
        },
        create: {
            email: msUser.email,
            microsoftOid: msUser.oid,
            tenantId: msUser.tenantId,
            firstName: msUser.firstName,
            lastName: msUser.lastName,
            displayName: msUser.displayName,
            role: "student",
            authProvider: "microsoft",
            studentProfile: {
                create: {}, // create empty profile automatically
            },
        },
    });
    const token = signToken({ id: user.id, role: user.role });
    return { token, user };
};
export const getCurrentUser = async (userId) => {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
        const error = new Error("User not found");
        error.status = 404;
        throw error;
    }
    return user;
};
//# sourceMappingURL=auth.services.js.map