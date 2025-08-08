"use client";

import { Paper, Typography, Box } from "@mui/material";

export function ExtractedText({ text }: { text: string }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 1.5,
        background: "rgba(0,0,0,0.18)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.66)" }}>
        Extracted Text
      </Typography>
      <Box
        sx={{
          mt: 1,
          p: 2,
          bgcolor: "rgba(255,255,255,0.02)",
          borderRadius: 1,
          maxHeight: 420,
          overflow: "auto",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontFamily:
              "ui-monospace, SFMono-Regular, Menlo, Monaco, 'Roboto Mono', monospace",
            color: "rgba(255,255,255,0.88)",
            whiteSpace: "pre-wrap",
          }}
        >
          {text || "No extracted text available."}
        </Typography>
      </Box>
    </Paper>
  );
}
