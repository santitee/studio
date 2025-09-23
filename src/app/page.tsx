'use client';

import Chat from '@/components/chat/chat';
import Header from '@/components/header';
import { useState } from 'react';

export default function Home() {
  const [language, setLanguage] = useState('TH');

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header language={language} setLanguage={setLanguage} />
      <main className="flex-1 overflow-hidden">
        <Chat language={language} />
      </main>
    </div>
  );
}
