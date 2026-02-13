/**
 * In-memory cache with a maximum size (LRU eviction).
 * Keys must be strings. Values are stored by reference; same key returns same value.
 */
const DEFAULT_MAX_SIZE = 128;

function createCache(maxSize) {
  const limit = typeof maxSize === "number" && maxSize > 0 ? maxSize : DEFAULT_MAX_SIZE;
  const map = new Map();

  function get(key) {
    if (typeof key !== "string") return undefined;
    const entry = map.get(key);
    if (entry === undefined) return undefined;
    map.delete(key);
    map.set(key, entry);
    return entry.value;
  }

  function set(key, value) {
    if (typeof key !== "string") return;
    if (map.has(key)) map.delete(key);
    else if (map.size >= limit) {
      const firstKey = map.keys().next().value;
      if (firstKey !== undefined) map.delete(firstKey);
    }
    map.set(key, { value });
  }

  function clear() {
    map.clear();
  }

  return { get, set, clear };
}

export { createCache };
