import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Link,
  IconButton,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  // Get the verified email from localStorage
  useEffect(() => {
    const verifiedEmail = localStorage.getItem('registrationEmail');
    if (!verifiedEmail) {
      // If no verified email, redirect back to SendOtpPage
      navigate('/SendOtpPage');
    } else {
      setEmail(verifiedEmail);
    }
  }, [navigate]);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSignUp = async () => {
    // Get the latest email from localStorage
    const verifiedEmail = localStorage.getItem('registrationEmail');
    if (!verifiedEmail) {
      alert('Please verify your email first.');
      return;
    }

    if (!name.trim() || !password.trim() || !otp.trim()) {
      alert('Please fill in all fields.');
      return;
    }

    // First verify the OTP
    try {
      const verifyResponse = await axios.post('https://ats-be.vercel.app/api/v1/auth/verifyOtp', {
        email: verifiedEmail,
        otp: otp.trim()
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (!verifyResponse.data.success) {
        alert('Invalid OTP. Please check and try again.');
        return;
      }

      // If OTP is verified, proceed with signup
      const payload = {
        name: name.trim(),
        email: verifiedEmail.trim(),
        password: password.trim(),
        otp: otp.trim()
      };

      console.log("Sending payload:", payload);
      const response = await axios.post('https://ats-be.vercel.app/api/v1/auth/signup', payload, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        validateStatus: function (status) {
          return status < 500; // Resolve only if the status code is less than 500
        }
      });

      console.log("API Response:", response.data); // Debug log

      if (response.data.success) {
        const { token, user } = response.data;
        
        // Store complete user profile
        const userProfile = {
          token,
          name: name.trim(),
          email: verifiedEmail.trim(),
          createdAt: new Date().toISOString(),
          stats: {
            resumesAnalyzed: 0,
            matchedJobs: 0,
            skillsIdentified: 0,
            improvementSuggestions: 0,
          },
          recentActivity: []
        };

        // Store user profile and token in localStorage
        localStorage.setItem('userProfile', JSON.stringify(userProfile));
        localStorage.setItem('token', token);
        
        // Clear the registration email
        localStorage.removeItem('registrationEmail');

        console.log('Stored user profile:', userProfile);
        alert('Registration successful!');
        navigate('/Dashboard');
      } else {
        console.error('Signup failed:', response.data);
        alert(response.data.message || 'Sign up failed. Please check your details and try again.');
      }
    } catch (error) {
      console.error('Full error object:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
        alert(error.response.data.message || 'Server error. Please try again.');
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Error request:', error.request);
        alert('No response from server. Please check your internet connection.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
        alert('Error setting up request. Please try again.');
      }
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
            Create Account
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
            Complete your registration to get started
          </Typography>

          <Box
            component="form"
            sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
          >
            <TextField
              label="Full Name"
              type="text"
              fullWidth
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                }
              }}
            />
            <TextField
              label="Email Address"
              type="email"
              fullWidth
              required
              value={email}
              disabled
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
            <TextField
              label="OTP"
              type="text"
              fullWidth
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
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
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              onClick={(e) => {
                e.preventDefault();
                handleSignUp();
              }}
            >
              Create Account
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
            Already have an account?{' '}
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
    </Box>
  );
}
