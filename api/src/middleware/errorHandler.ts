// TODO: Complete errorHandler.ts implementation
// Steps needed:
// 1. Add proper TypeScript types for Express error handler (err: Error, req: Request, res: Response, next: NextFunction)
// 2. Handle different error types:
//    - Validation errors (from validators)
//    - Prisma errors (database errors)
//    - Authentication/authorization errors
//    - Custom application errors
// 3. Log errors appropriately (use proper logger, include stack trace in development)
// 4. Return appropriate HTTP status codes
// 5. Format error responses consistently
// 6. Handle async errors properly
// 7. Don't expose sensitive error details in production
export const errorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(err.status ?? 500).json({ error: err.message ?? "Internal server error" });
  };