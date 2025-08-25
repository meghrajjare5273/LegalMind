"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";

export default function ChatPage() {
  const router = useRouter();

  useEffect(() => {
    // Auto-create a new session and redirect
    createNewSession();
  }, []);

  const createNewSession = async () => {
    try {
      const response = await fetch("/api/chat/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "New Chat" }),
      });

      if (response.ok) {
        const data = await response.json();
        router.push(`/services/chat/${data.session.id}`);
      }
    } catch (error) {
      console.error("Error creating session:", error);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="p-8">
        <h2 className="text-xl font-semibold mb-4">Starting new chat...</h2>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
      </Card>
    </div>
  );
}
