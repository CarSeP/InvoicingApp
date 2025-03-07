"use client";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Typography,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { verify } from "paseto-ts/v4";

export default function LoginPage() {
  const [error, setError] = useState("");
  const router = useRouter();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");
    const params = { username, password };

    try {
      const response = await axios.post("/api/auth/login", params);
      if (response.status === 200) router.push("/home");
    } catch (error: any) {
      setError(error.response.data.error);
    }
  };

  const tokenValidator = async () => {
    const authToken = getCookie("auth");
    if (!authToken) return;
    try {
      await verify(
        process.env.NEXT_PUBLIC_PASETO_PUBLIC_KEY || "",
        authToken.toString()
      );
      router.push("/home");
    } catch {}
  };

  useEffect(() => {
    tokenValidator();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        p: 2,
        bgcolor: "#f5f5f5",
      }}
    >
      <Card sx={{ maxWidth: 450, width: "100%", boxShadow: 3, py: "100px" }}>
        <CardHeader
          title={
            <Typography
              variant="h4"
              component="h1"
              align="center"
              sx={{ fontWeight: 600, mb: 1 }}
            >
              Invoicing App
            </Typography>
          }
          subheader={
            <Typography variant="body2" color="text.secondary" align="center">
              Please enter your credentials to login
            </Typography>
          }
          sx={{ pb: 0 }}
        />
        <CardContent sx={{ pt: 3 }}>
          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              InputProps={{
                startAdornment: (
                  <PersonIcon sx={{ fontSize: 20, mr: "10px" }} />
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              InputProps={{
                startAdornment: <LockIcon sx={{ fontSize: 20, mr: "10px" }} />,
              }}
            />
            {error && (
              <Typography variant="body2" color="red" align="center">
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, py: 1.5, borderRadius: 2 }}
            >
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
