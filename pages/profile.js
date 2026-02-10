import { Box, Container, Typography } from "@material-ui/core";
import Head from "next/head";
import { useContext } from "react";
import SharedFooter from "../components/SharedFooter";
import SharedTopBar from "../components/layouts/SharedTopBar";
import { AuthContext } from "../context/AuthContext";

export default function ProfilePage() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Head>
        <title>Profile | Store</title>
        <link rel="icon" href="/static/favicon.ico" />
      </Head>
      <SharedTopBar />
      <Container maxWidth="sm">
        <Box py={4}>
          <Typography variant="h5" gutterBottom>Profile</Typography>
          {user ? (
            <Typography color="textSecondary">
              {user.name || user.email}
            </Typography>
          ) : (
            <Typography color="textSecondary">Please log in from the account menu.</Typography>
          )}
        </Box>
      </Container>
      <SharedFooter />
    </>
  );
}
