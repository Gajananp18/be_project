import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Description,
  CloudUpload,
  Assessment,
  Psychology,
  Speed,
  Security,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <Description sx={{ fontSize: 40, color: '#1976d2' }} />,
    title: 'Resume Parsing',
    description: 'Advanced NLP algorithms to extract and analyze key information from your resume, including skills, experience, and education.',
  },
  {
    icon: <CloudUpload sx={{ fontSize: 40, color: '#1976d2' }} />,
    title: 'Easy Upload',
    description: 'Simple drag-and-drop interface for uploading resumes and job descriptions in PDF format.',
  },
  {
    icon: <Assessment sx={{ fontSize: 40, color: '#1976d2' }} />,
    title: 'Job Matching',
    description: 'Intelligent matching system that compares your resume against job descriptions to find the best opportunities.',
  },
  {
    icon: <Psychology sx={{ fontSize: 40, color: '#1976d2' }} />,
    title: 'AI-Powered Analysis',
    description: 'Deep learning models analyze your resume and provide personalized suggestions for improvement.',
  },
  {
    icon: <Speed sx={{ fontSize: 40, color: '#1976d2' }} />,
    title: 'Real-time Processing',
    description: 'Instant analysis and feedback on your resume and job matches.',
  },
  {
    icon: <Security sx={{ fontSize: 40, color: '#1976d2' }} />,
    title: 'Secure & Private',
    description: 'Your data is encrypted and stored securely. We never share your information with third parties.',
  },
];

export default function Features() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        pt: { xs: 8, sm: 10 },
        pb: { xs: 8, sm: 10 },
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h2"
            align="center"
            sx={{
              fontWeight: 700,
              color: '#1a237e',
              mb: 2,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            }}
          >
            Powerful Features
          </Typography>
          <Typography
            variant="h5"
            align="center"
            sx={{
              color: '#455a64',
              mb: 8,
              fontSize: { xs: '1rem', sm: '1.2rem' },
              maxWidth: '800px',
              mx: 'auto',
            }}
          >
            Discover how our AI-powered platform can help you optimize your resume and find your dream job
          </Typography>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 4,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      borderRadius: '16px',
                      background: 'rgba(255, 255, 255, 0.9)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
                      transition: 'transform 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                      },
                    }}
                  >
                    <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 600,
                        color: '#1a237e',
                        mb: 2,
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: '#455a64',
                        lineHeight: 1.6,
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
} 