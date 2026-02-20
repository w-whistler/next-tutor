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
import { useContext, useState, useEffect, memo } from "react";
import { AuthContext } from "../../context/AuthContext";

const SCROLL_THRESHOLD_DOWN = 28;
const SCROLL_THRESHOLD_UP = 12;
const TOPBAR_HEIGHT_DEFAULT = 64;
const TOPBAR_HEIGHT_SMALL = 48;

function SharedTopBar() {
  const router = useRouter();
  const { user, logout } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const open = Boolean(anchorEl);

  useEffect(
    function () {
      if (typeof window === "undefined") return;
      let rafId = null;
      let lastScrollY = window.scrollY;
      function onScroll() {
        if (rafId !== null) return;
        rafId = requestAnimationFrame(function () {
          rafId = null;
          const y = window.scrollY;
          if (y !== lastScrollY) {
            lastScrollY = y;
            setScrolled(function (prev) {
              if (y > SCROLL_THRESHOLD_DOWN) return true;
              if (y < SCROLL_THRESHOLD_UP) return false;
              return prev;
            });
          }
        });
      }
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return function () {
        window.removeEventListener("scroll", onScroll);
        if (rafId !== null) cancelAnimationFrame(rafId);
      };
    },
    []
  );

  function handleMenuOpen(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMenuClose() {
    setAnchorEl(null);
  }

  function handleLogin() {
    handleMenuClose();
    router.push("/login");
  }

  function handleLogout() {
    handleMenuClose();
    logout();
  }

  const barHeight = scrolled ? TOPBAR_HEIGHT_SMALL : TOPBAR_HEIGHT_DEFAULT;
  const logoHeight = scrolled ? 28 : 36;

  return (
    <AppBar
      position="sticky"
      style={{
        top: 0,
        zIndex: 1100,
        minHeight: barHeight,
        height: barHeight,
        transition: "height 0.2s ease, min-height 0.2s ease",
      }}
    >
      <Toolbar
        style={{
          minHeight: barHeight,
          height: barHeight,
          paddingTop: 0,
          paddingBottom: 0,
          transition: "height 0.2s ease, min-height 0.2s ease",
        }}
      >
        <Link href="/" passHref>
          <Box
            component="a"
            display="flex"
            alignItems="center"
            style={{ textDecoration: "none", color: "inherit", height: logoHeight }}
          >
            <img
              src="/static/logo.svg"
              alt=""
              style={{
                height: logoHeight,
                display: "block",
                width: "auto",
                transition: "height 0.2s ease",
              }}
            />
            <Typography
              variant={scrolled ? "subtitle1" : "h6"}
              component="span"
              style={{ marginLeft: 10 }}
            >
              G-Store
            </Typography>
          </Box>
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
