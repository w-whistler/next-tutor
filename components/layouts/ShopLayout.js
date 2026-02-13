import { Box } from "@material-ui/core";
import Head from "next/head";
import { memo } from "react";
import SharedFooter from "../SharedFooter";
import SharedTopBar from "./SharedTopBar";
import ShopSecondaryBar from "../shop/ShopSecondaryBar";

function ShopLayout({ children }) {
  return (
    <>
      <Head>
        <title>eCommerce | Store</title>
        <link rel="icon" type="image/svg+xml" href="/static/favicon.svg" />
      </Head>
      <SharedTopBar />
      <ShopSecondaryBar />
      <Box component="main" minHeight="60vh" pb={4}>
        {children}
      </Box>
      <SharedFooter />
    </>
  );
}

export default memo(ShopLayout);
