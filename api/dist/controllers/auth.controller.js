import * as AuthService from "../services/auth.services.js";
const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};
export const companyRegister = async (req, res) => {
    const { token, user, company } = await AuthService.registerCompany(req.body);
    res.cookie("token", token, cookieOptions);
    res.status(201).json({
        token,
        user: { id: user.id, email: user.email, role: user.role },
        company,
    });
};
export const companyLogin = async (req, res) => {
    const { token, user } = await AuthService.loginCompany(req.body);
    res.cookie("token", token, cookieOptions);
    res.json({
        token,
        user: { id: user.id, email: user.email, role: user.role },
    });
};
export const logout = (_req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out" });
};
export const me = async (req, res) => {
    const user = await AuthService.getCurrentUser(req.user.id);
    const { passwordHash, ...safeUser } = user;
    res.json({ user: safeUser });
};
export const refresh = async (req, res) => {
    const oldToken = req.cookies.token;
    if (!oldToken)
        return res.status(401).json({ error: "No token" });
    const { token, user } = await AuthService.refreshToken(oldToken);
    res.cookie("token", token, cookieOptions);
    res.json({
        token,
        user: { id: user.id, email: user.email, role: user.role },
    });
};
export const studentMicrosoftLogin = async (req, res) => {
    const { accessToken } = req.body;
    const { token, user } = await AuthService.loginStudentMicrosoft(accessToken);
    res.cookie("token", token, cookieOptions);
    res
        .status(200)
        .json({ token, user: { id: user.id, email: user.email, role: user.role } });
};
//# sourceMappingURL=auth.controller.js.map