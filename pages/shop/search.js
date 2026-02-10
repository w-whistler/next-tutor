import { useRouter } from "next/router";
import { Container, Typography, Box } from "@material-ui/core";
import { useMemo } from "react";
import Head from "next/head";
import ProductSection from "../../components/shop/ProductSection";
import { allProducts, recommendedProductIds } from "../../data/shopData";

function filterAndSortProducts(products, { q, sort, category, onsale }) {
  let list = [...products];
  const term = (q && typeof q === "string" ? q : "").toLowerCase().trim();

  if (term) {
    list = list.filter(
      (p) =>
        p.title.toLowerCase().includes(term) ||
        (p.sku && p.sku.toLowerCase().includes(term))
    );
  }
  if (category && typeof category === "string") {
    list = list.filter((p) => p.categoryId === category);
  }
  if (onsale === "1") {
    list = list.filter((p) => p.discountRate > 0);
  }
  if (sort === "price_asc") {
    list.sort((a, b) => a.price - b.price);
  } else if (sort === "price_desc") {
    list.sort((a, b) => b.price - a.price);
  } else if (sort === "recommendation") {
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

export default function SearchPage() {
  const router = useRouter();
  const { q, sort, category, onsale } = router.query;
  const results = useMemo(
    () =>
      filterAndSortProducts(allProducts, {
        q,
        sort,
        category,
        onsale,
      }),
    [q, sort, category, onsale]
  );

  const hasFilters = q || sort || category || onsale;

  return (
    <>
      <Head>
        <title>Search{q ? `: ${q}` : ""} | eCommerce</title>
        <link rel="icon" href="/static/favicon.ico" />
      </Head>
      <Container maxWidth="lg" style={{ paddingTop: 24, paddingBottom: 24 }}>
        <Typography variant="h5" gutterBottom>
          Search{q ? `: "${q}"` : hasFilters ? " results" : " products"}
        </Typography>
        {results.length === 0 ? (
          <Typography color="textSecondary">
            {hasFilters
              ? "No products match your filters. Try changing sort or filters."
              : "Use the search bar above and add filters to find products."}
          </Typography>
        ) : (
          <ProductSection
            title={`${results.length} result(s)`}
            products={results}
          />
        )}
      </Container>
    </>
  );
}
