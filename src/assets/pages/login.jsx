import { Box, TextField, Button, Typography, Checkbox, useTheme, useMediaQuery } from "@mui/material";
import { login } from "../services/appwrite";
import { useState } from "react";
//-----------------------------------------------------backend implented but not tested and also still needs work.---------------------------------------------------------
//create navbar with logout button so you can continue the rest of the list below
//make sure terms and conditions must be checked
//implement continue with google functionality
//display error message if email is not valid or does not exist
//display error message if password is incorrect
//display error message if any field is empty
//NOTE: after successful login, store user info in local storage and redirect to home page
//NOTE: also implement logout functionality and clear local storage on logout
//NOTE: also implement session management and auto-login if user is already logged in (check local storage on app load)
//NOTE: also implement password reset functionality (send password reset email and allow user to reset password)


const Login = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // mobile/tablet breakpoint
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const { session, user } = await login({ email, password });
      console.log("User logged in:", user);
      localStorage.setItem("user", JSON.stringify(user)); // store logged-in user
      alert("Login successful!");
    } catch (err) {
      setError(err.message);
      console.error(err);
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
          py: isMobile ? 6 : 0, // vertical padding for mobile
        }}
      >
        <Box
          sx={{
            width: isMobile ? "90%" : 400,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {/* Logo */}
          <div className="flex items-center mb-4">
            <img src="/logo.png" alt="logo" className="w-8 h-8 object-contain" />
            <h1 className="text-white text-2xl font-bold m-0 leading-tight ml-2">
              myNetflix
            </h1>
          </div>

          {/* Heading */}
          <Box>
            <Typography variant="h4" sx={{ color: "#fff", fontWeight: 600 }}>
              Welcome Back 👋
            </Typography>
            <Typography sx={{ color: "#8692a6" }}>
              We are happy to have you back
            </Typography>
          </Box>

          {/* Email */}
          <Box>
            <Typography sx={{ color: "#fff", mb: 1 }}>Email address*</Typography>
            <TextField
              label="Email" value={email} onChange={(e) => setEmail(e.target.value)}
              fullWidth
              placeholder="Enter email"
              variant="outlined"
              sx={{
                input: { color: "#fff" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#8692a6" },
                  "&:hover fieldset": { borderColor: "#8692a6" },
                  "&.Mui-focused fieldset": { borderColor: "#8692a6" },
                },
              }}
            />
          </Box>

          {/* Password */}
          <Box>
            <Typography sx={{ color: "#fff", mb: 1 }}>Password*</Typography>
            <TextField
              type="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)}
              fullWidth
              placeholder="Enter password"
              variant="outlined"
              sx={{
                input: { color: "#fff" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#8692a6" },
                  "&:hover fieldset": { borderColor: "#8692a6" },
                  "&.Mui-focused fieldset": { borderColor: "#8692a6" },
                },
              }}
            />
          </Box>

          {/* Checkbox */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Checkbox sx={{ color: "white", "&.Mui-checked": { color: "white" } }} />
            <Typography sx={{ color: "#fff", fontSize: 14 }}>
              I agree to terms & conditions
            </Typography>
          </Box>

          {/* Login Button */}
          <Button
            onClick={handleLogin}
            variant="contained"
            sx={{
              backgroundColor: "#5871eb",
              height: 56,
              textTransform: "none",
            }}
          >
            Log In
          </Button>

          {/* Divider */}
          <Box className="flex items-center w-full max-w-md mx-auto my-2">
            <div className="flex-1 h-px bg-gray-500" />
            <span className="px-4 text-gray-400 text-lg">OR</span>
            <div className="flex-1 h-px bg-gray-500" />
          </Box>

          {/* Google */}
          <Button
            variant="outlined"
            sx={{
              color: "#fff",
              borderColor: "#fff",
              textTransform: "none",
              height: 56,
            }}
          >
            Continue with Google
          </Button>
        </Box>
      </Box>

      {/* Right Side - Image */}
      {!isMobile && (
        <Box
          sx={{
            width: "50%",
            height: "100vh",
          }}
        >
          <img
            src="/collection.jpg"
            alt="side"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default Login;