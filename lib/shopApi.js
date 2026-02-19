/**
 * Client for shop backend API (Store-Backend).
 * Set NEXT_PUBLIC_API_URL to your backend URL (e.g. http://localhost:3001). Defaults to http://localhost:3001.
 * Backend must allow the frontend origin in CORS (see Store-Backend CORS_ORIGIN / .env.example).
 */
function getBaseUrl() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3030";
  return apiUrl.replace(/\/$/, "");
}

async function fetchJson(path, opts = {}) {
  const base = opts.baseUrl != null ? opts.baseUrl : getBaseUrl();
  const url = base + path;
  const res = await fetch(url, { headers: opts.headers || {} });
  if (!res.ok) {
    const err = new Error(res.statusText || "Request failed");
    err.status = res.status;
    throw err;
  }
  return res.json();
}

export async function getCategories(opts) {
  return fetchJson("/api/shop/categories", opts);
}

export async function getAds(opts) {
  return fetchJson("/api/shop/ads", opts);
}

export async function getNotices(opts) {
  return fetchJson("/api/shop/notices", opts);
}

export async function getProductById(id, opts) {
  if (!id) return null;
  try {
    return await fetchJson(`/api/shop/products?id=${encodeURIComponent(id)}`, opts);
  } catch (e) {
    if (e.status === 404) return null;
    throw e;
  }
}

export async function getProductsByIds(ids, opts) {
  if (!ids || !ids.length) return [];
  const path = `/api/shop/products?ids=${encodeURIComponent(ids.join(","))}`;
  return fetchJson(path, opts);
}

export async function getProductsFiltered(params, opts) {
  const searchParams = new URLSearchParams();
  if (params.q) searchParams.set("q", params.q);
  if (params.sort) searchParams.set("sort", params.sort);
  if (params.category) searchParams.set("category", params.category);
  if (params.onsale === "1" || params.onsale === true) searchParams.set("onsale", "1");
  const path = `/api/shop/products?${searchParams.toString()}`;
  return fetchJson(path, opts);
}

export async function getHomeSections(opts) {
  return fetchJson("/api/shop/home", opts);
}

export async function getProductsByCategoryId(level1Id, opts) {
  if (!level1Id) return [];
  return fetchJson(`/api/shop/category?id=${encodeURIComponent(level1Id)}`, opts);
}
