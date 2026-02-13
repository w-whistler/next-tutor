import { Button, Container, Paper, Typography } from "@material-ui/core";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

export default function OrderConfirmationPage() {
  const router = useRouter();
  const { total } = router.query;
  const orderTotal = total && typeof total === "string" ? total : null;

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
          <Typography color="textSecondary" style={{ marginBottom: 16 }}>
            Your order has been placed successfully. You will receive a confirmation email shortly.
          </Typography>
          {orderTotal && (
            <Typography variant="h6" style={{ marginBottom: 24 }}>
              Order total: ${orderTotal}
            </Typography>
          )}
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
