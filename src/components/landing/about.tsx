"use client";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  IconButton,
  Chip,
} from "@mui/material";
// import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import FiberManualRecordRoundedIcon from "@mui/icons-material/FiberManualRecordRounded";
// import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

/**
 * Palette mapping (from user-provided scheme)
 * Neutrals / Dominants
 * - bgDeep:        #141818
 * - bgSurface:     #1b2424
 * - bgSoft:        #32393a
 * - borderSoft:    #434b4d
 * - textPrimary:   #f0f8ff
 * - textMuted:     #9ea3a7
 * Accents / Brilliant
 * - accentPrimary: #f1f9ff
 * - accentSoft:    #e6f1fa
 * - accentTeal:    #2d3d3d
 * - accentSlate:   #5d6f73
 * Optional navy contrast
 * - navy:          #0f1a2b
 * - navySoft:      #152336
 */

const COLORS = {
  // Light, airy banded background
  bgBandTop: "#ffffff", // pure white
  bgBandBottom: "#f4f6f8", // very light neutral

  // Panels: light surface with subtle depth
  panelGrad:
    "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(249,251,253,0.98) 60%, rgba(246,248,250,1) 100%)",
  panelBorder: "#e1e6ea", // soft cool border (was #434b4d)

  // Chips on light UI
  chipBg: "#eef3f6", // light chip background (was dark)
  chipText: "#2a3236", // dark readable text

  // Typography on light surfaces
  headline: "#1f2629", // strong near-black for titles (was light)
  subText: "#5d6a70", // medium gray for body/secondary

  // Tiles: flip to light gradients with subtle tint
  tileA: "linear-gradient(180deg, #ffffff 0%, #f6f8f9 100%)",
  tileB: "linear-gradient(180deg, #f9fbfc 0%, #eef3f6 100%)",
  tileC: "linear-gradient(180deg, #f7fafb 0%, #edf2f5 100%)",

  // Subtle highlight sheen on light backgrounds
  navySheen: "linear-gradient(135deg, rgba(15,26,43,.06), rgba(69,84,87,.04))",

  // Buttons: high-contrast on light UI
  ctaBg: "#2a3236", // dark button bg for contrast
  ctaText: "#ffffff", // white text on dark CTA
  ctaHoverBg: "#3a4449", // slightly lighter on hover

  // Links/accents: refined gold accent on light
  linkGold: "#9c8f6a", // warmer, slightly darker than before

  // Optional additional neutrals to help consistency
  surface: "#ffffff",
  surfaceAlt: "#f7f9fb",
  divider: "#e6eaee",
};

export default function AboutSection() {
  return (
    <Box
      sx={{
        background: `linear-gradient(180deg, ${COLORS.bgBandTop} 0%, ${COLORS.bgBandBottom} 100%)`,
        py: { xs: 6, md: 10 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Full-width navy sheen overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: COLORS.navySheen,
          pointerEvents: "none",
        }}
      />

      <Container
        maxWidth="lg"
        sx={{ px: { xs: 2, md: 4 }, position: "relative", zIndex: 1 }}
      >
        {/* Top headline and microcopy block */}
        <Grid container spacing={4} alignItems="flex-start">
          <Grid size={{ xs: 12, md: 8 }}>
            <Typography
              variant="h2"
              sx={{
                color: COLORS.headline,
                fontWeight: 800,
                letterSpacing: "-0.01em",
                lineHeight: 1.12,
                fontSize: { xs: "2.1rem", md: "3rem" },
              }}
            >
              Legal Intelligence,
              <br />
              <p className="text-color-gold">Built for Precision.</p>
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography
              variant="body2"
              sx={{
                color: COLORS.subText,
                fontSize: { xs: "0.98rem", md: "1rem" },
                lineHeight: 1.7,
                mt: { xs: 1, md: 0.5 },
              }}
            >
              LegalMind accelerates contract review, delivers cited research,
              and surfaces compliance risks—so legal teams can act faster with
              confidence.
            </Typography>
          </Grid>
        </Grid>

        {/* Card mosaic */}
        <Grid
          container
          spacing={3}
          sx={{
            mt: { xs: 4, md: 5 },
            alignItems: "stretch",
          }}
        >
          {/* Column A */}
          <Grid size={{ xs: 12, md: 4 }}>
            <StackCard
              title="Why LegalMind"
              subtitle="Speed, accuracy, and cited outputs."
              cta="→"
              dotColor="#bdc9c4"
              bg={COLORS.tileA}
            />
            <StackCard
              title="Compliance by Design"
              subtitle="Surface obligations, monitor exposure."
              cta="→"
              dotColor="#768a8d"
              bg={COLORS.tileB}
              sx={{ mt: 2 }}
            />
            <StackCard
              title="Operational Efficiency"
              subtitle="Automate reviews, scale best-practices."
              cta="→"
              dotColor="#5d6f73"
              bg={COLORS.tileC}
              sx={{ mt: 2 }}
            />
          </Grid>

          {/* Column B */}
          <Grid
            size={{ xs: 12, md: 4 }}
            container
            direction="column"
            rowGap={2}
          >
            <MediaCard
              label="Contract Review"
              title="Risk-aware clause intelligence"
              imageUrl="/images/contract-review.jpg"
              href="/contract-review"
            />
            <MediaCard
              label="Legal Research"
              title="Precedents with citations"
              imageUrl="/images/legal-research.jpg"
              href="/chat"
            />
          </Grid>

          {/* Column C */}
          <Grid
            size={{ xs: 12, md: 4 }}
            container
            direction="column"
            rowGap={2}
          >
            <MediaCard
              label="Compliance"
              title="Continuous monitoring"
              imageUrl="/images/compliance.jpg"
              href="/chat"
            />
            <MediaCard
              label="Workflows"
              title="Faster client delivery"
              imageUrl="/images/workflows.jpg"
              href="#features"
            />
          </Grid>
        </Grid>

        {/* Wide feature row */}
        <Grid
          container
          spacing={3}
          alignItems="stretch"
          sx={{ mt: { xs: 4, md: 5 } }}
        >
          {/* Video block */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Card
              sx={{
                height: { xs: 260, md: 300 },
                borderRadius: 4,
                overflow: "hidden",
                position: "relative",
                boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
                background: `linear-gradient(180deg, rgba(69,84,87,0.3) 0%, rgba(27,36,36,0.5) 100%), url('/images/hero-legal.jpg') center/cover no-repeat`,
                border: `1px solid ${COLORS.panelBorder}`,
              }}
            >
              {/* Play button, hashtags unchanged */}
              {/* ... */}
            </Card>
          </Grid>

          {/* Right descriptive panel */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Card
              sx={{
                height: { xs: "auto", md: 300 },
                borderRadius: 4,
                px: { xs: 3, md: 4 },
                py: { xs: 3, md: 4 },
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                background: "#ffffffcc", // lighter flat bg
                border: `1px solid ${COLORS.panelBorder}`,
              }}
            >
              {/* Text + buttons unchanged */}
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

/* Helpers */

function StackCard({
  title,
  subtitle,
  cta,
  dotColor,
  bg,
  sx,
}: {
  title: string;
  subtitle?: string;
  cta: string;
  dotColor: string;
  bg: string;
  sx?: object;
}) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
        background: bg,
        border: "1px solid rgba(67,75,77,0.6)",
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
            <Box>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 800, color: dotColor }}
              >
                {title}
              </Typography>
              {subtitle ? (
                <Typography
                  variant="caption"
                  sx={{ color: "#a7a29e", display: "block" }}
                >
                  {subtitle}
                </Typography>
              ) : null}
            </Box>
          </Box>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: 2,
              bgcolor: "rgba(240,248,255,0.12)",
              display: "grid",
              placeItems: "center",
              color: "rgba(240,248,255,0.9)",
              border: "1px solid rgba(67,75,77,0.6)",
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 800, color: dotColor }}
            >
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
  imageUrl,
  href,
  onClick,
}: {
  label: string;
  title: string;
  imageUrl: string; // custom image path
  href?: string; // route to push
  onClick?: () => void; // optional override
}) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) return onClick();
    if (href) router.push(href);
  };

  return (
    <Card
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        position: "relative",
        height: 170,
        boxShadow: "0 10px 26px rgba(0,0,0,0.28)",
        background: `url('${imageUrl}') center/cover no-repeat`,
        border: `1px solid ${COLORS.panelBorder}`,
      }}
    >
      {/* overlay gradient for legibility */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.0) 20%, rgba(0,0,0,0.55) 100%)",
        }}
      />
      <CardActionArea
        onClick={handleClick}
        aria-label={`${label} - ${title}`}
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
            bgcolor: COLORS.chipBg,
            color: COLORS.chipText,
            "& .MuiChip-label": { px: 1 },
            border: `1px solid ${COLORS.panelBorder}`,
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
              color: "#f0f8ff",
              fontWeight: 800,
              lineHeight: 1.1,
              maxWidth: "80%",
              textShadow: "0 2px 6px rgba(0,0,0,0.45)",
            }}
          >
            {title}
          </Typography>
          <IconButton
            size="small"
            sx={{
              bgcolor: "rgba(240,248,255,0.92)",
              "&:hover": { bgcolor: COLORS.ctaHoverBg },
              border: `1px solid ${COLORS.panelBorder}`,
            }}
            onClick={handleClick}
            aria-label="Open"
          >
            <ArrowForwardRoundedIcon
              sx={{
                fontSize: 20,
                color: "#000000",
                "&:hover": { color: "#fafafa" },
              }}
            />
          </IconButton>
        </Box>
      </CardActionArea>
    </Card>
  );
}
