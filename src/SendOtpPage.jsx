import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Link,
  Container,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function SendOtpPage() {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("red");
  const [otp, setOtp] = useState("");
  
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();

    try {
      // Directly send OTP without checking account existence
      const res = await fetch("https://ats-be.vercel.app/api/v1/auth/sendOtp", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ email }),
      });

      // Check if response is JSON
      const otpContentType = res.headers.get("content-type");
      if (!otpContentType || !otpContentType.includes("application/json")) {
        console.error("Non-JSON response received:", await res.text());
        setMessage("Server error. Please try again later.");
        setMessageColor("red");
        return;
      }

      const data = await res.json();

      if (res.ok && data.success) {
        setMessage("OTP sent successfully!");
        setMessageColor("green");
        setOtpSent(true);
      } else {
        // If the server indicates the account exists
        if (data.message && data.message.toLowerCase().includes("already exists")) {
          setMessage("Account already exists. Please login instead.");
          setMessageColor("blue");
          setShowLoginButton(true);
        } else {
          setMessage(data.message || "Failed to send OTP.");
          setMessageColor("red");
          setOtpSent(false);
        }
      }
    } catch (error) {
      console.error("Error details:", error);
      setMessage("Server is not responding. Please try again later.");
      setMessageColor("red");
      setOtpSent(false);
    }
  };

  // Handle OTP verification (Navigate to signup page)
  const handleVerifyOtp = async () => {
    if (!otp.trim()) {
      setMessage("Please enter the verification code.");
      setMessageColor("red");
      return;
    }

    try {
      // Store email for the signup page
      localStorage.setItem("registrationEmail", email);
      setMessage("Redirecting to signup...");
      setMessageColor("green");
      
      // Navigate to signup page immediately
      navigate("/signup");
      
    } catch (error) {
      console.error("Error:", error);
      // Even if there's an error, still redirect
      navigate("/signup");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otpSent) {
      await handleVerifyOtp();
    } else {
      await handleSendOtp(e);
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  const [showLoginButton, setShowLoginButton] = useState(false);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: { xs: 4, sm: 6 },
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, sm: 6 },
              borderRadius: '16px',
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Typography
              variant="h4"
              align="center"
              sx={{
                fontWeight: 700,
                color: '#1a237e',
                mb: 2,
              }}
            >
              Get Started
            </Typography>
            <Typography
              variant="body1"
              align="center"
              sx={{ 
                color: '#455a64',
                mb: 4,
                fontSize: '1.1rem'
              }}
            >
              {otpSent ? 'Enter the verification code sent to your email' : 'Enter your email to receive the verification code'}
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
              }}
            >
              <TextField
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                fullWidth
                required
                disabled={otpSent}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  },
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#455a64",
                  },
                }}
              />

              {otpSent && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <TextField
                    label="Enter Verification Code"
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    variant="outlined"
                    fullWidth
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                      }
                    }}
                  />
                </motion.div>
              )}

              {message && (
                <Typography
                  variant="body2"
                  sx={{
                    color: messageColor,
                    fontWeight: 500,
                    textAlign: "center",
                  }}
                >
                  {message}
                </Typography>
              )}

              {showLoginButton ? (
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleLoginRedirect}
                  sx={{
                    py: 1.5,
                    backgroundColor: '#1976d2',
                    color: '#fff',
                    fontWeight: 600,
                    textTransform: 'none',
                    borderRadius: '8px',
                    fontSize: '1.1rem',
                    boxShadow: '0 4px 20px rgba(25, 118, 210, 0.3)',
                    '&:hover': {
                      backgroundColor: '#1565c0',
                      boxShadow: '0 6px 25px rgba(25, 118, 210, 0.4)',
                    },
                  }}
                  fullWidth
                >
                  Go to Login
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{
                    py: 1.5,
                    backgroundColor: '#1976d2',
                    color: '#fff',
                    fontWeight: 600,
                    textTransform: 'none',
                    borderRadius: '8px',
                    fontSize: '1.1rem',
                    boxShadow: '0 4px 20px rgba(25, 118, 210, 0.3)',
                    '&:hover': {
                      backgroundColor: '#1565c0',
                      boxShadow: '0 6px 25px rgba(25, 118, 210, 0.4)',
                    },
                  }}
                  fullWidth
                >
                  {otpSent ? 'Verify Code' : 'Send Verification Code'}
                </Button>
              )}
            </Box>

            <Typography
              variant="body2"
              align="center"
              sx={{ 
                mt: 3,
                color: '#455a64',
                fontSize: '1rem'
              }}
            >
              Already have an account?{" "}
              <Link
                href="/login"
                underline="hover"
                sx={{ 
                  color: '#1976d2',
                  fontWeight: 500,
                  '&:hover': {
                    color: '#1565c0'
                  }
                }}
              >
                Log in here
              </Link>
            </Typography>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
}
