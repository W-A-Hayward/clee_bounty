// TODO: Complete conversation.routes.ts implementation
// Steps needed:
// 1. Import express Router, conversation controller, validators, auth middleware, ownership middleware, multer
// 2. Create router instance
// 3. Define routes:
//    - POST / - create conversation (requireAuth, validate conversation data)
//    - GET /:id - get conversation with messages (requireAuth, checkConversationAccess)
//    - GET / - get user's conversations (requireAuth)
//    - POST /:id/messages - send message (requireAuth, checkConversationAccess, validate message, multer for attachments)
//    - PUT /:id/read - mark messages as read (requireAuth, checkConversationAccess)
//    - GET /unread/count - get unread count (requireAuth)
// 4. Apply appropriate middleware to each route
// 5. Apply validation middleware where needed
// 6. Export router as default
