import { createCache } from "./cache";
import {
  allProducts,
  recommendedProductIds,
  getProductById,
  getProductsByIds,
} from "../data/shopData";

const productByIdCache = createCache(64);
const productsByIdsCache = createCache(32);
const filterResultsCache = createCache(32);
const categoryProductsCache = createCache(16);

export function getProductByIdCached(id) {
  if (!id || typeof id !== "string") return null;
  const key = "id_" + id;
  let value = productByIdCache.get(key);
  if (value !== undefined) return value;
  value = getProductById(id);
  if (value) productByIdCache.set(key, value);
  return value;
}

export function getProductsByIdsCached(ids) {
  if (!ids || !ids.length) return [];
  const key = "ids_" + ids.join(",");
  let value = productsByIdsCache.get(key);
  if (value !== undefined) return value;
  value = getProductsByIds(ids);
  productsByIdsCache.set(key, value);
  return value;
}

function filterAndSortProducts(products, params) {
  let list = [...products];
  const term = (params.q && typeof params.q === "string" ? params.q : "").toLowerCase().trim();

  if (term) {
    list = list.filter(
      (p) =>
        p.title.toLowerCase().includes(term) ||
        (p.sku && p.sku.toLowerCase().includes(term))
    );
  }
  if (params.category && typeof params.category === "string") {
    list = list.filter((p) => p.categoryId === params.category);
  }
  if (params.onsale === "1") {
    list = list.filter((p) => p.discountRate > 0);
  }
  if (params.sort === "price_asc") {
    list.sort((a, b) => a.price - b.price);
  } else if (params.sort === "price_desc") {
    list.sort((a, b) => b.price - a.price);
  } else if (params.sort === "recommendation") {
    const order = recommendedProductIds;
    list.sort((a, b) => {
      const i = order.indexOf(a.id);
      const j = order.indexOf(b.id);
      if (i === -1 && j === -1) return 0;
      if (i === -1) return 1;
      if (j === -1) return -1;
      return i - j;
    });
  }
  return list;
}

export function filterAndSortProductsCached(params) {
  const key = "filter_" + JSON.stringify(params);
  let value = filterResultsCache.get(key);
  if (value !== undefined) return value;
  value = filterAndSortProducts(allProducts, params);
  filterResultsCache.set(key, value);
  return value;
}

export function getProductsByCategoryIdCached(level1Id) {
  if (!level1Id || typeof level1Id !== "string") return [];
  const key = "cat_" + level1Id;
  let value = categoryProductsCache.get(key);
  if (value !== undefined) return value;
  value = allProducts.filter((p) => p.categoryId === level1Id);
  categoryProductsCache.set(key, value);
  return value;
}
