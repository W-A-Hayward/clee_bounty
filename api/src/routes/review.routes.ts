// TODO: Complete review.routes.ts implementation
// Steps needed:
// 1. Import express Router, review controller, validators, auth middleware, ownership middleware
// 2. Create router instance
// 3. Define routes:
//    - POST / - create review (requireAuth, validate review data)
//    - GET /:id - get review
//    - GET /project/:projectId - get reviews for project
//    - GET /user/:userId - get reviews for user
//    - PUT /:id - update review (requireAuth, checkReviewOwnership)
//    - DELETE /:id - delete review (requireAuth, checkReviewOwnership or requireAdmin)
// 4. Apply appropriate middleware to each route
// 5. Apply validation middleware where needed
// 6. Export router as default
