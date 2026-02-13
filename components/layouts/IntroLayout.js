import { Box, Container, Typography } from "@material-ui/core";
import Head from "next/head";
import { memo } from "react";
import SharedFooter from "../SharedFooter";
import SharedTopBar from "./SharedTopBar";

function IntroLayout({ children }) {
  return (
    <>
      <Head>
        <title>Sub Brands Intro | Store</title>
        <link rel="icon" type="image/svg+xml" href="/static/favicon.svg" />
      </Head>
      <SharedTopBar />
      <Box component="main" minHeight="60vh" p={2} pb={4}>
        <Container maxWidth="lg">{children}</Container>
      </Box>
      <SharedFooter />
    </>
  );
}

export default memo(IntroLayout);
