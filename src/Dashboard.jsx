import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  AppBar,
  Toolbar,
  Avatar,
  CircularProgress,
  Snackbar,
  Alert,
  Grid,
  Paper,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Description,
  History,
  TrendingUp,
  Assessment,
  Edit,
  Delete,
  Refresh,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB
const ALLOWED_FILE_TYPE = "application/pdf";

const mockUserData = {
  name: "John Doe",
  email: "john.doe@example.com",
  recentActivity: [
    { id: 1, action: "Resume uploaded", date: "2024-03-20", status: "Completed" },
    { id: 2, action: "AI Analysis", date: "2024-03-20", status: "In Progress" },
    { id: 3, action: "Skills Assessment", date: "2024-03-19", status: "Completed" },
    { id: 4, action: "Job Match", date: "2024-03-18", status: "Pending" },
  ],
  stats: {
    resumesAnalyzed: 5,
    matchedJobs: 12,
    skillsIdentified: 25,
    improvementSuggestions: 8,
  }
};

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [uploadDetails, setUploadDetails] = useState({
    resume: null,
    jobDescription: null
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [userProfile, setUserProfile] = useState(null);
  const fileInputRef = useRef(null);
  const jobDescInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedProfile = localStorage.getItem("userProfile");

    if (!token || !storedProfile) {
      navigate("/Login");
      return;
    }

    try {
      const profile = JSON.parse(storedProfile);
      setUserProfile(profile);
    } catch (error) {
      console.error("Error parsing user profile:", error);
      navigate("/Login");
    }

    setLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userProfile");
    navigate("/Login");
  };

  const updateUserActivity = (newActivity) => {
    if (userProfile) {
      const updatedProfile = {
        ...userProfile,
        recentActivity: [
          {
            id: Date.now(),
            action: newActivity,
            date: new Date().toISOString().split('T')[0],
            status: "Completed"
          },
          ...userProfile.recentActivity
        ].slice(0, 10), // Keep only last 10 activities
        stats: {
          ...userProfile.stats,
          resumesAnalyzed: userProfile.stats.resumesAnalyzed + 1
        }
      };
      setUserProfile(updatedProfile);
      localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
    }
  };

  const handleFileChange = (event, type) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      return showSnackbar("File must be less than 3MB.", "error");
    }

    if (file.type !== ALLOWED_FILE_TYPE) {
      return showSnackbar("Only PDF files are allowed.", "error");
    }

    // Show file details
    setUploadDetails(prev => ({
      ...prev,
      [type]: {
        name: file.name,
        size: (file.size / 1024).toFixed(2) + " KB",
        uploadedAt: new Date().toLocaleString(),
      }
    }));
    showSnackbar(`${type === 'resume' ? 'Resume' : 'Job Description'} selected successfully!`, "success");
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleRefresh = () => {
    setLoading(true);
    // Simulate data refresh by reloading profile from localStorage
    const storedProfile = localStorage.getItem("userProfile");
    if (storedProfile) {
      setUserProfile(JSON.parse(storedProfile));
    }
    setTimeout(() => setLoading(false), 800);
  };

  const handleUploadResume = () => {
    fileInputRef.current.click();
  };

  const handleUploadJobDescription = () => {
    jobDescInputRef.current.click();
  };

  if (loading || !userProfile) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#f5f5f5', minHeight: '100vh', pt: 8 }}>
      <Container maxWidth="lg">
        <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
          <Toolbar>
            <Avatar sx={{ mr: 2 }}>{userProfile.name.charAt(0)}</Avatar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              ATS Dashboard
            </Typography>
            <Button
              color="inherit"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>

        <Box sx={{ mb: 6, mt: 4 }}>
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <Avatar
                sx={{
                  width: 64,
                  height: 64,
                  bgcolor: '#1976d2',
                  fontSize: '2rem',
                }}
              >
                {userProfile.name.charAt(0)}
              </Avatar>
            </Grid>
            <Grid item>
              <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                Welcome back, {userProfile.name}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {userProfile.email}
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          {Object.entries(userProfile.stats).map(([key, value], index) => (
            <Grid item xs={12} sm={6} md={3} key={key}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Paper
                  elevation={2}
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    bgcolor: 'white',
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                    {value}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Recent Activity
                </Typography>
                <IconButton onClick={handleRefresh} disabled={loading}>
                  {loading ? <CircularProgress size={24} /> : <Refresh />}
                </IconButton>
              </Box>
              <List>
                {userProfile.recentActivity.length > 0 ? (
                  userProfile.recentActivity.map((activity, index) => (
                    <React.Fragment key={activity.id}>
                      <ListItem
                        secondaryAction={
                          <>
                            <IconButton edge="end" aria-label="edit">
                              <Edit />
                            </IconButton>
                            <IconButton edge="end" aria-label="delete">
                              <Delete />
                            </IconButton>
                          </>
                        }
                      >
                        <ListItemIcon>
                          <History />
                        </ListItemIcon>
                        <ListItemText
                          primary={activity.action}
                          secondary={
                            <>
                              <Typography component="span" variant="body2" color="text.primary">
                                {activity.date}
                              </Typography>
                              {" — "}
                              <Typography
                                component="span"
                                variant="body2"
                                color={
                                  activity.status === "Completed"
                                    ? "success.main"
                                    : activity.status === "In Progress"
                                    ? "info.main"
                                    : "warning.main"
                                }
                              >
                                {activity.status}
                              </Typography>
                            </>
                          }
                        />
                      </ListItem>
                      {index < userProfile.recentActivity.length - 1 && <Divider />}
                    </React.Fragment>
                  ))
                ) : (
                  <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 3 }}>
                    No activity yet. Start by uploading a resume!
                  </Typography>
                )}
              </List>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Quick Actions
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                    onClick={handleUploadResume}
                    sx={{ py: 1.5 }}
                  >
                    Upload New Resume
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<Description />}
                    onClick={handleUploadJobDescription}
                    sx={{ py: 1.5 }}
                  >
                    Upload Job Description
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Assessment />}
                    sx={{ py: 1.5 }}
                  >
                    Run Analysis
                  </Button>
                </Grid>
              </Grid>

              {(uploadDetails.resume || uploadDetails.jobDescription) && (
                <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {uploadDetails.resume && (
                    <Box
                      sx={{
                        backgroundColor: "#e3f2fd",
                        borderRadius: "10px",
                        p: 2,
                        textAlign: "left",
                      }}
                    >
                      <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1 }}>
                        Resume Details:
                      </Typography>
                      <Typography variant="body2">📄 {uploadDetails.resume.name}</Typography>
                      <Typography variant="body2">📏 {uploadDetails.resume.size}</Typography>
                      <Typography variant="body2">⏱ {uploadDetails.resume.uploadedAt}</Typography>
                    </Box>
                  )}
                  {uploadDetails.jobDescription && (
                    <Box
                      sx={{
                        backgroundColor: "#e8f5e9",
                        borderRadius: "10px",
                        p: 2,
                        textAlign: "left",
                      }}
                    >
                      <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1 }}>
                        Job Description Details:
                      </Typography>
                      <Typography variant="body2">📄 {uploadDetails.jobDescription.name}</Typography>
                      <Typography variant="body2">📏 {uploadDetails.jobDescription.size}</Typography>
                      <Typography variant="body2">⏱ {uploadDetails.jobDescription.uploadedAt}</Typography>
                    </Box>
                  )}
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>

        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={(e) => handleFileChange(e, 'resume')}
          accept=".pdf"
        />
        <input
          type="file"
          ref={jobDescInputRef}
          style={{ display: "none" }}
          onChange={(e) => handleFileChange(e, 'jobDescription')}
          accept=".pdf"
        />

        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}
