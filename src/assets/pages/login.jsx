import { Box, TextField, Button, Typography, useTheme, useMediaQuery, Alert, CircularProgress } from "@mui/material";
import { login } from "../services/appwrite";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Assumes you are using react-router

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  };

  const handleLogin = async () => {
    setError(""); // Clear previous errors

    // 1. Basic Validation
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const { user } = await login({ email, password });

      // 2. Store user info (consider using a Context or Redux instead of just localStorage)
      localStorage.setItem("user", JSON.stringify(user));

      // 3. Redirect to home page
      navigate("/");
    } catch (err) {
      // 4. Appwrite returns specific messages for "Invalid credentials"
      setError(err.message || "Failed to login. Please check your credentials.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        backgroundColor: "#030014",
      }}
    >
      {/* Left Side - Form */}
      <Box
        sx={{
          width: isMobile ? "100%" : "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: isMobile ? 6 : 0,
        }}
      >
        <Box
          sx={{
            width: isMobile ? "90%" : 400,
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Box>
            <Typography variant="h4" sx={{ color: "#fff", fontWeight: 600 }}>
              Welcome Back 👋
            </Typography>
            <Typography sx={{ color: "#8692a6" }}>
              We are happy to have you back
            </Typography>
          </Box>

          {/* Error Message Display */}
          {error && (
            <Alert severity="error" sx={{ backgroundColor: "rgba(211, 47, 47, 0.1)", color: "#f44336" }}>
              {error}
            </Alert>
          )}

          <Box>
            <Typography sx={{ color: "#fff", mb: 1 }}>Email address*</Typography>
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              placeholder="Enter email"
              variant="outlined"
              sx={inputStyles}
            />
          </Box>

          <Box>
            <Typography sx={{ color: "#fff", mb: 1 }}>Password*</Typography>
            <TextField
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              placeholder="Enter password"
              variant="outlined"
              sx={inputStyles}
            />
          </Box>

          <Button
            onClick={handleLogin}
            disabled={loading}
            variant="contained"
            sx={{
              backgroundColor: "#5871eb",
              height: 56,
              textTransform: "none",
              fontSize: "1rem",
              "&:hover": { backgroundColor: "#465bc7" }
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Log In"}
          </Button>

          {/* Styled Divider */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, my: 1 }}>
            <Box sx={{ flex: 1, height: "1px", bgcolor: "#8692a6", opacity: 0.3 }} />
            <Typography sx={{ color: "#8692a6" }}>OR</Typography>
            <Box sx={{ flex: 1, height: "1px", bgcolor: "#8692a6", opacity: 0.3 }} />
          </Box>

          <Button
            variant="outlined"
            onClick={() => navigate("/signup")}
            sx={{
              color: "#fff",
              borderColor: "#8692a6",
              textTransform: "none",
              height: 56,
              "&:hover": { borderColor: "#fff" }
            }}
          >
            New here? Sign Up
          </Button>

          <Typography
            onClick={() => navigate("/forgot-password")}
            sx={{ color: "#5871eb", fontSize: 14, cursor: "pointer", textAlign: "center" }}
          >
            Forgot password?
          </Typography>
        </Box>
      </Box>

      {/* Right Side - Image */}
      {!isMobile && (
        <Box sx={{ width: "50%", height: "100vh" }}>
          <img
            src="/collection.jpg"
            alt="side"
            style={{ width: "100%", height: "100%", objectFit: "scale-down" }}
          />
        </Box>
      )}
    </Box>
  );
};

// Reusable styles for TextFields
const inputStyles = {
  input: { color: "#fff" },
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderColor: "#8692a6" },
    "&:hover fieldset": { borderColor: "#fff" },
    "&.Mui-focused fieldset": { borderColor: "#5871eb" },
  },
};

export default Login;