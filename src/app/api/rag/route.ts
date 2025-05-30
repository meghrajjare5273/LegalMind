import { NextRequest, NextResponse } from "next/server";
import { Pinecone } from "@pinecone-database/pinecone";
import { GoogleGenAI } from "@google/genai";

// Initialize Pinecone and Google Generative AI clients
const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY as string });
const index = pc.Index(process.env.PINECONE_INDEX_NAME as string);
const genai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });
const namespace = process.env.PUBLIC_PINECONE_NAMESPACE as string;

// Function to get query vector using Google Generative AI embedding model
async function getQueryVector(query: string): Promise<number[]> {
  try {
    const response = await genai.models.embedContent({
      model: "gemini-embedding-exp-03-07",
      contents: {
        parts: [{ text: query }],
      },
      config: {
        outputDimensionality: 1536,
      },
    });

    // The response structure for Google GenAI embedContent
    // response.embeddings is an array of ContentEmbedding objects
    if (response.embeddings && response.embeddings.length > 0) {
      const embedding = response.embeddings[0];
      if (embedding && embedding.values) {
        return embedding.values;
      }
    }

    throw new Error("No embedding values received from Google AI");
  } catch (error) {
    console.error("Error generating embedding:", error);
    throw error;
  }
}

// Function to retrieve context from Pinecone
async function retrieveContext(
  query: string,
  topK: number = 6
): Promise<string[]> {
  try {
    const queryVector = await getQueryVector(query);

    // Ensure we have a valid vector array
    if (!Array.isArray(queryVector) || queryVector.length === 0) {
      throw new Error("Invalid query vector received");
    }

    const queryResponse = await index.namespace(namespace).query({
      vector: queryVector,
      topK,
      includeMetadata: true,
    });
    console.log(queryResponse);
    return (
      queryResponse.matches?.map(
        (match) => (match.metadata?.content as string) || ""
      ) || []
    );
  } catch (error) {
    console.error("Error retrieving context:", error);
    throw error;
  }
}

// Function to generate response using Google Generative AI
async function generateResponseWithGemini(
  query: string,
  contexts: string[]
): Promise<string> {
  try {
    const contextStr = contexts.join("\n");
    const prompt = `
You are a legal expert assistant specializing in Indian law, particularly the Indian Penal Code (IPC) and the Constitution of India. 

Based on the provided legal contexts, answer the user's question accurately and comprehensively.

IMPORTANT GUIDELINES:
1. Always cite specific sections, articles, or provisions when referencing the law
2. If the context doesn't contain sufficient information, clearly state this
3. Distinguish between Constitutional provisions and IPC provisions
4. Provide practical interpretations where appropriate
5. If multiple interpretations exist, mention them
6. Use clear, accessible language while maintaining legal accuracy

LEGAL CONTEXTS:
${contextStr}

USER QUESTION: ${query}

RESPONSE: `;

    const response = await genai.models.generateContent({
      model: "gemini-2.5-flash-preview-05-20",
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
      config: {
        temperature: 0.4,
        thinkingConfig: {
          // includeThoughts: true,
          thinkingBudget: 8000,
        },
        // cachedContent: contextStr,
        maxOutputTokens: 5000,
      },
    });

    if (
      response.candidates &&
      response.candidates[0]?.content?.parts?.[0]?.text
    ) {
      return response.candidates[0].content.parts[0].text;
    }

    throw new Error("No response generated from Gemini");
  } catch (error) {
    console.error("Error generating response:", error);
    throw error;
  }
}

// API route handler
export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();

    if (!query || typeof query !== "string") {
      return NextResponse.json(
        { error: "Valid query string is required" },
        { status: 400 }
      );
    }

    // Validate environment variables
    if (
      !process.env.PINECONE_API_KEY ||
      !process.env.PINECONE_INDEX_NAME ||
      !process.env.GEMINI_API_KEY
    ) {
      console.error("Missing required environment variables");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const contexts = await retrieveContext(query);
    console.log(contexts);
    const response = await generateResponseWithGemini(query, contexts);

    return NextResponse.json({
      response,
      contexts,
      success: true,
    });
  } catch (error) {
    console.error("API route error:", error);

    // Return more specific error messages in development
    const isDevelopment = process.env.NODE_ENV === "development";

    return NextResponse.json(
      {
        error: isDevelopment
          ? (error as Error).message
          : "Internal server error",
        success: false,
      },
      { status: 500 }
    );
  }
}
