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
    <Box component="footer" mt={4} py={3} bgcolor="grey.200">
        <Container maxWidth="lg">
          <Grid container spacing={3} justify="space-between">
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" color="textSecondary">
                Store
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Your multi-business platform.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                Businesses
              </Typography>
              <Box display="flex" flexWrap="wrap">
                {footerLinks.map(({ label, href }) => (
                  <Link href={href} key={href} passHref>
                    <MuiLink
                      variant="body2"
                      color="textSecondary"
                      style={{ marginRight: 16, marginBottom: 4 }}
                    >
                      {label}
                    </MuiLink>
                  </Link>
                ))}
              </Box>
            </Grid>
          </Grid>
          <Divider style={{ marginTop: 24, marginBottom: 16 }} />
          <Typography variant="caption" color="textSecondary" display="block" align="center">
            © {new Date().getFullYear()} Store. All rights reserved.
          </Typography>
        </Container>
    </Box>
  );
}

export default memo(SharedFooter);
