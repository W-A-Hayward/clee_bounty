// TODO: Complete ownership.middleware.ts implementation
// Steps needed:
// 1. Import necessary dependencies (Request, Response, NextFunction, prisma client)
// 2. Create middleware to verify resource ownership:
//    - checkProjectOwnership (verify user created the project or is company member)
//    - checkApplicationOwnership (verify user is the applicant or project owner)
//    - checkMatchOwnership (verify user is student or company member)
//    - checkDeliverableOwnership (verify user submitted deliverable or is project owner)
//    - checkConversationAccess (verify user is participant)
// 3. Extract resource IDs from request params or body
// 4. Query database to verify ownership/access
// 5. Attach resource to request if needed (req.project, req.application, etc.)
// 6. Return 403 Forbidden if user doesn't have access
// 7. Export all middleware functions
