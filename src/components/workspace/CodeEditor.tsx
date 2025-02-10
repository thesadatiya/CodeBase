import React from "react";
import { Card } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Copy, Save } from "lucide-react";

interface CodeEditorProps {
  code?: string;
  language?: string;
  onCodeChange?: (code: string) => void;
  onSave?: () => void;
}

const CodeEditor = ({
  code = "// Write your code here\n\nfunction App() {\n  return <div>Hello World</div>;\n}",
  language = "typescript",
  onCodeChange = () => {},
  onSave = () => {},
}: CodeEditorProps) => {
  return (
    <Card className="h-full w-full bg-background flex flex-col">
      <div className="flex items-center justify-between p-2 border-b">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">{language}</span>
        </div>
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    navigator.clipboard.writeText(code);
                  }}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Copy code</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={onSave}>
                  <Save className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Save changes</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <ScrollArea className="flex-1 p-4">
        <pre className="font-mono text-sm">
          <code
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => onCodeChange(e.currentTarget.textContent || "")}
            className="block whitespace-pre-wrap outline-none"
          >
            {code}
          </code>
        </pre>
      </ScrollArea>
    </Card>
  );
};

export default CodeEditor;
