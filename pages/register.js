import { Box, Button, Container, TextField, Typography } from "@material-ui/core";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import SharedFooter from "../components/SharedFooter";
import SharedTopBar from "../components/layouts/SharedTopBar";
import { AuthContext } from "../context/AuthContext";
import { register as apiRegister } from "../lib/shopApi";

export default function RegisterPage() {
  const router = useRouter();
  const { setAuthError, setSession } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (setAuthError) setAuthError(null);
    if (!email.trim() || !password) return;
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setSubmitting(true);
    try {
      const data = await apiRegister(email.trim(), password, name.trim());
      if (data && data.token && data.user) {
        setSession(data.token, data.user);
        router.push("/profile");
        return;
      }
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Head>
        <title>Register | Store</title>
        <link rel="icon" type="image/svg+xml" href="/static/favicon.svg" />
      </Head>
      <SharedTopBar />
      <Container maxWidth="sm">
        <Box py={4}>
          <Typography variant="h5" gutterBottom>
            Register
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
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              margin="normal"
              autoComplete="name"
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
              autoComplete="new-password"
              helperText="At least 6 characters"
            />
            {error && (
              <Typography color="error" style={{ marginTop: 8 }}>
                {error}
              </Typography>
            )}
            <Box mt={2}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={submitting}
              >
                {submitting ? "Creating account…" : "Create account"}
              </Button>
            </Box>
          </form>
          <Box mt={2}>
            <Link href="/login" passHref>
              <Typography component="a" color="primary" style={{ cursor: "pointer" }}>
                Already have an account? Sign in
              </Typography>
            </Link>
          </Box>
        </Box>
      </Container>
      <SharedFooter />
    </>
  );
}
