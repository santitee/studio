'use client';

import Chat from '@/components/chat/chat';
import Header from '@/components/header';
import { useState } from 'react';
import ProgressSteps from '@/components/progress-steps';

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
      <ProgressSteps currentStep={1} language={language} />
      <main className="flex-1 overflow-hidden">
        <Chat language={language} chatStyle={chatStyle} />
      </main>
    </div>
  );
}
