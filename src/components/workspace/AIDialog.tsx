import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2 } from "lucide-react";

interface AIDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGenerate: (prompt: string) => void;
  isGenerating: boolean;
}

export function AIDialog({
  open,
  onOpenChange,
  onGenerate,
  isGenerating,
}: AIDialogProps) {
  const [prompt, setPrompt] = React.useState("");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>AI Website Generator</DialogTitle>
          <DialogDescription>
            Describe the website you want to build. Be as specific as possible
            about the layout, features, and styling.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Textarea
            placeholder="Describe your website..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[200px]"
          />
          <Button
            onClick={() => onGenerate(prompt)}
            disabled={isGenerating || !prompt.trim()}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate Website"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
