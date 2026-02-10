import { Box, Container, Typography } from "@material-ui/core";
import Head from "next/head";
import SharedFooter from "../SharedFooter";
import SharedTopBar from "./SharedTopBar";

export default function IntroLayout({ children }) {
  return (
    <>
      <Head>
        <title>Sub Brands Intro | Store</title>
        <link rel="icon" href="/static/favicon.ico" />
      </Head>
      <SharedTopBar />
      <Box component="main" minHeight="60vh" p={2} pb={4}>
        <Container maxWidth="lg">{children}</Container>
      </Box>
      <SharedFooter />
    </>
  );
}
