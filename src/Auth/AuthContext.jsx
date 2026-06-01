import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { config } from '@src/config';

const AuthContext = createContext(null);
const TOKEN_COOKIE_NAME = 'mm_access_token';

function decodeJwt(token) {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
  } catch {
    return null;
  }
}

function isExpired(decoded) {
  if (!decoded?.exp) return true;
  return decoded.exp * 1000 < Date.now();
}

function readCookie(name) {
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

function writeTokenCookie(token) {
  const decoded = decodeJwt(token);
  const maxAge = decoded?.exp ? Math.max(decoded.exp - Math.floor(Date.now() / 1000), 0) : null;
  const secureAttr = window.location.protocol === 'https:' ? '; Secure' : '';
  const maxAgeAttr = maxAge !== null ? `; Max-Age=${maxAge}` : '';
  document.cookie = `${TOKEN_COOKIE_NAME}=${encodeURIComponent(token)}; Path=/; SameSite=Strict${maxAgeAttr}${secureAttr}`;
}

function clearTokenCookie() {
  document.cookie = `${TOKEN_COOKIE_NAME}=; Path=/; Max-Age=0; SameSite=Strict`;
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(false);

  const clearSession = useCallback((markAuthError = false) => {
    setToken(null);
    setUser(null);
    setAuthError(markAuthError);
    clearTokenCookie();
  }, []);

  const storeToken = useCallback((accessToken) => {
    setToken(accessToken);
    writeTokenCookie(accessToken);
  }, []);

  const parseResponseBody = async (res) => {
    const text = await res.text();
    if (!text) return null;
    try {
      return JSON.parse(text);
    } catch {
      return null;
    }
  };

  const refreshAccessToken = useCallback(async (previousToken = null) => {
    try {
      const refreshRes = await fetch(`${config.api_url}/auth/refresh`, {
        method: 'POST',
        headers: previousToken ? { Authorization: `Bearer ${previousToken}` } : undefined,
        credentials: 'include',
      });

      if (!refreshRes.ok) return null;

      const body = await parseResponseBody(refreshRes);
      const refreshedToken = body?.token ?? body?.access_token ?? body?.data?.token;
      if (!refreshedToken) return null;

      storeToken(refreshedToken);
      return refreshedToken;
    } catch {
      return null;
    }
  }, [storeToken]);

  const hydrateUserProfile = useCallback(async (accessToken, markAuthError = true) => {
    try {
      const profileRes = await fetch(`${config.api_url}/user/profile`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${accessToken}` },
        credentials: 'include',
      });

      if (!profileRes.ok) {
        clearSession(markAuthError);
        return false;
      }

      const profileData = await profileRes.json();
      console.log('profileRes: ', profileData);
      const backendUser = profileData?.details
      console.log('backendUser: ', backendUser);
      if (!backendUser) {
        clearSession(markAuthError);
        return false;
      }

      const decoded = decodeJwt(accessToken);
      setUser({
        id: backendUser.id ?? backendUser.user_id ?? decoded?.id,
        username: backendUser.username ?? decoded?.username ?? '',
        email: backendUser.email,
        xp: backendUser.xp,
        avatar: backendUser.avatar,
        bio: backendUser.bio,
        createdAt: backendUser.created_at ?? backendUser.createdAt,
        updatedAt: backendUser.updated_at ?? backendUser.updatedAt,
      });
      setAuthError(false);
      return true;
    } catch {
      clearSession(markAuthError);
      return false;
    }
  }, [clearSession]);

  const login = useCallback(async (accessToken) => {
    storeToken(accessToken);
    const ok = await hydrateUserProfile(accessToken);
    if (!ok) {
      throw new Error('Error authenticating');
    }
  }, [hydrateUserProfile, storeToken]);

  const logout = useCallback(() => {
    clearSession(false);
  }, [clearSession]);

  const clearAuthError = useCallback(() => {
    setAuthError(false);
  }, []);

  /**
   * Returns the access token if it is still valid, otherwise null.
   * Components should use this instead of reading `token` directly.
   */
  const getToken = useCallback(() => {
    if (!token) return null;
    const decoded = decodeJwt(token);
    if (isExpired(decoded)) {
      clearSession(false);
      return null;
    }
    return token;
  }, [clearSession, token]);

  const getValidToken = useCallback(async () => {
    const candidate = token ?? readCookie(TOKEN_COOKIE_NAME);
    if (!candidate) return null;

    const decoded = decodeJwt(candidate);
    if (!isExpired(decoded)) return candidate;

    const refreshed = await refreshAccessToken(candidate);
    if (!refreshed) {
      clearSession(false);
      return null;
    }

    const ok = await hydrateUserProfile(refreshed, false);
    if (!ok) {
      clearSession(false);
      return null;
    }

    return refreshed;
  }, [clearSession, hydrateUserProfile, refreshAccessToken, token]);

  useEffect(() => {
    let cancelled = false;

    const bootstrapAuth = async () => {
      const storedToken = readCookie(TOKEN_COOKIE_NAME);
      if (!storedToken) {
        if (!cancelled) setLoading(false);
        return;
      }

      const decoded = decodeJwt(storedToken);
      if (!isExpired(decoded)) {
        storeToken(storedToken);
        await hydrateUserProfile(storedToken, false);
        if (!cancelled) setLoading(false);
        return;
      }

      const refreshed = await refreshAccessToken(storedToken);
      if (!refreshed) {
        clearSession(false);
        if (!cancelled) setLoading(false);
        return;
      }

      await hydrateUserProfile(refreshed, false);
      if (!cancelled) setLoading(false);
    };

    bootstrapAuth();

    return () => {
      cancelled = true;
    };
  }, [clearSession, hydrateUserProfile, refreshAccessToken, storeToken]);

  useEffect(() => {
    const syncFromCookie = () => {
      const nextToken = readCookie(TOKEN_COOKIE_NAME);
      if (!nextToken) {
        setToken(null);
        setUser(null);
        setAuthError(false);
        return;
      }

      const decoded = decodeJwt(nextToken);
      if (isExpired(decoded)) {
        clearSession(false);
        return;
      }

      if (nextToken !== token) {
        storeToken(nextToken);
        hydrateUserProfile(nextToken, false);
      }
    };

    window.addEventListener('focus', syncFromCookie);
    document.addEventListener('visibilitychange', syncFromCookie);
    return () => {
      window.removeEventListener('focus', syncFromCookie);
      document.removeEventListener('visibilitychange', syncFromCookie);
    };
  }, [clearSession, hydrateUserProfile, storeToken, token]);

  return (
    <AuthContext.Provider value={{ user, token, loading, authError, clearAuthError, login, logout, getToken, getValidToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);