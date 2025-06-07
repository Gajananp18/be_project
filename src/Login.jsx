import React, { useState } from 'react';
import {
  Box, TextField, Button, Typography, Paper, Link, IconButton
} from '@mui/material';
import { motion } from 'framer-motion';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Make API request to login
      const res = await fetch("https://ats-be.vercel.app/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      // Check if login is successful
      if (res.ok && data.success) {
        // Save token in localStorage for future API calls
        localStorage.setItem("token", data.token);
        
        // Get stored user profile or create a new one if it doesn't exist
        let userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
        
        // If no profile exists, create a default one
        if (!userProfile.email) {
          userProfile = {
            token: data.token,
            name: data.user?.name || 'User',
            email: email,
            createdAt: new Date().toISOString(),
            stats: {
              resumesAnalyzed: 0,
              matchedJobs: 0,
              skillsIdentified: 0,
              improvementSuggestions: 0,
            },
            recentActivity: []
          };
          localStorage.setItem('userProfile', JSON.stringify(userProfile));
        }
        
        // Navigate to the Dashboard page
        navigate("/Dashboard");
      } else {
        alert(data.message || "Login failed. Check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <Paper
          elevation={0}
          sx={{
            width: '420px',
            padding: '50px',
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
            Welcome Back
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
            Sign in to your account
          </Typography>

          <Box
            component="form"
            onSubmit={handleLogin}
            sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
          >
            <TextField
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
              fullWidth
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                }
              }}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />

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
              Sign In
            </Button>
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
            Don't have an account?{' '}
            <Link 
              href="/SendOtpPage" 
              underline="hover" 
              sx={{ 
                color: '#1976d2',
                fontWeight: 500,
                '&:hover': {
                  color: '#1565c0'
                }
              }}
            >
              Register here
            </Link>
          </Typography>
        </Paper>
      </motion.div>
    </Box>
  );
}
