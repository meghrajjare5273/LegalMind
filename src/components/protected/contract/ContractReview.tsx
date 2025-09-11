/* eslint-disable react-hooks/exhaustive-deps */
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
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  Copy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
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

interface RiskAnalysis {
  sentence: string;
  risk_category: string;
  risk_level: string;
  risk_type: string;
  description: string;
  specific_concerns: string[];
  negotiation_strategies: string[];
  priority_score: number;
  confidence_score: number;
  legal_concepts: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  entities: any[];
  mitigation_strategies: string[];
  alternative_language: string;
  cost_implications: string;
}

interface ContractSection {
  title: string;
  content: string;
  risk_count: number;
  section_type: string;
}

interface RiskSummary {
  total_risks: number;
  critical_risk_count: number;
  high_risk_count: number;
  medium_risk_count: number;
  low_risk_count: number;
  overall_risk_level: string;
  risk_distribution: Record<string, number>;
}

interface AnalysisResult {
  filename: string;
  extracted_text: string;
  analysis: RiskAnalysis[];
  summary: RiskSummary;
  sections: ContractSection[];
  recommendations: string[];
  overall_summary: string;
  document_complexity_score: number;
  party_power_balance: number;
  processing_time?: number;
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

    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size must be less than 10MB");
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

  const analyzeContract = useCallback(async () => {
    if (!selectedFile) return;

    setState("uploading");
    setUploadProgress(0);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const response = await fetch("/api/analyze-contract", {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Analysis failed");
      }

      setState("analyzing");

      const analysisResult: AnalysisResult = await response.json();

      setResult(analysisResult);
      setState("success");
      toast.success("Analysis completed successfully!");
    } catch (error) {
      console.error("Analysis error:", error);
      setError(error instanceof Error ? error.message : "Analysis failed");
      setState("error");
      toast.error("Analysis failed. Please try again.");
    }
  }, [selectedFile]);

  const handleClear = useCallback(() => {
    setSelectedFile(null);
    setState("initial");
    setResult(null);
    setError(null);
    setUploadProgress(0);
  }, []);

  const handleRetry = useCallback(() => {
    setError(null);
    if (selectedFile) {
      analyzeContract();
    }
  }, [selectedFile, analyzeContract]);

  const handleCopyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  }, []);

  const handleShowSource = useCallback((clauseText: string) => {
    setSelectedClause(clauseText);
    setShowSourceModal(true);
  }, []);

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "critical":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      case "high":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "critical":
        return <XCircle className="w-4 h-4" />;
      case "high":
        return <AlertTriangle className="w-4 h-4" />;
      case "medium":
        return <Info className="w-4 h-4" />;
      case "low":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Info className="w-4 h-4" />;
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

        <CardContent className="space-y-6">
          <AnimatePresence mode="wait">
            {state === "initial" && (
              <motion.div
                key="initial"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12"
              >
                <div
                  className={`border-2 border-dashed rounded-lg p-8 transition-colors ${
                    isDragOver
                      ? "border-primary bg-primary/5"
                      : "border-muted-foreground/25 hover:border-primary/50"
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    Upload Contract Document
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Drag and drop your PDF file here, or click to browse
                  </p>
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                  >
                    <FileType2 className="w-4 h-4 mr-2" />
                    Select PDF File
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf"
                    onChange={handleFileInputChange}
                    className="hidden"
                  />
                  <p className="text-sm text-muted-foreground mt-4">
                    Maximum file size: 10MB
                  </p>
                </div>
              </motion.div>
            )}

            {state === "selected" && (
              <motion.div
                key="selected"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <Card className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <FileCheck className="w-8 h-8 text-green-600 mt-1" />
                      <div>
                        <h4 className="font-medium">{selectedFile?.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {selectedFile && formatFileSize(selectedFile.size)} •
                          PDF Document
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button onClick={handleClear} variant="outline" size="sm">
                        <FileX className="w-4 h-4 mr-1" />
                        Remove
                      </Button>
                      <Button onClick={analyzeContract} size="sm">
                        <FileScan className="w-4 h-4 mr-1" />
                        Analyze Contract
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            {(state === "uploading" || state === "analyzing") && (
              <motion.div
                key="processing"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <Card className="p-6">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <FileScan className="w-8 h-8 text-primary" />
                      </motion.div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">
                        {state === "uploading"
                          ? "Uploading Document"
                          : "Analyzing Contract"}
                      </h3>
                      <p className="text-muted-foreground">
                        {state === "uploading"
                          ? "Please wait while we upload your document..."
                          : "AI is analyzing your contract for risks and recommendations..."}
                      </p>
                    </div>
                    {state === "uploading" && (
                      <div className="w-full max-w-xs mx-auto">
                        <Progress value={uploadProgress} className="h-2" />
                        <p className="text-sm text-muted-foreground mt-2">
                          {uploadProgress}% complete
                        </p>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            )}

            {state === "error" && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 mx-auto bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
                  <XCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-lg font-medium mb-2">Analysis Failed</h3>
                <p className="text-muted-foreground mb-4">
                  {error || "An unexpected error occurred during analysis."}
                </p>
                <div className="flex justify-center space-x-3">
                  <Button onClick={handleClear} variant="outline">
                    Start Over
                  </Button>
                  <Button onClick={handleRetry}>Try Again</Button>
                </div>
              </motion.div>
            )}

            {state === "success" && result && (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Total Risks
                          </p>
                          <p className="text-2xl font-bold">
                            {result.summary.total_risks}
                          </p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                          <Component className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Risk Level
                          </p>
                          <Badge
                            className={getRiskColor(
                              result.summary.overall_risk_level
                            )}
                          >
                            {result.summary.overall_risk_level}
                          </Badge>
                        </div>
                        <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                          {getRiskIcon(result.summary.overall_risk_level)}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Complexity
                          </p>
                          <div className="flex items-center space-x-2">
                            <Progress
                              value={result.document_complexity_score * 100}
                              className="w-16 h-2"
                            />
                            <span className="text-sm">
                              {Math.round(
                                result.document_complexity_score * 100
                              )}
                              %
                            </span>
                          </div>
                        </div>
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                          <Grid2x2X className="w-6 h-6 text-green-600 dark:text-green-400" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Risk Analysis */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      Risk Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="space-y-2">
                      {result.analysis.map((risk, index) => (
                        <AccordionItem
                          key={index}
                          value={`risk-${index}`}
                          className="border rounded-lg px-4"
                        >
                          <AccordionTrigger className="hover:no-underline">
                            <div className="flex items-center justify-between w-full mr-4">
                              <div className="flex items-center gap-3">
                                <Badge
                                  className={getRiskColor(risk.risk_level)}
                                >
                                  {risk.risk_level}
                                </Badge>
                                <span className="font-medium text-left">
                                  {risk.risk_category}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">
                                  Priority: {risk.priority_score}/10
                                </span>
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pt-4 space-y-4">
                            <div>
                              <h5 className="font-medium mb-2">Description</h5>
                              <p className="text-sm text-muted-foreground">
                                {risk.description}
                              </p>
                            </div>

                            <div>
                              <h5 className="font-medium mb-2">Clause Text</h5>
                              <div className="bg-muted p-3 rounded-md text-sm">
                                {risk.sentence.length > 200
                                  ? `${risk.sentence.substring(0, 200)}...`
                                  : risk.sentence}
                                {risk.sentence.length > 200 && (
                                  <Button
                                    variant="link"
                                    size="sm"
                                    className="p-0 h-auto"
                                    onClick={() =>
                                      handleShowSource(risk.sentence)
                                    }
                                  >
                                    <PanelRight className="w-3 h-3 mr-1" />
                                    View Full Text
                                  </Button>
                                )}
                              </div>
                            </div>

                            {risk.specific_concerns.length > 0 && (
                              <div>
                                <h5 className="font-medium mb-2">
                                  Specific Concerns
                                </h5>
                                <ul className="list-disc list-inside space-y-1">
                                  {risk.specific_concerns.map(
                                    (concern, idx) => (
                                      <li
                                        key={idx}
                                        className="text-sm text-muted-foreground"
                                      >
                                        {concern}
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            )}

                            {risk.negotiation_strategies.length > 0 && (
                              <div>
                                <h5 className="font-medium mb-2">
                                  Recommended Actions
                                </h5>
                                <ul className="list-disc list-inside space-y-1">
                                  {risk.negotiation_strategies.map(
                                    (strategy, idx) => (
                                      <li
                                        key={idx}
                                        className="text-sm text-muted-foreground"
                                      >
                                        {strategy}
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            )}

                            {risk.alternative_language && (
                              <div>
                                <h5 className="font-medium mb-2">
                                  Alternative Language
                                </h5>
                                <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded-md text-sm">
                                  {risk.alternative_language}
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="ml-2 p-1 h-auto"
                                    onClick={() =>
                                      handleCopyToClipboard(
                                        risk.alternative_language
                                      )
                                    }
                                  >
                                    <Copy className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>
                            )}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>

                {/* Recommendations */}
                {result.recommendations.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        Recommendations
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {result.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                                {index + 1}
                              </span>
                            </div>
                            <p className="text-sm">{rec}</p>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                {/* Actions */}
                <div className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    Analysis completed in{" "}
                    {result.processing_time
                      ? `${result.processing_time.toFixed(2)}s`
                      : "< 1s"}
                  </div>
                  <div className="flex space-x-3">
                    <Button onClick={handleClear} variant="outline">
                      Analyze Another Contract
                    </Button>
                    <Button
                      onClick={() => {
                        const exportData = {
                          filename: result.filename,
                          summary: result.overall_summary,
                          risks: result.analysis.length,
                          recommendations: result.recommendations,
                        };
                        handleCopyToClipboard(
                          JSON.stringify(exportData, null, 2)
                        );
                      }}
                    >
                      Export Report
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Source Modal */}
      <Dialog open={showSourceModal} onOpenChange={setShowSourceModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Full Clause Text</DialogTitle>
          </DialogHeader>
          <div className="max-h-96 overflow-y-auto">
            <div className="bg-muted p-4 rounded-md text-sm whitespace-pre-wrap">
              {selectedClause}
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() =>
                selectedClause && handleCopyToClipboard(selectedClause)
              }
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy Text
            </Button>
            <Button onClick={() => setShowSourceModal(false)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
