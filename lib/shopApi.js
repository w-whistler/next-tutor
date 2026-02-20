/**
 * Client for shop backend API (Store-Backend).
 * Set NEXT_PUBLIC_API_URL to your backend URL (e.g. http://localhost:3001). Defaults to http://localhost:3030.
 * Backend must allow the frontend origin in CORS (see Store-Backend CORS_ORIGIN / .env.example).
 */
function getBaseUrl() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3030";
  return apiUrl.replace(/\/$/, "");
}

function getAuthHeaders(token) {
  const headers = {};
  if (token) headers.Authorization = "Bearer " + token;
  return headers;
}

async function fetchJson(path, opts = {}) {
  const base = opts.baseUrl != null ? opts.baseUrl : getBaseUrl();
  const url = base + path;
  const headers = { ...getAuthHeaders(opts.token), ...(opts.headers || {}) };
  if (opts.body != null && typeof opts.body !== "string") {
    headers["Content-Type"] = headers["Content-Type"] || "application/json";
  }
  const init = { method: opts.method || "GET", headers };
  if (opts.body != null) {
    init.body = typeof opts.body === "string" ? opts.body : JSON.stringify(opts.body);
  }
  const res = await fetch(url, init);
  if (!res.ok) {
    const err = new Error(res.statusText || "Request failed");
    err.status = res.status;
    let body;
    try { body = await res.json(); } catch (_) {}
    if (body && body.error) err.message = body.error;
    throw err;
  }
  return res.json();
}

// ——— Auth ———
export async function register(email, password, name, opts) {
  return fetchJson("/api/auth/register", {
    ...opts,
    method: "POST",
    body: { email, password, name: name || "" },
  });
}

export async function login(email, password, opts) {
  return fetchJson("/api/auth/login", {
    ...opts,
    method: "POST",
    body: { email, password },
  });
}

// ——— Cart (authenticated) ———
export async function getCart(token, opts) {
  return fetchJson("/api/cart", { ...opts, token });
}

export async function setCart(items, token, opts) {
  return fetchJson("/api/cart", {
    ...opts,
    method: "PUT",
    body: { items },
    token,
  });
}

// ——— Favorites (authenticated) ———
export async function getFavorites(token, opts) {
  return fetchJson("/api/favorites", { ...opts, token });
}

export async function setFavorites(productIds, token, opts) {
  return fetchJson("/api/favorites", {
    ...opts,
    method: "PUT",
    body: { productIds },
    token,
  });
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
