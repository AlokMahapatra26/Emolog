"use client";

import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Fragment, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Textarea } from "./ui/textarea";
import { aiTherapistAction } from "@/actions/journal";
import "@/styles/ai-response.css";

type Props = {
  user: User | null;
};

const personas = ["tara", "emma", "raghu", "alex"] as const;

function getPersonaName(persona: string) {
  if (persona === "tara") return "Tara";
  if (persona === "emma") return "Emma";
  if (persona === "raghu") return "Raghu";
  if (persona === "alex") return "Alex";
  return "";
}

function getPersonaDescription(persona: string) {
  if (persona === "tara") return "Tara is from Delhi , she is sweet as sugar and she will help you understand your emotions ❤️";
  if (persona === "emma") return "Emma is your calm friend from London 🌸, always ready to lend a compassionate ear.";
  if (persona === "raghu") return "Raghu is a Therapist from mumbai , yeah thats it we don't know much about him hehe";
  if (persona === "alex") return "Alex is a thoughtful mentor from New York 🌍 who helps you grow with empathy and logic.";
  return "";
}

function Chat({ user }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [open, setOpen] = useState(false);
  const [persona, setPersona] = useState<"tara" | "emma" | "raghu" | "alex">("tara");

  const [questionText, setQuestionText] = useState("");
  const [questions, setQuestions] = useState<string[]>([]);
  const [responses, setResponses] = useState<string[]>([]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleOnOpenChange = (isOpen: boolean) => {
    if (!user) {
      router.push("/login");
    } else {
      if (isOpen) {
        setQuestionText("");
        setQuestions([]);
        setResponses([]);
        setPersona("tara");
      }
      setOpen(isOpen);
    }
  };

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleClickInput = () => {
    textareaRef.current?.focus();
  };

  const handleSubmit = () => {
    if (!questionText.trim()) return;

    const newQuestions = [...questions, questionText];
    setQuestions(newQuestions);
    setQuestionText("");
    setTimeout(scrollToBottom, 100);

    startTransition(async () => {
      const response = await aiTherapistAction(newQuestions, responses, persona);
      setResponses((prev) => [...prev, response]);
      setTimeout(scrollToBottom, 100);
    });
  };

  const scrollToBottom = () => {
    contentRef.current?.scrollTo({
      top: contentRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOnOpenChange}>
      <DialogTrigger asChild>
        <Button variant="default" className="cursor-pointer transition-transform duration-300 hover:scale-110 hover:rotate-3">
          Chat with our AI therapist
        </Button>
      </DialogTrigger>
      <DialogContent className="custom-scrollbar flex h-[85vh] max-w-4xl flex-col overflow-y-auto" ref={contentRef}>
        <DialogHeader>
          <DialogTitle>{getPersonaName(persona)}</DialogTitle>
          <DialogDescription className="text-xs border p-2 rounded opacity-50">
            {getPersonaDescription(persona)}
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-2 my-2">
          {personas.map((p) => (
  <Button
    key={p}
    variant={p === persona ? "default" : "outline"}
    size="sm"
    onClick={() => {
      setPersona(p);
      setQuestions([]);
      setResponses([]);
      setQuestionText("");
    }}
    className="capitalize cursor-pointer"
  >
    {getPersonaName(p)}
  </Button>
))}

        </div>

        <div className="mt-4 flex flex-col gap-8">
          {questions.map((question, index) => (
            <Fragment key={index}>
              <p className="bg-muted text-muted-foreground ml-auto max-w-[60%] rounded-md px-2 py-1 text-sm">
                {question}
              </p>
              {responses[index] && (
                <p
                  className="bot-response text-muted-foreground text-sm"
                  dangerouslySetInnerHTML={{ __html: responses[index] }}
                />
              )}
            </Fragment>
          ))}
          {isPending && <p className="animate-pulse text-sm">Thinking...</p>}
        </div>

        <div
          className="mt-auto flex cursor-text flex-col rounded-lg border p-4"
          onClick={handleClickInput}
        >
          <Textarea
            ref={textareaRef}
            placeholder="Type here..."
            className="placeholder:text-muted-foreground resize-none rounded-none border-none bg-transparent p-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
            style={{
              minHeight: "0",
              lineHeight: "normal",
            }}
            rows={1}
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default Chat;
