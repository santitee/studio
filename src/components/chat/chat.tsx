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
import { useToast } from '@/hooks/use-toast';

interface ChatProps {
  language: string;
  chatStyle: string;
  onNewResults: () => void;
}

const Chat = ({ language, chatStyle, onNewResults }: ChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isPending, startTransition] = useTransition();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { toast } = useToast();

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
        age: 30, // Mock data, will be replaced with form data
        income: 50000, // Mock data, will be replaced with form data
        familyStatus: 'โสด', // Mock data, will be replaced with form data
        healthCondition: 'สุขภาพดี', // Mock data, will be replaced with form data
        preferences: currentUserInput,
        language: language,
        chatStyle: chatStyle,
      });

      // Handle errors from the AI flow
      if (result.error) {
        toast({
          variant: "destructive",
          title: language === 'TH' ? "เกิดข้อผิดพลาด" : "An Error Occurred",
          description: language === 'TH' ? "ไม่สามารถเรียกข้อมูลจาก AI ได้ กำลังแสดงแผนยอดนิยมแทน" : "Couldn't get data from the AI. Showing popular plans instead.",
        });
      }

      if (result.plans && result.plans.length > 0) {
        const resultsMessage: Message = {
          id: crypto.randomUUID(),
          sender: 'bot',
          text: language === 'TH'
            ? "นี่คือแผนประกันภัยที่ฉันแนะนำสำหรับคุณตามข้อมูลที่ให้มา:"
            : "Here are the insurance plans I recommend for you based on your information:",
        };
        const plansComponentMessage: Message = {
          id: crypto.randomUUID(),
          sender: 'bot',
          component: <PlanResults plans={result.plans} onSelectPlan={handleSelectPlan} language={language} />,
        };
        setMessages((prev) => [...prev, resultsMessage, plansComponentMessage]);
        onNewResults(); // Notify parent component to update step
      } else {
        const errorMessage: Message = {
          id: crypto.randomUUID(),
          sender: 'bot',
          text: language === 'TH'
            ? "ขออภัย ฉันไม่พบแผนที่ตรงกับความต้องการของคุณ กรุณาลองอธิบายความต้องการของคุณให้ละเอียดขึ้น"
            : "I'm sorry, I couldn't find any plans that match your request. Please try describing your needs in more detail.",
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
