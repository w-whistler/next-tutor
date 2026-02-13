import { useRouter } from "next/router";
import {
  Box,
  Button,
  Container,
  Typography,
  Chip,
  Divider,
} from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import { useContext, useMemo, useCallback } from "react";
import Head from "next/head";
import { getProductByIdCached } from "../../lib/shopDataCache";
import ProductImageSlider from "../../components/shop/ProductImageSlider";
import { CartContext } from "../../context/CartContext";

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const { addToCart } = useContext(CartContext);
  const product = useMemo(
    function () {
      return id ? getProductByIdCached(id) : null;
    },
    [id]
  );

  if (!product && router.isReady) {
    return (
      <Container maxWidth="md">
        <Typography color="textSecondary">Product not found.</Typography>
      </Container>
    );
  }

  if (!product) return null;

  const hasDiscount = product.discountRate > 0;

  const handleAddToCart = useCallback(
    function () {
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        sku: product.sku,
        quantity: 1,
      });
    },
    [product, addToCart]
  );

  return (
    <>
      <Head>
        <title>{product.title} | eCommerce</title>
        <link rel="icon" href="/static/favicon.ico" />
      </Head>
      <Container maxWidth="lg" style={{ paddingTop: 24, paddingBottom: 24 }}>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="flex-start"
          flexWrap="wrap"
        >
          <Box flexShrink={0} mr={3} mb={2}>
            <ProductImageSlider images={product.images} />
          </Box>
          <Box flex={1} minWidth={280} style={{ minHeight: 0 }}>
              <Typography variant="h5" gutterBottom>
                {product.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                SKU: {product.sku}
              </Typography>
              <Box display="flex" alignItems="center" flexWrap="wrap" mt={1}>
                <Typography variant="h4" color="primary" style={{ marginRight: 12 }}>
                  ${product.price.toFixed(2)}
                </Typography>
                {hasDiscount && (
                  <>
                    <Typography variant="body1" color="textSecondary" style={{ textDecoration: "line-through", marginRight: 8 }}>
                      ${product.originalPrice.toFixed(2)}
                    </Typography>
                    <Chip label={`${product.discountRate}% off`} color="secondary" size="small" />
                  </>
                )}
              </Box>
              <Divider style={{ margin: "16px 0" }} />
              <Typography variant="body2" color="textSecondary">
                Add this item to your cart. Free returns within 30 days.
              </Typography>
              <Box mt={2} display="flex" alignItems="center">
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddShoppingCart />}
                  onClick={handleAddToCart}
                >
                  Add to cart
                </Button>
              </Box>
            </Box>
        </Box>
      </Container>
    </>
  );
}
