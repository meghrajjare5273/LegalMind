"use client";
import { Box, Typography, Avatar, Container } from "@mui/material";
import { Scale } from "@mui/icons-material";

interface WelcomeSectionProps {
  userName?: string;
}

export default function WelcomeSection({
  userName = "User",
}: WelcomeSectionProps) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          py: 6,
        }}
      >
        {/* AI Avatar */}
        <Avatar
          sx={{
            width: 64,
            height: 64,
            backgroundColor: "primary.main",
            mb: 3,
          }}
        >
          <Scale sx={{ fontSize: 32, color: "white" }} />
        </Avatar>

        {/* Greeting */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            color: "text.primary",
            mb: 1,
          }}
        >
          {getGreeting()}, {userName}
        </Typography>

        {/* Subtitle */}
        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            maxWidth: 500,
            lineHeight: 1.6,
          }}
        >
          I&apos;m your AI Legal Assistant. How can I help you with your legal
          questions today?
        </Typography>
      </Box>
    </Container>
  );
}
