/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { Pinecone } from "@pinecone-database/pinecone";
import { GoogleGenAI } from "@google/genai";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";

// Initialize Pinecone and Google Generative AI clients
const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY as string });
const index = pc.Index(process.env.PINECONE_INDEX_NAME as string);
const genai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });
const namespace = process.env.PUBLIC_PINECONE_NAMESPACE as string;

// Token counting utility
function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4); // Rough estimation
}

// Context management with token limits
async function buildContextWithTokenLimit(
  sessionMessages: any[],
  retrievedContexts: string[],
  maxTokens: number = 6000
) {
  let totalTokens = 0;
  const contextStr = retrievedContexts.join("\n");
  const contextTokens = estimateTokens(contextStr);

  totalTokens += contextTokens;

  // Add conversation history within token limits
  const conversationHistory: string[] = [];
  for (let i = sessionMessages.length - 1; i >= 0; i--) {
    const message = sessionMessages[i];
    const messageText = `${message.role}: ${message.content}`;
    const messageTokens = estimateTokens(messageText);

    if (totalTokens + messageTokens > maxTokens) {
      break;
    }

    conversationHistory.unshift(messageText);
    totalTokens += messageTokens;
  }

  return {
    context: contextStr,
    conversationHistory: conversationHistory.join("\n"),
    totalTokens,
  };
}

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
async function* generateStreamingResponseWithGemini(
  query: string,
  context: string,
  conversationHistory: string
): AsyncGenerator<string, void, unknown> {
  try {
    // const contextStr = contexts.join("\n");
    const prompt = `
You are a legal expert assistant specializing in Indian law, with the understanding of multiple legal texts such as the Constitution of India and other important scriptures. You are also provided with the user's chat history in precise terms for your refernce. 

Based on the provided legal contexts, answer the user's question accurately and comprehensively. 

IMPORTANT GUIDELINES:
0. Make sure the user understands that you are just an AI chatbot and not a replacement for an actual lawyer
1. Do not mention the context to the end user and provide a refined output
2. Always cite specific sections, articles, or provisions when referencing the law
3. If the context doesn't contain sufficient information, provide a more generic answer
4. Distinguish between Constitutional provisions and IPC provisions
5. Provide practical interpretations where appropriate
6. If multiple interpretations exist, mention them
7. Use clear, accessible language while maintaining legal


LEGAL CONTEXTS:
${context}

CONVERSATION HISTORY:
${conversationHistory}

USER QUESTION: ${query}

RESPONSE: `;

    const response = await genai.models.generateContentStream({
      model: "gemini-2.5-flash",
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

    for await (const chunk of response) {
      const text = chunk.text;
      if (text) {
        yield text;
      }
    }

    // throw new Error("No response generated from Gemini");
  } catch (error) {
    console.error("Error generating response:", error);
    throw error;
  }
}

// NEW: Generate non-streaming response (fallback)
async function generateNonStreamingResponse(
  query: string,
  context: string,
  conversationHistory: string | null
): Promise<string> {
  try {
    const prompt = `
You are a legal expert assistant specializing in Indian law, with the understanding of multiple legal texts such as the Constitution of India and other important scriptures. You are also provided with the user's chat history in precise terms for your reference. 

Based on the provided legal contexts, answer the user's question accurately and comprehensively. 

IMPORTANT GUIDELINES:
0. Make sure the user understands that you are just an AI chatbot and not a replacement for an actual lawyer
1. Do not mention the context to the end user and provide a refined output
2. Always cite specific sections, articles, or provisions when referencing the law
3. If the context doesn't contain sufficient information, provide a more generic answer
4. Distinguish between Constitutional provisions and IPC provisions
5. Provide practical interpretations where appropriate
6. If multiple interpretations exist, mention them
7. Use clear, accessible language while maintaining legal accuracy

LEGAL CONTEXTS:
${context}

CONVERSATION HISTORY:
${conversationHistory}

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
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { query, sessionId, stream = true } = await request.json();

    if (!query || typeof query !== "string") {
      return NextResponse.json(
        { error: "Valid query string is required" },
        { status: 400 }
      );
    }

    let chatSession;
    if (sessionId) {
      chatSession = await prisma.chatSession.findFirst({
        where: { id: sessionId, userId: session.user.id },
        include: { messages: { orderBy: { createdAt: "asc" } } },
      });
    }

    if (!chatSession) {
      // Create new session with auto-generated title
      const title = query.length > 50 ? query.substring(0, 47) + "..." : query;
      chatSession = await prisma.chatSession.create({
        data: {
          title,
          userId: session.user.id,
        },
        include: { messages: true },
      });
    }

    // Save user message
    await prisma.chatMessage.create({
      data: {
        sessionId: chatSession.id,
        role: "user",
        content: query,
        tokenCount: estimateTokens(query),
      },
    });

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
    // console.log(contexts);

    const { context, conversationHistory, totalTokens } =
      await buildContextWithTokenLimit(chatSession.messages, contexts);

    if (!sessionId) {
      const response = await generateNonStreamingResponse(query, context, null);
      const responseTokens = estimateTokens(response);

      // Save assistant response
      await prisma.chatMessage.create({
        data: {
          sessionId: chatSession.id,
          role: "assistant",
          content: response,
          tokenCount: responseTokens,
          metadata: {
            totalContextTokens: totalTokens,
            contextSources: contexts.length,
            processingTime: Date.now(),
          },
        },
      });

      // Update session timestamp
      await prisma.chatSession.update({
        where: { id: chatSession.id },
        data: { updatedAt: new Date() },
      });

      // If this is a new session (no sessionId provided), return JSON for redirect
      if (!sessionId) {
        return NextResponse.json({
          response,
          sessionId: chatSession.id,
          contexts,
          tokenUsage: {
            query: estimateTokens(query),
            response: responseTokens,
            context: totalTokens,
          },
          success: true,
        });
      }
    }
    // NEW: Handle streaming vs non-streaming
    if (stream) {
      try {
        // Create a ReadableStream for streaming response
        const encoder = new TextEncoder();
        let fullResponse = "";

        const readableStream = new ReadableStream({
          async start(controller) {
            try {
              for await (const chunk of generateStreamingResponseWithGemini(
                query,
                context,
                conversationHistory
              )) {
                fullResponse += chunk;

                // Send the chunk as Server-Sent Events format
                const data = JSON.stringify({
                  type: "chunk",
                  content: chunk,
                  sessionId: chatSession.id,
                });

                controller.enqueue(encoder.encode(`data: ${data}\n\n`));
              }

              // Save the complete response to database
              const responseTokens = estimateTokens(fullResponse);
              await prisma.chatMessage.create({
                data: {
                  sessionId: chatSession.id,
                  role: "assistant",
                  content: fullResponse,
                  tokenCount: responseTokens,
                  metadata: {
                    totalContextTokens: totalTokens,
                    contextSources: contexts.length,
                    processingTime: Date.now(),
                  },
                },
              });

              // Update session timestamp
              await prisma.chatSession.update({
                where: { id: chatSession.id },
                data: { updatedAt: new Date() },
              });

              // Send completion signal
              const finalData = JSON.stringify({
                type: "complete",
                sessionId: chatSession.id,
                tokenUsage: {
                  query: estimateTokens(query),
                  response: responseTokens,
                  context: totalTokens,
                },
              });

              controller.enqueue(encoder.encode(`data: ${finalData}\n\n`));
              controller.close();
            } catch (error) {
              console.error("Streaming error:", error);
              const errorData = JSON.stringify({
                type: "error",
                error: error instanceof Error ? error.message : "Unknown error",
              });
              controller.enqueue(encoder.encode(`data: ${errorData}\n\n`));
              controller.close();
            }
          },
        });

        return new NextResponse(readableStream, {
          headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
          },
        });
      } catch (error) {
        console.error("API route error:", error);
        return NextResponse.json(
          {
            error: "Internal server error",
            success: false,
          },
          { status: 500 }
        );
      }
    }
    //     // Fallback to non-streaming response
    //     const response = await generateNonStreamingResponse(
    //       query,
    //       context,
    //       conversationHistory
    //     );

    //     const responseTokens = estimateTokens(response);

    //     // Save assistant response
    //     await prisma.chatMessage.create({
    //       data: {
    //         sessionId: chatSession.id,
    //         role: "assistant",
    //         content: response,
    //         tokenCount: responseTokens,
    //         metadata: {
    //           totalContextTokens: totalTokens,
    //           contextSources: contexts.length,
    //           processingTime: Date.now(),
    //         },
    //       },
    //     });

    //     // Update session timestamp
    //     await prisma.chatSession.update({
    //       where: { id: chatSession.id },
    //       data: { updatedAt: new Date() },
    //     });

    //     return NextResponse.json({
    //       response,
    //       sessionId: chatSession.id,
    //       contexts,
    //       tokenUsage: {
    //         query: estimateTokens(query),
    //         response: responseTokens,
    //         context: totalTokens,
    //       },
    //       success: true,
    //     });
  } catch (error) {
    console.error("API route error:", error);

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
