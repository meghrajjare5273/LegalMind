// lib/api.ts
import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_RENDER_API_URL // "http://127.0.0.1:8000";

// Create axios instance with default config
const api = axios.create({
  //   baseURL: API_BASE,
  //   timeout: 30000,
});

// Simple error handler
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleError = (error: any) => {
  console.error("Full error object:", error);
  console.error("Error response:", error.response);
  console.error("Error request:", error.request);
  console.error("Error message:", error.message);

  const message =
    error.response?.data?.detail ||
    error.response?.data?.error ||
    error.message ||
    "Something went wrong";
  console.error("Final error message:", message);
  throw new Error(message);
};

// Add error interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    handleError(error);
    return Promise.reject(error);
  }
);

// API Functions
export const apiService = {
  // RAG Query
  async queryRAG(query: string) {
    try {
      const { data } = await api.post("/api/rag", { query });
      return data;
    } catch (error) {
      throw error;
    }
  },

  // Upload Documents
  async extractAndAnalyze(
    file: File
  ): Promise<EnhancedExtractAndAnalyzeResponse> {
    try {
      if (!API_BASE) {
        throw new Error(
          "API configuration is missing. Please check environment variables."
        );
      }

      if (file.type !== "application/pdf") {
        throw new Error("File must be a PDF");
      }

      const formData = new FormData();
      formData.append("file", file);

      const { data } = await api.post(
        `${API_BASE}/extract_and_analyze`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          timeout: 600000,
        }
      );

      return data;
    } catch (error) {
      throw error;
    }
  },
};

// Types (optional - you can move these to a separate types file)
export interface RAGResponse {
  response: string;
  contexts: string[];
  success: boolean;
}

export interface EnhancedRiskAnalysis {
  sentence: string;
  risk_category: string;
  risk_level: "HIGH" | "MEDIUM" | "LOW";
  risk_type: string;
  description: string;
  specific_concerns: string[];
  negotiation_strategies: string[];
  priority_score: number; // 1-10 scale
}

export interface ContractSection {
  title: string;
  content: string;
  risk_count: number;
}

export interface RiskSummary {
  total_risks: number;
  high_risk_count: number;
  medium_risk_count: number;
  low_risk_count: number;
  overall_risk_level: "HIGH" | "MEDIUM-HIGH" | "MEDIUM" | "LOW";
}

export interface EnhancedExtractAndAnalyzeResponse {
  filename: string;
  extracted_text: string;
  analysis: EnhancedRiskAnalysis[];
  summary: RiskSummary;
  sections: ContractSection[];
  recommendations: string[];
  overall_summary: string
}
