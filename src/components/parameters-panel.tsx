'use client'
import React from "react";
import {
  Thermometer,
  Hash,
  Gauge,
  MinusCircle,
  PlusCircle,
  RotateCcw,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useChat } from "./contexts/chat-context";
import { Slider } from "./ui/slider";

interface ParameterSliderProps {
  label: string;
  description: string;
  value: number;
  min: number;
  max: number;
  step: number;
  icon: React.ReactNode;
  onChange: (value: number) => void;
}

function ParameterSlider({
  label,
  description,
  value,
  min,
  max,
  step,
  icon,
  onChange,
}: ParameterSliderProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {icon}
          <Label className="text-sm font-medium">{label}</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Input
            type="number"
            value={value}
            onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
            min={min}
            max={max}
            step={step}
            className="w-20 h-8 text-xs"
          />
        </div>
      </div>
      <Slider
        value={[value]}
        onValueChange={(values) => onChange(values[0])}
        min={min}
        max={max}
        step={step}
        className="w-full"
      />
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  );
}

export function ParametersPanel() {
  const { parameters, updateParameters, selectedModel } = useChat();

  const resetToDefaults = () => {
    updateParameters({
      temperature: 0.7,
      maxTokens: 2048,
      topP: 1,
      frequencyPenalty: 0,
      presencePenalty: 0,
    });
  };

  const maxTokensForModel = selectedModel?.maxTokens || 4096;

  return (
    <Card className="h-full">
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Parameters</CardTitle>
            <CardDescription>Fine-tune the AI model behavior</CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={resetToDefaults}
            className="text-xs"
          >
            <RotateCcw className="h-3 w-3 mr-1" />
            Reset
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <ParameterSlider
          label="Temperature"
          description="Controls randomness. Higher values make output more creative, lower values more focused."
          value={parameters.temperature}
          min={0}
          max={2}
          step={0.1}
          icon={<Thermometer className="h-4 w-4 text-orange-500" />}
          onChange={(value) => updateParameters({ temperature: value })}
        />

        <Separator />

        <ParameterSlider
          label="Max Tokens"
          description="Maximum number of tokens to generate in the response."
          value={parameters.maxTokens}
          min={1}
          max={maxTokensForModel}
          step={1}
          icon={<Hash className="h-4 w-4 text-blue-500" />}
          onChange={(value) => updateParameters({ maxTokens: value })}
        />

        <Separator />

        <ParameterSlider
          label="Top P"
          description="Controls diversity via nucleus sampling. Lower values = more focused."
          value={parameters.topP}
          min={0}
          max={1}
          step={0.1}
          icon={<Gauge className="h-4 w-4 text-green-500" />}
          onChange={(value) => updateParameters({ topP: value })}
        />

        <Separator />

        <ParameterSlider
          label="Frequency Penalty"
          description="Reduces repetition by penalizing frequent tokens."
          value={parameters.frequencyPenalty}
          min={-2}
          max={2}
          step={0.1}
          icon={<MinusCircle className="h-4 w-4 text-red-500" />}
          onChange={(value) => updateParameters({ frequencyPenalty: value })}
        />

      </CardContent>
    </Card>
  );
}
