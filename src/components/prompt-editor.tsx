"use client";
import React, { useState } from "react";
import { Save, FileText, Trash2, Plus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PromptTemplate, useChat } from "./contexts/chat-context";
import { toast } from "sonner";

export function PromptEditor() {
  const {
    currentPrompt,
    setCurrentPrompt,
    templates,
    selectedTemplate,
    setSelectedTemplate,
    saveTemplate,
    deleteTemplate,
  } = useChat();

  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    description: "",
    category: "",
  });

  const handleSaveTemplate = () => {
    if (!newTemplate.name.trim() || !currentPrompt.trim()) {
      toast.error("Error", {
        description: "Please provide a template name and prompt content.",
      });
      return;
    }

    saveTemplate({
      ...newTemplate,
      content: currentPrompt,
    });

    setNewTemplate({ name: "", description: "", category: "" });
    setIsTemplateDialogOpen(false);

    toast.success("Template saved", {
      description: `"${newTemplate.name}" has been saved to your templates.`,
    });
  };

  const handleLoadTemplate = (template: PromptTemplate) => {
    setSelectedTemplate(template);
    setCurrentPrompt(template.content);
    toast.success("Template loaded", {
      description: `"${template.name}" has been loaded into the editor.`,
    });
  };

  const handleDeleteTemplate = (template: PromptTemplate) => {
    deleteTemplate(template.id);
    toast.success("Template deleted", {
      description: `"${template.name}" has been removed from your templates.`,
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "development":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "writing":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "creative":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <Card className=" flex flex-col h-full">
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between flex-col gap-4">
          <div className="text-nowrap flex flex-col self-start">
            <CardTitle className="text-lg">Prompt Editor</CardTitle>
            <CardDescription>
              {selectedTemplate
                ? `Using template: ${selectedTemplate.name}`
                : "Write your prompt or load a template"}
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2 self-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Templates
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80" align="end">
                <DropdownMenuLabel>Saved Templates</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {templates.map((template) => (
                  <DropdownMenuItem
                    key={template.id}
                    className="p-3 cursor-pointer"
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex-1 min-w-0 mr-3">
                        <div className="flex items-center space-x-2 mb-1">
                          <p className="font-medium text-sm truncate">
                            {template.name}
                          </p>
                          <Badge
                            variant="secondary"
                            className={`text-xs px-2 py-0.5 ${getCategoryColor(
                              template.category
                            )}`}
                          >
                            {template.category}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">
                          {template.description}
                        </p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLoadTemplate(template);
                          }}
                          className="h-8 w-8 p-0"
                        >
                          <Upload className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteTemplate(template);
                          }}
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </DropdownMenuItem>
                ))}
                {templates.length === 0 && (
                  <div className="p-3 text-sm text-muted-foreground text-center">
                    No templates saved yet
                  </div>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            <Dialog
              open={isTemplateDialogOpen}
              onOpenChange={setIsTemplateDialogOpen}
            >
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Save Prompt Template</DialogTitle>
                  <DialogDescription>
                    Save your current prompt as a reusable template.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Template Name</Label>
                    <Input
                      id="name"
                      value={newTemplate.name}
                      onChange={(e) =>
                        setNewTemplate((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      placeholder="e.g., Code Review Assistant"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      value={newTemplate.description}
                      onChange={(e) =>
                        setNewTemplate((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      placeholder="Brief description of the template's purpose"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      value={newTemplate.category}
                      onChange={(e) =>
                        setNewTemplate((prev) => ({
                          ...prev,
                          category: e.target.value,
                        }))
                      }
                      placeholder="e.g., Development, Writing, Creative"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsTemplateDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleSaveTemplate}>Save Template</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col">
        <div className="flex-1">
          <Textarea
            value={currentPrompt}
            onChange={(e) => setCurrentPrompt(e.target.value)}
            placeholder="Enter your prompt here... You can use placeholders like {topic}, {style}, {length} in your templates."
            className="min-h-[200px]  max-h-[210px]  resize-none text-sm leading-relaxed"
          />
        </div>

        {selectedTemplate && (
          <div className="mt-4 p-3 rounded-lg bg-accent/50 border border-accent">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-accent-foreground">
                Template: {selectedTemplate.name}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedTemplate(null);
                  setCurrentPrompt("");
                }}
                className="h-6 px-2 text-xs"
              >
                Clear
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              {selectedTemplate.description}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
