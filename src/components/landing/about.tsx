"use client";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Button,
  IconButton,
  Chip,
} from "@mui/material";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import FiberManualRecordRoundedIcon from "@mui/icons-material/FiberManualRecordRounded";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <Box
      sx={{
        // Page band background (soft sage like the reference)
        background: "linear-gradient(180deg, #d2dfcf 0%, #c9d7c6 100%)", // subtle green band
        py: { xs: 6, md: 10 },
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, md: 4 } }}>
        {/* Soft white canvas with large radius and shadow */}
        <Box
          component={motion.section}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          sx={{
            background:
              "linear-gradient(180deg, #ffffff 0%, #fcfcfc 60%, #fafbfb 100%)", // keeps your whites but adds depth
            borderRadius: { xs: 4, md: 6 },
            boxShadow: "0 16px 50px rgba(0,0,0,0.12)",
            overflow: "hidden",
            px: { xs: 2.5, sm: 4, md: 6 },
            py: { xs: 5, md: 7 },
          }}
        >
          {/* Top headline and microcopy block */}
          <Grid container spacing={4} alignItems="flex-start">
            <Grid size={{ xs: 12, md: 8 }}>
              <Typography
                variant="h2"
                sx={{
                  color: "text.primary",
                  fontFamily: "'Lato', system-ui, -apple-system, sans-serif",
                  fontWeight: 800,
                  letterSpacing: "-0.01em",
                  lineHeight: 1.1,
                  fontSize: { xs: "2.1rem", md: "3rem" },
                }}
              >
                Discover What
                <br />
                Moves You Naturally.
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  fontSize: { xs: "0.95rem", md: "0.98rem" },
                  lineHeight: 1.7,
                  mt: { xs: 1, md: 0.5 },
                }}
              >
                From daily essentials to timeless tools, explore eco‑friendly
                products that care for you and the planet.
              </Typography>
            </Grid>
          </Grid>

          {/* Card mosaic */}
          <Grid
            container
            spacing={2.5}
            sx={{ mt: { xs: 4, md: 5 }, alignItems: "stretch" }}
          >
            {/* Column A (left stacked 3 cards) */}
            <Grid size={{ xs: 12, md: 4 }}>
              <StackCard
                title="Why We Do What We Do."
                cta="→"
                dotColor="#9BC3A2"
                bg="linear-gradient(180deg, #eef5ef 0%, #e8efe8 100%)"
              />
              <StackCard
                title="Giving Back to the Earth."
                cta="→"
                dotColor="#d9e4c6"
                bg="linear-gradient(180deg, #f2f5ea 0%, #ecefe4 100%)"
                sx={{ mt: 2 }}
              />
              <StackCard
                title="Practical Steps for a Greener Life."
                cta="→"
                dotColor="#e9dccf"
                bg="linear-gradient(180deg, #f7f3ee 0%, #f2ebe4 100%)"
                sx={{ mt: 2 }}
              />
            </Grid>

            {/* Column B (center: top media, bottom media) */}
            <Grid
              size={{ xs: 12, md: 4 }}
              container
              direction="column"
              rowGap={2}
            >
              <MediaCard
                label="Eco‑Tools"
                title="Crafted for a Greener Life."
                imageGradient="linear-gradient(180deg, rgba(0,0,0,0.0) 20%, rgba(0,0,0,0.55) 100%)"

              />
              <MediaCard
                label="Eco‑Products"
                title="Pure, Gentle, Sustainable."
                imageGradient="linear-gradient(180deg, rgba(0,0,0,0.0) 20%, rgba(0,0,0,0.55) 100%)"
              />
            </Grid>

            {/* Column C (right: two media tiles) */}
            <Grid
              size={{ xs: 12, md: 4 }}
              container
              direction="column"
              rowGap={2}
            >
              <MediaCard
                label="Eco‑Chemistry"
                title="Science Meets Sustainability."
                imageGradient="linear-gradient(180deg, rgba(0,0,0,0.0) 20%, rgba(0,0,0,0.55) 100%)"
              />
              <MediaCard
                label="Eco‑Products"
                title="Pure, Gentle, Sustainable."
                imageGradient="linear-gradient(180deg, rgba(0,0,0,0.0) 20%, rgba(0,0,0,0.55) 100%)"
                
              />
            </Grid>
          </Grid>

          {/* Wide feature with left video thumbnail and right copy block */}
          <Grid
            container
            spacing={2.5}
            alignItems="stretch"
            sx={{ mt: { xs: 3.5, md: 4 } }}
          >
            {/* Video tile */}
            <Grid size={{ xs: 12, md: 5 }}>
              <Card
                sx={{
                  height: { xs: 260, md: 300 },
                  borderRadius: 4,
                  overflow: "hidden",
                  position: "relative",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
                  background:
                    "linear-gradient(180deg, #c6d8c2 0%, #a9c2a5 100%)",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "url('https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=1200&auto=format&fit=crop') center/cover no-repeat",
                    filter: "saturate(0.9)",
                  }}
                />
                {/* Play button */}
                <IconButton
                  aria-label="play"
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                    bgcolor: "rgba(255,255,255,0.9)",
                    width: 64,
                    height: 64,
                    "&:hover": { bgcolor: "rgba(255,255,255,1)" },
                    boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
                  }}
                >
                  <PlayArrowRoundedIcon sx={{ fontSize: 36, color: "black" }} />
                </IconButton>
                {/* Hashtag strip (bottom-left) */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 10,
                    left: 10,
                    display: "flex",
                    gap: 1,
                    flexWrap: "wrap",
                  }}
                >
                  {[
                    "#EcoTools",
                    "#BackToNature",
                    "#EscapeTheOrdinary",
                    "#MadeForWellness",
                    "#NatureFriendly",
                    "#WhatWeDo",
                  ].map((t) => (
                    <Chip
                      key={t}
                      label={t}
                      size="small"
                      sx={{
                        bgcolor: "rgba(0,0,0,0.55)",
                        color: "white",
                        "& .MuiChip-label": { px: 1.2, py: 0.2 },
                      }}
                    />
                  ))}
                </Box>
              </Card>
            </Grid>

            {/* Right descriptive panel */}
            <Grid size={{ xs: 12, md: 7 }}>
              <Card
                sx={{
                  height: { xs: "auto", md: 300 },
                  borderRadius: 4,
                  background:
                    "linear-gradient(180deg, #e0eadc 0%, #d5e3d3 100%)",
                  px: { xs: 3, md: 4 },
                  py: { xs: 3, md: 4 },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontFamily:
                        "'Lato', system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
                      fontWeight: 800,
                      color: "rgb(85,107,89)", // muted olive like reference
                      letterSpacing: "-0.01em",
                      lineHeight: 1.1,
                      mb: 1,
                    }}
                  >
                    Make Everyday
                    <br />
                    Sustainable, Beautiful,
                    <br />
                    and Simple
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "rgba(0,0,0,0.65)",
                      maxWidth: 620,
                      lineHeight: 1.7,
                      mt: 1,
                    }}
                  >
                    Ready to live better for the planet? Explore our curated
                    collection of eco‑friendly tools, natural solutions, and
                    sustainable essentials. Make small changes today that create
                    a lasting impact tomorrow.
                  </Typography>
                </Box>
                <Box sx={{ mt: 2, display: "flex", gap: 1.5 }}>
                  <Button
                    variant="contained"
                    color="inherit"
                    endIcon={<ArrowForwardRoundedIcon />}
                    sx={{
                      borderRadius: 999,
                      textTransform: "none",
                      fontWeight: 700,
                      px: 2.2,
                      bgcolor: "white",
                      "&:hover": { bgcolor: "#f7f7f7" },
                    }}
                  >
                    Browse Eco Favorites
                  </Button>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

/* Helpers */

function StackCard({
  title,
  cta,
  dotColor,
  bg,
  sx,
}: {
  title: string;
  cta: string;
  dotColor: string;
  bg: string;
  sx?: object;
}) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
        background: bg,
        ...sx,
      }}
    >
      <CardActionArea disableRipple>
        <CardContent
          sx={{
            py: 2.2,
            px: 2.2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
            <FiberManualRecordRoundedIcon
              sx={{ fontSize: 14, color: dotColor }}
            />
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 700, color: "rgba(0,0,0,0.75)" }}
            >
              {title}
            </Typography>
          </Box>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: 2,
              bgcolor: "rgba(255,255,255,0.8)",
              display: "grid",
              placeItems: "center",
              color: "rgba(0,0,0,0.6)",
            }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              {cta}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

function MediaCard({
  label,
  title,
  imageGradient,
}: {
  label: string;
  title: string;
  imageGradient: string;
}) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        position: "relative",
        height: 170,
        boxShadow: "0 10px 26px rgba(0,0,0,0.12)",
        background:
          "url('https://images.unsplash.com/photo-1522184216315-dc2f0c01b2f3?q=80&w=1200&auto=format&fit=crop') center/cover no-repeat",
      }}
    >
      {/* overlay gradient for legibility */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: imageGradient,
        }}
      />
      <CardActionArea
        sx={{
          position: "absolute",
          inset: 0,
          p: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Chip
          label={label}
          size="small"
          sx={{
            bgcolor: "rgba(0,0,0,0.5)",
            color: "white",
            "& .MuiChip-label": { px: 1 },
          }}
        />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 1,
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              color: "white",
              fontWeight: 800,
              lineHeight: 1.1,
              maxWidth: "80%",
            }}
          >
            {title}
          </Typography>
          <IconButton
            size="small"
            sx={{
              bgcolor: "rgba(255,255,255,0.9)",
              "&:hover": { bgcolor: "white" },
            }}
          >
            <ArrowForwardRoundedIcon sx={{ fontSize: 20, color: "black" }} />
          </IconButton>
        </Box>
      </CardActionArea>
    </Card>
  );
}
