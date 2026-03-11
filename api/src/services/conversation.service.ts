// TODO: Complete conversation.service.ts implementation
// Steps needed:
// 1. Import necessary dependencies (prisma client, error handling, notification utils)
// 2. Implement service functions:
//    - createConversation(projectId, participantIds) - create conversation with participants
//    - getConversation(conversationId, userId) - get conversation with messages (verify access)
//    - getConversations(userId, filters) - list user's conversations with last message preview
//    - sendMessage(conversationId, senderId, body, attachmentUrl) - create message, mark as unread for others
//    - markMessagesAsRead(conversationId, userId) - mark all messages in conversation as read
//    - getUnreadCount(userId) - get total unread message count
//    - addParticipant(conversationId, userId) - add participant to conversation
// 3. Ensure users can only access conversations they're participants in
// 4. Create notifications for new messages
// 5. Handle errors appropriately
// 6. Export all service functions
