import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Badge } from "./badge"
import { X } from "lucide-react"

const meta = {
  title: "UI/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: { 
    variant: "default", 
    children: "Badge" 
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Variants: Story = {
  render: () => (
    <div className="flex gap-3 flex-wrap">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
}

export const WithIcon: Story = {
  render: () => (
    <Badge>
      <X className="size-3" />
      With Icon
    </Badge>
  ),
}

