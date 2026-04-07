import { useState } from "react";
import { Box, TextField, Button, Typography, useTheme, useMediaQuery, Checkbox, Alert, CircularProgress } from "@mui/material";
import { signup } from "../services/appwrite";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  // Form States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);

  // Status States
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    if (e) e.preventDefault();
    setError("");

    // 1. Validation: Empty Fields
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all required fields.");
      return;
    }

    // 2. Validation: Passwords Match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // 3. Validation: Password Strength (Basic)
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    // 4. Validation: Terms & Conditions
    if (!agree) {
      setError("You must agree to the terms and conditions.");
      return;
    }

    setLoading(true);
    try {
      // 5. Appwrite Signup Call
      await signup({ email, password, name });

      alert("Account created successfully! Please log in.");
      navigate("/login");
    } catch (err) {
      // 6. Handle Appwrite specific errors (User already exists, Invalid email, etc.)
      setError(err.message);
      console.error("Signup Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Reusable Input Styles
  const inputStyles = {
    input: { color: "#fff" },
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "#8692a6" },
      "&:hover fieldset": { borderColor: "#fff" },
      "&.Mui-focused fieldset": { borderColor: "#5871eb" },
    },
    mb: 2,
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
          py: isMobile ? 6 : 5,
        }}
      >
        <Box
          component="form"
          onSubmit={handleSignup}
          sx={{
            width: isMobile ? "90%" : 400,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Heading */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h4" sx={{ color: "#fff", fontWeight: 600 }}>
              Welcome! 👋
            </Typography>
            <Typography sx={{ color: "#8692a6" }}>
              We are happy to have you here
            </Typography>
          </Box>

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: "8px" }}>
              {error}
            </Alert>
          )}

          <Typography sx={{ color: "#fff", mb: 1 }}>Full Name*</Typography>
          <TextField
            placeholder="Enter name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={inputStyles}
          />

          <Typography sx={{ color: "#fff", mb: 1 }}>Email address*</Typography>
          <TextField
            placeholder="Enter email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={inputStyles}
          />

          <Typography sx={{ color: "#fff", mb: 1 }}>Create Password*</Typography>
          <TextField
            type="password"
            placeholder="Enter password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={inputStyles}
          />

          <Typography sx={{ color: "#fff", mb: 1 }}>Confirm Password*</Typography>
          <TextField
            type="password"
            placeholder="Passwords must match"
            variant="outlined"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={inputStyles}
          />

          {/* Checkbox */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Checkbox
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              sx={{ color: "#8692a6", "&.Mui-checked": { color: "#5871eb" } }}
            />
            <Typography sx={{ color: "#fff", fontSize: 14 }}>
              I agree to terms & conditions
            </Typography>
          </Box>

          {/* Signup Button */}
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{
              backgroundColor: "#5871eb",
              height: 56,
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: 600,
              "&:hover": { backgroundColor: "#465bc7" },
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Sign Up"}
          </Button>

          {/* Divider */}
          <Box sx={{ display: "flex", alignItems: "center", my: 3 }}>
            <Box sx={{ flex: 1, height: "1px", bgcolor: "#8692a6", opacity: 0.3 }} />
            <Typography sx={{ px: 2, color: "#8692a6", fontSize: 14 }}>OR</Typography>
            <Box sx={{ flex: 1, height: "1px", bgcolor: "#8692a6", opacity: 0.3 }} />
          </Box>

          <Button
            component={Link}
            to="/login"
            variant="outlined"
            sx={{
              color: "#fff",
              borderColor: "#8692a6",
              textTransform: "none",
              height: 56,
              "&:hover": { borderColor: "#fff" },
            }}
          >
            Have an account? Log in
          </Button>
        </Box>
      </Box>

      {/* Right Side - Image */}
      {!isMobile && (
        <Box sx={{ width: "50%", height: "100vh" }}>
          <img
            src="/collection.jpg"
            alt="side"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "scale-down",
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default Signup;