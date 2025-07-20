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

        {/* Carousel Container */}
        <Box sx={{ position: "relative", overflow: "hidden" }}>
          {/* Navigation Arrows */}
          <IconButton
            aria-label="Previous features"
            onClick={goToPrev}
            sx={{
              position: "absolute",
              left: -20,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 2,
              backgroundColor: "white",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              "&:hover": {
                backgroundColor: "primary.main",
                color: "white",
                transform: "translateY(-50%) scale(1.1)",
              },
              transition: "all 0.3s ease",
            }}
          >
            <ArrowBackIos />
          </IconButton>

          <IconButton
            aria-label="Next features"
            onClick={goToNext}
            sx={{
              position: "absolute",
              right: -20,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 2,
              backgroundColor: "white",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              "&:hover": {
                backgroundColor: "primary.main",
                color: "white",
                transform: "translateY(-50%) scale(1.1)",
              },
              transition: "all 0.3s ease",
            }}
          >
            <ArrowForwardIos />
          </IconButton>
          {/* Features Display */}
          <Box
            sx={{
              display: "flex",
              gap: 3,
              justifyContent: "center",
              minHeight: 300,
            }}
          >
            <AnimatePresence mode="wait">
              {visibleFeatures.map((feature, index) => (
                <motion.div
                  key={`${currentIndex}-${index}`}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  style={{ flex: 1, maxWidth: isMobile ? "100%" : "350px" }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 4,
                      height: "100%",
                      borderRadius: 4,
                      position: "relative",
                      overflow: "hidden",
                      background: `linear-gradient(135deg, ${feature.color}15 0%, ${feature.color}05 100%)`,
                      border: `2px solid ${feature.color}20`,
                      cursor: "pointer",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: `0 20px 40px ${feature.color}30`,
                        border: `2px solid ${feature.color}`,
                      },
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  >
                    {/* Background Pattern */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: -50,
                        right: -50,
                        width: 150,
                        height: 150,
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
                        }}
                      />
                    </Box>

                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ fontWeight: 600, mb: 2 }}
                    >
                      {feature.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ lineHeight: 1.6 }}
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
