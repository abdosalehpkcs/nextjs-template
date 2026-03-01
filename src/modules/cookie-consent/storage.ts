import type { CookiePreferences } from './types';

export const STORAGE_KEY = 'cookie_preferences';
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

const isBrowser = () =>
  typeof window !== 'undefined' && typeof document !== 'undefined';

const isValidPreferences = (value: unknown): value is CookiePreferences => {
  if (!value || typeof value !== 'object') return false;

  const prefs = value as CookiePreferences;
  return (
    prefs.version === 1 &&
    typeof prefs.updatedAt === 'string' &&
    typeof prefs.functional === 'boolean' &&
    typeof prefs.analytics === 'boolean' &&
    typeof prefs.marketing === 'boolean'
  );
};

const readCookieValue = (): string | null => {
  if (!isBrowser()) return null;
  const cookie = document.cookie
    .split('; ')
    .find(entry => entry.startsWith(`${STORAGE_KEY}=`));

  if (!cookie) return null;
  return cookie.slice(STORAGE_KEY.length + 1);
};

const parsePreferences = (raw: string | null): CookiePreferences | null => {
  if (!raw) return null;

  try {
    const decoded = decodeURIComponent(raw);
    const parsed = JSON.parse(decoded);
    return isValidPreferences(parsed) ? parsed : null;
  } catch {
    return null;
  }
};

const writeCookie = (prefs: CookiePreferences): void => {
  if (!isBrowser()) return;
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  const encoded = encodeURIComponent(JSON.stringify(prefs));
  document.cookie = `${STORAGE_KEY}=${encoded}; Path=/; Max-Age=${ONE_YEAR_SECONDS}; SameSite=Lax${secure}`;
};

const removeCookie = (): void => {
  if (!isBrowser()) return;
  document.cookie = `${STORAGE_KEY}=; Path=/; Max-Age=0; SameSite=Lax`;
};

export const load = (): CookiePreferences | null => {
  if (!isBrowser()) return null;

  const cookiePrefs = parsePreferences(readCookieValue());
  if (cookiePrefs) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cookiePrefs));
    } catch {
      // Ignore storage errors
    }
    return cookiePrefs;
  }

  let localPrefs: CookiePreferences | null = null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    localPrefs = parsePreferences(stored);
  } catch {
    localPrefs = null;
  }

  if (localPrefs) {
    try {
      writeCookie(localPrefs);
    } catch {
      // Ignore cookie errors
    }
    return localPrefs;
  }

  return null;
};

export const save = (prefs: CookiePreferences): void => {
  if (!isBrowser()) return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    // Ignore storage errors
  }

  try {
    writeCookie(prefs);
  } catch {
    // Ignore cookie errors
  }
};

export const clear = (): void => {
  if (!isBrowser()) return;

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage errors
  }

  try {
    removeCookie();
  } catch {
    // Ignore cookie errors
  }
};
