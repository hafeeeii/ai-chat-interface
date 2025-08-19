import { PromptTemplate } from "@/components/contexts/chat-context";
import { NextResponse } from "next/server";

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

export async function GET() {
  return NextResponse.json(mockTemplates);
}