import { Prisma, PostingStatus } from "@prisma/client";
export declare const getPostings: () => Promise<any>;
export declare const getPostingById: (id: string) => Promise<any>;
export declare const createPosting: (userId: string, data: Prisma.PostingCreateInput) => Promise<any>;
export declare const editPostingById: (id: string, userId: string, data: Prisma.PostingUpdateInput) => Promise<any>;
export declare const updatePostingStatus: (id: string, userId: string, status: PostingStatus) => Promise<any>;
export declare const deletePosting: (id: string, userId: string) => Promise<void>;
export declare const applyToPosting: (studentId: string, postingId: string, data: Prisma.ApplicationCreateInput) => Promise<any>;
export declare const getPostingApplications: (userId: string, postingId: string) => Promise<any>;
//# sourceMappingURL=posting.service.d.ts.map