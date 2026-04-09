import prisma from "../lib/prisma.js";
export const createNotification = (userId, type, title, message, link) => prisma.notification.create({
    data: { userId, type, title, message, link: link ?? null },
});
//# sourceMappingURL=notification.js.map