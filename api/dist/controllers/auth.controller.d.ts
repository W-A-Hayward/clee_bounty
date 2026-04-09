import type { Request, Response } from "express";
export declare const companyRegister: (req: Request, res: Response) => Promise<void>;
export declare const companyLogin: (req: Request, res: Response) => Promise<void>;
export declare const logout: (_req: Request, res: Response) => void;
export declare const me: (req: Request, res: Response) => Promise<void>;
export declare const refresh: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const studentMicrosoftLogin: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=auth.controller.d.ts.map