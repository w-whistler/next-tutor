/**
 * Simple cookie helpers for guest cart/favorites. Use path=/ so they're sent site-wide.
 * Values are JSON; cookie size limit ~4KB so keep payloads small.
 */

const DEFAULT_MAX_AGE_DAYS = 365;

function getCookie(name) {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(?:^|;\\s*)" + encodeURIComponent(name) + "=([^;]*)"));
  const value = match ? decodeURIComponent(match[1]) : null;
  if (!value) return null;
  try {
    return JSON.parse(value);
  } catch (e) {
    return null;
  }
}

function setCookie(name, value, maxAgeDays) {
  if (typeof document === "undefined") return;
  const days = maxAgeDays != null ? maxAgeDays : DEFAULT_MAX_AGE_DAYS;
  const encoded = encodeURIComponent(JSON.stringify(value));
  document.cookie = name + "=" + encoded + "; path=/; max-age=" + days * 24 * 60 * 60 + "; SameSite=Lax";
}

function deleteCookie(name) {
  if (typeof document === "undefined") return;
  document.cookie = name + "=; path=/; max-age=0";
}

export { getCookie, setCookie, deleteCookie };
