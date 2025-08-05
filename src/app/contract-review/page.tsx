"use client";

import type React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Upload,
  Loader2,
  AlertTriangle,
  CheckCircle,
  FileText,
  Shield,
  TrendingUp,
  Brain,
  Target,
  Eye,
  BookOpen,
  Download,
  Share2,
  Zap,
  Clock,
  Users,
} from "lucide-react";
import Link from "next/link";
import {
  apiService,
  type EnhancedExtractAndAnalyzeResponse,
  type EnhancedRiskAnalysis,
} from "@/services/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function ContractReviewPage() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] =
    useState<EnhancedExtractAndAnalyzeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "overview" | "risks" | "sections" | "text"
  >("overview");
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== "application/pdf") {
        setError("Please upload a PDF file only.");
        return;
      }
      setFile(selectedFile);
      setError(null);
      setResult(null);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type !== "application/pdf") {
        setError("Please upload a PDF file only.");
        return;
      }
      setFile(droppedFile);
      setError(null);
      setResult(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("Please upload a PDF file.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await apiService.extractAndAnalyze(file);
      setResult(response);
      setActiveTab("overview");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while processing the contract."
      );
      console.error("Contract analysis error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case "HIGH":
        return "text-red-500 bg-red-50 border-red-200";
      case "MEDIUM":
        return "text-orange-500 bg-orange-50 border-orange-200";
      case "LOW":
        return "text-yellow-500 bg-yellow-50 border-yellow-200";
      default:
        return "text-gray-500 bg-gray-50 border-gray-200";
    }
  };

  // const getRiskProgress = (level: string) => {
  //   switch (level) {
  //     case "HIGH":
  //       return 90;
  //     case "MEDIUM":
  //       return 60;
  //     case "LOW":
  //       return 30;
  //     default:
  //       return 0;
  //   }
  // };

  const getOverallRiskColor = (level: string) => {
    switch (level) {
      case "HIGH":
        return "text-red-600";
      case "MEDIUM":
        return "text-orange-600";
      case "LOW":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Streamlined Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-gray-100"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-gray-900">
                    AI Contract Analyzer
                  </h1>
                  <p className="text-xs text-gray-500">
                    Intelligent document review powered by AI
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="hidden sm:flex items-center space-x-2 text-xs text-gray-500">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span>Secure & Confidential</span>
              </div>
              {result && (
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!result ? (
          /* Upload Section */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Upload Your Contract
              </h2>
              <p className="text-gray-600 text-lg">
                Get instant AI-powered analysis and risk assessment
              </p>
            </div>

            <Card className="border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div
                    className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                      dragActive
                        ? "border-blue-400 bg-blue-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      disabled={isLoading}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="space-y-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                        <Upload className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-lg font-medium text-gray-900">
                          Drop your PDF here or click to browse
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Maximum file size: 10MB
                        </p>
                      </div>
                    </div>
                  </div>

                  {file && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-blue-50 border border-blue-200 rounded-lg p-4"
                    >
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-blue-600" />
                        <div className="flex-1">
                          <p className="font-medium text-blue-900">
                            {file.name}
                          </p>
                          <p className="text-sm text-blue-600">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      </div>
                    </motion.div>
                  )}

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center space-x-2"
                    >
                      <AlertTriangle className="w-5 h-5" />
                      <span>{error}</span>
                    </motion.div>
                  )}

                  <Button
                    type="submit"
                    disabled={isLoading || !file}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 text-lg font-semibold"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Analyzing Contract...
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5 mr-2" />
                        Analyze Contract
                      </>
                    )}
                  </Button>
                </form>

                {/* Features Preview */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    What you&apos;ll get:
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      {
                        icon: <Shield className="w-5 h-5 text-blue-600" />,
                        title: "Risk Assessment",
                        description:
                          "Identify potential legal risks and issues",
                      },
                      {
                        icon: <Target className="w-5 h-5 text-green-600" />,
                        title: "Key Terms",
                        description:
                          "Extract important clauses and obligations",
                      },
                      {
                        icon: (
                          <TrendingUp className="w-5 h-5 text-purple-600" />
                        ),
                        title: "Recommendations",
                        description: "Get actionable insights and suggestions",
                      },
                    ].map((feature, index) => (
                      <div key={index} className="text-center p-4">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                          {feature.icon}
                        </div>
                        <h4 className="font-medium text-gray-900 mb-1">
                          {feature.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {feature.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          /* Results Section */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Results Header */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Analysis Complete
                  </h2>
                  <p className="text-gray-600">Contract: {result.filename}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-500">
                    Analyzed just now
                  </span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div
                    className={`text-2xl font-bold ${getOverallRiskColor(
                      result.summary.overall_risk_level
                    )}`}
                  >
                    {result.summary.overall_risk_level}
                  </div>
                  <div className="text-sm text-gray-600">Risk Level</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">
                    {result.summary.total_risks}
                  </div>
                  <div className="text-sm text-gray-600">Issues Found</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">
                    {result.summary.high_risk_count}
                  </div>
                  <div className="text-sm text-gray-600">High Priority</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">
                    {result.summary.medium_risk_count}
                  </div>
                  <div className="text-sm text-gray-600">Medium Priority</div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="flex border-b border-gray-200">
                {[
                  {
                    id: "overview",
                    label: "Overview",
                    icon: <Eye className="w-4 h-4" />,
                  },
                  {
                    id: "risks",
                    label: "Risk Analysis",
                    icon: <AlertTriangle className="w-4 h-4" />,
                  },
                  {
                    id: "sections",
                    label: "Sections",
                    icon: <BookOpen className="w-4 h-4" />,
                  },
                  {
                    id: "text",
                    label: "Full Text",
                    icon: <FileText className="w-4 h-4" />,
                  },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? "bg-blue-50 text-blue-700 border-b-2 border-blue-600"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              <div className="p-6">
                <AnimatePresence mode="wait">
                  {activeTab === "overview" && (
                    <motion.div
                      key="overview"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-6"
                    >
                      {result.overall_summary && (
                        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                          <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                              <Brain className="w-5 h-5 text-blue-600" />
                              <span>AI Summary</span>
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-700 leading-relaxed">
                              {result.overall_summary}
                            </p>
                          </CardContent>
                        </Card>
                      )}

                      {/* Risk Distribution */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Risk Distribution</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-red-700">
                                High Risk
                              </span>
                              <span className="text-sm text-gray-600">
                                {result.summary.high_risk_count}
                              </span>
                            </div>
                            <Progress
                              value={
                                (result.summary.high_risk_count /
                                  result.summary.total_risks) *
                                100
                              }
                              className="h-2"
                            />
                          </div>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-orange-700">
                                Medium Risk
                              </span>
                              <span className="text-sm text-gray-600">
                                {result.summary.medium_risk_count}
                              </span>
                            </div>
                            <Progress
                              value={
                                (result.summary.medium_risk_count /
                                  result.summary.total_risks) *
                                100
                              }
                              className="h-2"
                            />
                          </div>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-yellow-700">
                                Low Risk
                              </span>
                              <span className="text-sm text-gray-600">
                                {result.summary.low_risk_count}
                              </span>
                            </div>
                            <Progress
                              value={
                                (result.summary.low_risk_count /
                                  result.summary.total_risks) *
                                100
                              }
                              className="h-2"
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}

                  {activeTab === "risks" && (
                    <motion.div
                      key="risks"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-4"
                    >
                      {result.analysis.length > 0 ? (
                        result.analysis.map(
                          (risk: EnhancedRiskAnalysis, index: number) => (
                            <Card
                              key={index}
                              className="border-l-4 border-l-red-400"
                            >
                              <CardContent className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-2">
                                      <h3 className="text-lg font-semibold text-gray-900">
                                        {risk.risk_type}
                                      </h3>
                                      <Badge
                                        className={getRiskLevelColor(
                                          risk.risk_level
                                        )}
                                      >
                                        {risk.risk_level}
                                      </Badge>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-2">
                                      {risk.risk_category}
                                    </p>
                                    <p className="text-gray-700 mb-4">
                                      {risk.description}
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-2xl font-bold text-gray-900">
                                      {risk.priority_score}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      Priority Score
                                    </div>
                                  </div>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                                    Relevant Contract Text:
                                  </h4>
                                  <p className="text-sm text-gray-700 italic">
                                    &quot;{risk.sentence}&quot;
                                  </p>
                                </div>

                                {risk.specific_concerns?.length > 0 && (
                                  <div className="mb-4">
                                    <h4 className="text-sm font-medium text-gray-900 mb-2">
                                      Specific Concerns:
                                    </h4>
                                    <ul className="space-y-1">
                                      {risk.specific_concerns.map(
                                        (concern, idx) => (
                                          <li
                                            key={idx}
                                            className="flex items-start space-x-2"
                                          >
                                            <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                                            <span className="text-sm text-gray-700">
                                              {concern}
                                            </span>
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  </div>
                                )}

                                <div className="mb-4">
                                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                                    Recommended Actions:
                                  </h4>
                                  <ul className="space-y-1">
                                    {risk.negotiation_strategies.map(
                                      (strategy, idx) => (
                                        <li
                                          key={idx}
                                          className="flex items-start space-x-2"
                                        >
                                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                                          <span className="text-sm text-gray-700">
                                            {strategy}
                                          </span>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>

                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    window.open(
                                      `/chat?query=${encodeURIComponent(
                                        `Explain this clause: ${risk.sentence}`
                                      )}`,
                                      "_blank"
                                    )
                                  }
                                >
                                  <Users className="w-4 h-4 mr-2" />
                                  Get Expert Advice
                                </Button>
                              </CardContent>
                            </Card>
                          )
                        )
                      ) : (
                        <Card className="bg-green-50 border-green-200">
                          <CardContent className="p-6 text-center">
                            <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-green-900 mb-2">
                              No Significant Risks Detected
                            </h3>
                            <p className="text-green-700">
                              Great news! No significant risk patterns were
                              detected in this contract.
                            </p>
                          </CardContent>
                        </Card>
                      )}
                    </motion.div>
                  )}

                  {activeTab === "sections" && (
                    <motion.div
                      key="sections"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-4"
                    >
                      {result.sections && result.sections.length > 0 ? (
                        result.sections.map((section, index) => (
                          <Card key={index}>
                            <CardHeader>
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-lg">
                                  {section.title}
                                </CardTitle>
                                <Badge variant="outline">
                                  {section.risk_count} risk(s)
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <div className="bg-gray-50 rounded-lg p-4">
                                <p className="text-sm text-gray-700 whitespace-pre-wrap">
                                  {section.content}
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                      ) : (
                        <Card>
                          <CardContent className="p-6 text-center text-gray-500">
                            No specific contract sections were identified.
                          </CardContent>
                        </Card>
                      )}
                    </motion.div>
                  )}

                  {activeTab === "text" && (
                    <motion.div
                      key="text"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <Card>
                        <CardHeader>
                          <CardTitle>Extracted Contract Text</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="max-h-96 overflow-y-auto bg-gray-50 rounded-lg p-4 border">
                            <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">
                              {result.extracted_text ||
                                "No text could be extracted from the PDF."}
                            </pre>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Footer Disclaimer */}
      <div className="border-t border-gray-200 bg-white/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-xs text-gray-500 text-center">
            This AI provides general information only and is not a substitute
            for professional legal advice. Always consult with a qualified
            attorney before making legal decisions.
          </p>
        </div>
      </div>
    </div>
  );
}
