'use client';

import Chat from '@/components/chat/chat';
import Header from '@/components/header';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  const [language, setLanguage] = useState('TH');
  const [chatStyle, setChatStyle] = useState('professional');

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header 
        language={language} 
        setLanguage={setLanguage} 
        chatStyle={chatStyle} 
      />
      <main className="flex-1 overflow-hidden">
        <Chat language={language} chatStyle={chatStyle} />
      </main>
    </div>
  );
}
