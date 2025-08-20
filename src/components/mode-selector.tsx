"use client";
import { Badge } from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Check, ChevronDown, Loader, Zap } from "lucide-react";
import { useChat } from "./contexts/chat-context";

export function ModelSelector() {
  const { models, selectedModel, setSelectedModel, modelsStatus } = useChat();

  const getProviderColor = (provider: string) => {
    switch (provider.toLowerCase()) {
      case "openai":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200";
      case "anthropic":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">AI Model</label>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between h-auto p-3 transition-all duration-200 hover:shadow-md mt-2"
            disabled={modelsStatus.isLoading || !!modelsStatus.error}
          >
            <div className="flex items-center justify-between space-x-3">
              <div className="flex flex-col items-start pl-4">
                <span
                  className={cn(
                    "font-medium",
                    !selectedModel?.name && "text-muted-foreground"
                  )}
                >
                  {selectedModel?.name || "Select Model"}
                </span>
                {selectedModel && (
                  <span className="text-xs text-muted-foreground">
                    {selectedModel.provider} • ${selectedModel.costPer1k}/1K
                    tokens
                  </span>
                )}
              </div>
              {modelsStatus.isLoading && <Loader className="animate-spin" />}
            </div>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-80 p-2" align="start">
          <DropdownMenuLabel className="text-xs uppercase tracking-wider text-muted-foreground">
            Available Models
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {models.map((model) => (
            <DropdownMenuItem
              key={model.id}
              className="p-3 cursor-pointer transition-colors"
              onClick={() => setSelectedModel(model)}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-3 w-full">
                  <Zap className="h-4 w-4 text-primary" />

                  <div className="flex items-center w-full justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-sm">
                          {model.name}
                        </span>
                        <Badge
                          variant="secondary"
                          className={cn(
                            "text-xs px-2 py-0.5",
                            getProviderColor(model.provider)
                          )}
                        >
                          {model.provider}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground max-w-xs">
                        {model.description}
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>{model.maxTokens.toLocaleString()} tokens</span>
                        <span>${model.costPer1k}/1K</span>
                      </div>
                    </div>
                    {selectedModel?.id === model.id && (
                      <Check className="h-4 w-4 text-primary" />
                    )}
                  </div>
                </div>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      {modelsStatus.error && (
        <div className="text-xs text-destructive pl-2 ">
          {modelsStatus.error}
        </div>
      )}
    </div>
  );
}
