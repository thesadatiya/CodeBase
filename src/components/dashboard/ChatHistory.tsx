import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquarePlus, Clock, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { signOut } from "@/lib/auth";

interface Chat {
  id: string;
  prompt: string;
  timestamp: string;
  previewImage?: string;
}

export default function ChatHistory() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadChats();
  }, []);

  const loadChats = async () => {
    try {
      const { data, error } = await supabase
        .from("chat_history")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setChats(
        data.map((chat) => ({
          id: chat.id,
          prompt: chat.prompt,
          timestamp: new Date(chat.created_at).toLocaleDateString(),
          previewImage: chat.preview_image,
        })),
      );
    } catch (error) {
      console.error("Error loading chats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/signin");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleNewChat = () => {
    navigate("/workspace");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto py-4 px-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Your Projects</h1>
            <div className="flex items-center gap-4">
              <Button onClick={handleNewChat}>
                <MessageSquarePlus className="mr-2 h-4 w-4" />
                New Chat
              </Button>
              <Button variant="ghost" onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chats.map((chat, index) => (
            <motion.div
              key={chat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                {chat.previewImage && (
                  <div className="aspect-video relative overflow-hidden rounded-t-lg">
                    <img
                      src={chat.previewImage}
                      alt="Preview"
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="line-clamp-1">{chat.prompt}</CardTitle>
                  <CardDescription className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    {chat.timestamp}
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>

        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        )}

        {!isLoading && chats.length === 0 && (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-2">No projects yet</h2>
            <p className="text-muted-foreground mb-4">
              Start by creating a new project
            </p>
            <Button onClick={handleNewChat}>
              <MessageSquarePlus className="mr-2 h-4 w-4" />
              New Chat
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
