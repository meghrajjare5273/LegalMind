"use client";

import { Paper, Typography, Box } from "@mui/material";

export function ExtractedText({ text }: { text: string }) {
  return (
    <Paper
      elevation={1}
      sx={{
        p: 3,
        borderRadius: 2,
        backgroundColor: "background.paper",
        border: 1,
        borderColor: "divider",
      }}
    >
      <Typography
        variant="h6"
        sx={{ color: "text.primary", fontWeight: 700, mb: 2 }}
      >
        Extracted Text
      </Typography>
      <Box
        sx={{
          p: 2,
          bgcolor: "background.default",
          borderRadius: 1,
          maxHeight: 420,
          overflow: "auto",
          border: 1,
          borderColor: "divider",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontFamily: "Monaco, 'Courier New', monospace",
            color: "text.primary",
            whiteSpace: "pre-wrap",
            lineHeight: 1.5,
          }}
        >
          {text || "No extracted text available."}
        </Typography>
      </Box>
    </Paper>
  );
}
