"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button/button";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // prevent mismatch between SSR and client
    return null;
  }

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
          className={cn(
            "h-4 w-4 transform transition-transform duration-300",
            theme === "dark"
              ? "rotate-90 scale-0 opacity-0"
              : "rotate-0 scale-100 opacity-100"
          )}
        />
        <Moon
          className={cn(
            "absolute h-4 w-4 transform transition-transform duration-300",
            theme === "dark"
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-0 opacity-0"
          )}
        />
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
