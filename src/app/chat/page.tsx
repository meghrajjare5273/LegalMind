"use client";
import { useState } from "react";
import { Box } from "@mui/material";
import ChatHeader from "@/components/chat/ChatHeader";
import WelcomeSection from "@/components/chat/WelcomeSection";
import QuickActions from "@/components/chat/QuickSuggestions";
import MessageList, { type Message } from "@/components/chat/ChatMessages";
import MessageInput from "@/components/chat/ChatInput";
import { apiService } from "@/services/api";

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleNewChat = () => {
    setMessages([]);
  };

  const handleShare = () => {
    // Implement share functionality
    console.log("Share chat");
  };

  const handleQuickAction = (actionId: string) => {
    const actionMessages = {
      "contract-review":
        "I need help reviewing a contract. Can you guide me through the process?",
      "legal-research":
        "I need to research legal precedents for my case. Where should I start?",
      "compliance-check":
        "I want to ensure my business is compliant with current regulations. What should I check?",
    };

    const message = actionMessages[actionId as keyof typeof actionMessages];
    if (message) {
      handleSendMessage(message);
    }
  };

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await apiService.queryRAG(content);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Chat error:", error);

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "I apologize, but I'm having trouble processing your request right now. Please try again later.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const showWelcome = messages.length === 0 && !isLoading;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "background.default",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <ChatHeader onNewChat={handleNewChat} onShare={handleShare} />

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {showWelcome ? (
          <>
            <WelcomeSection userName="User" />
            <QuickActions onActionClick={handleQuickAction} />
          </>
        ) : (
          <Box sx={{ flexGrow: 1, overflow: "auto" }}>
            <MessageList messages={messages} isLoading={isLoading} />
          </Box>
        )}
      </Box>

      {/* Message Input */}
      <MessageInput onSendMessage={handleSendMessage} disabled={isLoading} />
    </Box>
  );
}
