import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { CartContext } from "../../context/CartContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart } = useContext(CartContext);
  const total = cart.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);

  if (cart.length === 0) {
    return (
      <>
        <Head>
          <title>Checkout | eCommerce</title>
          <link rel="icon" href="/static/favicon.ico" />
        </Head>
        <Container maxWidth="md" style={{ paddingTop: 24, paddingBottom: 24 }}>
          <Typography variant="h5" gutterBottom>
            Checkout
          </Typography>
          <Typography color="textSecondary">Your cart is empty. Add items before checkout.</Typography>
          <Link href="/shop" passHref>
            <Button color="primary" style={{ marginTop: 16 }}>
              Continue shopping
            </Button>
          </Link>
        </Container>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Checkout | eCommerce</title>
        <link rel="icon" href="/static/favicon.ico" />
      </Head>
      <Container maxWidth="md" style={{ paddingTop: 24, paddingBottom: 24 }}>
        <Typography variant="h5" gutterBottom>
          Checkout
        </Typography>

        <Paper style={{ padding: 24, marginBottom: 24 }}>
          <Typography variant="h6" gutterBottom>
            Order summary
          </Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Qty</TableCell>
                <TableCell align="right">Subtotal</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.map((item, i) => (
                <TableRow key={i}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell align="right">${(item.price || 0).toFixed(2)}</TableCell>
                  <TableCell align="right">{item.quantity || 1}</TableCell>
                  <TableCell align="right">
                    ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>
          </Box>
        </Paper>

        <Paper style={{ padding: 24, marginBottom: 24 }}>
          <Typography variant="h6" gutterBottom>
            Shipping & payment
          </Typography>
          <Typography color="textSecondary" variant="body2">
            Shipping and payment options will be configured here. For now, this is a placeholder step.
          </Typography>
        </Paper>

        <Divider style={{ margin: "24px 0" }} />

        <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap">
          <Link href="/shop/cart" passHref>
            <Button>Back to cart</Button>
          </Link>
          <Button
            variant="contained"
            color="primary"
            onClick={function () {
              router.push("/shop/checkout/confirmation");
            }}
          >
            Place order
          </Button>
        </Box>
      </Container>
    </>
  );
}
