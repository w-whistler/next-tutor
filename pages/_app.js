import ShopLayout from "../components/layouts/ShopLayout";
import { CartProvider } from "../context/CartContext";
import { CssBaseline } from "@material-ui/core";

export default function MyApp({
  Component,
  pageProps,
  router,
}) {
  const isShopPage = router.pathname.startsWith('/shop');

  const page = <Component {...pageProps} />;

  if (isShopPage) {
    return (
      <CartProvider>
        <CssBaseline />
        <ShopLayout>{page}</ShopLayout>
      </CartProvider>
    );
  }

  return page;
}
