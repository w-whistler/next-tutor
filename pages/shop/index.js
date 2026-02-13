import { Box, Container, Grid } from "@material-ui/core";
import { useMemo } from "react";
import CategoryDrawer from "../../components/shop/CategoryDrawer";
import AdsSlider from "../../components/shop/AdsSlider";
import NoticesPanel from "../../components/shop/NoticesPanel";
import ProductSection from "../../components/shop/ProductSection";
import { getProductsByIdsCached } from "../../lib/shopDataCache";
import {
  recommendedProductIds,
  mostVisitedProductIds,
  trendingProductIds,
} from "../../data/shopData";

export default function ShopHomePage() {
  const recommended = useMemo(
    function () {
      return getProductsByIdsCached(recommendedProductIds);
    },
    []
  );
  const mostVisited = useMemo(
    function () {
      return getProductsByIdsCached(mostVisitedProductIds);
    },
    []
  );
  const trending = useMemo(
    function () {
      return getProductsByIdsCached(trendingProductIds);
    },
    []
  );

  return (
    <Container maxWidth="lg" style={{ paddingTop: 24, paddingBottom: 24 }}>
      {/* Top section: 25% category, 50% ads, 25% notices */}
      <Grid container spacing={2} style={{ minHeight: 220 }}>
        <Grid item xs={12} md={3}>
          <Box height="100%" minHeight={200}>
            <CategoryDrawer />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box height="100%" minHeight={200}>
            <AdsSlider />
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box height="100%" minHeight={200}>
            <NoticesPanel />
          </Box>
        </Grid>
      </Grid>

      {/* Product sections */}
      <ProductSection title="Most Recommended" products={recommended} />
      <ProductSection title="Most Visited" products={mostVisited} />
      <ProductSection title="Trending" products={trending} />
    </Container>
  );
}
