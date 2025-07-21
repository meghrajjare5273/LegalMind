"use client";
import type React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Container,
} from "@mui/material";
import { Gavel, Description, Security } from "@mui/icons-material";

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  buttonText: string;
  action: () => void;
}

interface QuickActionsProps {
  onActionClick?: (actionId: string) => void;
}

export default function QuickActions({ onActionClick }: QuickActionsProps) {
  const quickActions: QuickAction[] = [
    {
      id: "contract-review",
      title: "Contract Review",
      description:
        "Get AI-powered analysis of your contracts, identifying key terms, risks, and recommendations.",
      icon: <Description sx={{ fontSize: 32, color: "primary.main" }} />,
      buttonText: "Review Contract",
      action: () => onActionClick?.("contract-review"),
    },
    {
      id: "legal-research",
      title: "Legal Research",
      description:
        "Find relevant case law, statutes, and legal precedents for your specific legal questions.",
      icon: <Gavel sx={{ fontSize: 32, color: "primary.main" }} />,
      buttonText: "Start Research",
      action: () => onActionClick?.("legal-research"),
    },
    {
      id: "compliance-check",
      title: "Compliance Check",
      description:
        "Ensure your business practices align with current legal requirements and regulations.",
      icon: <Security sx={{ fontSize: 32, color: "primary.main" }} />,
      buttonText: "Check Compliance",
      action: () => onActionClick?.("compliance-check"),
    },
  ];

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {quickActions.map((action) => (
          <Grid size={{ xs: 12, md: 4 }} key={action.id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                border: "1px solid",
                borderColor: "grey.200",
                borderRadius: 3,
                transition: "all 0.3s ease",
                "&:hover": {
                  borderColor: "primary.main",
                  boxShadow: "0 4px 20px rgba(255, 68, 68, 0.1)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                {/* Icon */}
                <Box sx={{ mb: 2 }}>{action.icon}</Box>

                {/* Title */}
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: "text.primary",
                    mb: 1,
                  }}
                >
                  {action.title}
                </Typography>

                {/* Description */}
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    lineHeight: 1.6,
                    mb: 3,
                  }}
                >
                  {action.description}
                </Typography>

                {/* Action Button */}
                <Button
                  variant="outlined"
                  onClick={action.action}
                  sx={{
                    borderColor: "primary.main",
                    color: "primary.main",
                    textTransform: "none",
                    fontWeight: 500,
                    "&:hover": {
                      backgroundColor: "primary.main",
                      color: "white",
                      borderColor: "primary.main",
                    },
                  }}
                >
                  {action.buttonText}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
