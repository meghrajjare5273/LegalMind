"use client";
import { Box, Paper, Typography, Avatar, Container } from "@mui/material";
import { Scale, Person } from "@mui/icons-material";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface MessageListProps {
  messages: Message[];
  isLoading?: boolean;
}

export default function MessageList({ messages, isLoading }: MessageListProps) {
  if (messages.length === 0 && !isLoading) {
    return null;
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 2 }}>
        {messages.map((message) => (
          <Box
            key={message.id}
            sx={{
              display: "flex",
              mb: 3,
              justifyContent:
                message.role === "user" ? "flex-end" : "flex-start",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: 2,
                maxWidth: "80%",
                flexDirection: message.role === "user" ? "row-reverse" : "row",
              }}
            >
              {/* Avatar */}
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  backgroundColor:
                    message.role === "user" ? "secondary.main" : "primary.main",
                  flexShrink: 0,
                }}
              >
                {message.role === "user" ? (
                  <Person sx={{ color: "white" }} />
                ) : (
                  <Scale sx={{ color: "white" }} />
                )}
              </Avatar>

              {/* Message Content */}
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  backgroundColor:
                    message.role === "user" ? "secondary.main" : "grey.100",
                  color: message.role === "user" ? "white" : "text.primary",
                  borderRadius: 2,
                  border: message.role === "assistant" ? "1px solid" : "none",
                  borderColor: "grey.200",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    whiteSpace: "pre-wrap",
                    lineHeight: 1.6,
                  }}
                >
                  {message.content}
                </Typography>

                <Typography
                  variant="caption"
                  sx={{
                    display: "block",
                    mt: 1,
                    opacity: 0.7,
                  }}
                >
                  {message.timestamp.toLocaleTimeString()}
                </Typography>
              </Paper>
            </Box>
          </Box>
        ))}

        {/* Loading indicator */}
        {isLoading && (
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 2,
              mb: 3,
            }}
          >
            <Avatar
              sx={{
                width: 40,
                height: 40,
                backgroundColor: "primary.main",
              }}
            >
              <Scale sx={{ color: "white" }} />
            </Avatar>

            <Paper
              elevation={0}
              sx={{
                p: 2,
                backgroundColor: "grey.100",
                borderRadius: 2,
                border: "1px solid",
                borderColor: "grey.200",
              }}
            >
              <Box sx={{ display: "flex", gap: 1 }}>
                {[0, 1, 2].map((i) => (
                  <Box
                    key={i}
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: "primary.main",
                      animation: "pulse 1.5s ease-in-out infinite",
                      animationDelay: `${i * 0.2}s`,
                      "@keyframes pulse": {
                        "0%, 80%, 100%": { opacity: 0.3 },
                        "40%": { opacity: 1 },
                      },
                    }}
                  />
                ))}
              </Box>
            </Paper>
          </Box>
        )}
      </Box>
    </Container>
  );
}
