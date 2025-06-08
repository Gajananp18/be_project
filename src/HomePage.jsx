import React from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  CssBaseline,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import BusinessIcon from "@mui/icons-material/Business";
import SecurityIcon from "@mui/icons-material/Security";
import SpeedIcon from "@mui/icons-material/Speed";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";

function NavBar({ handleDrawerToggle }) {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Toolbar>
        <IconButton
          color="primary"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography 
          variant="h5" 
          sx={{ 
            flexGrow: 1, 
            fontWeight: 700,
            background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "0.5px"
          }}
        >
          NLP Driven Automation in Resume Parsing
        </Typography>
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          {["Home", "About", "Features"].map((item) => (
            <Button
              key={item}
              sx={{
                mx: 1,
                color: "#1976d2",
                fontWeight: 500,
                fontSize: "1rem",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "rgba(25, 118, 210, 0.08)",
                },
              }}
              onClick={() =>
                navigate(`/${item === "About" ? "AboutUs" : item.toLowerCase()}`)
              }
            >
              {item}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

function HomePage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const features = [
    {
      icon: <BusinessIcon sx={{ fontSize: 40, color: "#2196F3" }} />,
      title: "Enterprise-Grade Analysis",
      desc: "Leverage advanced AI algorithms for comprehensive resume analysis and optimization.",
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40, color: "#2196F3" }} />,
      title: "Secure & Confidential",
      desc: "Your data is protected with enterprise-level security and encryption protocols.",
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 40, color: "#2196F3" }} />,
      title: "Real-Time Processing",
      desc: "Get instant feedback and suggestions to improve your resume effectiveness.",
    },
    {
      icon: <AutoGraphIcon sx={{ fontSize: 40, color: "#2196F3" }} />,
      title: "Market Intelligence",
      desc: "Access data-driven insights about industry trends and job market demands.",
    },
  ];

  return (
    <Box sx={{ bgcolor: "#FFFFFF" }}>
      <CssBaseline />
      <NavBar handleDrawerToggle={() => {}} />

      {/* Hero Section */}
      <Box
        sx={{
          pt: { xs: 10, sm: 15 },
          pb: { xs: 8, sm: 12 },
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography
                  variant={isMobile ? "h3" : "h2"}
                  sx={{
                    fontWeight: 800,
                    color: "#1a237e",
                    mb: 3,
                    lineHeight: 1.2,
                  }}
                >
                  Transform Your Career with AI-Powered Resume Intelligence
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#455a64",
                    mb: 4,
                    lineHeight: 1.6,
                    fontWeight: 400,
                  }}
                >
                  Leverage cutting-edge AI technology to optimize your resume, unlock opportunities, and accelerate your professional growth.
                </Typography>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate("/SendOtpPage")}
                    sx={{
                      backgroundColor: "#1976d2",
                      color: "#fff",
                      fontWeight: 600,
                      textTransform: "none",
                      borderRadius: "8px",
                      px: 4,
                      py: 1.5,
                      fontSize: "1.1rem",
                      boxShadow: "0 4px 20px rgba(25, 118, 210, 0.3)",
                      mr: 2,
                      "&:hover": {
                        backgroundColor: "#1565c0",
                        boxShadow: "0 6px 25px rgba(25, 118, 210, 0.4)",
                      },
                    }}
                  >
                    Start Your Journey
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => navigate("/login")}
                    sx={{
                      color: "#1976d2",
                      fontWeight: 600,
                      textTransform: "none",
                      borderRadius: "8px",
                      px: 4,
                      py: 1.5,
                      fontSize: "1.1rem",
                      borderColor: "#1976d2",
                      "&:hover": {
                        borderColor: "#1565c0",
                        backgroundColor: "rgba(25, 118, 210, 0.04)",
                      },
                    }}
                  >
                    Login
                  </Button>
                </motion.div>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
                  alt="Professional workspace"
                  sx={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "12px",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                  }}
                />
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: { xs: 8, sm: 12 } }}>
        <Typography
          variant="h3"
          align="center"
          sx={{
            fontWeight: 700,
            color: "#1a237e",
            mb: 6,
          }}
        >
          Enterprise Solutions
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "12px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                    },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, textAlign: "center", p: 3 }}>
                    {feature.icon}
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: "#1a237e",
                        mt: 2,
                        mb: 1,
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography sx={{ color: "#455a64" }}>
                      {feature.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Call to Action Section */}
      <Box
        sx={{
          py: { xs: 8, sm: 12 },
          background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mb: 3,
            }}
          >
            Ready to Elevate Your Career?
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: 4,
              opacity: 0.9,
              fontWeight: 400,
            }}
          >
            Join thousands of professionals who trust our AI-powered platform for career advancement
          </Typography>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/SendOtpPage")}
              sx={{
                backgroundColor: "#fff",
                color: "#1976d2",
                fontWeight: 600,
                textTransform: "none",
                borderRadius: "8px",
                px: 6,
                py: 2,
                fontSize: "1.1rem",
                mr: 2,
                boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                  boxShadow: "0 6px 25px rgba(0,0,0,0.3)",
                },
              }}
            >
              Start Your Journey
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate("/login")}
              sx={{
                backgroundColor: "transparent",
                color: "#fff",
                fontWeight: 600,
                textTransform: "none",
                borderRadius: "8px",
                px: 6,
                py: 2,
                fontSize: "1.1rem",
                borderColor: "#fff",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderColor: "#fff",
                },
              }}
            >
              Login
            </Button>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
}

export default HomePage;
