import React from 'react';
import { Box, Typography, Paper, Avatar, Grid, Container } from '@mui/material';
import { motion } from 'framer-motion';
import gajananImage from './assets/images/gajanan_id.jpg';
import piyushImage from './assets/images/piyush_id.jpg';
import pandeImage from './assets/images/pande_id.jpg';

const teamMembers = [
  {
    name: 'Gajanan Paralkar',
    role: 'Frontend Development Lead',
    description: 'Expert in React.js and modern UI/UX architecture, specializing in building enterprise-grade web applications with a focus on performance and scalability.',
    image: gajananImage,
  },
  {
    name: 'Piyush Kulkarni',
    role: 'Backend Architecture Lead',
    description: 'Specialized in Node.js and distributed systems, with extensive experience in designing high-performance, secure API architectures and database optimization.',
    image: piyushImage,
  },
  {
    name: 'Aditya Pande',
    role: 'AI/ML Engineering Lead',
    description: 'Advanced expertise in Natural Language Processing and machine learning systems, focusing on developing innovative solutions for automated document analysis.',
    image: pandeImage,
  }
];

export default function AboutUs() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        pt: { xs: 10, sm: 15 },
        pb: { xs: 8, sm: 12 },
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              color: '#1a237e',
              textAlign: 'center',
              mb: 2,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
            }}
          >
            Leadership Team
          </Typography>
          <Typography
            variant="h6" 
            sx={{
              color: '#455a64',
              textAlign: 'center',
              mb: 8,
              maxWidth: '800px',
              mx: 'auto',
              lineHeight: 1.6,
              fontSize: { xs: '1rem', md: '1.25rem' },
            }}
          >
            Our team of industry experts combines deep technical expertise with innovative thinking
            to deliver cutting-edge solutions in resume parsing and analysis.
          </Typography>
        </motion.div>

        <Grid container spacing={4} justifyContent="center">
          {teamMembers.map((member, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    height: '100%',
                    borderRadius: '16px',
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 30px rgba(0, 0, 0, 0.1)',
                    },
                  }}
                >
                  <Box sx={{ textAlign: 'center' }}>
                    <Avatar
                      src={member.image}
                      alt={member.name}
                      sx={{
                        width: 140,
                        height: 140,
                        mx: 'auto',
                        mb: 3,
                        border: '4px solid #fff',
                        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
                      }}
                    />
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        color: '#1a237e',
                        mb: 1,
                      }}
                    >
                      {member.name}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        color: '#1976d2',
                        fontWeight: 600,
                        mb: 2,
                      }}
                    >
                      {member.role}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: '#455a64',
                        lineHeight: 1.7,
                      }}
                    >
                      {member.description}
                    </Typography>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
