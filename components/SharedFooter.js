import {
  Box,
  Container,
  Divider,
  Grid,
  Link as MuiLink,
  Typography,
} from "@material-ui/core";
import { memo } from "react";
import Link from "next/link";

const footerLinks = [
  { label: "eCommerce", href: "/shop" },
  { label: "Game", href: "/game" },
  { label: "Sub Brands Intro", href: "/intro" },
  { label: "Discussions", href: "/discussion" },
];

function SharedFooter() {
  return (
    <Box component="footer" mt={4} py={3} bgcolor="primary.main" color="primary.contrastText">
        <Container maxWidth="lg">
          <Grid container spacing={3} justify="space-between">
            <Grid item xs={12} sm={4}>
              <Box mb={1}>
                <img
                  src="/static/logo.svg"
                  alt="Store"
                  style={{ height: 32, display: "block" }}
                />
              </Box>
              <Typography variant="body2" style={{ color: "rgba(255,255,255,0.9)" }}>
                Your multi-business platform.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" style={{ color: "rgba(255,255,255,0.9)" }} gutterBottom>
                Businesses
              </Typography>
              <Box display="flex" flexWrap="wrap">
                {footerLinks.map(({ label, href }) => (
                  <Link href={href} key={href} passHref>
                    <MuiLink
                      variant="body2"
                      style={{ marginRight: 16, marginBottom: 4, color: "rgba(255,255,255,0.85)" }}
                    >
                      {label}
                    </MuiLink>
                  </Link>
                ))}
              </Box>
            </Grid>
          </Grid>
          <Divider style={{ marginTop: 24, marginBottom: 16, backgroundColor: "rgba(255,255,255,0.3)" }} />
          <Typography variant="caption" style={{ color: "rgba(255,255,255,0.8)" }} display="block" align="center">
            © {new Date().getFullYear()} Store. All rights reserved.
          </Typography>
        </Container>
    </Box>
  );
}

export default memo(SharedFooter);
