"use client";
import {
  Box,
  Container,
  Typography,
  Paper,
  Chip,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useState, useEffect } from "react";
import {
  Analytics,
  Speed,
  Security,
  Description,
  Notifications,
  Search,
  Psychology,
} from "@mui/icons-material";

const features = [
  {
    title: "AI-Powered Legal Analysis",
    description:
      "Advanced machine learning algorithms analyze complex legal documents with unprecedented accuracy and speed.",
    icon: <Analytics />,
    color: "#ff4444",
  },
  {
    title: "Lightning-Fast Document Review",
    description:
      "Process hundreds of pages in seconds, not hours. Transform your document review workflow.",
    icon: <Speed />,
    color: "#ff6b6b",
  },
  {
    title: "Smart Risk Assessment",
    description:
      "Identify potential legal risks before they become problems using predictive analytics.",
    icon: <Security />,
    color: "#4ecdc4",
  },
  {
    title: "Contract Intelligence Engine",
    description:
      "Extract key terms and clauses with precision accuracy across any contract type.",
    icon: <Description />,
    color: "#45b7d1",
  },
  {
    title: "Real-Time Compliance Monitoring",
    description:
      "Stay ahead of regulatory changes and requirements with automated monitoring.",
    icon: <Notifications />,
    color: "#96ceb4",
  },
  {
    title: "Case Precedent Discovery",
    description:
      "Find relevant case law and precedents instantly from our comprehensive database.",
    icon: <Search />,
    color: "#feca57",
  },
  {
    title: "Intelligent Legal Research",
    description:
      "Research complex legal topics with AI assistance and get instant insights.",
    icon: <Psychology />,
    color: "#ff9ff3",
  },
];

export default function FeaturesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const itemsPerView = isMobile ? 1 : 3;

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev >= features.length - itemsPerView ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, itemsPerView]);

  const goToNext = () => {
    setCurrentIndex((prev) =>
      prev >= features.length - itemsPerView ? 0 : prev + 1
    );
  };

  const goToPrev = () => {
    setCurrentIndex((prev) =>
      prev <= 0 ? features.length - itemsPerView : prev - 1
    );
  };

  const visibleFeatures = [];
  for (let i = 0; i < itemsPerView; i++) {
    const index = (currentIndex + i) % features.length;
    visibleFeatures.push(features[index]);
  }

  return (
    <Box
      id="features"
      sx={{
        py: 12,
        backgroundColor: "#f8fafc",
        position: "relative",
        overflow: "hidden", // Changed from "visible" to "hidden"
      }}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <Container maxWidth="lg">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h2"
            align="center"
            sx={{ mb: 2, color: "secondary.main" }}
          >
            Building Legal Solutions
          </Typography>
          <Typography
            variant="h3"
            align="center"
            sx={{ mb: 8, color: "primary.main", fontWeight: 600 }}
          >
            with Purpose
          </Typography>
        </motion.div>

        {/* Carousel Container - Fixed layout */}
        <Box 
          sx={{ 
            position: "relative", 
            overflow: "hidden", // Ensure no overflow
            mx: { xs: 0, md: 6 }, // Add horizontal margin for arrow space
            px: { xs: 2, md: 0 }, // Add padding on mobile
          }}
        >
          {/* Navigation Arrows - Better positioning */}
          <IconButton
            aria-label="Previous features"
            onClick={goToPrev}
            sx={{
              position: "absolute",
              left: { xs: 8, md: -48 }, // Responsive positioning
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 2,
              backgroundColor: "white",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              width: { xs: 40, md: 48 },
              height: { xs: 40, md: 48 },
              "&:hover": {
                backgroundColor: "primary.main",
                color: "white",
                transform: "translateY(-50%) scale(1.05)",
              },
              transition: "all 0.3s ease",
            }}
          >
            <ArrowBackIos sx={{ fontSize: { xs: 16, md: 20 } }} />
          </IconButton>
          
          <IconButton
            aria-label="Next features"
            onClick={goToNext}
            sx={{
              position: "absolute",
              right: { xs: 8, md: -48 }, // Responsive positioning
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 2,
              backgroundColor: "white",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              width: { xs: 40, md: 48 },
              height: { xs: 40, md: 48 },
              "&:hover": {
                backgroundColor: "primary.main",
                color: "white",
                transform: "translateY(-50%) scale(1.05)",
              },
              transition: "all 0.3s ease",
            }}
          >
            <ArrowForwardIos sx={{ fontSize: { xs: 16, md: 20 } }} />
          </IconButton>

          {/* Features Display - Fixed container */}
          <Box
            sx={{
              display: "flex",
              gap: { xs: 2, md: 3 },
              justifyContent: "center",
              minHeight: { xs: 320, md: 300 }, // Fixed minimum height
              overflow: "hidden",
              px: { xs: 6, md: 0 }, // Padding for arrows on mobile
            }}
          >
            <AnimatePresence mode="wait">
              {visibleFeatures.map((feature, index) => (
                <motion.div
                  key={`${currentIndex}-${index}`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: index * 0.05,
                    ease: "easeInOut" 
                  }}
                  style={{ 
                    flex: isMobile ? "0 0 100%" : "0 0 calc(33.333% - 16px)",
                    minWidth: isMobile ? "100%" : "300px",
                    maxWidth: isMobile ? "100%" : "350px",
                  }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: { xs: 3, md: 4 },
                      height: "100%",
                      borderRadius: 4,
                      position: "relative",
                      background: `linear-gradient(135deg, ${feature.color}15 0%, ${feature.color}05 100%)`,
                      border: `2px solid ${feature.color}10`,
                      cursor: "pointer",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      boxShadow: "0 4px 20px 0 rgba(0,0,0,0.08)",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: `0 12px 32px ${feature.color}33`,
                        border: `2px solid ${feature.color}30`,
                      },
                    }}
                  >
                    {/* Background Pattern */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: -30,
                        right: -30,
                        width: 100,
                        height: 100,
                        backgroundColor: feature.color,
                        borderRadius: "50%",
                        opacity: 0.05,
                      }}
                    />

                    {/* Content */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 3,
                      }}
                    >
                      <Box
                        sx={{
                          backgroundColor: feature.color,
                          color: "white",
                          p: 1.5,
                          borderRadius: 3,
                          mr: 2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {feature.icon}
                      </Box>
                      <Chip
                        label={`0${
                          ((currentIndex + index) % features.length) + 1
                        }`}
                        size="small"
                        sx={{
                          backgroundColor: feature.color,
                          color: "white",
                          fontWeight: 600,
                          fontSize: "0.75rem",
                        }}
                      />
                    </Box>

                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ 
                        fontWeight: 600, 
                        mb: 2,
                        fontSize: { xs: "1.1rem", md: "1.25rem" }
                      }}
                    >
                      {feature.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ 
                        lineHeight: 1.6,
                        fontSize: { xs: "0.875rem", md: "0.875rem" }
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </Paper>
                </motion.div>
              ))}
            </AnimatePresence>
          </Box>

          {/* Carousel Indicators */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 4,
              gap: 1,
            }}
          >
            {Array.from({ length: features.length - itemsPerView + 1 }).map(
              (_, index) => (
                <Box
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    backgroundColor:
                      currentIndex === index ? "primary.main" : "grey.300",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.2)",
                      backgroundColor: currentIndex === index ? "primary.main" : "primary.light",
                    },
                  }}
                />
              )
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
