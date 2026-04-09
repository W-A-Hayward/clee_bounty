export declare function hashPassword(password: string): string;
export declare function verifyPassword(password: string, storedValue: string): boolean;
export declare function createSessionToken(): string;
export declare function serializeSessionCookie(token: string): string;
export declare function clearSessionCookie(): string;
export declare function parseCookies(rawCookies: string | undefined): Record<string, string>;
export declare function assertPassword(password: string): void;
//# sourceMappingURL=auth.d.ts.map