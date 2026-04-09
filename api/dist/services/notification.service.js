import prisma from "../lib/prisma.js";
export const fetchAll = async (userid) => {
    return await prisma.notification.findMany({
        where: { userId: userid },
        orderBy: { createdAt: "desc" },
    });
};
export const readOne = async (userid, notifid) => {
    // Use updateMany to safely scope the update to the owner
    const updateResult = await prisma.notification.updateMany({
        where: {
            id: notifid,
            userId: userid,
        },
        data: { isRead: true },
    });
    if (updateResult.count === 0) {
        const error = new Error("Notification not found");
        error.status = 404;
        throw error; // ← let errorHandler deal with it
    }
    // Retrieve the specific record if needed
    return await prisma.notification.findUnique({
        where: { id: notifid },
    });
};
export const readAll = async (userid) => {
    return await prisma.notification.updateMany({
        where: { userId: userid },
        data: { isRead: true },
    });
};
//# sourceMappingURL=notification.service.js.map