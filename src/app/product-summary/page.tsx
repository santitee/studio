'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, BarChart, DollarSign, ListChecks, ShieldCheck, Users } from 'lucide-react';
import Header from '@/components/header';
import ProgressSteps from '@/components/progress-steps';

const content = {
  TH: {
    backToChat: "กลับไปหน้าแชท",
    premium: "เบี้ยประกัน",
    coverage: "ความคุ้มครอง",
    benefits: "ผลประโยชน์",
    infographicTitle: "จำลองผลประโยชน์ (Infographic)",
    infographicPlaceholder: "Infographic coming soon",
    beneficiaryTitle: "ผู้รับผลประโยชน์",
    beneficiaryPlaceholder: "Beneficiary management coming soon",
    buyButton: "ดำเนินการต่อเพื่อซื้อ",
  },
  EN: {
    backToChat: "Back to Chat",
    premium: "Premium",
    coverage: "Coverage",
    benefits: "Benefits",
    infographicTitle: "Benefit Simulation (Infographic)",
    infographicPlaceholder: "Infographic coming soon",
    beneficiaryTitle: "Beneficiary",
    beneficiaryPlaceholder: "Beneficiary management coming soon",
    buyButton: "Proceed to Purchase",
  }
};


function ProductSummaryContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [language, setLanguage] = useState(searchParams.get('lang') || 'TH');
  const [chatStyle, setChatStyle] = useState(searchParams.get('style') || 'professional');

  const [plan, setPlan] = useState({
    name: searchParams.get('name') || 'N/A',
    coverage: searchParams.get('coverage') || 'N/A',
    premium: searchParams.get('premium') || 'N/A',
    benefits: searchParams.get('benefits') || 'N/A',
  });

  useEffect(() => {
    const lang = searchParams.get('lang') || 'TH';
    const style = searchParams.get('style') || 'professional';
    setLanguage(lang);
    setChatStyle(style);
    
    // Update plan details from searchParams when they change
    setPlan({
      name: searchParams.get('name') || 'N/A',
      coverage: searchParams.get('coverage') || 'N/A',
      premium: searchParams.get('premium') || 'N/A',
      benefits: searchParams.get('benefits') || 'N/A',
    });
  }, [searchParams]);

  const t = content[language as keyof typeof content];
  
  const handleProceed = () => {
    router.push(`/user-info?lang=${language}&style=${chatStyle}`);
  }

  const handleLanguageChange = (newLang: string) => {
    setLanguage(newLang);
    // Create a new URLSearchParams object to update the URL
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('lang', newLang);
    // Use router.replace to update the URL without a full page reload
    router.replace(`${window.location.pathname}?${newParams.toString()}`);
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header 
        language={language} 
        setLanguage={handleLanguageChange}
        chatStyle={chatStyle} 
      />
      <ProgressSteps currentStep="Product" language={language} />
      <main className="flex-1 overflow-auto p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" onClick={() => router.push('/')} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t.backToChat}
            {t.backToChat}
          </Button>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-primary">{plan.name}</CardTitle>
              <CardDescription>{plan.coverage}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <DollarSign className="w-6 h-6 mt-1 text-primary" />
                  <div>
                    <h4 className="font-semibold">{t.premium}</h4>
                    <h4 className="font-semibold">{t.premium}</h4>
                    <p className="text-muted-foreground">{plan.premium}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-6 h-6 mt-1 text-primary" />
                  <div>
                    <h4 className="font-semibold">{t.coverage}</h4>
                    <h4 className="font-semibold">{t.coverage}</h4>
                    <p className="text-muted-foreground">{plan.coverage}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ListChecks className="w-6 h-6 mt-1 text-primary" />
                <div>
                  <h4 className="font-semibold">{t.benefits}</h4>
                  <h4 className="font-semibold">{t.benefits}</h4>
                  <p className="text-muted-foreground whitespace-pre-line">{plan.benefits}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <BarChart className="w-5 h-5 text-primary" />
                  {t.infographicTitle}
                </h3>
                <div className="flex items-center justify-center h-48 bg-muted rounded-lg">
                  <p className="text-muted-foreground">{t.infographicPlaceholder}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  {t.beneficiaryTitle}
                </h3>
                <div className="flex items-center justify-center h-24 bg-muted rounded-lg">
                  <p className="text-muted-foreground">{t.beneficiaryPlaceholder}</p>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button size="lg" onClick={handleProceed}>{t.buyButton}</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}


export default function ProductSummaryPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductSummaryContent />
    </Suspense>
  );
}
