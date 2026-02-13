import { useMemo } from "react";
import DiscussionLayout from "../components/layouts/DiscussionLayout";
import GameLayout from "../components/layouts/GameLayout";
import IntroLayout from "../components/layouts/IntroLayout";
import ShopLayout from "../components/layouts/ShopLayout";
import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";
import { WishlistProvider } from "../context/WishlistContext";
import { CssBaseline } from "@material-ui/core";

export default function MyApp({ Component, pageProps, router }) {
  const pathname = router.pathname;
  const isShopPage = useMemo(
    function () {
      return pathname.startsWith("/shop");
    },
    [pathname]
  );
  const isDiscussionPage = useMemo(
    function () {
      return pathname.startsWith("/discussion");
    },
    [pathname]
  );
  const isGamePage = useMemo(
    function () {
      return pathname.startsWith("/game");
    },
    [pathname]
  );
  const isIntroPage = useMemo(
    function () {
      return pathname.startsWith("/intro");
    },
    [pathname]
  );

  const page = useMemo(
    function () {
      return <Component {...pageProps} />;
    },
    [Component, pageProps]
  );

  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <CssBaseline />
          <style dangerouslySetInnerHTML={{ __html: ".product-card-thumb-scroll::-webkit-scrollbar,.product-slider-thumb-scroll::-webkit-scrollbar{display:none}" }} />
      {isShopPage && <ShopLayout>{page}</ShopLayout>}
      {isDiscussionPage && <DiscussionLayout>{page}</DiscussionLayout>}
      {isGamePage && <GameLayout>{page}</GameLayout>}
      {isIntroPage && <IntroLayout>{page}</IntroLayout>}
      {!isShopPage && !isDiscussionPage && !isGamePage && !isIntroPage && page}
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}
