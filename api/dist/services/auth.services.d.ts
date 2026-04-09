import type { CompanyRegisterInput, CompanyLoginInput } from "../validators/auth.validators.ts";
export declare const registerCompany: (data: CompanyRegisterInput) => Promise<{
    token: string;
    user: any;
    company: any;
}>;
export declare const loginCompany: (data: CompanyLoginInput) => Promise<{
    token: string;
    user: any;
}>;
export declare const refreshToken: (oldToken: string) => Promise<{
    token: string;
    user: any;
}>;
export declare const loginStudentMicrosoft: (accessToken: string) => Promise<{
    token: string;
    user: any;
}>;
export declare const getCurrentUser: (userId: string) => Promise<any>;
//# sourceMappingURL=auth.services.d.ts.map