// TODO: Complete notification.ts implementation
// Steps needed:
// 1. Import prisma client (currently missing import)
// 2. Add proper TypeScript types for all parameters
// 3. Create additional notification functions:
//    - getNotifications(userId, filters)
//    - markAsRead(notificationId)
//    - markAllAsRead(userId)
//    - deleteNotification(notificationId)
// 4. Handle notification creation errors
// 5. Support batch notification creation
// 6. Export all functions

import prisma from "../lib/prisma.ts";

export const createNotification = (userId, type, title, message, link?) =>
  prisma.notification.create({
    data: { userId, type, title, message, link },
  });

