import {
  Box,
  Button,
  Container,
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
import { CartContext } from "../../context/CartContext";

export default function CartPage() {
  const { cart } = useContext(CartContext);
  const total = cart.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);

  return (
    <>
      <Head>
        <title>Cart | eCommerce</title>
        <link rel="icon" href="/static/favicon.ico" />
      </Head>
      <Container maxWidth="md" style={{ paddingTop: 24, paddingBottom: 24 }}>
        <Typography variant="h5" gutterBottom>
          Your cart
        </Typography>
        {cart.length === 0 ? (
          <Box>
            <Typography color="textSecondary">Your cart is empty.</Typography>
            <Link href="/shop" passHref>
              <Button color="primary" style={{ marginTop: 16 }}>Continue shopping</Button>
            </Link>
          </Box>
        ) : (
          <>
            <Table>
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
            <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
              <Link href="/shop" passHref>
                <Button>Continue shopping</Button>
              </Link>
              <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>
            </Box>
            <Box mt={2}>
              <Button variant="contained" color="primary" disabled>
                Proceed to checkout (placeholder)
              </Button>
            </Box>
          </>
        )}
      </Container>
    </>
  );
}
