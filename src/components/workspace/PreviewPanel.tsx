import React from "react";
import { Card } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { RefreshCw, Maximize2, Minimize2 } from "lucide-react";

interface PreviewPanelProps {
  previewUrl?: string;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
  onRefresh?: () => void;
}

const PreviewPanel = ({
  previewUrl = "about:blank",
  isFullscreen = false,
  onToggleFullscreen = () => {},
  onRefresh = () => {},
}: PreviewPanelProps) => {
  return (
    <Card className="flex flex-col h-full bg-background border rounded-lg overflow-hidden">
      <div className="flex items-center justify-between p-2 border-b bg-muted/40">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onRefresh}
            className="h-8 w-8"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleFullscreen}
          className="h-8 w-8"
        >
          {isFullscreen ? (
            <Minimize2 className="h-4 w-4" />
          ) : (
            <Maximize2 className="h-4 w-4" />
          )}
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <iframe
          src={previewUrl}
          className="w-full h-full min-h-[600px]"
          title="Preview"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
      </ScrollArea>
    </Card>
  );
};

export default PreviewPanel;
