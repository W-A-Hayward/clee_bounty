// TODO: Complete auth.controller.ts implementation
// Steps needed:
// 1. Import necessary dependencies (Request, Response from express, auth service, validators, error handling)
// 2. Implement controller functions:
//    - registerStudent(req, res, next) - handle student registration
//    - registerCompany(req, res, next) - handle company registration
//    - loginStudent(req, res, next) - handle student login
//    - loginCompany(req, res, next) - handle company login
//    - logout(req, res, next) - handle logout
//    - refreshToken(req, res, next) - handle token refresh
//    - getCurrentUser(req, res, next) - get authenticated user info
// 3. Call service layer functions
// 4. Handle errors and return appropriate HTTP responses
// 5. Set authentication cookies/tokens in response
// 6. Export all controller functions

import type { Request, Response } from "express";
import * as AuthService from "../services/auth.service.ts";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

export const companyRegister = async (req: Request, res: Response) => {
  const { token, user, company } = await AuthService.registerCompany(req.body);
  res.cookie("token", token, cookieOptions);
  res.status(201).json({ token, user: { id: user.id, email: user.email, role: user.role }, company });
};

export const companyLogin = async (req: Request, res: Response) => {
  const { token, user } = await AuthService.loginCompany(req.body);
  res.cookie("token", token, cookieOptions);
  res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
};

export const logout = (_req: Request, res: Response) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
};

export const me = async (req: Request, res: Response) => {
  const user = (req as any).user;
  res.json({ user });
};
