"use client";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
  Container,
} from "@mui/material";
import { Search, Add, Share, ArrowBack } from "@mui/icons-material";
import Link from "next/link";

interface ChatHeaderProps {
  onNewChat?: () => void;
  onShare?: () => void;
}

export default function ChatHeader({ onNewChat, onShare }: ChatHeaderProps) {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "white",
        borderBottom: "1px solid",
        borderColor: "grey.200",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
          {/* Left Section */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Link href="/" passHref>
              <IconButton
                size="small"
                sx={{
                  color: "text.primary",
                  "&:hover": { backgroundColor: "grey.100" },
                }}
              >
                <ArrowBack />
              </IconButton>
            </Link>

            <IconButton
              size="small"
              sx={{
                color: "text.secondary",
                "&:hover": { backgroundColor: "grey.100" },
              }}
            >
              <Search />
            </IconButton>

            <Button
              startIcon={<Add />}
              onClick={onNewChat}
              sx={{
                color: "text.primary",
                textTransform: "none",
                fontWeight: 500,
                "&:hover": { backgroundColor: "grey.100" },
              }}
            >
              New Chat
            </Button>
          </Box>

          {/* Right Section */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                display: { xs: "none", sm: "block" },
              }}
            >
              AI Legal Assistant
            </Typography>

            <IconButton
              size="small"
              onClick={onShare}
              sx={{
                color: "text.secondary",
                "&:hover": { backgroundColor: "grey.100" },
              }}
            >
              <Share />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
