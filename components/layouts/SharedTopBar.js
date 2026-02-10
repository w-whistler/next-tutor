import Link from "next/link";
import { useRouter } from "next/router";
import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { ShoppingCartOutlined } from "@material-ui/icons";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

export default function SharedTopBar() {
  const router = useRouter();
  const { cart } = useContext(CartContext);

  return (
    <AppBar position="static">
      <Toolbar>
        <Link href="/" passHref>
          <Typography variant="h6" component="a" style={{ color: "inherit", textDecoration: "none" }}>
            Store
          </Typography>
        </Link>
        <Box flexGrow={1} />
        <Link href="/shop" passHref>
          <Button color="inherit">eCommerce</Button>
        </Link>
        <Link href="/game" passHref>
          <Button color="inherit">Game</Button>
        </Link>
        <Link href="/intro" passHref>
          <Button color="inherit">Intro</Button>
        </Link>
        <Link href="/discussion" passHref>
          <Button color="inherit">Discussions</Button>
        </Link>
        <Link href="/shop/cart" passHref>
          <IconButton color="inherit" aria-label="cart">
            <Badge badgeContent={cart.length} color="secondary">
              <ShoppingCartOutlined />
            </Badge>
          </IconButton>
        </Link>
      </Toolbar>
    </AppBar>
  );
}
