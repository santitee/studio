'use client';

import { useEffect, useRef, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import type { Message, InsurancePlan } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { LoaderCircle, ArrowUp } from 'lucide-react';
import ChatMessage from './message';
import { getInsurancePlans } from '@/app/actions';
import PlanResults from '../plan-results';
import { cn } from '@/lib/utils';
import TypingIndicator from './typing-indicator';

interface ChatProps {
  language: string;
  chatStyle: string;
}

const Chat = ({ language, chatStyle }: ChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isPending, startTransition] = useTransition();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    setMessages([
      {
        id: crypto.randomUUID(),
        sender: 'bot',
        text: language === 'TH'
          ? "ยินดีต้อนรับสู่ผู้ช่วยประกัน AI! ฉันพร้อมช่วยคุณค้นหาแผนประกันที่สมบูรณ์แบบที่สุด โปรดอธิบายความต้องการของคุณ แล้วฉันจะค้นหาตัวเลือกที่ดีที่สุดสำหรับคุณ"
          : "Welcome to the AI Insurance Assistant! I'm here to help you find the perfect insurance plan. Please describe your needs, and I'll find the best options for you.",
      },
    ]);
  }, [language]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, isPending]);

  const handleSelectPlan = (plan: InsurancePlan) => {
    const params = new URLSearchParams({
      name: plan.name,
      coverage: plan.coverage,
      premium: plan.premium,
      benefits: plan.benefits,
    });
    router.push(`/product-summary?${params.toString()}`);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isPending) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      sender: 'user',
      text: inputValue,
    };
    setMessages((prev) => [...prev, userMessage]);
    const currentUserInput = inputValue;
    setInputValue('');

    startTransition(async () => {
      const result = await getInsurancePlans({
        age: 30,
        income: 50000,
        familyStatus: 'โสด',
        healthCondition: 'สุขภาพดี',
        preferences: currentUserInput,
        language: language,
        chatStyle: chatStyle,
      });

      if (result.success && result.plans) {
        const resultsMessage: Message = {
          id: crypto.randomUUID(),
          sender: 'bot',
          text: language === 'TH'
            ? "นี่คือแผนประกันภัยยอดนิยมที่ฉันพบสำหรับคุณตามคำขอของคุณ:"
            : "Here are the top insurance plans I found for you based on your request:",
        };
        const plansComponentMessage: Message = {
          id: crypto.randomUUID(),
          sender: 'bot',
          component: <PlanResults plans={result.plans} onSelectPlan={handleSelectPlan} />,
        };
        setMessages((prev) => [...prev, resultsMessage, plansComponentMessage]);
      } else {
        const errorMessage: Message = {
          id: crypto.randomUUID(),
          sender: 'bot',
          text: language === 'TH'
            ? "ขออภัย ฉันพบข้อผิดพลาดขณะค้นหาแผนสำหรับคุณ กรุณาลองใหม่อีกครั้งในภายหลัง"
            : "I'm sorry, I encountered an error while searching for plans for you. Please try again later.",
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    });
  };

  return (
    <div className="h-full flex flex-col max-w-4xl mx-auto">
      <ScrollArea className="flex-1 p-4 md:p-6" ref={scrollAreaRef as any}>
        <div className="flex flex-col gap-6">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          {isPending && (
            <ChatMessage
              message={{
                id: 'typing',
                sender: 'bot',
                component: <TypingIndicator />,
              }}
            />
          )}
        </div>
      </ScrollArea>
      <div className="px-4 md:px-6 py-4 border-t bg-card shrink-0">
        <form 
          onSubmit={handleSendMessage}
          className="flex items-center gap-4"
        >
          <div className="relative flex-1">
            <Textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={language === 'TH' ? "พิมพ์คำถามของคุณที่นี่..." : "Type your question here..."}
              className="flex-1 resize-none rounded-2xl border-input bg-background shadow-sm pr-12 pl-4 py-3 min-h-[56px] text-base"
              rows={1}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(e);
                }
              }}
              disabled={isPending}
            />
            <Button 
              type="submit" 
              size="icon" 
              disabled={isPending || !inputValue.trim()} 
              className={cn(
                "absolute right-3 top-1/2 -translate-y-1/2 rounded-xl w-10 h-10 transition-colors",
                inputValue.trim() ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              )}
            >
              {isPending ? (
                <LoaderCircle className="w-5 h-5 animate-spin" />
              ) : (
                <ArrowUp className="w-5 h-5" />
              )}
              <span className="sr-only">{language === 'TH' ? "ส่ง" : "Send"}</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chat;
