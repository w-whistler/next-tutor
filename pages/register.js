import { Box, Container, Typography } from "@material-ui/core";
import Head from "next/head";
import SharedFooter from "../components/SharedFooter";
import SharedTopBar from "../components/layouts/SharedTopBar";

export default function RegisterPage() {
  return (
    <>
      <Head>
        <title>Register | Store</title>
        <link rel="icon" href="/static/favicon.ico" />
      </Head>
      <SharedTopBar />
      <Container maxWidth="sm">
        <Box py={4}>
          <Typography variant="h5" gutterBottom>Register</Typography>
          <Typography color="textSecondary">Registration placeholder — coming soon.</Typography>
        </Box>
      </Container>
      <SharedFooter />
    </>
  );
}
