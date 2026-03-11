// TODO: Complete notification.routees.ts implementation (NOTE: filename has typo - should be notification.routes.ts)
// Steps needed:
// 1. Import express Router, notification controller, validators, auth middleware
// 2. Create router instance
// 3. Define routes (all require requireAuth middleware):
//    - GET / - get user's notifications (with query params for filters and pagination)
//    - GET /:id - get single notification
//    - PUT /:id/read - mark notification as read
//    - PUT /read-all - mark all notifications as read
//    - DELETE /:id - delete notification
//    - GET /unread/count - get unread count
// 4. Apply requireAuth middleware to all routes
// 5. Apply validation middleware where needed
// 6. Export router as default
// NOTE: Consider renaming file from notification.routees.ts to notification.routes.ts
