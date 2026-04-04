import { useState } from "react";
import { Box, TextField, Button, Typography, useTheme, useMediaQuery, Checkbox } from "@mui/material";
import { signup } from "../services/appwrite";

//---------------------------------------------------------backend implented but still needs work.---------------------------------------------------------
//make sure terms and conditions must be checked
//implement continue with google functionality
//display error message if password and confirm password do not match 
//display error message if user exists
//display error message if email is not valid
//display error message if password is too weak
//display error message if any field is empty

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const user = await signup({ email, password, name });
      console.log("User created:", user);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // mobile/tablet breakpoint

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
              Welcome! 👋
            </Typography>
            <Typography sx={{ color: "#8692a6" }}>
              We are happy to have you here
            </Typography>
          </Box>

          {/* Name */}
          <Box>
            <Typography sx={{ color: "#fff", mb: 1 }}>Name*</Typography>
            <TextField
              label="Name" value={name} onChange={(e) => setName(e.target.value)}
              fullWidth
              placeholder="Enter name"
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
            <Typography sx={{ color: "#fff", mb: 1 }}> Create Password*</Typography>
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

          <Box>
            <Typography sx={{ color: "#fff", mb: 1 }}> Confirm Password*</Typography>
            <TextField
              type="password" label="Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}

              fullWidth
              placeholder="Passwords must match"
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

          {/* Signup Button */}
          <Button
            variant="contained"
            onClick={handleSignup}
            sx={{
              backgroundColor: "#5871eb",
              height: 56,
              textTransform: "none",
            }}
          >
            Sign Up
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

export default Signup;