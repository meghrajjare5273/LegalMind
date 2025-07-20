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
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
  Container,
} from "@mui/material";
import { Menu, Close } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

const navigationItems = [
  { label: "Features", href: "#features" },
  { label: "About", href: "#about" },
  { label: "Solutions", href: "#solutions" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: scrolled
            ? "rgba(255, 255, 255, 0.95)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255, 68, 68, 0.1)" : "none",
          transition: "all 0.3s ease",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: scrolled ? "primary.main" : "white",
                  cursor: "pointer",
                  transition: "color 0.3s ease",
                }}
                onClick={() => window?.scrollTo({ top: 0, behavior: "smooth" })}
              >
                LegalMind
              </Typography>
            </motion.div>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
                {navigationItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Button
                      component={Link}
                      href={item.href}
                      sx={{
                        color: scrolled ? "text.primary" : "white",
                        fontWeight: 500,
                        textTransform: "none",
                        "&:hover": {
                          color: "primary.main",
                          backgroundColor: "transparent",
                        },
                        transition: "color 0.3s ease",
                      }}
                    >
                      {item.label}
                    </Button>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      borderRadius: 2,
                      textTransform: "none",
                      fontWeight: 600,
                      boxShadow: "0 4px 16px rgba(255, 68, 68, 0.3)",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 8px 25px rgba(255, 68, 68, 0.4)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    Start Free Trial
                  </Button>
                </motion.div>
              </Box>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerToggle}
                sx={{ color: scrolled ? "text.primary" : "white" }}
              >
                <Menu />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        aria-label="Navigation Menu"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          "& .MuiDrawer-paper": {
            width: 280,
            backgroundColor: "white",
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
          <IconButton onClick={handleDrawerToggle} aria-label="Close Navigation Menu">
            <Close />
          </IconButton>
        </Box>
        <List>
          {navigationItems.map((item) => (
            <ListItem
              key={item.label}
              component="a"
              href={item.href}
              onClick={handleDrawerToggle}
            >
              <ListItemText
                primary={item.label}
                sx={{ "& .MuiTypography-root": { fontWeight: 500 } }}
              />
            </ListItem>
          ))}
          <ListItem sx={{ pt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}
            >
              Start Free Trial
            </Button>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}
