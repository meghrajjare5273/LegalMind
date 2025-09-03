/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { FileText, Upload, Scan, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

// Mock API function (replace with real backend call)
async function analyzeContract(file: File) {
  if (!file) {
    throw new Error("File Not Upload.");
  }
  const formData = new FormData();
  formData.append("file", file);

  // Simulate API call
  try {
    const response = await fetch("/api/analyze-contract", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

export default function ContractReviewPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFile(e.target.files[0]);
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setIsAnalyzing(true);
    try {
      const results = await analyzeContract(file);
      setAnalysisResults(results);
      toast({
        title: "Analysis Complete",
        description: "Review the results below.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to analyze contract.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
          <FileText className="w-8 h-8 text-orange-600" />
          Contract Review
        </h1>
        <p className="text-muted-foreground mt-2">
          AI-powered contract analysis and risk assessment
        </p>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        <Card className="relative overflow-hidden">
          <GlowingEffect
            spread={60}
            glow={true}
            disabled={false}
            proximity={80}
            inactiveZone={0.01}
            borderWidth={2}
          />
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5 text-blue-600" />
              Upload Contract
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div
              className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center cursor-pointer"
              onDrop={(e) => {
                e.preventDefault();
                if (e.dataTransfer.files) setFile(e.dataTransfer.files[0]);
              }}
              onDragOver={(e) => e.preventDefault()}
            >
              <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">
                Drag and drop your contract here, or click to browse
              </p>
              <input
                type="file"
                onChange={handleFileChange}
                accept=".pdf"
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <Button asChild>
                  <span>Choose File</span>
                </Button>
              </label>
              {file && <p className="mt-2 text-sm">{file.name}</p>}
            </div>
            <Button onClick={handleAnalyze} disabled={!file || isAnalyzing}>
              {isAnalyzing ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Scan className="mr-2 h-4 w-4" />
              )}
              {isAnalyzing ? "Analyzing..." : "Analyze Contract"}
            </Button>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <GlowingEffect
            spread={60}
            glow={true}
            disabled={false}
            proximity={80}
            inactiveZone={0.01}
            borderWidth={2}
          />
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scan className="w-5 h-5 text-green-600" />
              Analysis Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!analysisResults ? (
              <div className="text-center text-muted-foreground py-12">
                Upload a contract to see AI analysis results
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Clause</TableHead>
                    <TableHead>Risk Level</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {analysisResults.risks.map((risk: any, i: number) => (
                    <TableRow key={i}>
                      <TableCell>{risk.clause}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            risk.riskLevel === "High"
                              ? "destructive"
                              : "default"
                          }
                        >
                          {risk.riskLevel}
                        </Badge>
                      </TableCell>
                      <TableCell>{risk.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
