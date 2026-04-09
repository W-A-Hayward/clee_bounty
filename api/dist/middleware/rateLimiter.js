export {};
// TODO: Complete rateLimiter.ts implementation
// Steps needed:
// 1. Import express-rate-limit
// 2. Create different rate limiters for different endpoints:
//    - generalLimiter (default rate limit)
//    - authLimiter (stricter for login/register endpoints)
//    - apiLimiter (for API endpoints)
//    - uploadLimiter (for file upload endpoints)
// 3. Configure rate limits:
//    - windowMs (time window)
//    - max (max requests per window)
//    - message (error message)
//    - standardHeaders (return rate limit info in headers)
//    - legacyHeaders (disable X-RateLimit-* headers)
// 4. Use keyGenerator to identify users (by IP or user ID if authenticated)
// 5. Export all rate limiter instances
//# sourceMappingURL=rateLimiter.js.map