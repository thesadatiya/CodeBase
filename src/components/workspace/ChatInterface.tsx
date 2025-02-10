import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Send, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
  designSuggestions?: {
    colors: string[];
    components: string[];
    layout: string;
  };
}

interface ChatInterfaceProps {
  messages?: Message[];
  isGenerating?: boolean;
  onSendMessage?: (message: string) => void;
}

export default function ChatInterface({
  messages = [],
  isGenerating = false,
  onSendMessage = () => {},
}: ChatInterfaceProps) {
  const [input, setInput] = React.useState("");
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (input.trim() && !isGenerating) {
      onSendMessage(input);
      setInput("");
    }
  };

  return (
    <Card className="flex flex-col h-full bg-background">
      <div className="p-4 border-b bg-muted/30">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-500" />
          <div>
            <h2 className="text-lg font-semibold">AI Website Generator</h2>
            <p className="text-sm text-muted-foreground">
              Powered by advanced AI and web design analysis
            </p>
          </div>
        </div>
      </div>
      <div className="flex-1 p-4 overflow-hidden">
        <ScrollArea className="h-full" ref={scrollRef}>
          <div className="space-y-4 px-2">
            <AnimatePresence mode="popLayout">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground ml-auto"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">
                      {message.content}
                    </p>
                    <span className="text-xs opacity-70 mt-2 block">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                    {message.designSuggestions && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ duration: 0.2 }}
                        className="mt-3 pt-3 border-t border-border/50"
                      >
                        <h4 className="text-sm font-medium mb-2">
                          Design Suggestions
                        </h4>
                        <div className="flex gap-2 mb-2">
                          {message.designSuggestions.colors.map((color, i) => (
                            <motion.div
                              key={i}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: i * 0.1 }}
                              className="w-6 h-6 rounded-full ring-2 ring-border"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                        <div className="text-sm space-y-1 text-muted-foreground">
                          <p>Layout: {message.designSuggestions.layout}</p>
                          <p>
                            Components:{" "}
                            {message.designSuggestions.components.join(", ")}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {isGenerating && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="bg-muted rounded-lg p-4 flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Generating website...</span>
                </div>
              </motion.div>
            )}
          </div>
        </ScrollArea>
      </div>
      <div className="p-4 border-t bg-muted/30">
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your website (e.g., 'Create a modern SaaS landing page with a hero section, features grid, and pricing table...')"
            className="min-h-[80px] bg-background"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isGenerating}
            className="self-end px-6"
            size="lg"
          >
            {isGenerating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
}
