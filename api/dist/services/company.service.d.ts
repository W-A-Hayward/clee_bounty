import { Prisma } from "@prisma/client";
export declare const updateCompany: (userId: string, data: Prisma.CompanyUpdateInput) => Promise<any>;
export declare const getCompanyProfile: (slug: string) => Promise<any>;
export declare const getCompanyWithMembers: (slug: string) => Promise<any>;
export declare const companyInviteMember: (adminId: string, slug: string, email: string) => Promise<any>;
export declare const getCompanyMembers: (slug: string) => Promise<any>;
//# sourceMappingURL=company.service.d.ts.map