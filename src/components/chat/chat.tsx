'use client';

import { useEffect, useRef, useState, useTransition } from 'react';
import type { Message } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SendHorizonal, LoaderCircle, ArrowUp } from 'lucide-react';
import ChatMessage from './message';
import { getInsurancePlans } from '@/app/actions';
import PlanResults from '../plan-results';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([
      {
        id: crypto.randomUUID(),
        sender: 'bot',
        text: "ยินดีต้อนรับสู่ผู้ช่วยประกัน AI! ฉันพร้อมช่วยคุณค้นหาแผนประกันที่สมบูรณ์แบบที่สุด โปรดอธิบายความต้องการของคุณ แล้วฉันจะค้นหาตัวเลือกที่ดีที่สุดสำหรับคุณ",
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
    const currentUserInput = inputValue;
    setInputValue('');

    startTransition(async () => {
      const thinkingMessage: Message = {
        id: crypto.randomUUID(),
        sender: 'bot',
        text: 'ขอบคุณสำหรับข้อมูล! กำลังวิเคราะห์ความต้องการของคุณเพื่อค้นหาแผนประกันที่ดีที่สุด...',
      };
      setMessages((prev) => [...prev, thinkingMessage]);
      
      const result = await getInsurancePlans({
        age: 30,
        income: 50000,
        familyStatus: 'โสด',
        healthCondition: 'สุขภาพดี',
        preferences: currentUserInput,
      });

      if (result.success && result.plans) {
        const resultsMessage: Message = {
          id: crypto.randomUUID(),
          sender: 'bot',
          text: "นี่คือแผนประกันภัยยอดนิยมที่ฉันพบสำหรับคุณตามคำขอของคุณ:",
        };
        const plansComponentMessage: Message = {
          id: crypto.randomUUID(),
          sender: 'bot',
          component: <PlanResults plans={result.plans} />,
        };
        setMessages((prev) => [...prev.filter(m => m.id !== thinkingMessage.id), resultsMessage, plansComponentMessage]);
      } else {
        toast({
          title: 'เกิดข้อผิดพลาด',
          description: result.error || 'ไม่สามารถดึงข้อมูลคำแนะนำได้',
          variant: 'destructive',
        });
        const errorMessage: Message = {
          id: crypto.randomUUID(),
          sender: 'bot',
          text: "ขออภัย ฉันพบข้อผิดพลาดขณะค้นหาแผนสำหรับคุณ กรุณาลองใหม่อีกครั้งในภายหลัง",
        };
        setMessages((prev) => [...prev.filter(m => m.id !== thinkingMessage.id), errorMessage]);
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
              placeholder="พิมพ์คำถามของคุณที่นี่..."
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
              <span className="sr-only">ส่ง</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chat;
