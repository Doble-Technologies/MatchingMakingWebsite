export const TOKEN_COOKIE_NAME = 'mm_access_token';

export function decodeJwt(token) {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
  } catch {
    return null;
  }
}

export function isExpired(decoded) {
  if (!decoded?.exp) return true;
  return decoded.exp * 1000 < Date.now();
}

export function readCookie(name) {
  const nameEq = `${name}=`;
  const parts = document.cookie.split(';');
  for (const part of parts) {
    const cookie = part.trim();
    if (cookie.startsWith(nameEq)) {
      return decodeURIComponent(cookie.substring(nameEq.length));
    }
  }
  return null;
}

export function writeTokenCookie(token) {
  const decoded = decodeJwt(token);
  const maxAge = decoded?.exp ? Math.max(decoded.exp - Math.floor(Date.now() / 1000), 0) : null;
  const secureAttr = window.location.protocol === 'https:' ? '; Secure' : '';
  const maxAgeAttr = maxAge !== null ? `; Max-Age=${maxAge}` : '';
  document.cookie = `${TOKEN_COOKIE_NAME}=${encodeURIComponent(token)}; Path=/; SameSite=Strict${maxAgeAttr}${secureAttr}`;
}

export function clearTokenCookie() {
  document.cookie = `${TOKEN_COOKIE_NAME}=; Path=/; Max-Age=0; SameSite=Strict`;
}