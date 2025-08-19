import { AIModel } from "@/components/contexts/chat-context";
import { NextResponse } from "next/server";

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


export async function GET() {
  return NextResponse.json(mockModels);
}