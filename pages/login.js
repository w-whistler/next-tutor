import { Box, Button, Container, TextField, Typography } from "@material-ui/core";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import SharedFooter from "../components/SharedFooter";
import SharedTopBar from "../components/layouts/SharedTopBar";
import { AuthContext } from "../context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login, authError, setAuthError } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setAuthError && setAuthError(null);
    if (!email.trim() || !password) return;
    setSubmitting(true);
    try {
      const result = await login(email.trim(), password);
      if (result && result.ok) {
        router.push("/profile");
        return;
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Head>
        <title>Login | Store</title>
        <link rel="icon" type="image/svg+xml" href="/static/favicon.svg" />
      </Head>
      <SharedTopBar />
      <Container maxWidth="sm">
        <Box py={4}>
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
              autoComplete="email"
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
              autoComplete="current-password"
            />
            {authError && (
              <Typography color="error" style={{ marginTop: 8 }}>
                {authError}
              </Typography>
            )}
            <Box mt={2}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={submitting}
              >
                {submitting ? "Signing in…" : "Sign in"}
              </Button>
            </Box>
            <Box mt={2}>
              <Link href="/register" passHref>
                <Typography component="a" color="primary" style={{ cursor: "pointer" }}>
                  Don&apos;t have an account? Register
                </Typography>
              </Link>
            </Box>
            <Box mt={2}>
              <Link href="/register" passHref>
                <Typography component="a" color="primary" style={{ cursor: "pointer" }}>
                  Don&apos;t have an account? Register
                </Typography>
              </Link>
            </Box>
          </form>
        </Box>
      </Container>
      <SharedFooter />
    </>
  );
}
