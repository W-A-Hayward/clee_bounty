// TODO: Complete conversation.validators.ts implementation
// Steps needed:
// 1. Import express-validator or zod for validation
// 2. Create validation rules for:
//    - createConversation: projectId (optional), participantIds (array of user IDs)
//    - sendMessage: body (message text), attachmentUrl (optional)
// 3. Validate projectId exists if provided
// 4. Validate participantIds is array with at least 2 user IDs
// 5. Validate message body is not empty and has reasonable length
// 6. Validate attachmentUrl is valid URL if provided
// 7. Export validation chains/arrays for each endpoint
