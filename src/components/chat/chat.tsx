'use client';

import { useEffect, useRef, useState, useTransition } from 'react';
import type { Message } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SendHorizonal, LoaderCircle, PlusCircle, Mic } from 'lucide-react';
import ChatMessage from './message';
import { getInsurancePlans } from '@/app/actions';
import PlanResults from '../plan-results';
import { useToast } from '@/hooks/use-toast';

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    setMessages([
      {
        id: crypto.randomUUID(),
        sender: 'bot',
        text: "Welcome to InsuroMatch AI! I'm here to help you find the perfect insurance plan. Please describe your needs, and I'll find the best options for you.",
      },
    ]);
  }, []);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isPending || isFinished) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      sender: 'user',
      text: inputValue,
    };
    setMessages((prev) => [...prev, userMessage]);
    const currentUserInput = inputValue;
    setInputValue('');

    startTransition(async () => {
      const thinkingMessage: Message = {
        id: crypto.randomUUID(),
        sender: 'bot',
        text: 'Thank you! Analyzing your needs to find the best plans...',
      };
      setMessages((prev) => [...prev, thinkingMessage]);
      
      // Since the new flow only has one input, we will use it for everything.
      // This is a simplification. A more robust solution might use a different flow.
      const result = await getInsurancePlans({
        age: 30, // Default values as we are not collecting this info anymore
        income: 50000,
        familyStatus: 'Single',
        healthCondition: 'Good',
        preferences: currentUserInput,
      });

      if (result.success && result.plans) {
        const resultsMessage: Message = {
          id: crypto.randomUUID(),
          sender: 'bot',
          text: "Here are the top insurance plans I've found for you based on your request:",
        };
        const plansComponentMessage: Message = {
          id: crypto.randomUUID(),
          sender: 'bot',
          component: <PlanResults plans={result.plans} />,
        };
        setMessages((prev) => [...prev.filter(m => m.id !== thinkingMessage.id), resultsMessage, plansComponentMessage]);
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Could not fetch recommendations.',
          variant: 'destructive',
        });
        const errorMessage: Message = {
          id: crypto.randomUUID(),
          sender: 'bot',
          text: "I'm sorry, but I encountered an error while finding plans for you. Please try again later.",
        };
        setMessages((prev) => [...prev.filter(m => m.id !== thinkingMessage.id), errorMessage]);
      }
      setIsFinished(true);
    });
  };

  return (
    <div className="h-full flex flex-col max-w-4xl mx-auto">
      <ScrollArea className="flex-1 p-4 md:p-6" ref={scrollAreaRef as any}>
        <div className="flex flex-col gap-6">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
        </div>
      </ScrollArea>
      <div className="px-4 md:px-6 py-4 border-t bg-card">
        <div className="relative">
          <form onSubmit={handleSendMessage}>
            <Textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask any question or type ‘/’ for commands"
              className="flex-1 resize-none rounded-2xl border-input bg-background shadow-sm pr-28 pl-12 py-3 min-h-[56px]"
              rows={1}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(e);
                }
              }}
              disabled={isPending || isFinished}
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <Button type="button" size="icon" variant="ghost" className="text-muted-foreground hover:text-foreground" disabled={isPending || isFinished}>
                <PlusCircle className="w-5 h-5" />
                <span className="sr-only">Add</span>
              </Button>
              <Button type="button" size="icon" variant="ghost" className="text-muted-foreground hover:text-foreground" disabled={isPending || isFinished}>
                <Mic className="w-5 h-5" />
                <span className="sr-only">Use Microphone</span>
              </Button>
            </div>
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <Button type="submit" size="icon" disabled={isPending || !inputValue.trim() || isFinished} className="rounded-xl w-10 h-10">
                {isPending ? (
                  <LoaderCircle className="w-5 h-5 animate-spin" />
                ) : (
                  <SendHorizonal className="w-5 h-5" />
                )}
                <span className="sr-only">Send</span>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
