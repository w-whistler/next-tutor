import { Box, Container, Grid } from "@material-ui/core";
import CategoryDrawer from "../../components/shop/CategoryDrawer";
import AdsSlider from "../../components/shop/AdsSlider";
import NoticesPanel from "../../components/shop/NoticesPanel";
import ProductSection from "../../components/shop/ProductSection";
import { getHomeSections } from "../../lib/shopApi";

export default function ShopHomePage({ recommended = [], mostVisited = [], trending = [] }) {

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

export async function getServerSideProps() {
  try {
    const data = await getHomeSections();
    return {
      props: {
        recommended: data.recommended || [],
        mostVisited: data.mostVisited || [],
        trending: data.trending || [],
      },
    };
  } catch (e) {
    return {
      props: { recommended: [], mostVisited: [], trending: [] },
    };
  }
}
