// lib/api.ts
import axios from "axios";

const API_BASE = process.env.RENDER_API_URL; // || "http://127.0.0.1:8000";

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
  async extractAndAnalyze(file: File) {
    try {
      // Validate file type
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
          // timeout: 60000,
        }
      );

      return data;
    } catch (error) {
      throw error;
    }
  },
};

// Types matching your FastAPI response
export interface RiskAnalysis {
  sentence: string;
  risk: string;
  explanation: string;
  negotiation_tip: string;
}

export interface ExtractAndAnalyzeResponse {
  filename: string;
  extracted_text: string;
  analysis: RiskAnalysis[];
  risks_found: number;
}
// Types (optional - you can move these to a separate types file)
export interface RAGResponse {
  response: string;
  contexts: string[];
  success: boolean;
}
