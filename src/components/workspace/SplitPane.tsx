import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import FileExplorer from "./FileExplorer";
import CodeEditor from "./CodeEditor";
import PreviewPanel from "./PreviewPanel";
import AIGenerateButton from "./AIGenerateButton";

interface SplitPaneProps {
  defaultLayout?: number[];
  onLayoutChange?: (sizes: number[]) => void;
}

const SplitPane: React.FC<SplitPaneProps> = ({
  defaultLayout = [20, 40, 40],
  onLayoutChange = () => {},
}) => {
  return (
    <React.StrictMode>
      <div className="h-full w-full bg-background relative">
        <ResizablePanelGroup
          direction="horizontal"
          onLayout={onLayoutChange}
          className="h-full w-full rounded-lg"
        >
          <ResizablePanel defaultSize={defaultLayout[0]} minSize={15}>
            <FileExplorer />
          </ResizablePanel>

          <ResizableHandle />

          <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
            <CodeEditor />
          </ResizablePanel>

          <ResizableHandle />

          <ResizablePanel defaultSize={defaultLayout[2]} minSize={30}>
            <PreviewPanel />
          </ResizablePanel>
        </ResizablePanelGroup>

        <div className="absolute bottom-6 right-6">
          <AIGenerateButton
            onGenerateFiles={(files) => {
              console.log("Generated files:", files);
              // Here you would update the file explorer and code editor
            }}
          />
        </div>
      </div>
    </React.StrictMode>
  );
};

export default SplitPane;
