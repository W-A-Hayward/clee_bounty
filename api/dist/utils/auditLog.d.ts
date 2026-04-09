type actionTypes = "create" | "read" | "update" | "delete";
export declare const log: (actorUserId: string | null, actionType: actionTypes, entityType: string, entityId: string, metadata?: object) => Promise<void>;
export {};
//# sourceMappingURL=auditLog.d.ts.map