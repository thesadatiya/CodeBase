import React from "react";
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import ChatInterface from "./ChatInterface";
import PreviewPanel from "./PreviewPanel";
import { generateWebsite } from "@/lib/ai";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

export default function WorkspaceLayout() {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [previewUrl, setPreviewUrl] = React.useState("about:blank");

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsGenerating(true);

    try {
      // Generate website
      const files = await generateWebsite(content);

      // Add AI response
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "I've generated your website! You can see the preview on the right.",
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);

      // Update preview (in a real app, this would be a URL to the generated site)
      setPreviewUrl("about:blank");
    } catch (error) {
      console.error("Failed to generate website:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "Sorry, there was an error generating your website. Please try again.",
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="h-full w-full bg-background">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={40} minSize={30}>
          <ChatInterface
            messages={messages}
            isGenerating={isGenerating}
            onSendMessage={handleSendMessage}
          />
        </ResizablePanel>
        <ResizablePanel defaultSize={60} minSize={30}>
          <PreviewPanel previewUrl={previewUrl} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
