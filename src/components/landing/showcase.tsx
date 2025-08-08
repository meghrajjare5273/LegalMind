"use client";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Chip,
} from "@mui/material";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Solution = { title: string; description: string; category: string };

const SOLUTIONS: Solution[] = [
  {
    title: "Contract Analysis Suite",
    description:
      "Comprehensive review, risk extraction, obligations & redlines.",
    category: "Contract",
  },
  {
    title: "Litigation Support Platform",
    description: "AI research, discovery assistance, and case timelines.",
    category: "Litigation",
  },
  {
    title: "Compliance Dashboard",
    description: "Real-time monitoring, alerts, and audit readiness.",
    category: "Compliance",
  },
  {
    title: "Legal Research Engine",
    description: "Instant citations and precedent suggestions.",
    category: "Research",
  },
  {
    title: "Document Automation",
    description: "Generate, validate, and route docs programmatically.",
    category: "Automation",
  },
];

export default function SolutionsCarousel() {
  const [dragging, setDragging] = useState(false);
  const [constraints, setConstraints] = useState({ left: 0, right: 0 });
  const shellRef = useRef<HTMLDivElement>(null);
  const beltRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [i, setI] = useState(0);

  useEffect(() => {
    const tick = setInterval(() => {
      if (dragging) return;
      setI((p) => (p + 1) % SOLUTIONS.length);
    }, 3800);
    return () => clearInterval(tick);
  }, [dragging]);

  useEffect(() => {
    const recalc = () => {
      if (!shellRef.current) return;
      const w = shellRef.current.offsetWidth;
      const card = 360;
      const gap = 24;
      const total = SOLUTIONS.length * (card + gap);
      const diff = total - w;
      setConstraints({ left: -Math.max(0, diff), right: 0 });
    };
    recalc();
    window.addEventListener("resize", recalc);
    return () => window.removeEventListener("resize", recalc);
  }, []);

  useEffect(() => {
    if (!shellRef.current) return;
    const w = shellRef.current.offsetWidth;
    const card = 360;
    const gap = 24;
    const offset = i * (card + gap);
    const max = Math.max(0, SOLUTIONS.length * (card + gap) - w);
    controls.start({
      x: -Math.min(offset, max),
      transition: { duration: 0.7, ease: "easeInOut" },
    });
  }, [i, controls]);

  return (
    <Box
      id="solutions"
      sx={{
        py: 12,
        backgroundColor: "secondary.main",
        color: "white",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Typography variant="h2" align="center" sx={{ mb: 1 }}>
            Solutions that Scale
          </Typography>
          <Typography
            variant="body1"
            align="center"
            sx={{ opacity: 0.8, maxWidth: 680, mx: "auto", mb: 6 }}
          >
            Hand-picked modules that plug into your existing workflow for
            measurable outcomes.
          </Typography>
        </motion.div>
        <Box sx={{ position: "relative", px: 1.5 }}>
          <Box
            ref={shellRef}
            sx={{
              overflow: "hidden",
              cursor: dragging ? "grabbing" : "grab",
              width: "100%",
              py: 1,
            }}
          >
            <motion.div
              ref={beltRef}
              drag="x"
              dragConstraints={constraints}
              dragElastic={0.12}
              onDragStart={() => setDragging(true)}
              onDragEnd={() => setDragging(false)}
              animate={controls}
              whileTap={{ cursor: "grabbing" }}
              style={{
                display: "flex",
                gap: 24,
                width: "max-content",
                paddingInline: 12,
              }}
            >
              {SOLUTIONS.map((s, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.06 }}
                  style={{ minWidth: 360, maxWidth: 360, flex: "none" }}
                >
                  <Card
                    sx={{
                      height: "100%",
                      bgcolor: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.16)",
                      borderRadius: 4,
                      backdropFilter: "blur(8px)",
                      overflow: "hidden",
                      boxShadow: "0 10px 28px rgba(0,0,0,.25)",
                      transition: "transform .25s ease, box-shadow .25s ease",
                      "&:hover": {
                        transform: "translateY(-6px)",
                        boxShadow: "0 20px 48px rgba(0,0,0,.35)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        height: 180,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        background:
                          "linear-gradient(135deg, rgba(255,68,68,.25) 0%, rgba(255,107,107,.2) 100%)",
                      }}
                    >
                      <Chip
                        label={s.category}
                        size="small"
                        sx={{
                          position: "absolute",
                          top: 14,
                          left: 14,
                          bgcolor: "rgba(255,255,255,0.9)",
                          color: "secondary.main",
                          fontWeight: 700,
                        }}
                      />
                      <Typography
                        variant="h6"
                        sx={{ color: "white", fontWeight: 700 }}
                      >
                        {s.category}
                      </Typography>
                    </Box>

                    <CardContent sx={{ p: 3 }}>
                      <Typography
                        variant="h6"
                        sx={{ color: "white", fontWeight: 700, mb: 1 }}
                      >
                        {s.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "rgba(255,255,255,.8)" }}
                      >
                        {s.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </Box>

          <Box
            sx={{ display: "flex", justifyContent: "center", mt: 3, gap: 1 }}
          >
            {SOLUTIONS.map((_, dot) => (
              <Box
                key={dot}
                onClick={() => setI(dot)}
                sx={{
                  width: i === dot ? 28 : 8,
                  height: 8,
                  borderRadius: 6,
                  bgcolor:
                    i === dot
                      ? "rgba(255,68,68,0.9)"
                      : "rgba(255,255,255,0.35)",
                  cursor: "pointer",
                  transition: "all .25s ease",
                }}
              />
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
