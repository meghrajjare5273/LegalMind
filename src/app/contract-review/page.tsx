/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Upload,
  Loader2,
  AlertTriangle,
  CheckCircle,
  Lightbulb,
  Shield,
  TrendingUp,
  Lock,
  DollarSign,
  Brain,
  Target,
  Eye,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import {
  apiService,
  EnhancedExtractAndAnalyzeResponse,
  EnhancedRiskAnalysis,
} from "@/services/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Chart } from "react-chartjs-2";
import "chart.js/auto";

export default function ContractReviewPage() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] =
    useState<EnhancedExtractAndAnalyzeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"risks" | "sections" | "text">(
    "risks"
  );

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
        return "bg-red-900/20 border-red-800/30 text-red-400";
      case "MEDIUM":
        return "bg-orange-900/20 border-orange-800/30 text-orange-400";
      case "LOW":
        return "bg-yellow-900/20 border-yellow-800/30 text-yellow-400";
      default:
        return "bg-gray-900/20 border-gray-800/30 text-gray-400";
    }
  };

  const getRiskCategoryIcon = (category: string) => {
    switch (category) {
      case "Financial Risk":
        return <DollarSign className="w-4 h-4" />;
      case "Legal Risk":
        return <Shield className="w-4 h-4" />;
      case "Contract Continuity":
        return <Target className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getOverallRiskColor = (level: string) => {
    switch (level) {
      case "HIGH":
        return "text-red-400";
      case "MEDIUM":
        return "text-yellow-400";
      case "LOW":
        return "text-green-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <header className="border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-[#03366D] to-[#0A2536] rounded-lg flex items-center justify-center">
                  <Brain className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h1 className="text-white font-semibold">
                    Smart Contract Review
                  </h1>
                  <p className="text-xs text-gray-400">
                    AI-powered legal contract analysis
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>Secure Session</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <Card className="bg-gray-900/50 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Upload PDF Contract</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-gray-300 text-sm mb-2 block">
                  Select PDF Contract
                </label>
                <Input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  disabled={isLoading}
                  className="bg-gray-800/50 border-white/20 text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-[#03366D] file:text-white hover:file:bg-[#0A2536]"
                />
                {file && (
                  <p className="text-gray-400 text-sm mt-2">
                    Selected: {file.name}
                  </p>
                )}
              </div>
              {error && (
                <div className="bg-red-900/20 border border-red-800/30 text-red-400 px-4 py-3 rounded">
                  {error}
                </div>
              )}
              <Button
                type="submit"
                disabled={isLoading || !file}
                className="w-full bg-gradient-to-r from-[#03366D] to-[#0A2536] hover:from-[#0A2536] hover:to-[#03366D] text-white"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing Contract...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Analyze Contract
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 space-y-6"
          >
            <Card className="bg-gray-900/50 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Brain className="w-5 h-5 mr-2" />
                  Contract Analysis Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div
                      className={`text-3xl font-bold ${getOverallRiskColor(
                        result.summary.overall_risk_level
                      )}`}
                    >
                      {result.summary.overall_risk_level}
                    </div>
                    <div className="text-gray-400 text-sm">
                      Overall Risk Level
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">
                      {result.summary.total_risks}
                    </div>
                    <div className="text-gray-400 text-sm">
                      Total Risks Found
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-400">
                      {result.summary.high_risk_count}
                    </div>
                    <div className="text-gray-400 text-sm">High Priority</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-400">
                      {result.summary.medium_risk_count}
                    </div>
                    <div className="text-gray-400 text-sm">Medium Priority</div>
                  </div>
                </div>
                <div className="mt-6">
                  <h4 className="text-white font-medium mb-4">
                    Risk Distribution
                  </h4>
                  <div className="h-64">
                    <Chart
                      type="pie"
                      data={{
                        labels: ["High", "Medium", "Low"],
                        datasets: [
                          {
                            data: [
                              result.summary.high_risk_count,
                              result.summary.medium_risk_count,
                              result.summary.low_risk_count,
                            ],
                            backgroundColor: ["#ff4444", "#ffbb33", "#33bb33"],
                          },
                        ],
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: { position: "top" },
                          title: {
                            display: true,
                            text: "Risk Level Distribution",
                          },
                        },
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {result.overall_summary && (
              <Card className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-800/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Lightbulb className="w-5 h-5 mr-2 text-yellow-400" />
                    Overall Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-sm">
                    {result.overall_summary}
                  </p>
                </CardContent>
              </Card>
            )}

            <div className="flex space-x-1 bg-gray-900/50 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab("risks")}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "risks"
                    ? "bg-[#03366D] text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <AlertTriangle className="w-4 h-4 inline mr-2" />
                Risk Analysis
              </button>
              <button
                onClick={() => setActiveTab("sections")}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "sections"
                    ? "bg-[#03366D] text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <BookOpen className="w-4 h-4 inline mr-2" />
                Contract Sections
              </button>
              <button
                onClick={() => setActiveTab("text")}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "text"
                    ? "bg-[#03366D] text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Eye className="w-4 h-4 inline mr-2" />
                Extracted Text
              </button>
            </div>

            {activeTab === "risks" && (
              <>
                {result.analysis.length > 0 ? (
                  <Card className="bg-gray-900/50 border-white/10">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <AlertTriangle className="w-5 h-5 mr-2 text-red-400" />
                        Detailed Risk Analysis ({result.analysis.length} risks
                        found)
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {result.analysis.map(
                          (risk: EnhancedRiskAnalysis, index: number) => (
                            <div
                              key={index}
                              className={`border rounded-lg p-6 ${getRiskLevelColor(
                                risk.risk_level
                              )}`}
                            >
                              <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                  {getRiskCategoryIcon(risk.risk_category)}
                                  <div>
                                    <h4 className="font-semibold text-lg">
                                      {risk.risk_type}
                                    </h4>
                                    <p className="text-sm opacity-80">
                                      {risk.risk_category}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Badge
                                    variant="outline"
                                    className={`${getRiskLevelColor(
                                      risk.risk_level
                                    )} border-current`}
                                  >
                                    {risk.risk_level}
                                  </Badge>
                                  <Badge
                                    variant="outline"
                                    className="border-gray-500 text-gray-300"
                                  >
                                    Priority: {risk.priority_score}/10
                                  </Badge>
                                </div>
                              </div>
                              <div className="mb-4">
                                <p className="text-sm mb-2 opacity-90">
                                  {risk.description}
                                </p>
                              </div>
                              <div className="mb-4">
                                <h5 className="text-sm font-medium mb-2 opacity-90">
                                  Relevant Contract Text:
                                </h5>
                                <div className="bg-black/30 p-4 rounded-md border border-current/20">
                                  <p className="text-sm italic">
                                    &quot;{risk.sentence}&quot;
                                  </p>
                                </div>
                              </div>
                              {risk.specific_concerns?.length > 0 && (
                                <div className="mb-4">
                                  <h5 className="text-sm font-medium mb-2 opacity-90 flex items-center">
                                    <AlertTriangle className="w-3 h-3 mr-1" />
                                    Specific Concerns:
                                  </h5>
                                  <div className="space-y-1">
                                    {risk.specific_concerns.map(
                                      (concern, idx) => (
                                        <div
                                          key={idx}
                                          className="flex items-start space-x-2"
                                        >
                                          <div className="w-1.5 h-1.5 bg-current rounded-full mt-2 flex-shrink-0" />
                                          <p className="text-sm">{concern}</p>
                                        </div>
                                      )
                                    )}
                                  </div>
                                </div>
                              )}
                              <div>
                                <h5 className="text-sm font-medium mb-2 opacity-90 flex items-center">
                                  <Lightbulb className="w-3 h-3 mr-1" />
                                  Negotiation Strategies:
                                </h5>
                                <div className="space-y-1">
                                  {risk.negotiation_strategies.map(
                                    (strategy, idx) => (
                                      <div
                                        key={idx}
                                        className="flex items-start space-x-2"
                                      >
                                        <div className="w-1.5 h-1.5 bg-current rounded-full mt-2 flex-shrink-0" />
                                        <p className="text-sm">{strategy}</p>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                              <div className="mt-4">
                                <Button
                                  onClick={() =>
                                    (window.location.href = `/chat?query=Explain this clause: ${encodeURIComponent(
                                      risk.sentence
                                    )}`)
                                  }
                                  className="bg-[#03366D] text-white hover:bg-[#0A2536]"
                                >
                                  Ask for More Details
                                </Button>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="bg-gray-900/50 border-white/10">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                        No Significant Risks Detected
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300">
                        Great news! No significant risk patterns were detected
                        in this contract. However, we recommend having any
                        contract reviewed by a qualified legal professional
                        before signing.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </>
            )}

            {activeTab === "sections" && (
              <Card className="bg-gray-900/50 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Contract Sections Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {result.sections && result.sections.length > 0 ? (
                    <div className="space-y-4">
                      {result.sections.map((section, index) => (
                        <div
                          key={index}
                          className="border border-white/10 rounded-lg p-4"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-white font-medium">
                              {section.title}
                            </h4>
                            <Badge
                              variant="outline"
                              className="border-gray-500 text-gray-300"
                            >
                              {section.risk_count} risk(s)
                            </Badge>
                          </div>
                          <div className="bg-gray-800/50 p-3 rounded text-sm text-gray-300">
                            {section.content}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400">
                      No specific contract sections were identified.
                    </p>
                  )}
                </CardContent>
              </Card>
            )}

            {activeTab === "text" && (
              <Card className="bg-gray-900/50 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Eye className="w-5 h-5 mr-2" />
                    Extracted Contract Text
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="max-h-96 overflow-y-auto bg-gray-800/50 p-4 rounded border border-white/10">
                    <pre className="whitespace-pre-wrap text-sm text-gray-300">
                      {result.extracted_text ||
                        "No text could be extracted from the PDF."}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        )}
      </div>

      <div className="border-t border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
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
