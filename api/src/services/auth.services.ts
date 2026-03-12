// TODO: Complete auth.services.ts implementation
// Steps needed:
// 1. Import necessary dependencies (prisma client, jwt utils, password hashing from lib/auth, error handling)
// 2. Implement service functions:
//    - registerStudent(data) - create student user and profile, hash password, return user + token
//    - registerCompany(data) - create company user, company record, and membership, hash password, return user + token
//    - loginStudent(email, password) - verify credentials, return user + token
//    - loginCompany(email, password) - verify credentials, return user + token
//    - refreshToken(token) - verify refresh token, generate new access token
//    - logout(userId, token) - invalidate token/session
//    - getCurrentUser(userId) - get user with profile/company info
// 3. Handle password hashing and verification
// 4. Generate JWT tokens with appropriate payload
// 5. Handle authentication errors (invalid credentials, user not found, etc.)
// 6. Export all service functions

import bcrypt from "bcryptjs";
import prisma from "../lib/prisma.js";
import { signToken } from "../utils/jwt.ts";
import { slugify } from "../utils/slug.ts";
import type { CompanyRegisterInput, CompanyLoginInput } from "../validators/auth.validators.js";

export const registerCompany = async (data: CompanyRegisterInput) => {
  // check email not already taken
  const existing = await prisma.user.findUnique({ where: { email: data.email } });
  if (existing) {
    const error: any = new Error("Email already in use");
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

export const loginCompany = async (data: CompanyLoginInput) => {
  const user = await prisma.user.findUnique({ where: { email: data.email } });

  if (!user || !user.passwordHash || !(await bcrypt.compare(data.password, user.passwordHash))) {
    const error: any = new Error("Invalid credentials");
    error.status = 401;
    throw error;
  }

  if (!["company_admin", "company_member"].includes(user.role)) {
    const error: any = new Error("Not a company account");
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
