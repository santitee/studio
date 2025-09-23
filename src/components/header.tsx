'use client'

import Logo from './logo';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal } from 'lucide-react';
import Link from 'next/link';

interface HeaderProps {
  language: string;
  setLanguage: (language: string) => void;
}

const Header = ({ language, setLanguage }: HeaderProps) => {
  const toggleLanguage = () => {
    setLanguage(language === 'TH' ? 'EN' : 'TH');
  }

  return (
    <header className="flex items-center justify-between h-16 px-4 md:px-6 border-b bg-card/80 backdrop-blur-sm shrink-0">
      <div className="flex items-center gap-3">
        <Logo className="w-8 h-8 text-primary" />
        <h1 className="text-xl font-bold font-headline text-primary">
          {language === 'TH' ? 'ผู้ช่วยประกัน AI' : 'AI Insurance Assistant'}
        </h1>
      </div>
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          onClick={toggleLanguage}
          className="w-20"
        >
          {language}
        </Button>
        <Button asChild variant="ghost" size="icon">
          <Link href="/chat-style">
            <SlidersHorizontal />
            <span className="sr-only">{language === 'TH' ? 'ปรับรูปแบบ Chat' : 'Adjust Chat Style'}</span>
          </Link>
        </Button>
      </div>
    </header>
  );
};

export default Header;
