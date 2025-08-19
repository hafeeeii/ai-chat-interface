'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';

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
  role: 'user' | 'assistant';
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
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  clearMessages: () => void;
  
  // Parameters
  parameters: ChatParameters;
  updateParameters: (params: Partial<ChatParameters>) => void;
  
  // Prompt Templates
  templates: PromptTemplate[];
  selectedTemplate: PromptTemplate | null;
  setSelectedTemplate: (template: PromptTemplate | null) => void;
  saveTemplate: (template: Omit<PromptTemplate, 'id' | 'createdAt'>) => void;
  deleteTemplate: (id: string) => void;
  
  // Current prompt
  currentPrompt: string;
  setCurrentPrompt: (prompt: string) => void;
  
  // Loading state
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Mock data for AI models
const mockModels: AIModel[] = [
  {
    id: 'gpt-4',
    name: 'GPT-4',
    description: 'Most capable model, best at complex tasks',
    provider: 'OpenAI',
    maxTokens: 8192,
    costPer1k: 0.03
  },
  {
    id: 'gpt-3.5-turbo',
    name: 'GPT-3.5 Turbo',
    description: 'Fast and efficient for most tasks',
    provider: 'OpenAI',
    maxTokens: 4096,
    costPer1k: 0.002
  },
  {
    id: 'claude-3-opus',
    name: 'Claude 3 Opus',
    description: 'Anthropic\'s most powerful model',
    provider: 'Anthropic',
    maxTokens: 4096,
    costPer1k: 0.015
  },
  {
    id: 'claude-3-sonnet',
    name: 'Claude 3 Sonnet',
    description: 'Balanced performance and speed',
    provider: 'Anthropic',
    maxTokens: 4096,
    costPer1k: 0.003
  }
];

// Mock prompt templates
const mockTemplates: PromptTemplate[] = [
  {
    id: '1',
    name: 'Code Review',
    description: 'Review code for best practices and improvements',
    content: 'Please review the following code and provide feedback on:\n1. Code quality and best practices\n2. Potential bugs or security issues\n3. Performance optimizations\n4. Suggestions for improvement\n\nCode:\n{code}',
    category: 'Development',
    createdAt: new Date('2024-01-01')
  },
  {
    id: '2',
    name: 'Text Summary',
    description: 'Summarize long text into key points',
    content: 'Please provide a concise summary of the following text, highlighting the main points and key takeaways:\n\n{text}',
    category: 'Writing',
    createdAt: new Date('2024-01-02')
  },
  {
    id: '3',
    name: 'Creative Writing',
    description: 'Generate creative content with specific style',
    content: 'Write a {type} in the style of {style} about {topic}. Make it {tone} and approximately {length} words.',
    category: 'Creative',
    createdAt: new Date('2024-01-03')
  }
];

export function ChatProvider({ children }: { children: ReactNode }) {
  const [models] = useState<AIModel[]>(mockModels);
  const [selectedModel, setSelectedModel] = useState<AIModel | null>(mockModels[0]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [parameters, setParameters] = useState<ChatParameters>({
    temperature: 0.7,
    maxTokens: 2048,
    topP: 1,
    frequencyPenalty: 0,
    presencePenalty: 0
  });
  const [templates, setTemplates] = useState<PromptTemplate[]>(mockTemplates);
  const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate | null>(null);
  const [currentPrompt, setCurrentPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const addMessage = (message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMessage: ChatMessage = {
      ...message,
      id: crypto.randomUUID(),
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  const updateParameters = (params: Partial<ChatParameters>) => {
    setParameters(prev => ({ ...prev, ...params }));
  };

  const saveTemplate = (template: Omit<PromptTemplate, 'id' | 'createdAt'>) => {
    const newTemplate: PromptTemplate = {
      ...template,
      id: crypto.randomUUID(),
      createdAt: new Date()
    };
    setTemplates(prev => [...prev, newTemplate]);
  };

  const deleteTemplate = (id: string) => {
    setTemplates(prev => prev.filter(t => t.id !== id));
    if (selectedTemplate?.id === id) {
      setSelectedTemplate(null);
    }
  };

  return (
    <ChatContext.Provider value={{
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
      setIsLoading
    }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}