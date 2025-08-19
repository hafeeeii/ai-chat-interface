"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

// Types
export interface AIModel {
  id: string;
  name: string;
  description: string;
  provider: string;
  maxTokens: number;
  costPer1k: number;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  model?: string;
  tokens?: number;
}

export interface PromptTemplate {
  id: string;
  name: string;
  description: string;
  content: string;
  category: string;
  createdAt: Date;
}

export interface ChatParameters {
  temperature: number;
  maxTokens: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
}

interface ChatContextType {
  // Models
  models: AIModel[];
  selectedModel: AIModel | null;
  setSelectedModel: (model: AIModel) => void;

  // Messages
  messages: ChatMessage[];
  addMessage: (message: Omit<ChatMessage, "id" | "timestamp">) => void;
  clearMessages: () => void;

  // Parameters
  parameters: ChatParameters;
  updateParameters: (params: Partial<ChatParameters>) => void;

  // Prompt Templates
  templates: PromptTemplate[];
  selectedTemplate: PromptTemplate | null;
  setSelectedTemplate: (template: PromptTemplate | null) => void;
  saveTemplate: (template: Omit<PromptTemplate, "id" | "createdAt">) => void;
  deleteTemplate: (id: string) => void;

  // Current prompt
  currentPrompt: string;
  setCurrentPrompt: (prompt: string) => void;

  // Loading state
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;

  // Status
  modelsStatus: {
    isLoading: boolean;
    error: string | null;
  };
  templatesStatus: {
    isLoading: boolean;
    error: string | null;
  };
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [models, setModels] = useState<AIModel[]>([]);
  const [templates, setTemplates] = useState<PromptTemplate[]>([]);
  const [modelsStatus, setModelsStatus] = useState<{
    isLoading: boolean;
    error: string | null;
  }>({
    isLoading: true,
    error: null,
  });
  const [templatesStatus, setTemplatesStatus] = useState<{
    isLoading: boolean;
    error: string | null;
  }>({
    isLoading: true,
    error: null,
  });
  const [selectedModel, setSelectedModel] = useState<AIModel | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [parameters, setParameters] = useState<ChatParameters>({
    temperature: 0.7,
    maxTokens: 2048,
    topP: 1,
    frequencyPenalty: 0,
    presencePenalty: 0,
  });
  const [selectedTemplate, setSelectedTemplate] =
    useState<PromptTemplate | null>(null);
  const [currentPrompt, setCurrentPrompt] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function loadData() {
      setModelsStatus({ isLoading: true, error: null });
      setTemplatesStatus({ isLoading: true, error: null });
      try {
        const [modelsRes, templatesRes] = await Promise.all([
          fetch("/api/models"),
          fetch("/api/templates"),
        ]);

        if (!modelsRes.ok || !templatesRes.ok) {
          throw new Error("One of the requests failed");
        }

        const [modelsData, templatesData] = await Promise.all([
          modelsRes.json(),
          templatesRes.json(),
        ]);
        setModels(modelsData);
        setTemplates(templatesData);
        if (modelsData.length > 0) {
          setSelectedModel(modelsData[0]);
        }
        setModelsStatus({ isLoading: false, error: null });
        setTemplatesStatus({ isLoading: false, error: null });
      } catch (err) {
        console.error("Failed to fetch data", err);
        setModelsStatus({ isLoading: false, error: "Failed to load models" });
        setTemplatesStatus({
          isLoading: false,
          error: "Failed to load templates",
        });
      }
    }
    loadData();
  }, []);

  const addMessage = (message: Omit<ChatMessage, "id" | "timestamp">) => {
    const newMessage: ChatMessage = {
      ...message,
      id: crypto.randomUUID(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  const updateParameters = (params: Partial<ChatParameters>) => {
    setParameters((prev) => ({ ...prev, ...params }));
  };

  const saveTemplate = (template: Omit<PromptTemplate, "id" | "createdAt">) => {
    const newTemplate: PromptTemplate = {
      ...template,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    setTemplates((prev) => [...prev, newTemplate]);
  };

  const deleteTemplate = (id: string) => {
    setTemplates((prev) => prev.filter((t) => t.id !== id));
    if (selectedTemplate?.id === id) {
      setSelectedTemplate(null);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        models,
        selectedModel,
        setSelectedModel,
        messages,
        addMessage,
        clearMessages,
        parameters,
        updateParameters,
        templates,
        selectedTemplate,
        setSelectedTemplate,
        saveTemplate,
        deleteTemplate,
        currentPrompt,
        setCurrentPrompt,
        isLoading,
        setIsLoading,
        modelsStatus,
        templatesStatus,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}
