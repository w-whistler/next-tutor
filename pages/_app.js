import { useMemo, useState, useEffect } from "react";
import Head from "next/head";
import Router from "next/router";
import DiscussionLayout from "../components/layouts/DiscussionLayout";
import GameLayout from "../components/layouts/GameLayout";
import IntroLayout from "../components/layouts/IntroLayout";
import ShopLayout from "../components/layouts/ShopLayout";
import CropSpinner from "../components/CropSpinner";
import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";
import { WishlistProvider } from "../context/WishlistContext";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../lib/theme";

export default function MyApp({ Component, pageProps, router }) {
  const [routeLoading, setRouteLoading] = useState(false);

  useEffect(
    function () {
      function onStart() {
        setRouteLoading(true);
      }
      function onEnd() {
        setRouteLoading(false);
      }
      Router.events.on("routeChangeStart", onStart);
      Router.events.on("routeChangeComplete", onEnd);
      Router.events.on("routeChangeError", onEnd);
      return function () {
        Router.events.off("routeChangeStart", onStart);
        Router.events.off("routeChangeComplete", onEnd);
        Router.events.off("routeChangeError", onEnd);
      };
    },
    []
  );

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
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <Head>
              <link rel="icon" type="image/svg+xml" href="/static/favicon.svg" />
            </Head>
            <CssBaseline />
            <style dangerouslySetInnerHTML={{ __html: ".product-card-thumb-scroll::-webkit-scrollbar,.product-slider-thumb-scroll::-webkit-scrollbar{display:none}" }} />
            {routeLoading && <CropSpinner overlay />}
            {isShopPage && <ShopLayout>{page}</ShopLayout>}
            {isDiscussionPage && <DiscussionLayout>{page}</DiscussionLayout>}
            {isGamePage && <GameLayout>{page}</GameLayout>}
            {isIntroPage && <IntroLayout>{page}</IntroLayout>}
            {!isShopPage && !isDiscussionPage && !isGamePage && !isIntroPage && page}
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
