import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Box, CssBaseline, Typography, Button, Container, Grid, Card, CardContent } from "@mui/material";
import { motion } from "framer-motion";
import NavBar from "./NavBar"; // Import the updated NavBar

function HomePage() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileSize, setFileSize] = useState(null);
  const [uploadTime, setUploadTime] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file.name);
      setFileSize((file.size / 1024).toFixed(2) + " KB"); // Convert bytes to KB
      setUploadTime(new Date().toLocaleString()); // Capture current time
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <Box>
      <CssBaseline />
      <NavBar handleDrawerToggle={() => {}} />

      {/* Hero Section */}
      <Box sx={{ textAlign: "center", py: 8, backgroundColor: "#f5f5f5" }}>
        <Typography variant="h3" sx={{ fontWeight: "bold", color: "#1976d2", mb: 2 }}>
          AI-Powered Resume Optimization
        </Typography>
        <Typography variant="h6" sx={{ color: "#616161", mb: 3, px: 3 }}>
          Transform your job search with intelligent resume parsing and job role suggestions.
        </Typography>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button variant="contained" size="large" onClick={() => navigate("/Login")} sx={{ backgroundColor: "#1976d2", color: "#fff", fontWeight: "bold", textTransform: "none", borderRadius: "30px", px: 4, py: 1.5, "&:hover": { backgroundColor: "#1565c0" } }}>
            Get Started
          </Button>
        </motion.div>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" sx={{ textAlign: "center", fontWeight: "bold", mb: 4 }}>Key Features</Typography>
        <Grid container spacing={4}>
          {[
            { title: "AI-Powered Parsing", desc: "Analyze and extract key resume details with high accuracy." },
            { title: "Job Role Suggestions", desc: "Receive AI-driven recommendations for career advancement." },
            { title: "Instant Feedback", desc: "Get insights on how to improve your resume in real-time." },
          ].map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ textAlign: "center", p: 2, borderRadius: "12px", boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1976d2" }}>{feature.title}</Typography>
                  <Typography sx={{ color: "#616161", mt: 1 }}>{feature.desc}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Upload Resume Section */}
      <Box sx={{ textAlign: "center", py: 6, backgroundColor: "#1976d2", color: "#fff" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>Start Enhancing Your Resume Today</Typography>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button variant="contained" size="large" onClick={handleUploadClick} sx={{ backgroundColor: "#fff", color: "#1976d2", fontWeight: "bold", textTransform: "none", borderRadius: "30px", px: 4, py: 1.5, "&:hover": { backgroundColor: "#e3f2fd" } }}>
            Upload Resume
          </Button>
        </motion.div>

        {/* Hidden File Input */}
        <input type="file" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileChange} accept=".pdf,.doc,.docx" />

        {/* Show File Details if Selected */}
        {selectedFile && (
          <Box sx={{ mt: 2, backgroundColor: "#ffffff", color: "#1976d2", p: 2, borderRadius: "8px", display: "inline-block", boxShadow: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>📄 File Name: {selectedFile}</Typography>
            <Typography>📏 Size: {fileSize}</Typography>
            <Typography>⏱ Uploaded At: {uploadTime}</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default HomePage;
