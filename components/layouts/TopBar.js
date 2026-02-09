import { AppBar, Badge, Box, Button, Toolbar, Typography } from "@material-ui/core";
import { ShoppingCartOutlined } from "@material-ui/icons";
import Link from "next/link";

export default function TopBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5">
          Store
        </Typography>
        <Box flexGrow={1} />
        <Link href="/shop">
          <Button variant="text">Shop</Button>
        </Link>
        <Box ml={2} />
        <Link href="/discussion">
          <Button variant="text">Discussion</Button>
        </Link>
        <Box ml={2} />
        <Link href="/game">
          <Button variant="text">Game</Button>
        </Link>
        <Box ml={2} />
        <Link href="/intro">
          <Button variant="text">Intro</Button>
        </Link>
        <Box ml={2} />
        <Badge badgeContent={3} color="secondary">
          <ShoppingCartOutlined />
        </Badge>
      </Toolbar>
    </AppBar>
  );
}
