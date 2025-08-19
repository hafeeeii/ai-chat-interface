"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative overflow-hidden transition-all duration-300 hover:scale-105"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <div className="relative flex items-center justify-center">
        <Sun
          className={`h-4 w-4 transition-all duration-300 ${
            theme === "dark" ? "rotate-90 scale-0" : "rotate-0 scale-100"
          }`}
        />
        <Moon
          className={`absolute h-4 w-4 transition-all duration-300 ${
            theme === "dark" ? "rotate-0 scale-100" : "-rotate-90 scale-0"
          }`}
        />
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
