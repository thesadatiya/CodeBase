import React from "react";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { AIDialog } from "./AIDialog";
import { generateWebsite } from "@/lib/ai";

interface AIGenerateButtonProps {
  isGenerating?: boolean;
  progress?: number;
  onGenerateFiles?: (files: { [path: string]: string }) => void;
}

const AIGenerateButton = ({
  isGenerating = false,
  progress = 0,
  onGenerateFiles = () => {},
}: AIGenerateButtonProps) => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [generating, setGenerating] = React.useState(false);

  const handleGenerate = async (prompt: string) => {
    try {
      setGenerating(true);
      const files = await generateWebsite(prompt);
      onGenerateFiles(files);
      setDialogOpen(false);
    } catch (error) {
      console.error("Failed to generate website:", error);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <>
      <motion.div
        className="fixed bottom-6 right-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <div className="relative">
          {generating && (
            <div className="absolute -inset-2">
              <div className="w-16 h-16 rounded-full animate-spin bg-gradient-to-r from-purple-500 to-teal-500 blur-xl opacity-20" />
            </div>
          )}
          <Button
            size="lg"
            className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-teal-500 hover:from-purple-600 hover:to-teal-600 shadow-lg"
            onClick={() => setDialogOpen(true)}
            disabled={generating}
          >
            <Wand2 className="h-6 w-6 text-white" />
          </Button>
          {generating && (
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-32">
              <Progress value={progress} className="h-1 w-full bg-muted" />
            </div>
          )}
        </div>
      </motion.div>

      <AIDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onGenerate={handleGenerate}
        isGenerating={generating}
      />
    </>
  );
};

export default AIGenerateButton;
