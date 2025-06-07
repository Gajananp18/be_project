import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function VerifyOtpPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://ats-be.vercel.app/api/v1/auth/verifyOtp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        alert("OTP verified successfully!");
        navigate("/SignUp");
      } else {
        alert(data.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Something went wrong. Try again later.");
    }
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Paper
          elevation={0}
          sx={{
            width: "420px",
            padding: "50px",
            borderRadius: "16px",
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography
            variant="h4"
            align="center"
            sx={{
              fontWeight: "bold",
              color: "#ff6e5c",
              marginBottom: "20px",
              textShadow: "2px 2px 6px rgba(0,0,0,0.2)",
            }}
          >
            Verify OTP
          </Typography>

          <Typography
            variant="body1"
            align="center"
            sx={{ color: "gray", marginBottom: "30px", fontSize: "1.1rem" }}
          >
            Enter the OTP sent to your email
          </Typography>

          <Box
            component="form"
            onSubmit={handleVerifyOtp}
            sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <TextField
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
            />

            <TextField
              label="OTP"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              fullWidth
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
                backgroundColor: "#ff6e5c",
                color: "#fff",
                fontWeight: "bold",
                textTransform: "none",
                borderRadius: "30px",
                transition: "all 0.4s ease",
                "&:hover": {
                  backgroundColor: "#ff7eb3",
                  transform: "translateY(-3px)",
                },
              }}
              fullWidth
            >
              Verify OTP
            </Button>
          </Box>
        </Paper>
      </motion.div>
    </Box>
  );
}
