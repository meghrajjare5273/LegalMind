"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function ContractReview() {
  const [contractText, setContractText] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://your-fastapi-url/analyze_contract",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Add authentication token here if implemented
          },
          body: JSON.stringify({ text: contractText }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to analyze contract");
      }
      const data = await response.json();
      setAnalysis(data.analysis);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-3xl font-bold mb-8">Contract Review</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={contractText}
          onChange={(e) => setContractText(e.target.value)}
          placeholder="Paste your contract text here..."
          className="w-full h-64 p-4 border rounded"
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Analyzing..." : "Analyze Contract"}
        </Button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {analysis && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Analysis Results</h2>
          {analysis.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-100 p-4 rounded mb-4"
            >
              <p>
                <strong>Sentence:</strong> {item.sentence}
              </p>
              <p>
                <strong>Risk:</strong> {item.risk}
              </p>
              <p>
                <strong>Explanation:</strong> {item.explanation}
              </p>
              <p>
                <strong>Negotiation Tip:</strong> {item.negotiation_tip}
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
