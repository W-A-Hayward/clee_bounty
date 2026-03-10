export const createNotification = (userId, type, title, message, link?) =>
    prisma.notification.create({
      data: { userId, type, title, message, link }
    });