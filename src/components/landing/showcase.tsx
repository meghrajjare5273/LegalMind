"use client";
import {
  Box,
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const solutions = [
  {
    title: "Contract Analysis Suite",
    description: "Comprehensive contract review and risk assessment",
    image: "/solutions/contracts.jpg",
    category: "Contract Management",
  },
  {
    title: "Litigation Support Platform",
    description: "AI-powered case research and document discovery",
    image: "/solutions/litigation.jpg",
    category: "Litigation",
  },
  {
    title: "Compliance Dashboard",
    description: "Real-time regulatory monitoring and alerts",
    image: "/solutions/compliance.jpg",
    category: "Compliance",
  },
  {
    title: "Legal Research Engine",
    description: "Instant access to case law and precedents",
    image: "/solutions/research.jpg",
    category: "Research",
  },
  {
    title: "Document Automation",
    description: "Streamlined document creation and management",
    image: "/solutions/automation.jpg",
    category: "Automation",
  },
];

export default function SolutionsCarousel() {
  const [isDragging, setIsDragging] = useState(false);
  const constraintsRef = useRef<HTMLDivElement>(null);

  return (
    <Box
      id="solutions"
      sx={{
        py: 12,
        backgroundColor: "secondary.main",
        color: "white",
        overflow: "visible",
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

        {/* Carousel Container */}
        <Box
          ref={constraintsRef}
          sx={{
            overflowX: "visible",
            overflowY: "visible",
            cursor: isDragging ? "grabbing" : "grab",
          }}
        >
          <motion.div
            drag="x"
            dragConstraints={constraintsRef}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
            style={{
              display: "flex",
              gap: "24px",
              paddingLeft: "20px",
              paddingRight: "20px",
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
                style={{ minWidth: "clamp(280px, 350px, 90vw)", flex: "none" }}
              >
                <Card
                  sx={{
                    backgroundColor: "rgba(255,255,255,0.05)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 4,
                    overflow: "visible",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 25px 50px rgba(255, 68, 68, 0.3)",
                    },
                    transition: "all 0.4s ease",
                    "@media (prefers-reduced-motion: reduce)": {
                      transition: "none",
                      "&:hover": {
                        transform: "none",
                      },
                    },
                    cursor: "pointer",
                  }}
                >
                  {/* Placeholder for image */}
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
                        background: "#fff3cd",
                        color: "#ff4444",
                        fontWeight: 600,
                        borderRadius: 2,
                        px: 1,
                        py: 0.25,
                        letterSpacing: 0.5,
                        fontSize: 12,
                      }}
                    >
                      {solution.category}
                    </Box>
                    <Typography
                      role="img"
                      aria-label={`${solution.category} category illustratiion`}
                      variant="h6"
                      sx={{ color: "white", fontWeight: 600 }}
                    >
                      {solution.category}
                    </Typography>
                  </Box>

                  <CardContent sx={{ p: 3 }}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ color: "white", fontWeight: 600 }}
                    >
                      {solution.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "rgba(255,255,255,0.7)" }}
                    >
                      {solution.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
}
