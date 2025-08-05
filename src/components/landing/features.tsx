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
  Gavel,
} from "@mui/icons-material";

const features = [
  {
    title: "AI-Powered Legal Analysis",
    description:
      "Advanced machine learning algorithms analyze complex legal documents with unprecedented accuracy and speed, identifying key clauses and potential issues.",
    icon: <Analytics />,
    color: "#ff4444",
    stats: "99.7% Accuracy",
  },
  {
    title: "Lightning-Fast Document Review",
    description:
      "Process hundreds of pages in seconds, not hours. Transform your document review workflow with intelligent automation and smart categorization.",
    icon: <Speed />,
    color: "#ff6b6b",
    stats: "500x Faster",
  },
  {
    title: "Smart Risk Assessment",
    description:
      "Identify potential legal risks before they become problems using predictive analytics and comprehensive risk scoring algorithms.",
    icon: <Security />,
    color: "#4ecdc4",
    stats: "95% Risk Detection",
  },
  {
    title: "Contract Intelligence Engine",
    description:
      "Extract key terms, clauses, and obligations with precision accuracy across any contract type, from NDAs to complex commercial agreements.",
    icon: <Description />,
    color: "#45b7d1",
    stats: "50+ Contract Types",
  },
  {
    title: "Real-Time Compliance Monitoring",
    description:
      "Stay ahead of regulatory changes and requirements with automated monitoring across multiple jurisdictions and practice areas.",
    icon: <Notifications />,
    color: "#96ceb4",
    stats: "24/7 Monitoring",
  },
  {
    title: "Case Precedent Discovery",
    description:
      "Find relevant case law and precedents instantly from our comprehensive database of over 10 million legal documents and court decisions.",
    icon: <Search />,
    color: "#feca57",
    stats: "10M+ Cases",
  },
  {
    title: "Intelligent Legal Research",
    description:
      "Research complex legal topics with AI assistance and get instant insights, citations, and analysis tailored to your specific practice area.",
    icon: <Psychology />,
    color: "#ff9ff3",
    stats: "Instant Results",
  },
  {
    title: "Litigation Support Suite",
    description:
      "Comprehensive litigation support with document discovery, case timeline analysis, and strategic insights powered by advanced AI algorithms.",
    icon: <Gavel />,
    color: "#a8e6cf",
    stats: "Complete Suite",
  },
];

export default function FeaturesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));
  const itemsPerView = isMobile ? 1 : isTablet ? 2 : 3;

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev >= features.length - itemsPerView ? 0 : prev + 1
      );
    }, 5000);

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
        py: { xs: 8, md: 12 },
        backgroundColor: "#f8fafc",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <Container maxWidth="lg">
        {/* Enhanced Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography
              variant="overline"
              sx={{
                color: "primary.main",
                fontWeight: 600,
                letterSpacing: 2,
                mb: 2,
                display: "block",
              }}
            >
              POWERFUL FEATURES
            </Typography>
            <Typography
              variant="h2"
              sx={{
                mb: 2,
                color: "secondary.main",
                fontSize: { xs: "2rem", md: "2.5rem" },
              }}
            >
              Advanced Legal Intelligence
            </Typography>
            <Typography
              variant="h3"
              sx={{
                mb: 4,
                color: "primary.main",
                fontWeight: 600,
                fontSize: { xs: "1.5rem", md: "1.875rem" },
              }}
            >
              Built for Modern Legal Practice
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                maxWidth: 600,
                mx: "auto",
                fontSize: { xs: "1rem", md: "1.125rem" },
              }}
            >
              Discover how our AI-powered platform transforms legal workflows
              with cutting-edge technology and intelligent automation.
            </Typography>
          </Box>
        </motion.div>

        {/* Enhanced Carousel Container */}
        <Box
          sx={{
            position: "relative",
            mx: { xs: 0, md: 6 },
            px: { xs: 2, md: 0 },
          }}
        >
          {/* Enhanced Navigation Arrows */}
          <IconButton
            aria-label="Previous features"
            onClick={goToPrev}
            sx={{
              position: "absolute",
              left: { xs: 8, md: -48 },
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 2,
              backgroundColor: "white",
              boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
              width: { xs: 44, md: 52 },
              height: { xs: 44, md: 52 },
              border: "2px solid",
              borderColor: "primary.main",
              "&:hover": {
                backgroundColor: "primary.main",
                color: "white",
                transform: "translateY(-50%) scale(1.1)",
                boxShadow: "0 12px 40px rgba(255,68,68,0.3)",
              },
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <ArrowBackIos sx={{ fontSize: { xs: 18, md: 22 } }} />
          </IconButton>

          <IconButton
            aria-label="Next features"
            onClick={goToNext}
            sx={{
              position: "absolute",
              right: { xs: 8, md: -48 },
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 2,
              backgroundColor: "white",
              boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
              width: { xs: 44, md: 52 },
              height: { xs: 44, md: 52 },
              border: "2px solid",
              borderColor: "primary.main",
              "&:hover": {
                backgroundColor: "primary.main",
                color: "white",
                transform: "translateY(-50%) scale(1.1)",
                boxShadow: "0 12px 40px rgba(255,68,68,0.3)",
              },
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <ArrowForwardIos sx={{ fontSize: { xs: 18, md: 22 } }} />
          </IconButton>

          {/* Enhanced Features Display */}
          <Box
            sx={{
              display: "flex",
              gap: { xs: 2, md: 3 },
              justifyContent: "center",
              minHeight: { xs: 420, md: 380 },
              overflow: "visible",
              px: { xs: 6, md: 0 },
            }}
          >
            <AnimatePresence mode="wait">
              {visibleFeatures.map((feature, index) => (
                <motion.div
                  key={`${currentIndex}-${index}`}
                  initial={{ opacity: 0, x: 50, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -50, scale: 0.9 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: "easeInOut",
                  }}
                  style={{
                    flex: isMobile
                      ? "0 0 100%"
                      : isTablet
                      ? "0 0 calc(50% - 12px)"
                      : "0 0 calc(33.333% - 16px)",
                    minWidth: isMobile ? "100%" : isTablet ? "280px" : "300px",
                    maxWidth: isMobile ? "100%" : isTablet ? "320px" : "350px",
                  }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: { xs: 3, md: 4 },
                      height: "100%",
                      borderRadius: 4,
                      position: "relative",
                      background: `linear-gradient(135deg, ${feature.color}08 0%, ${feature.color}03 100%)`,
                      border: `2px solid ${feature.color}15`,
                      cursor: "pointer",
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                      "&:hover": {
                        transform: "translateY(-8px) scale(1.02)",
                        boxShadow: `0 20px 60px ${feature.color}25`,
                        border: `2px solid ${feature.color}40`,
                        background: `linear-gradient(135deg, ${feature.color}12 0%, ${feature.color}06 100%)`,
                      },
                    }}
                  >
                    {/* Enhanced Background Pattern */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: -40,
                        right: -40,
                        width: 120,
                        height: 120,
                        backgroundColor: feature.color,
                        borderRadius: "50%",
                        opacity: 0.04,
                        filter: "blur(20px)",
                      }}
                    />

                    {/* Enhanced Header */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 3,
                      }}
                    >
                      <Box
                        sx={{
                          backgroundColor: feature.color,
                          color: "white",
                          p: 2,
                          borderRadius: 3,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: `0 4px 16px ${feature.color}30`,
                        }}
                      >
                        {feature.icon}
                      </Box>
                      <Chip
                        label={feature.stats}
                        size="small"
                        sx={{
                          backgroundColor: `${feature.color}15`,
                          color: feature.color,
                          fontWeight: 600,
                          fontSize: "0.75rem",
                          border: `1px solid ${feature.color}30`,
                        }}
                      />
                    </Box>

                    {/* Enhanced Content */}
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{
                        fontWeight: 700,
                        mb: 2,
                        fontSize: { xs: "1.1rem", md: "1.25rem" },
                        color: "text.primary",
                        lineHeight: 1.3,
                      }}
                    >
                      {feature.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        lineHeight: 1.7,
                        fontSize: { xs: "0.875rem", md: "0.9rem" },
                        fontWeight: 400,
                      }}
                    >
                      {feature.description}
                    </Typography>

                    {/* Feature Number Badge */}
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 16,
                        right: 16,
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        backgroundColor: `${feature.color}20`,
                        color: feature.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.875rem",
                        fontWeight: 700,
                      }}
                    >
                      {String(
                        ((currentIndex + index) % features.length) + 1
                      ).padStart(2, "0")}
                    </Box>
                  </Paper>
                </motion.div>
              ))}
            </AnimatePresence>
          </Box>

          {/* Enhanced Carousel Indicators */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 6,
              gap: 1.5,
            }}
          >
            {Array.from({ length: features.length - itemsPerView + 1 }).map(
              (_, index) => (
                <Box
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  sx={{
                    width: currentIndex === index ? 32 : 12,
                    height: 12,
                    borderRadius: 6,
                    backgroundColor:
                      currentIndex === index ? "primary.main" : "grey.300",
                    cursor: "pointer",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      transform: "scale(1.2)",
                      backgroundColor:
                        currentIndex === index
                          ? "primary.main"
                          : "primary.light",
                    },
                  }}
                />
              )
            )}
          </Box>
        </Box>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Box sx={{ textAlign: "center", mt: 8 }}>
            <Typography variant="body1" sx={{ color: "text.secondary", mb: 3 }}>
              Ready to transform your legal practice?
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background:
                    "linear-gradient(135deg, #ff4444 0%, #ff6b6b 100%)",
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                  padding: "12px 32px",
                  fontSize: "1rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  boxShadow: "0 8px 32px rgba(255,68,68,0.3)",
                }}
              >
                Start Free Trial
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: "transparent",
                  color: "#ff4444",
                  border: "2px solid #ff4444",
                  borderRadius: "12px",
                  padding: "10px 32px",
                  fontSize: "1rem",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Learn More
              </motion.button>
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
