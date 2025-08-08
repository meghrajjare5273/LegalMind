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
        p: 2,
        borderRadius: 2,
        border: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(255,255,255,0.02)",
      }}
    >
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        textColor="inherit"
        indicatorColor="primary"
        sx={{
          mb: 2,
          "& .MuiTab-root": {
            color: "rgba(255,255,255,0.85)",
            textTransform: "none",
            fontWeight: 700,
          },
          "& .MuiTab-root.Mui-selected": { color: "white" },
        }}
        aria-label="contract review tabs"
      >
        <Tab
          value="risks"
          icon={<AlertTriangle size={16} />}
          label="Risk Analysis"
        />
        <Tab
          value="sections"
          icon={<BookOpen size={16} />}
          label="Contract Sections"
        />
        <Tab value="text" icon={<Eye size={16} />} label="Extracted Text" />
      </Tabs>

      {tab === "risks" && <RiskList items={risks} />}
      {tab === "sections" && <SectionsList items={sections} />}
      {tab === "text" && <ExtractedText text={text} />}
    </Box>
  );
}
