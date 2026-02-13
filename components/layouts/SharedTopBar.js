import Link from "next/link";
import { useRouter } from "next/router";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { useContext, useState, memo } from "react";
import { AuthContext } from "../../context/AuthContext";

function SharedTopBar() {
  const router = useRouter();
  const { user, login, logout } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  function handleMenuOpen(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMenuClose() {
    setAnchorEl(null);
  }

  function handleLogin() {
    handleMenuClose();
    login({ email: "user@example.com", name: "User" });
  }

  function handleLogout() {
    handleMenuClose();
    logout();
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Link href="/" passHref>
          <Typography
            variant="h6"
            component="a"
            style={{ color: "inherit", textDecoration: "none" }}
          >
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
        <IconButton
          color="inherit"
          aria-label="Account"
          aria-controls="account-menu"
          aria-haspopup="true"
          onClick={handleMenuOpen}
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="account-menu"
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          keepMounted
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={open}
          onClose={handleMenuClose}
        >
          {user ? (
            [
              <Link href="/profile" key="profile" passHref>
                <MenuItem component="a" onClick={handleMenuClose}>
                  Profile
                </MenuItem>
              </Link>,
              <MenuItem key="logout" onClick={handleLogout}>
                Logout
              </MenuItem>,
            ]
          ) : (
            [
              <MenuItem key="login" onClick={handleLogin}>
                Login
              </MenuItem>,
              <Link href="/register" key="register" passHref>
                <MenuItem component="a" onClick={handleMenuClose}>
                  Register
                </MenuItem>
              </Link>,
            ]
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default memo(SharedTopBar);
