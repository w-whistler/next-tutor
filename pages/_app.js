import DiscussionLayout from "../components/layouts/DiscussionLayout";
import GameLayout from "../components/layouts/GameLayout";
import IntroLayout from "../components/layouts/IntroLayout";
import ShopLayout from "../components/layouts/ShopLayout";
import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";
import { WishlistProvider } from "../context/WishlistContext";
import { CssBaseline } from "@material-ui/core";

export default function MyApp({ Component, pageProps, router }) {
  const isShopPage = router.pathname.startsWith("/shop");
  const isDiscussionPage = router.pathname.startsWith("/discussion");
  const isGamePage = router.pathname.startsWith("/game");
  const isIntroPage = router.pathname.startsWith("/intro");

  const page = <Component {...pageProps} />;

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
