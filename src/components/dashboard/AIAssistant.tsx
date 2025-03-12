import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BotIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SendIcon,
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
}

interface AIAssistantProps {
  expanded?: boolean;
  onToggle?: () => void;
}

// Sample responses for demonstration
const SAMPLE_RESPONSES: Record<string, string> = {
  deadline:
    "The next deadline for Smith v. Johnson is the filing of the motion for summary judgment, due on June 15, 2023.",
  case: "Case #2023-001 (Smith v. Johnson) is currently active. The case involves a personal injury claim following a car accident on Highway 101. The next court date is scheduled for July 10, 2023.",
  reminder:
    "I've set a reminder for your client meeting with Sarah Williams on June 8, 2023 at 2:00 PM.",
  summary:
    "Here's a summary of the Tech Innovations v. DataCorp case: This is an intellectual property dispute regarding alleged patent infringement of Tech Innovations' data processing technology. The case is in discovery phase with depositions scheduled for next month.",
};

// Default messages
const DEFAULT_MESSAGES: Message[] = [
  {
    id: "1",
    content: "Hello! I'm your legal assistant. How can I help you today?",
    sender: "assistant",
    timestamp: new Date(),
  },
];

export default function AIAssistant({
  expanded = false,
  onToggle,
}: AIAssistantProps) {
  const [isExpanded, setIsExpanded] = useState(expanded);
  const [messages, setMessages] = useState<Message[]>(DEFAULT_MESSAGES);
  const [input, setInput] = useState("");

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
    if (onToggle) {
      onToggle();
    }
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      let responseContent =
        "I'm not sure how to help with that. Could you provide more details about your question?";

      // Simple keyword matching for demo purposes
      const lowercaseInput = input.toLowerCase();
      if (lowercaseInput.includes("deadline")) {
        responseContent = SAMPLE_RESPONSES.deadline;
      } else if (
        lowercaseInput.includes("case") ||
        lowercaseInput.includes("smith")
      ) {
        responseContent = SAMPLE_RESPONSES.case;
      } else if (lowercaseInput.includes("remind")) {
        responseContent = SAMPLE_RESPONSES.reminder;
      } else if (lowercaseInput.includes("summary")) {
        responseContent = SAMPLE_RESPONSES.summary;
      }

      const aiMessage: Message = {
        id: Date.now().toString(),
        content: responseContent,
        sender: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  if (!isExpanded) {
    return (
      <Button
        variant="outline"
        className="fixed bottom-4 right-4 p-3 rounded-full shadow-md"
        onClick={toggleExpanded}
      >
        <BotIcon className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-4 right-4 w-80 sm:w-96 h-[500px] shadow-lg flex flex-col">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg flex items-center">
          <BotIcon className="h-5 w-5 mr-2" />
          AI Assistant
        </CardTitle>
        <Button variant="ghost" size="icon" onClick={toggleExpanded}>
          <ChevronRightIcon className="h-5 w-5" />
        </Button>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-0">
        <ScrollArea className="h-[380px] px-4">
          <div className="space-y-4 pt-4 pb-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-3 py-2 ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <Input
              placeholder="Ask about a case or deadline..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button size="icon" onClick={handleSendMessage}>
              <SendIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
