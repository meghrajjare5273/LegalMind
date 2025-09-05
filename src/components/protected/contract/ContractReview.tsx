"use client";

import React, { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  Upload,
  FileType2,
  FileCheck,
  FileScan,
  PanelRight,
  FileX,
  Component,
  Grid2x2X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
// import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AnalysisResult {
  summary: string;
  riskScore: number;
  clauses: Array<{
    type: string;
    text: string;
    confidence: number;
    risk: "low" | "medium" | "high";
  }>;
  obligations: Array<{
    description: string;
    dueDate?: string;
    severity: "low" | "medium" | "high";
  }>;
  risks: Array<{
    description: string;
    recommendation: string;
    severity: "low" | "medium" | "high";
  }>;
  metadata: {
    filename: string;
    uploadDate: string;
    duration: string;
    modelVersion: string;
  };
}

type AnalysisState =
  | "initial"
  | "selected"
  | "uploading"
  | "analyzing"
  | "success"
  | "error";

export default function ContractReview() {
  const [state, setState] = useState<AnalysisState>("initial");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [showSourceModal, setShowSourceModal] = useState(false);
  const [selectedClause, setSelectedClause] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, []);

  const handleFileSelect = useCallback((file: File) => {
    if (file.type !== "application/pdf") {
      toast.error("Please select a PDF file");
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      toast.error("File size must be less than 20MB");
      return;
    }

    setSelectedFile(file);
    setState("selected");
    toast.success("File selected successfully");
  }, []);

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFileSelect(file);
      }
    },
    [handleFileSelect]
  );

  const simulateAnalysis = useCallback(async () => {
    setState("uploading");
    setUploadProgress(0);

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise((resolve) => setTimeout(resolve, 200));
    }

    toast.success("Upload complete — analyzing...");
    setState("analyzing");
    setAnalysisProgress(0);

    // Simulate analysis progress
    for (let i = 0; i <= 100; i += 15) {
      setAnalysisProgress(i);
      await new Promise((resolve) => setTimeout(resolve, 400));
    }

    // Mock result
    const mockResult: AnalysisResult = {
      summary:
        "Standard service agreement with moderate risk profile and standard termination clauses",
      riskScore: 67,
      clauses: [
        {
          type: "Termination",
          text: "Either party may terminate this agreement with 30 days written notice...",
          confidence: 0.95,
          risk: "medium",
        },
        {
          type: "Payment Terms",
          text: "Payment shall be due within 30 days of invoice date...",
          confidence: 0.88,
          risk: "low",
        },
        {
          type: "Liability",
          text: "In no event shall either party be liable for consequential damages...",
          confidence: 0.92,
          risk: "high",
        },
      ],
      obligations: [
        {
          description: "Deliver monthly reports by the 5th of each month",
          dueDate: "2024-02-05",
          severity: "medium",
        },
        {
          description: "Maintain insurance coverage of $1M minimum",
          severity: "high",
        },
      ],
      risks: [
        {
          description: "Broad liability limitation clause",
          recommendation: "Consider negotiating mutual liability caps",
          severity: "high",
        },
        {
          description: "Short termination notice period",
          recommendation: "Request 60-day notice period for better planning",
          severity: "medium",
        },
      ],
      metadata: {
        filename: selectedFile?.name || "contract.pdf",
        uploadDate: new Date().toLocaleDateString(),
        duration: "2.3s",
        modelVersion: "v2.1",
      },
    };

    setResult(mockResult);
    setState("success");
    toast.success("Analysis completed successfully");
  }, [selectedFile]);

  const handleClear = useCallback(() => {
    setSelectedFile(null);
    setState("initial");
    setResult(null);
    setError(null);
    setUploadProgress(0);
    setAnalysisProgress(0);
  }, []);

  const handleRetry = useCallback(() => {
    setError(null);
    if (selectedFile) {
      simulateAnalysis();
    }
  }, [selectedFile, simulateAnalysis]);

  const handleCopyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  }, []);

  const handleShowSource = useCallback((clauseText: string) => {
    setSelectedClause(clauseText);
    setShowSourceModal(true);
  }, []);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high":
        return "bg-destructive text-destructive-foreground";
      case "medium":
        return "bg-accent text-accent-foreground";
      case "low":
        return "bg-success text-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <Card className="bg-card border-border shadow-lg">
        <CardHeader className="pb-6">
          <CardTitle className="text-2xl font-heading text-foreground">
            Contract Review
          </CardTitle>
          <p className="text-muted-foreground">
            Upload your contract for automated analysis and risk assessment
          </p>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Primary Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Upload Area */}
              <AnimatePresence mode="wait">
                {(state === "initial" || state === "selected") && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-4"
                  >
                    <div
                      className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
                        isDragOver
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      <div className="flex flex-col items-center space-y-4">
                        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                          <Upload className="w-8 h-8 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-foreground mb-2">
                            Drop your contract here
                          </h3>
                          <p className="text-muted-foreground text-sm mb-4">
                            Supports PDF files up to 20MB
                          </p>
                          <Button
                            onClick={() => fileInputRef.current?.click()}
                            variant="outline"
                            className="mb-2"
                          >
                            <FileType2 className="w-4 h-4 mr-2" />
                            Choose File
                          </Button>
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept=".pdf"
                            onChange={handleFileInputChange}
                            className="hidden"
                            aria-label="Select PDF file"
                          />
                        </div>
                      </div>
                    </div>

                    {selectedFile && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-surface-1 rounded-lg p-4 border border-border"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 rounded bg-primary/20 flex items-center justify-center">
                            <FileCheck className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">
                              {selectedFile.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatFileSize(selectedFile.size)} • PDF Document
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleClear}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <FileX className="w-4 h-4" />
                          </Button>
                        </div>
                      </motion.div>
                    )}

                    <div className="flex space-x-3">
                      <Button
                        onClick={simulateAnalysis}
                        disabled={!selectedFile}
                        className="flex-1"
                      >
                        <FileScan className="w-4 h-4 mr-2" />
                        Analyze Contract
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleClear}
                        disabled={!selectedFile}
                      >
                        Clear
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Progress States */}
              <AnimatePresence>
                {(state === "uploading" || state === "analyzing") && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-surface-1 rounded-lg p-6 border border-border"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                          <Component className="w-4 h-4 text-primary animate-spin" />
                        </div>
                        <div>
                          <h3 className="font-medium text-foreground">
                            {state === "uploading"
                              ? "Uploading Contract"
                              : "Analyzing Content"}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {state === "uploading"
                              ? "Securely uploading your document..."
                              : "Extracting clauses and assessing risks..."}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Progress
                          </span>
                          <span className="text-foreground">
                            {state === "uploading"
                              ? `${uploadProgress}%`
                              : `${analysisProgress}%`}
                          </span>
                        </div>
                        <Progress
                          value={
                            state === "uploading"
                              ? uploadProgress
                              : analysisProgress
                          }
                          className="h-2"
                        />
                      </div>

                      <div className="flex justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleClear}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Results */}
              <AnimatePresence>
                {state === "success" && result && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    {/* Summary Card */}
                    <div className="bg-surface-1 rounded-lg p-6 border border-border">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-foreground mb-2">
                            Analysis Summary
                          </h3>
                          <p className="text-muted-foreground text-sm">
                            {result.summary}
                          </p>
                        </div>
                        <div className="ml-4 text-center">
                          <div className="text-2xl font-bold text-foreground">
                            {result.riskScore}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Risk Score
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">Termination Clauses</Badge>
                        <Badge variant="secondary">Payment Terms</Badge>
                        <Badge variant="secondary">Liability Limits</Badge>
                      </div>
                    </div>

                    {/* Expandable Sections */}
                    <Accordion type="multiple" className="space-y-4">
                      <AccordionItem
                        value="clauses"
                        className="bg-surface-1 rounded-lg border border-border px-6"
                      >
                        <AccordionTrigger className="text-foreground hover:no-underline">
                          <div className="flex items-center space-x-2">
                            <Grid2x2X className="w-4 h-4" />
                            <span>Key Clauses ({result.clauses.length})</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pb-4 space-y-3">
                          {result.clauses.map((clause, index) => (
                            <div
                              key={index}
                              className="p-3 bg-surface-2 rounded border border-border"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium text-foreground text-sm">
                                  {clause.type}
                                </span>
                                <div className="flex items-center space-x-2">
                                  <Badge
                                    variant="secondary"
                                    className={getRiskColor(clause.risk)}
                                  >
                                    {clause.risk.toUpperCase()}
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    {Math.round(clause.confidence * 100)}% conf.
                                  </Badge>
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground mb-3">
                                {clause.text}
                              </p>
                              <div className="flex space-x-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    handleCopyToClipboard(clause.text)
                                  }
                                >
                                  Copy
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleShowSource(clause.text)}
                                >
                                  Show Source
                                </Button>
                              </div>
                            </div>
                          ))}
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem
                        value="obligations"
                        className="bg-surface-1 rounded-lg border border-border px-6"
                      >
                        <AccordionTrigger className="text-foreground hover:no-underline">
                          <div className="flex items-center space-x-2">
                            <FileCheck className="w-4 h-4" />
                            <span>
                              Obligations & Deadlines (
                              {result.obligations.length})
                            </span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pb-4 space-y-3">
                          {result.obligations.map((obligation, index) => (
                            <div
                              key={index}
                              className="p-3 bg-surface-2 rounded border border-border"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <Badge
                                  variant="secondary"
                                  className={getRiskColor(obligation.severity)}
                                >
                                  {obligation.severity.toUpperCase()}
                                </Badge>
                                {obligation.dueDate && (
                                  <span className="text-xs text-muted-foreground">
                                    Due: {obligation.dueDate}
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-foreground">
                                {obligation.description}
                              </p>
                            </div>
                          ))}
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem
                        value="risks"
                        className="bg-surface-1 rounded-lg border border-border px-6"
                      >
                        <AccordionTrigger className="text-foreground hover:no-underline">
                          <div className="flex items-center space-x-2">
                            <FileX className="w-4 h-4" />
                            <span>
                              Risks & Recommendations ({result.risks.length})
                            </span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pb-4 space-y-3">
                          {result.risks.map((risk, index) => (
                            <div
                              key={index}
                              className="p-3 bg-surface-2 rounded border border-border"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <Badge
                                  variant="secondary"
                                  className={getRiskColor(risk.severity)}
                                >
                                  {risk.severity.toUpperCase()} RISK
                                </Badge>
                              </div>
                              <p className="text-sm text-foreground mb-2">
                                {risk.description}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                <strong>Recommendation:</strong>{" "}
                                {risk.recommendation}
                              </p>
                            </div>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>

                    <div className="flex justify-center">
                      <Button onClick={handleClear} variant="outline">
                        Start New Analysis
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Error State */}
              <AnimatePresence>
                {state === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-destructive/10 border border-destructive/20 rounded-lg p-6"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center">
                        <FileX className="w-4 h-4 text-destructive" />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">
                          Analysis Failed
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {error ||
                            "An unexpected error occurred during analysis."}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <Button onClick={handleRetry} size="sm">
                        Retry Analysis
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleClear}>
                        Start Over
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Secondary Column */}
            <div className="space-y-6">
              {/* Quick Actions */}
              {result && (
                <Card className="bg-surface-1 border-border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-foreground flex items-center">
                      <PanelRight className="w-4 h-4 mr-2" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() =>
                        handleCopyToClipboard(JSON.stringify(result, null, 2))
                      }
                    >
                      Download JSON
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => handleCopyToClipboard(result.summary)}
                    >
                      Copy Summary
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start"
                      onClick={handleClear}
                    >
                      Start New Analysis
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Analysis Metadata */}
              {result && (
                <Card className="bg-surface-1 border-border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-foreground">
                      Analysis Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-xs space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">File:</span>
                        <span className="text-foreground truncate ml-2">
                          {result.metadata.filename}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Date:</span>
                        <span className="text-foreground">
                          {result.metadata.uploadDate}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Duration:</span>
                        <span className="text-foreground">
                          {result.metadata.duration}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Model:</span>
                        <span className="text-foreground">
                          {result.metadata.modelVersion}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Help & Disclaimers */}
              <Card className="bg-surface-1 border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-foreground">
                    Important Notes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground space-y-2">
                    <p>
                      This analysis is for informational purposes only and
                      should not replace legal advice.
                    </p>
                    <p>
                      Documents are processed securely and not stored
                      permanently.
                    </p>
                    <p>
                      Always consult with qualified legal professionals before
                      making contract decisions.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Source Modal */}
      <Dialog open={showSourceModal} onOpenChange={setShowSourceModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Source Excerpt</DialogTitle>
          </DialogHeader>
          <div className="max-h-96 overflow-y-auto">
            <div className="bg-surface-1 rounded p-4 border border-border">
              <p className="text-sm text-foreground whitespace-pre-wrap">
                {selectedClause}
              </p>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() =>
                selectedClause && handleCopyToClipboard(selectedClause)
              }
            >
              Copy Text
            </Button>
            <Button onClick={() => setShowSourceModal(false)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
