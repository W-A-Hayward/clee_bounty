import type { Request, Response } from "express";
import * as AuthService from "../services/auth.services.ts";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

export const companyRegister = async (req: Request, res: Response) => {
  const { token, user, company } = await AuthService.registerCompany(req.body);
  res.cookie("token", token, cookieOptions);
  res.status(201).json({
    token,
    user: { id: user.id, email: user.email, role: user.role },
    company,
  });
};

export const companyLogin = async (req: Request, res: Response) => {
  const { token, user } = await AuthService.loginCompany(req.body);
  res.cookie("token", token, cookieOptions);
  res.json({
    token,
    user: { id: user.id, email: user.email, role: user.role },
  });
};

export const logout = (_req: Request, res: Response) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
};

export const me = async (req: Request, res: Response) => {
  const user = await AuthService.getCurrentUser((req as any).user.id);
  const { passwordHash, ...safeUser } = user;
  res.json({ user: safeUser });
};

export const refresh = async (req: Request, res: Response) => {
  const oldToken = req.cookies.token;
  if (!oldToken) return res.status(401).json({ error: "No token" });

  const { token, user } = await AuthService.refreshToken(oldToken);
  res.cookie("token", token, cookieOptions);
  res.json({
    token,
    user: { id: user.id, email: user.email, role: user.role },
  });
};

export const studentMicrosoftLogin = async (req: Request, res: Response) => {
  const { accessToken } = req.body;
  const { token, user } = await AuthService.loginStudentMicrosoft(accessToken);
  res.cookie("token", token, cookieOptions);
  res
    .status(200)
    .json({ token, user: { id: user.id, email: user.email, role: user.role } });
};
