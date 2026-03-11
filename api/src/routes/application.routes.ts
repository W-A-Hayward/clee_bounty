// TODO: Complete application.routes.ts implementation
// Steps needed:
// 1. Import express Router, application controller, validators, auth middleware, ownership middleware
// 2. Create router instance
// 3. Define routes:
//    - POST / - create application (requireAuth, requireStudent, validate application data)
//    - GET /:id - get application (requireAuth, checkApplicationOwnership)
//    - GET /project/:projectId - get applications for project (requireAuth, requireCompany, checkProjectOwnership)
//    - GET /student/my - get student's applications (requireAuth, requireStudent)
//    - PUT /:id/status - update application status (requireAuth, requireCompany, checkApplicationOwnership)
//    - DELETE /:id - withdraw application (requireAuth, requireStudent, checkApplicationOwnership)
// 4. Apply appropriate middleware to each route
// 5. Apply validation middleware where needed
// 6. Export router as default
