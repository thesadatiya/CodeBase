import React from "react";
import {
  ChevronRight,
  ChevronDown,
  File,
  Folder,
  Plus,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface FileNode {
  id: string;
  name: string;
  type: "file" | "folder";
  children?: FileNode[];
}

interface FileExplorerProps {
  files?: FileNode[];
  onFileSelect?: (file: FileNode) => void;
  onCreateFile?: (parentId: string | null) => void;
  onCreateFolder?: (parentId: string | null) => void;
  onDeleteItem?: (id: string) => void;
}

const defaultFiles: FileNode[] = [
  {
    id: "1",
    name: "src",
    type: "folder",
    children: [
      {
        id: "2",
        name: "components",
        type: "folder",
        children: [
          { id: "3", name: "App.tsx", type: "file" },
          { id: "4", name: "Header.tsx", type: "file" },
        ],
      },
      { id: "5", name: "index.tsx", type: "file" },
    ],
  },
  {
    id: "6",
    name: "public",
    type: "folder",
    children: [
      { id: "7", name: "index.html", type: "file" },
      { id: "8", name: "styles.css", type: "file" },
    ],
  },
];

const FileExplorer: React.FC<FileExplorerProps> = ({
  files = defaultFiles,
  onFileSelect = () => {},
  onCreateFile = () => {},
  onCreateFolder = () => {},
  onDeleteItem = () => {},
}) => {
  const [expandedFolders, setExpandedFolders] = React.useState<Set<string>>(
    new Set(),
  );

  const toggleFolder = (folderId: string) => {
    setExpandedFolders((prev) => {
      const next = new Set(prev);
      if (next.has(folderId)) {
        next.delete(folderId);
      } else {
        next.add(folderId);
      }
      return next;
    });
  };

  const renderFileTree = (nodes: FileNode[], level = 0) => {
    return nodes.map((node) => (
      <div key={node.id} className="select-none">
        <div
          className={cn(
            "flex items-center gap-2 py-1 px-2 hover:bg-accent/50 rounded-sm cursor-pointer",
            { "ml-4": level > 0 },
          )}
          onClick={() =>
            node.type === "folder" ? toggleFolder(node.id) : onFileSelect(node)
          }
        >
          {node.type === "folder" &&
            (expandedFolders.has(node.id) ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            ))}
          {node.type === "folder" ? <Folder size={16} /> : <File size={16} />}
          <span className="text-sm">{node.name}</span>

          <div className="ml-auto flex items-center gap-1 opacity-0 group-hover:opacity-100">
            {node.type === "folder" && (
              <>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={(e) => {
                          e.stopPropagation();
                          onCreateFile(node.id);
                        }}
                      >
                        <Plus size={14} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>New File</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </>
            )}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteItem(node.id);
                    }}
                  >
                    <Trash2 size={14} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        {node.type === "folder" &&
          node.children &&
          expandedFolders.has(node.id) &&
          renderFileTree(node.children, level + 1)}
      </div>
    ));
  };

  return (
    <div className="w-full h-full bg-background border-r">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-sm font-semibold">Files</h2>
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => onCreateFolder(null)}
                >
                  <Folder size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>New Folder</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => onCreateFile(null)}
                >
                  <File size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>New File</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <ScrollArea className="h-[calc(100%-4rem)]">
        <div className="p-2">{renderFileTree(files)}</div>
      </ScrollArea>
    </div>
  );
};

export default FileExplorer;
