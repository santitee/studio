'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, BarChart, DollarSign, ListChecks, ShieldCheck, Users } from 'lucide-react';
import Header from '@/components/header';
import { useState } from 'react';

function ProductSummaryContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [language, setLanguage] = useState('TH');
  const [chatStyle, setChatStyle] = useState('professional');

  // In a real app, you might fetch plan details using an ID
  // For now, we'll pass the details via search params
  const plan = {
    name: searchParams.get('name') || 'N/A',
    coverage: searchParams.get('coverage') || 'N/A',
    premium: searchParams.get('premium') || 'N/A',
    benefits: searchParams.get('benefits') || 'N/A',
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header language={language} setLanguage={setLanguage} chatStyle={chatStyle} />
      <main className="flex-1 overflow-auto p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" onClick={() => router.back()} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            กลับไปหน้าแชท
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
                    <h4 className="font-semibold">เบี้ยประกัน</h4>
                    <p className="text-muted-foreground">{plan.premium}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-6 h-6 mt-1 text-primary" />
                  <div>
                    <h4 className="font-semibold">ความคุ้มครอง</h4>
                    <p className="text-muted-foreground">{plan.coverage}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ListChecks className="w-6 h-6 mt-1 text-primary" />
                <div>
                  <h4 className="font-semibold">ผลประโยชน์</h4>
                  <p className="text-muted-foreground whitespace-pre-line">{plan.benefits}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <BarChart className="w-5 h-5 text-primary" />
                  จำลองผลประโยชน์ (Infographic)
                </h3>
                <div className="flex items-center justify-center h-48 bg-muted rounded-lg">
                  <p className="text-muted-foreground">Infographic coming soon</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  ผู้รับผลประโยชน์
                </h3>
                <div className="flex items-center justify-center h-24 bg-muted rounded-lg">
                  <p className="text-muted-foreground">Beneficiary management coming soon</p>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button size="lg">ดำเนินการต่อเพื่อซื้อ</Button>
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
