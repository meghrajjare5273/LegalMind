"use client";

import {
  Box,
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { motion, useAnimation } from "framer-motion";
import { useRef, useEffect, useState } from "react";

type Solutions = {
  title: string;
  description: string;
  image: string | null;
  category: string;
};

const solutions: Solutions[] = [
  {
    title: "Contract Analysis Suite",
    description: "Comprehensive contract review and risk assessment",
    category: "Contract Management",
    image: null,
  },
  {
    title: "Litigation Support Platform",
    description: "AI-powered case research and document discovery",
    category: "Litigation",
    image: null,
  },
  {
    title: "Compliance Dashboard",
    description: "Real-time regulatory monitoring and alerts",
    category: "Compliance",
    image: null,
  },
  {
    title: "Legal Research Engine",
    description: "Instant access to case law and precedents",
    category: "Research",
    image: null,
  },
  {
    title: "Document Automation",
    description: "Streamlined document creation and management",
    category: "Automation",
    image: null,
  },
];

export default function SolutionsCarousel() {
  const [isDragging, setIsDragging] = useState(false);
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  // Auto-scroll functionality
  useEffect(() => {
    if (isDragging) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % solutions.length;
        return nextIndex;
      });
    }, 4000); // Auto-scroll every 4 seconds

    return () => clearInterval(interval);
  }, [isDragging]);

  // Update constraints and handle auto-scroll animation
  useEffect(() => {
    const updateConstraints = () => {
      if (constraintsRef.current && carouselRef.current) {
        const containerWidth = constraintsRef.current.offsetWidth;
        const cardWidth = 350; // Fixed card width
        const gap = 24;
        const totalWidth = solutions.length * (cardWidth + gap);
        const difference = totalWidth - containerWidth;

        setDragConstraints({
          left: -Math.max(0, difference),
          right: 0,
        });
      }
    };

    updateConstraints();
    window.addEventListener("resize", updateConstraints);
    return () => window.removeEventListener("resize", updateConstraints);
  }, []);

  // Animate to current index
  useEffect(() => {
    if (!isDragging && constraintsRef.current) {
      const containerWidth = constraintsRef.current.offsetWidth;
      const cardWidth = 350;
      const gap = 24;
      const offset = currentIndex * (cardWidth + gap);
      const maxOffset = Math.max(
        0,
        solutions.length * (cardWidth + gap) - containerWidth
      );
      const clampedOffset = Math.min(offset, maxOffset);

      controls.start({
        x: -clampedOffset,
        transition: { duration: 0.8, ease: "easeInOut" },
      });
    }
  }, [currentIndex, isDragging, controls]);

  return (
    <Box
      id="solutions"
      sx={{
        py: 12,
        backgroundColor: "secondary.main",
        color: "white",
        overflow: "hidden", // Hide horizontal overflow at the section level
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Typography variant="h2" align="center" gutterBottom sx={{ mb: 2 }}>
            Crafting Legal Stories
          </Typography>
          <Typography
            variant="body1"
            align="center"
            sx={{ mb: 8, opacity: 0.8, maxWidth: 600, mx: "auto" }}
          >
            Explore our comprehensive suite of AI-powered legal solutions
            designed to transform your practice.
          </Typography>
        </motion.div>

        {/* Carousel Container with proper overflow handling */}
        <Box
          sx={{
            position: "relative",
            mx: -2, // Negative margin to allow cards to extend slightly
            px: 2, // Padding to prevent content from touching edges
          }}
        >
          <Box
            ref={constraintsRef}
            sx={{
              overflow: "hidden",
              cursor: isDragging ? "grabbing" : "grab",
              width: "100%",
              position: "relative",
              // Add padding to prevent shadow clipping
              py: 2,
            }}
          >
            <motion.div
              ref={carouselRef}
              drag="x"
              dragConstraints={dragConstraints}
              dragElastic={0.1}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={() => setIsDragging(false)}
              animate={controls}
              style={{
                display: "flex",
                gap: "24px",
                paddingLeft: "20px",
                paddingRight: "20px",
                width: "max-content",
              }}
              whileTap={{ cursor: "grabbing" }}
            >
              {solutions.map((solution, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  style={{
                    minWidth: "350px",
                    maxWidth: "350px",
                    flex: "none",
                  }}
                >
                  <Card
                    sx={{
                      backgroundColor: "rgba(255,255,255,0.05)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: 4,
                      overflow: "hidden", // Prevent content overflow
                      // Consistent shadow for all cards
                      boxShadow:
                        "0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(255,68,68,0.08)",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        // Enhanced shadow on hover
                        boxShadow:
                          "0 16px 48px rgba(0,0,0,0.16), 0 4px 16px rgba(255,68,68,0.12)",
                      },
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      "@media (prefers-reduced-motion: reduce)": {
                        transition: "none",
                        "&:hover": {
                          transform: "none",
                        },
                      },
                      cursor: "pointer",
                      height: "100%", // Ensure consistent card heights
                    }}
                  >
                    {/* Placeholder for image */}
                    {solution.image ? (
                      <CardMedia
                        component="img"
                        image={solution.image}
                        alt={solution.title}
                        sx={{
                          height: 200,
                          width: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <Box
                        sx={{
                          height: 200,
                          background: `linear-gradient(135deg, #ff4444${Math.floor(
                            30 + index * 10
                          )
                            .toString(16)
                            .padStart(2, "0")} 0%, #ff6b6b${Math.floor(
                            20 + index * 8
                          )
                            .toString(16)
                            .padStart(2, "0")} 100%)`,
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Box
                          sx={{
                            position: "absolute",
                            top: 16,
                            left: 16,
                            background: "rgba(255, 243, 205, 0.95)",
                            color: "#ff4444",
                            fontWeight: 600,
                            borderRadius: 2,
                            px: 1.5,
                            py: 0.5,
                            letterSpacing: 0.5,
                            fontSize: 12,
                            backdropFilter: "blur(4px)",
                          }}
                        >
                          {solution.category}
                        </Box>
                        <Typography
                          role="img"
                          aria-label={`${solution.category} category illustration`}
                          variant="h6"
                          sx={{
                            color: "white",
                            fontWeight: 600,
                            textAlign: "center",
                            px: 2,
                          }}
                        >
                          {solution.category}
                        </Typography>
                      </Box>
                    )}
                    <CardContent sx={{ p: 3, flexGrow: 1 }}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ color: "white", fontWeight: 600, mb: 1.5 }}
                      >
                        {solution.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "rgba(255,255,255,0.7)",
                          lineHeight: 1.6,
                        }}
                      >
                        {solution.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </Box>

          {/* Carousel indicators */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 1,
              mt: 4,
            }}
          >
            {solutions.map((_, index) => (
              <Box
                key={index}
                onClick={() => setCurrentIndex(index)}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor:
                    currentIndex === index
                      ? "rgba(255, 68, 68, 0.8)"
                      : "rgba(255, 255, 255, 0.3)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor:
                      currentIndex === index
                        ? "rgba(255, 68, 68, 1)"
                        : "rgba(255, 255, 255, 0.5)",
                  },
                }}
              />
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
