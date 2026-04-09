import { ApplicationStatus } from "@prisma/client";
export declare const getApplications: (userId: string) => Promise<any>;
export declare const updateApplicationStatus: (applicationId: string, userId: string, status: ApplicationStatus) => Promise<any>;
export declare const withdrawApplication: (applicationId: string, userId: string) => Promise<any>;
//# sourceMappingURL=application.service.d.ts.map