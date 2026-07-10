export const LOCALES = ['es', 'en'] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'es';
export const ENGLISH_LOCALE: Locale = 'en';
export const LOCALE_STORAGE_KEY = 'a2workshop-locale';

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && LOCALES.includes(value as Locale);
}

export function normalizeLocale(value: string | undefined | null): Locale {
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

export function stripTrailingSlash(path: string): string {
  if (path === '/') return '/';
  return path.endsWith('/') ? path.slice(0, -1) : path;
}

export function stripLocaleFromPath(path: string): string {
  const normalized = stripTrailingSlash(path || '/');
  if (normalized === '/en') return '/';
  if (normalized.startsWith('/en/')) {
    return normalized.slice(3) || '/';
  }
  return normalized || '/';
}

export function buildLocalizedPath(path: string, locale: Locale): string {
  const basePath = stripLocaleFromPath(path);
  if (locale === ENGLISH_LOCALE) {
    return basePath === '/' ? '/en' : `/en${basePath}`;
  }
  return basePath;
}

export function localizeHref(locale: Locale, href: string): string {
  if (!href || href.startsWith('#')) return href;
  if (/^(?:[a-z]+:)?\/\//i.test(href)) return href;
  return buildLocalizedPath(href, locale);
}
