// TODO: Complete jwt.ts implementation
// Steps needed:
// 1. Install and import jsonwebtoken package
// 2. Get JWT secret from environment variables
// 3. Create functions:
//    - generateToken(payload, expiresIn) - generate JWT token
//    - verifyToken(token) - verify and decode JWT token
//    - refreshToken(token) - generate new token from refresh token
// 4. Define token payload interface (userId, email, role, etc.)
// 5. Set appropriate expiration times (access token: 15min-1hr, refresh token: 7-30 days)
// 6. Handle token errors (expired, invalid, etc.)
// 7. Export all functions
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
export const signToken = (payload) => jwt.sign(payload, env.JWT_SECRET, { expiresIn: "7d" });
export const verifyToken = (token) => jwt.verify(token, env.JWT_SECRET);
//# sourceMappingURL=jwt.js.map