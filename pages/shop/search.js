import { useRouter } from "next/router";
import { Container, Typography } from "@material-ui/core";
import Head from "next/head";
import ProductSection from "../../components/shop/ProductSection";
import { getProductsFiltered } from "../../lib/shopApi";

export default function SearchPage({ results = [] }) {
  const router = useRouter();
  const { q, sort, category, onsale } = router.query;
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

export async function getServerSideProps(context) {
  const { q, sort, category, onsale } = context.query;
  try {
    const results = await getProductsFiltered({ q, sort, category, onsale: onsale === "1" });
    return { props: { results: Array.isArray(results) ? results : [] } };
  } catch (e) {
    return { props: { results: [] } };
  }
}
