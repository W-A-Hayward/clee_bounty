// logging audits to the db
// example usage : await log(userId, "company_registered", "Company", company.id);
import prisma from "../lib/prisma.js";
export const log = async (actorUserId, actionType, entityType, entityId, metadata) => {
    await prisma.auditLog.create({
        data: {
            actorUserId,
            actionType,
            entityType,
            entityId,
            metadataJson: metadata ?? {},
        },
    });
};
//# sourceMappingURL=auditLog.js.map