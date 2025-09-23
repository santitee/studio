'use client';

import { useEffect, useRef, useState, useTransition } from 'react';
import type { Message, FormData } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SendHorizonal, LoaderCircle } from 'lucide-react';
import ChatMessage from './message';
import { getInsurancePlans } from '@/app/actions';
import PlanResults from '../plan-results';
import { useToast } from '@/hooks/use-toast';

const questions = [
  { key: 'age', text: 'To get started, what is your age?' },
  { key: 'income', text: 'Great. What is your approximate annual income?' },
  { key: 'familyStatus', text: 'And what is your family status? (e.g., Single, Married, Divorced)' },
  { key: 'healthCondition', text: 'Could you briefly describe your current health condition?' },
  { key: 'preferences', text: 'Finally, do you have any specific preferences for your insurance plan?' },
];

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [formData, setFormData] = useState<FormData>({});
  const [inputValue, setInputValue] = useState('');
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([
      {
        id: crypto.randomUUID(),
        sender: 'bot',
        text: "Welcome to InsuroMatch AI! I'm here to help you find the perfect insurance plan.",
      },
      {
        id: crypto.randomUUID(),
        sender: 'bot',
        text: questions[0].text,
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
    if (!inputValue.trim() || isPending) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      sender: 'user',
      text: inputValue,
    };
    setMessages((prev) => [...prev, userMessage]);

    const currentQuestion = questions[currentQuestionIndex];
    let value: string | number = inputValue;
    if (currentQuestion.key === 'age' || currentQuestion.key === 'income') {
        value = parseInt(inputValue, 10);
        if (isNaN(value)) {
            setMessages((prev) => [...prev, {
                id: crypto.randomUUID(),
                sender: 'bot',
                text: "Please provide a valid number."
            }, {
                id: crypto.randomUUID(),
                sender: 'bot',
                text: currentQuestion.text,
            }]);
            setInputValue('');
            return;
        }
    }

    const newFormData = { ...formData, [currentQuestion.key]: value };
    setFormData(newFormData);
    setInputValue('');

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      const nextQuestion = questions[currentQuestionIndex + 1];
      setMessages((prev) => [...prev, {
        id: crypto.randomUUID(),
        sender: 'bot',
        text: nextQuestion.text,
      }]);
    } else {
      startTransition(async () => {
        const thinkingMessage: Message = {
          id: crypto.randomUUID(),
          sender: 'bot',
          text: 'Thank you! Analyzing your needs to find the best plans...',
        };
        setMessages((prev) => [...prev, thinkingMessage]);

        const result = await getInsurancePlans(newFormData as any);

        if (result.success && result.plans) {
          const resultsMessage: Message = {
            id: crypto.randomUUID(),
            sender: 'bot',
            text: "Here are the top insurance plans I've found for you:",
          };
          const plansComponentMessage: Message = {
            id: crypto.randomUUID(),
            sender: 'bot',
            component: <PlanResults plans={result.plans} />,
          }
          setMessages((prev) => [...prev.filter(m => m.id !== thinkingMessage.id), resultsMessage, plansComponentMessage]);
        } else {
          toast({
            title: 'Error',
            description: result.error || 'Could not fetch recommendations.',
            variant: 'destructive'
          });
          const errorMessage: Message = {
            id: crypto.randomUUID(),
            sender: 'bot',
            text: "I'm sorry, but I encountered an error while finding plans for you. Please try again later.",
          };
          setMessages((prev) => [...prev.filter(m => m.id !== thinkingMessage.id), errorMessage]);
        }
      });
    }
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
        <form onSubmit={handleSendMessage} className="flex items-center gap-3">
          <Textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message here..."
            className="flex-1 resize-none"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(e);
              }
            }}
            disabled={isPending || currentQuestionIndex >= questions.length}
          />
          <Button type="submit" size="icon" disabled={isPending || !inputValue.trim()}>
            {isPending ? (
              <LoaderCircle className="w-5 h-5 animate-spin" />
            ) : (
              <SendHorizonal className="w-5 h-5" />
            )}
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
