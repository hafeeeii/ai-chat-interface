import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Slider } from "./slider"
import { useState } from "react"

const meta = {
  title: "UI/Slider",
  component: Slider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    defaultValue: [50],
    min: 0,
    max: 100,
    className: "w-64", 
  },
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Range: Story = {
  args: { defaultValue: [25, 75] },
}

export const Vertical: Story = {
  args: { defaultValue: [40], orientation: "vertical", className: "h-40" },
}

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState([30])
    return (
      <div className="flex flex-col items-center gap-2">
        <Slider
          value={value}
          onValueChange={setValue}
          max={100}
          step={1}
          className="w-64"
        />
        <span>Value: {value[0]}</span>
      </div>
    )
  },
}
