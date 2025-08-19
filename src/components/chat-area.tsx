"use client";
import React, { useEffect, useRef } from "react";
import { Copy, Download, Send, Loader2, User, Bot, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ChatMessage, useChat } from "./contexts/chat-context";
import { toast } from "sonner";

interface ChatBubbleProps {
  message: ChatMessage;
  onCopy: (content: string) => void;
}

function ChatBubble({ message, onCopy }: ChatBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div>
      <div
        className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}
      >
        <div
          className={cn(
            "max-w-[85%] rounded-2xl px-4 py-3 transition-all duration-200",
            isUser ? "bg-secondary ml-4" : "chat-bubble-ai mr-4"
          )}
        >
          <div className="flex items-start space-x-3">
            <div
              className={cn(
                "flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium",
                isUser
                  ? "bg-primary-foreground text-primary"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {isUser ? (
                <User className="h-3 w-3" />
              ) : (
                <Bot className="h-3 w-3" />
              )}
            </div>

            <div className="flex-1 ">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium opacity-75">
                  {isUser ? "You" : message.model || "Assistant"}
                </span>
                <div className="flex items-center space-x-1 ml-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onCopy(message.content)}
                    className="h-6 w-6 p-0 opacity-50 hover:opacity-70 "
                  >
                    <Copy className="size-3.5" />
                  </Button>
                </div>
              </div>

              <div
                className={cn("text-sm leading-relaxed whitespace-pre-wrap")}
              >
                {message.content}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ChatArea() {
  const {
    messages,
    currentPrompt,
    setCurrentPrompt,
    addMessage,
    clearMessages,
    selectedModel,
    isLoading,
    setIsLoading,
    parameters,
  } = useChat();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

  const handleSend = async () => {
    if (!currentPrompt.trim() || !selectedModel) {
      toast.error("Error", {
        description: !selectedModel
          ? "Please select an AI model first."
          : "Please enter a prompt.",
      });
      return;
    }

    setIsLoading(true);

    // Add user message
    addMessage({
      role: "user",
      content: currentPrompt,
      model: selectedModel.name,
    });

    // Simulate API call delay
    setTimeout(() => {
      // Mock AI response
      const mockResponses = [
        "I understand your request. Based on your prompt, here's my analysis and recommendations:\n\n1. First, let me break down the key components...\n2. The approach I'd suggest is...\n3. Some considerations to keep in mind...",
        "That's an interesting question! Let me provide a comprehensive answer:\n\n• Point one: This is important because...\n• Point two: Additionally, you should consider...\n• Point three: Finally, here's what I recommend...",
        "I can help you with that. Here's a detailed response:\n\nThe solution involves several steps:\n\n1. Initial setup and preparation\n2. Implementation details\n3. Testing and validation\n4. Deployment considerations",
        "Great question! Based on current best practices, here's what I'd recommend:\n\n**Key Benefits:**\n- Improved efficiency\n- Better user experience\n- Scalable architecture\n\n**Implementation Steps:**\n1. Start with the foundation\n2. Build incrementally\n3. Test thoroughly",
      ];

      const randomResponse =
        mockResponses[Math.floor(Math.random() * mockResponses.length)];

      addMessage({
        role: "assistant",
        content: randomResponse,
        model: selectedModel.name,
        tokens: Math.floor(Math.random() * 500) + 100, // Mock token count
      });

      setIsLoading(false);
    }, 1500 + Math.random() * 1000); // Random delay between 1.5-2.5s

    setCurrentPrompt("");
  };

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success("Copied", {
      description: "Message copied to clipboard.",
    });
  };

  const handleDownloadChat = () => {
    const chatData = {
      model: selectedModel?.name,
      parameters,
      timestamp: new Date().toISOString(),
      messages: messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
        timestamp: msg.timestamp.toISOString(),
        model: msg.model,
        tokens: msg.tokens,
      })),
    };

    const blob = new Blob([JSON.stringify(chatData, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `chat-export-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success("Download Started", {
      description: "Your chat has been exported as JSON.",
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Chat</CardTitle>
            <p className="text-sm text-muted-foreground">
              {selectedModel
                ? `Chatting with ${selectedModel.name}`
                : "Select a model to start chatting"}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadChat}
              disabled={messages.length === 0}
              className="text-xs"
            >
              <Download className="h-3 w-3 mr-1" />
              Export
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={clearMessages}
              disabled={messages.length === 0}
              className="text-xs text-destructive hover:text-destructive"
            >
              <Trash2 className="h-3 w-3 mr-1" />
              Clear
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0 ">
        <ScrollArea className="flex-1 px-4 " ref={scrollAreaRef}>
          <div className="space-y-4 py-4 max-h-0">
            {messages.length === 0 ? (
              <div className="text-center text-muted-foreground py-12">
                <Bot className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">
                  Start a conversation
                </h3>
                <p className="text-sm">
                  Enter a prompt below to begin chatting with the AI model.
                </p>
              </div>
            ) : (
              messages.map((message) => (
                <ChatBubble
                  key={message.id}
                  message={message}
                  onCopy={handleCopy}
                />
              ))
            )}

            {isLoading && (
              <div className="flex justify-start">
                <div className="chat-bubble-ai mr-4 max-w-[85%]">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-muted text-muted-foreground flex items-center justify-center">
                      <Bot className="h-3 w-3" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm text-muted-foreground">
                        AI is thinking...
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <Separator />

        <div className="p-4">
          <div className="flex space-x-2">
            <div className="flex-1 relative">
              <textarea
                value={currentPrompt}
                onChange={(e) => setCurrentPrompt(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={
                  selectedModel
                    ? `Message ${selectedModel.name}... (Cmd/Ctrl + Enter to send)`
                    : "Select a model first"
                }
                disabled={!selectedModel || isLoading}
                className="w-full min-h-[60px] max-h-32 px-3 py-2 text-sm border border-input rounded-md bg-background resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent placeholder:text-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                rows={2}
              />
            </div>
            <Button
              onClick={handleSend}
              disabled={!currentPrompt.trim() || !selectedModel || isLoading}
              size="lg"
              className="px-4 h-[60px] transition-all duration-200 hover:scale-105"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>

          {selectedModel && (
            <p className="text-xs text-muted-foreground mt-2">
              Using {selectedModel.name} • Max {parameters.maxTokens} tokens •
              Temperature {parameters.temperature}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
