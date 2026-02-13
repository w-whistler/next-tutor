import { Box, Button, Container, Paper, Typography } from "@material-ui/core";
import Head from "next/head";
import Link from "next/link";

export default function OrderConfirmationPage() {
  return (
    <>
      <Head>
        <title>Order confirmed | eCommerce</title>
        <link rel="icon" href="/static/favicon.ico" />
      </Head>
      <Container maxWidth="sm" style={{ paddingTop: 48, paddingBottom: 48 }}>
        <Paper style={{ padding: 32, textAlign: "center" }}>
          <Typography variant="h5" gutterBottom>
            Thank you for your order
          </Typography>
          <Typography color="textSecondary" style={{ marginBottom: 24 }}>
            Your order has been placed successfully. You will receive a confirmation email shortly.
          </Typography>
          <Link href="/shop" passHref>
            <Button variant="contained" color="primary">
              Continue shopping
            </Button>
          </Link>
        </Paper>
      </Container>
    </>
  );
}
