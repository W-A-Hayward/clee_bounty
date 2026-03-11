// TODO: Complete match.routes.ts implementation
// Steps needed:
// 1. Import express Router, match controller, validators, auth middleware, ownership middleware
// 2. Create router instance
// 3. Define routes:
//    - POST / - create match (requireAuth, requireCompany, validate match data)
//    - GET /:id - get match (requireAuth, checkMatchAccess)
//    - GET /project/:projectId - get matches for project (requireAuth, checkProjectOwnership)
//    - GET /student/my - get student's matches (requireAuth, requireStudent)
//    - PUT /:id/status - update match status (requireAuth, checkMatchOwnership)
//    - POST /:id/complete - complete match (requireAuth, checkMatchOwnership)
// 4. Apply appropriate middleware to each route
// 5. Apply validation middleware where needed
// 6. Export router as default
