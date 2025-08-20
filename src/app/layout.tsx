import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sparkles } from "lucide-react";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { ChatProvider } from "@/components/contexts/chat-context";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Chat Interface",
  description:
    "An advanced AI playground for chatting with AI models, experimenting with parameters, and testing prompts in a sleek interface.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          <ChatProvider>
            <div className="min-h-screen bg-background ">
              {/* Header */}
              <header className="border-b bg-card sticky top-0 z-50 h-20 ">
                <div className=" px-4 py-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-lg  flex items-center justify-center">
                        <Sparkles className="h-5 w-5 " />
                      </div>
                      <div>
                        <h1 className="text-xl font-bold">AI Chat Interface</h1>
                        <p className="sm:text-sm text-xs text-muted-foreground">
                          Advanced AI playground with customizable parameters
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <ThemeToggle />
                    </div>
                  </div>
                </div>
              </header>

              {/* Main Content */}
              <div className="xl:h-[calc(100vh-80px)]">{children}</div>
              <Toaster />
            </div>
          </ChatProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
