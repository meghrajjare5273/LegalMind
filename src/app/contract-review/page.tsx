 
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Upload,
  FileText,
  Loader2,
  AlertTriangle,
  CheckCircle,
  Lightbulb,
} from "lucide-react";
import Link from "next/link";
import { apiService, ExtractAndAnalyzeResponse, RiskAnalysis } from "@/services/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ContractReviewPage() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<ExtractAndAnalyzeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];

      // Validate file type
      if (selectedFile.type !== "application/pdf") {
        setError("Please upload a PDF file only.");
        return;
      }

      setFile(selectedFile);
      setError(null);
      setResult(null); // Clear previous results
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

  const getRiskColor = (risk: string) => {
    const lowerRisk = risk.toLowerCase();
    if (
      lowerRisk.includes("liability") ||
      lowerRisk.includes("penalty") ||
      lowerRisk.includes("damages")
    ) {
      return "text-red-400 bg-red-900/20 border-red-800/30";
    } else if (
      lowerRisk.includes("termination") ||
      lowerRisk.includes("breach")
    ) {
      return "text-orange-400 bg-orange-900/20 border-orange-800/30";
    } else {
      return "text-yellow-400 bg-yellow-900/20 border-yellow-800/30";
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  <FileText className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h1 className="text-white font-semibold">Contract Review</h1>
                  <p className="text-xs text-gray-400">
                    Analyze your legal contracts
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

      {/* Main Content */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
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
                    Processing Contract...
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

        {/* Analysis Results */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 space-y-6"
          >
            {/* Summary Card */}
            <Card className="bg-gray-900/50 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Analysis Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">
                      {result.risks_found}
                    </div>
                    <div className="text-gray-400 text-sm">Risks Found</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">
                      {result.filename}
                    </div>
                    <div className="text-gray-400 text-sm">File Analyzed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">
                      {result.extracted_text.length > 0 ? "Yes" : "No"}
                    </div>
                    <div className="text-gray-400 text-sm">Text Extracted</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Risk Analysis */}
            {result.analysis.length > 0 ? (
              <Card className="bg-gray-900/50 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2 text-red-400" />
                    Risk Analysis ({result.risks_found} risks found)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {result.analysis.map(
                      (risk: RiskAnalysis, index: number) => (
                        <div
                          key={index}
                          className={`border rounded-lg p-4 ${getRiskColor(
                            risk.risk
                          )}`}
                        >
                          <div className="mb-3">
                            <h4 className="font-semibold mb-1 flex items-center">
                              <AlertTriangle className="w-4 h-4 mr-1" />
                              {risk.risk}
                            </h4>
                          </div>

                          <div className="mb-3">
                            <h5 className="text-sm font-medium mb-1 text-gray-300">
                              Relevant Text:
                            </h5>
                            <div className="bg-black/30 p-3 rounded text-sm">
                              &quot;{risk.sentence}&quot;
                            </div>
                          </div>

                          <div className="mb-3">
                            <h5 className="text-sm font-medium mb-1 text-gray-300">
                              Explanation:
                            </h5>
                            <p className="text-sm">{risk.explanation}</p>
                          </div>

                          <div>
                            <h5 className="text-sm font-medium mb-1 text-gray-300 flex items-center">
                              <Lightbulb className="w-3 h-3 mr-1" />
                              Negotiation Tip:
                            </h5>
                            <p className="text-sm">{risk.negotiation_tip}</p>
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
                    No Risks Detected
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    Great news! No specific risk keywords were detected in this
                    contract. However, we recommend having any contract reviewed
                    by a qualified legal professional.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Extracted Text */}
            <Card className="bg-gray-900/50 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Extracted Text</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="max-h-64 overflow-y-auto bg-gray-800/50 p-4 rounded border border-white/10">
                  <pre className="whitespace-pre-wrap text-sm text-gray-300">
                    {result.extracted_text ||
                      "No text could be extracted from the PDF."}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>

      {/* Footer Disclaimer */}
      <div className="border-t border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-xs text-gray-500 text-center">
            This AI provides general information only and is not a substitute
            for professional legal advice.
          </p>
        </div>
      </div>
    </div>
  );
}
