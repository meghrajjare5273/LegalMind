"use client";
import {
  Box,
  TextField,
  IconButton,
  Paper,
  Container,
  Typography,
} from "@mui/material";
import { Send, Add } from "@mui/icons-material";
import { useState } from "react";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export default function MessageInput({
  onSendMessage,
  disabled = false,
  placeholder = "Ask me anything about law...",
}: MessageInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <Box
      sx={{
        position: "sticky",
        bottom: 0,
        backgroundColor: "white",
        borderTop: "1px solid",
        borderColor: "grey.200",
        py: 2,
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={0}
          sx={{
            border: "1px solid",
            borderColor: "grey.300",
            borderRadius: 3,
            overflow: "hidden",
            "&:focus-within": {
              borderColor: "primary.main",
              boxShadow: "0 0 0 2px rgba(255, 68, 68, 0.1)",
            },
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              alignItems: "flex-end",
              gap: 1,
              p: 1,
            }}
          >
            {/* Attachment Button */}
            <IconButton
              size="small"
              sx={{
                color: "text.secondary",
                "&:hover": { backgroundColor: "grey.100" },
              }}
            >
              <Add />
            </IconButton>

            {/* Text Input */}
            <TextField
              multiline
              maxRows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={placeholder}
              disabled={disabled}
              variant="standard"
              InputProps={{
                disableUnderline: true,
              }}
              sx={{
                flexGrow: 1,
                "& .MuiInputBase-input": {
                  py: 1,
                  fontSize: "1rem",
                  "&::placeholder": {
                    color: "text.secondary",
                    opacity: 1,
                  },
                },
              }}
            />

            {/* Send Button */}
            <IconButton
              type="submit"
              disabled={!message.trim() || disabled}
              sx={{
                backgroundColor: message.trim() ? "primary.main" : "grey.300",
                color: "white",
                "&:hover": {
                  backgroundColor: message.trim() ? "primary.dark" : "grey.300",
                },
                "&:disabled": {
                  backgroundColor: "grey.300",
                  color: "white",
                },
              }}
            >
              <Send />
            </IconButton>
          </Box>
        </Paper>

        {/* Disclaimer */}
        <Typography
          variant="caption"
          sx={{
            display: "block",
            textAlign: "center",
            color: "text.secondary",
            mt: 1,
          }}
        >
          This AI provides general information only and is not a substitute for
          professional legal advice.
        </Typography>
      </Container>
    </Box>
  );
}
