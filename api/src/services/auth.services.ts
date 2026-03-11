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
