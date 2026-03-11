// TODO: Complete notification.service.ts implementation
// Steps needed:
// 1. Import necessary dependencies (prisma client, error handling)
// 2. Implement service functions:
//    - getNotifications(userId, filters, pagination) - get user's notifications with filters (isRead, type)
//    - getNotification(notificationId, userId) - get single notification (verify ownership)
//    - markAsRead(notificationId, userId) - mark notification as read
//    - markAllAsRead(userId) - mark all user's notifications as read
//    - deleteNotification(notificationId, userId) - delete notification (verify ownership)
//    - getUnreadCount(userId) - get count of unread notifications
//    - createNotification(userId, type, title, message, link) - create notification (use utils/notification.ts)
// 3. Ensure users can only access their own notifications
// 4. Handle errors appropriately
// 5. Export all service functions
