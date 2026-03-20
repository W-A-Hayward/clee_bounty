// logging audits to the db
// example usage : await log(userId, "company_registered", "Company", company.id);
import prisma from "../lib/prisma.ts";

type actionTypes = "create" | "read" | "update" | "delete";

export const log = async (
  actorUserId: string | null,
  actionType: actionTypes,
  entityType: string,
  entityId: string,
  metadata?: object,
) => {
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
