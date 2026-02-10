import { Box, Container, Typography } from "@material-ui/core";
import Head from "next/head";
import SharedFooter from "../components/SharedFooter";
import SharedTopBar from "../components/layouts/SharedTopBar";

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Login | Store</title>
        <link rel="icon" href="/static/favicon.ico" />
      </Head>
      <SharedTopBar />
      <Container maxWidth="sm">
        <Box py={4}>
          <Typography variant="h5" gutterBottom>Login</Typography>
          <Typography color="textSecondary">Use the account menu in the top bar to log in (demo).</Typography>
        </Box>
      </Container>
      <SharedFooter />
    </>
  );
}
