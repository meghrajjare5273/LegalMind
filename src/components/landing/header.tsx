"use client";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItemText,
  useMediaQuery,
  useTheme,
  Container,
  Tooltip,
  Chip,
  Avatar,
  Fade,
  ListItemButton,
} from "@mui/material";
import {
  Menu,
  Close,
  LocationOn,
  Schedule,
  Phone,
  Email,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// Keep outside component to avoid re-creation
const NAV_ITEMS = Object.freeze([
  {
    label: "Features",
    href: "#features",
    description: "Explore our powerful features",
  },
  { label: "About", href: "#about", description: "Learn about our mission" },
  {
    label: "Solutions",
    href: "#solutions",
    description: "Discover our solutions",
  },
  { label: "Contact", href: "#contact", description: "Get in touch with us" },
]);

export default function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)"
  );

  // State
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [now, setNow] = useState(() => Date.now());

  // Stable color tokens and computed styles
  const colors = useMemo(() => {
    const gold = "#d4af37";
    const bronze = "#b08d28";
    const brightGold = "#ffcc33";
    return { gold, bronze, brightGold };
  }, []);

  // Format time only when 'now' changes
  const formattedTime = useMemo(() => {
    return new Date(now).toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }, [now]);

  // Time updater with page visibility optimization
  useEffect(() => {
    let intervalId: number | null = null;

    const start = () => {
      if (intervalId == null) {
        intervalId = window.setInterval(() => setNow(Date.now()), 1000);
      }
    };
    const stop = () => {
      if (intervalId != null) {
        clearInterval(intervalId);
        intervalId = null;
      }
    };

    const onVisibility = () => {
      if (document.visibilityState === "visible") start();
      else stop();
    };

    start();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  // Scroll handler, passive + rAF throttle
  const rafRef = useRef<number | null>(null);
  const lastScrollY = useRef<number>(0);

  useEffect(() => {
    const onScroll = () => {
      lastScrollY.current = window.scrollY;
      if (rafRef.current == null) {
        rafRef.current = requestAnimationFrame(() => {
          setScrolled(lastScrollY.current > 50);
          rafRef.current = null;
        });
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleDrawerToggle = useCallback(() => {
    setMobileOpen((v) => !v);
  }, []);

  const goTop = useCallback(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  // Active section detection (basic: matches hash)
  const activeHash = typeof window !== "undefined" ? window.location.hash : "";
  const isActive = useCallback(
    (href: string) => href === activeHash,
    [activeHash]
  );

  // Motion helpers respecting reduced motion
  const motionFast = prefersReducedMotion
    ? { initial: false, animate: {}, transition: {} }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    : { transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as any } };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: scrolled ? "rgba(255,255,255,0.9)" : "transparent",
          // Avoid heavy blur when not needed; reduce blur intensity
          backdropFilter: scrolled ? "blur(12px) saturate(160%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px) saturate(160%)" : "none",
          borderBottom: scrolled
            ? `1px solid ${colors.gold}40`
            : "1px solid rgba(255,255,255,0.08)",
          transition: "background-color 240ms ease, border-color 240ms ease",
          boxShadow: "none",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            sx={{
              justifyContent: "space-around",
              py: 1.25,
              px: { xs: 1, sm: 2 },
              gap: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: { xs: 1, sm: 2 },
              }}
            >
              <motion.div
                initial={
                  prefersReducedMotion ? undefined : { opacity: 0, x: -12 }
                }
                animate={
                  prefersReducedMotion ? undefined : { opacity: 1, x: 0 }
                }
                {...motionFast}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography
                    role="link"
                    aria-label="Go to top"
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: scrolled
                        ? colors.gold
                        : theme.palette.common.white,
                      cursor: "pointer",
                      letterSpacing: 0.2,
                      transition: "color 180ms ease, transform 180ms ease",
                      "&:hover": {
                        color: colors.brightGold,
                        transform: { sm: "scale(1.02)" },
                      },
                    }}
                    onClick={goTop}
                  >
                    LegalMind
                  </Typography>
                </Box>
              </motion.div>

              {!isMobile && (
                <motion.div
                  initial={
                    prefersReducedMotion ? undefined : { opacity: 0, x: -8 }
                  }
                  animate={
                    prefersReducedMotion ? undefined : { opacity: 1, x: 0 }
                  }
                  {...motionFast}
                >
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: 1.25 }}
                  >
                    <Tooltip title="Our Location" arrow>
                      <Chip
                        icon={
                          <LocationOn sx={{ fontSize: "16px !important" }} />
                        }
                        label="Pune"
                        size="small"
                        sx={{
                          backgroundColor: scrolled
                            ? `${colors.gold}14`
                            : "rgba(255,255,255,0.16)",
                          color: scrolled
                            ? colors.gold
                            : theme.palette.common.white,
                          border: `1px solid ${
                            scrolled
                              ? colors.gold + "30"
                              : "rgba(255,255,255,0.24)"
                          }`,
                          backdropFilter: "blur(6px)",
                          "&:hover": {
                            backgroundColor: scrolled
                              ? `${colors.gold}24`
                              : "rgba(255,255,255,0.24)",
                          },
                          fontWeight: 600,
                        }}
                      />
                    </Tooltip>
                    <Tooltip title="Current Time" arrow>
                      <Chip
                        icon={<Schedule sx={{ fontSize: "16px !important" }} />}
                        label={formattedTime}
                        size="small"
                        sx={{
                          backgroundColor: scrolled
                            ? `${colors.gold}14`
                            : "rgba(255,255,255,0.16)",
                          color: scrolled
                            ? colors.gold
                            : theme.palette.common.white,
                          border: `1px solid ${
                            scrolled
                              ? colors.gold + "30"
                              : "rgba(255,255,255,0.24)"
                          }`,
                          backdropFilter: "blur(6px)",
                          fontFamily: "var(--font-app, inherit), monospace",
                          fontVariantNumeric: "tabular-nums",
                          fontWeight: 600,
                        }}
                        aria-live="polite"
                      />
                    </Tooltip>
                  </Box>
                </motion.div>
              )}
            </Box>

            {!isMobile && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: { sm: 1, md: 2 },
                }}
              >
                {NAV_ITEMS.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={
                      prefersReducedMotion ? undefined : { opacity: 0, y: -10 }
                    }
                    animate={
                      prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
                    }
                    transition={{
                      duration: 0.35,
                      delay: prefersReducedMotion ? 0 : index * 0.06,
                    }}
                  >
                    <Tooltip
                      title={item.description}
                      arrow
                      TransitionComponent={Fade}
                      TransitionProps={{ timeout: 200 }}
                    >
                      <Button
                        component={Link}
                        href={item.href}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        sx={{
                          color: scrolled
                            ? "text.primary"
                            : theme.palette.common.white,
                          fontWeight: 600,
                          textTransform: "none",
                          position: "relative",
                          px: 1.5,
                          py: 0.75,
                          borderRadius: 2,
                          letterSpacing: 0.1,
                          "&:hover": {
                            color: colors.gold,
                            backgroundColor: scrolled
                              ? `${colors.gold}10`
                              : "rgba(255,255,255,0.08)",
                          },
                          "&:after": {
                            content: '""',
                            position: "absolute",
                            bottom: 4,
                            left: "50%",
                            width: isActive(item.href) ? "70%" : 0,
                            height: 2,
                            backgroundColor: colors.gold,
                            transform: "translateX(-50%)",
                            transition: "width 200ms ease",
                          },
                          "@media (hover: none)": {
                            "&:hover": { backgroundColor: "transparent" },
                          },
                        }}
                      >
                        {item.label}
                      </Button>
                    </Tooltip>
                  </motion.div>
                ))}
              </Box>
            )}

            {isMobile && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Chip
                  label={formattedTime}
                  size="small"
                  sx={{
                    backgroundColor: scrolled
                      ? `${colors.gold}14`
                      : "rgba(255,255,255,0.16)",
                    color: scrolled ? colors.gold : theme.palette.common.white,
                    fontFamily: "var(--font-app, inherit), monospace",
                    fontVariantNumeric: "tabular-nums",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                  }}
                  aria-live="polite"
                />
                <Tooltip title="Open Menu" arrow>
                  <IconButton
                    color="inherit"
                    aria-label="Open navigation menu"
                    onClick={handleDrawerToggle}
                    sx={{
                      color: scrolled
                        ? "text.primary"
                        : theme.palette.common.white,
                      backgroundColor: scrolled
                        ? `${colors.gold}14`
                        : "rgba(255,255,255,0.16)",
                      border: `1px solid ${
                        scrolled ? colors.gold + "30" : "rgba(255,255,255,0.24)"
                      }`,
                      "&:hover": {
                        backgroundColor: scrolled
                          ? `${colors.gold}22`
                          : "rgba(255,255,255,0.22)",
                      },
                      transition: "background-color 160ms ease",
                    }}
                  >
                    <Menu />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <AnimatePresence initial={false}>
        {mobileOpen && (
          <Drawer
            aria-label="Navigation Menu"
            anchor="right"
            open
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              "& .MuiDrawer-paper": {
                width: "min(320px, 90vw)",
                backgroundColor: "rgba(255,255,255,0.96)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                borderLeft: `1px solid ${colors.gold}30`,
              },
              "& .MuiBackdrop-root": {
                backdropFilter: "blur(6px)",
                backgroundColor: "rgba(0,0,0,0.28)",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 2,
                borderBottom: `1px solid ${colors.gold}20`,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Avatar
                  sx={{
                    width: 28,
                    height: 28,
                    background: `linear-gradient(135deg, ${colors.gold}, ${colors.bronze})`,
                    fontSize: "0.875rem",
                    fontWeight: 700,
                  }}
                >
                  L
                </Avatar>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 700, color: colors.gold }}
                >
                  LegalMind
                </Typography>
              </Box>
              <Tooltip title="Close Menu" arrow>
                <IconButton
                  onClick={handleDrawerToggle}
                  aria-label="Close navigation menu"
                  sx={{
                    "&:hover": {
                      backgroundColor: `${colors.gold}15`,
                    },
                    transition: "background-color 160ms ease",
                  }}
                >
                  <Close />
                </IconButton>
              </Tooltip>
            </Box>

            <List sx={{ pt: 1 }}>
              {NAV_ITEMS.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={
                    prefersReducedMotion ? undefined : { opacity: 0, x: 12 }
                  }
                  animate={
                    prefersReducedMotion ? undefined : { opacity: 1, x: 0 }
                  }
                  transition={{
                    duration: 0.25,
                    delay: prefersReducedMotion ? 0 : index * 0.05,
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={handleDrawerToggle}
                    passHref
                    legacyBehavior
                  >
                    <ListItemButton
                      component="a"
                      sx={{
                        borderRadius: 2,
                        mx: 1,
                        mb: 0.25,
                        "&:hover": {
                          backgroundColor: `${colors.gold}14`,
                          transform: { sm: "translateX(6px)" },
                        },
                        transition:
                          "background-color 160ms ease, transform 160ms ease",
                      }}
                      aria-current={isActive(item.href) ? "page" : undefined}
                    >
                      <ListItemText
                        primaryTypographyProps={{ fontWeight: 600 }}
                        primary={item.label}
                        secondary={item.description}
                        sx={{
                          "& .MuiTypography-body2": {
                            color: "text.secondary",
                            fontSize: "0.8rem",
                          },
                        }}
                      />
                    </ListItemButton>
                  </Link>
                </motion.div>
              ))}

              <Box sx={{ pt: 2.5, px: 2 }}>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    background: `linear-gradient(135deg, ${colors.gold}, ${colors.bronze})`,
                    borderRadius: 3,
                    textTransform: "none",
                    fontWeight: 700,
                    py: 1.25,
                    "&:hover": {
                      background: `linear-gradient(135deg, ${colors.brightGold}, ${colors.gold})`,
                      boxShadow: `0 8px 24px ${colors.gold}4d`,
                    },
                    transition: "background 180ms ease, box-shadow 180ms ease",
                  }}
                >
                  Start Free Trial
                </Button>
              </Box>

              <Box
                sx={{
                  px: 2,
                  pt: 2.5,
                  mt: 2,
                  borderTop: `1px solid ${colors.gold}20`,
                }}
              >
                <Typography
                  variant="caption"
                  sx={{ color: "text.secondary", mb: 1, display: "block" }}
                >
                  Quick Contact
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Tooltip title="Call us" arrow>
                    <IconButton
                      size="small"
                      sx={{ color: colors.gold }}
                      aria-label="Call"
                    >
                      <Phone fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Email us" arrow>
                    <IconButton
                      size="small"
                      sx={{ color: colors.gold }}
                      aria-label="Email"
                    >
                      <Email fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            </List>
          </Drawer>
        )}
      </AnimatePresence>
    </>
  );
}
