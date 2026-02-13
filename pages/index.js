import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
  Box,
  Container,
} from "@material-ui/core";
import Head from "next/head";
import Link from "next/link";
import SharedFooter from "../components/SharedFooter";
import SharedTopBar from "../components/layouts/SharedTopBar";

const businesses = [
  { id: 1, name: "eCommerce", description: "Shop products and deals", href: "/shop" },
  { id: 2, name: "Game", description: "Coming soon", href: "/game" },
  { id: 3, name: "Sub Brands Intro", description: "Discover our brands", href: "/intro" },
  { id: 4, name: "Discussions", description: "Community panel", href: "/discussion" },
];

export default function LandingPage() {
  return (
    <>
      <Head>
        <title>Store — Welcome</title>
        <link rel="icon" type="image/svg+xml" href="/static/favicon.svg" />
      </Head>
      <SharedTopBar />
      <Container maxWidth="md">
        <Box pt={4} pb={2}>
          <Typography variant="h4" align="center" gutterBottom>
            Welcome to Store
          </Typography>
          <Typography variant="body1" align="center" color="textSecondary">
            Choose a business to get started.
          </Typography>
        </Box>
        <Grid container spacing={3} justify="center">
          {businesses.map((b) => (
            <Grid item xs={12} sm={6} key={b.id}>
              <Link href={b.href} passHref>
                <Card>
                  <CardActionArea style={{ padding: 24 }}>
                    <CardContent>
                      <Typography variant="h6">{b.name}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {b.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
      <SharedFooter />
    </>
  );
}
