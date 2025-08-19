import { ChatArea } from "@/components/chat-area";
import { ModelSelector } from "@/components/mode-selector";
import { ParametersPanel } from "@/components/parameters-panel";
import { PromptEditor } from "@/components/prompt-editor";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="container  px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-120px)]">
        {/* Left Sidebar - Controls */}
        <Card className="lg:col-span-1 ">
          <CardContent className=" space-y-6 ">
            <ModelSelector />
            <Separator />
            <PromptEditor />
          </CardContent>
        </Card>

        {/* Main Chat Area */}
        <div className="lg:col-span-2">
          <ChatArea />{" "}
        </div>

        {/* Right Sidebar - Parameters */}
        <div className="lg:col-span-1">
          <ParametersPanel />{" "}
        </div>
      </div>
    </div>
  );
}
