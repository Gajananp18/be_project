import React, { useState } from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import { motion } from 'framer-motion';

export default function UploaderPage() {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState(null);

  const handleFileChange = (event, setFile) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  const handleCompare = () => {
    if (resume && jobDescription) {
      alert('Comparing Résumé and Job Description...');
    } else {
      alert('Please upload both files before comparing.');
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
            p: 4,
            borderRadius: '16px',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: 'bold', color: '#ff6e5c', marginBottom: '20px' }}
          >
            Upload Files
          </Typography>
          
          <input
            type="file"
            id="resume-upload"
            style={{ display: 'none' }}
            onChange={(e) => handleFileChange(e, setResume)}
          />
          <label htmlFor="resume-upload">
            <Button
              variant="contained"
              component="span"
              sx={{
                backgroundColor: '#ff6e5c',
                color: '#fff',
                fontWeight: 'bold',
                marginBottom: '15px',
                '&:hover': { backgroundColor: '#ff7eb3' },
              }}
              fullWidth
            >
              Upload Résumé
            </Button>
          </label>
          {resume && <Typography variant="body2">Selected: {resume.name}</Typography>}

          <input
            type="file"
            id="jobdesc-upload"
            style={{ display: 'none' }}
            onChange={(e) => handleFileChange(e, setJobDescription)}
          />
          <label htmlFor="jobdesc-upload">
            <Button
              variant="contained"
              component="span"
              sx={{
                backgroundColor: '#ff6e5c',
                color: '#fff',
                fontWeight: 'bold',
                marginTop: '20px',
                '&:hover': { backgroundColor: '#ff7eb3' },
              }}
              fullWidth
            >
              Upload Job Description
            </Button>
          </label>
          {jobDescription && <Typography variant="body2">Selected: {jobDescription.name}</Typography>}

          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: '#ff6e5c',
              color: '#fff',
              fontWeight: 'bold',
              marginTop: '30px',
              '&:hover': { backgroundColor: '#ff7eb3' },
            }}
            fullWidth
            onClick={handleCompare}
          >
            Show Results
          </Button>
        </Paper>
      </motion.div>
    </Box>
  );
}
