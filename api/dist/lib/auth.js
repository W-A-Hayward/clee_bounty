import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
const SESSION_COOKIE = 'clee_session';
export function hashPassword(password) {
    assertPassword(password);
    const salt = randomBytes(16).toString('hex');
    const hash = scryptSync(password, salt, 64).toString('hex');
    return `${salt}:${hash}`;
}
export function verifyPassword(password, storedValue) {
    const [salt, expectedHash] = storedValue.split(':');
    if (!salt || !expectedHash) {
        return false;
    }
    const actualHash = scryptSync(password, salt, 64);
    const expected = Buffer.from(expectedHash, 'hex');
    return expected.length === actualHash.length && timingSafeEqual(actualHash, expected);
}
export function createSessionToken() {
    return randomBytes(24).toString('hex');
}
export function serializeSessionCookie(token) {
    return `${SESSION_COOKIE}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000`;
}
export function clearSessionCookie() {
    return `${SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}
export function parseCookies(rawCookies) {
    if (!rawCookies) {
        return {};
    }
    return rawCookies.split(';').reduce((cookies, entry) => {
        const [key, ...valueParts] = entry.trim().split('=');
        if (!key) {
            return cookies;
        }
        cookies[key] = decodeURIComponent(valueParts.join('='));
        return cookies;
    }, {});
}
export function assertPassword(password) {
    if (password.trim().length < 8) {
        throw new Error('Password must be at least 8 characters long.');
    }
}
//# sourceMappingURL=auth.js.map