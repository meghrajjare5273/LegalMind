"use client";

import { Box, Tabs, Tab } from "@mui/material";
import { AlertTriangle, BookOpen, Eye } from "lucide-react";
import type { EnhancedRiskAnalysis, ContractSection } from "@/services/api";
import { RiskList } from "./risk-list";
import { SectionsList } from "./sections-list";
import { ExtractedText } from "./extracted-text";
import { useState } from "react";

type Props = {
  risks: EnhancedRiskAnalysis[];
  sections: ContractSection[];
  text: string;
};

export function ResultsTabs({ risks, sections, text }: Props) {
  const [tab, setTab] = useState<"risks" | "sections" | "text">("risks");

  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 2,
        backgroundColor: "background.paper",
        border: 1,
        borderColor: "divider",
      }}
    >
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        textColor="inherit"
        indicatorColor="primary"
        sx={{
          mb: 3,
          "& .MuiTab-root": {
            color: "text.secondary",
            textTransform: "none",
            fontWeight: 600,
            "&:hover": {
              color: "primary.main",
            },
          },
          "& .MuiTab-root.Mui-selected": {
            color: "primary.main",
            fontWeight: 700,
          },
          "& .MuiTabs-indicator": {
            backgroundColor: "primary.main",
          },
        }}
        aria-label="contract review tabs"
      >
        <Tab
          value="risks"
          icon={<AlertTriangle size={16} />}
          label="Risk Analysis"
          iconPosition="start"
        />
        <Tab
          value="sections"
          icon={<BookOpen size={16} />}
          label="Contract Sections"
          iconPosition="start"
        />
        <Tab
          value="text"
          icon={<Eye size={16} />}
          label="Extracted Text"
          iconPosition="start"
        />
      </Tabs>

      {tab === "risks" && <RiskList items={risks} />}
      {tab === "sections" && <SectionsList items={sections} />}
      {tab === "text" && <ExtractedText text={text} />}
    </Box>
  );
}
