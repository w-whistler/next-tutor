import { useRouter } from "next/router";
import { Container, Typography } from "@material-ui/core";
import { useMemo } from "react";
import Head from "next/head";
import ProductSection from "../../components/shop/ProductSection";
import { filterAndSortProductsCached } from "../../lib/shopDataCache";

export default function SearchPage() {
  const router = useRouter();
  const { q, sort, category, onsale } = router.query;
  const results = useMemo(
    function () {
      return filterAndSortProductsCached({ q, sort, category, onsale });
    },
    [q, sort, category, onsale]
  );

  const hasFilters = q || sort || category || onsale;

  return (
    <>
      <Head>
        <title>Search{q ? `: ${q}` : ""} | eCommerce</title>
        <link rel="icon" type="image/svg+xml" href="/static/favicon.svg" />
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
