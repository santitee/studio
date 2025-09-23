'use client';

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function ChatStylePage() {
  const [language, setLanguage] = useState('TH');
  const [chatStyle, setChatStyle] = useState('professional');

  const content = {
    TH: {
      backToChat: "กลับไปหน้าแชท",
      title: "ปรับรูปแบบการตอบของ Chatbot",
      description: "เลือกสไตล์การสนทนาที่คุณต้องการให้ AI ตอบกลับ",
      friendly: "เป็นกันเอง",
      friendlyDesc: "ลักษณะเป็นมิตร คุยกันภาษาเพื่อน เสมือนคนรู้ใจ",
      professional: "เป็นมืออาชีพ",
      professionalDesc: "ลักษณะเป็นทางการ ลงท้ายด้วยคำว่า ครับ/ค่ะ หรือ นะครับ/นะคะ",
      analytical: "เป็นนักวิเคราะห์",
      analyticalDesc: "ลักษณะเน้นตัวเลข การคำนวณที่ละเอียด รวดเร็ว แม่นยำ",
    },
    EN: {
      backToChat: "Back to Chat",
      title: "Adjust Chatbot Response Style",
      description: "Choose the conversation style you want the AI to respond with",
      friendly: "Friendly",
      friendlyDesc: "A friendly, conversational style, like talking to a close friend.",
      professional: "Professional",
      professionalDesc: "A formal style, using polite language and professional tone.",
      analytical: "Analytical",
      analyticalDesc: "A style focused on numbers, detailed calculations, and precision.",
    }
  }

  const t = content[language as keyof typeof content];

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header language={language} setLanguage={setLanguage} chatStyle={chatStyle} />
      <main className="flex-1 overflow-auto p-4 md:p-6">
        <div className="max-w-2xl mx-auto">
          <Button asChild variant="ghost" className="mb-4">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t.backToChat}
            </Link>
          </Button>
          <Card>
            <CardHeader>
              <CardTitle>{t.title}</CardTitle>
              <CardDescription>{t.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup defaultValue={chatStyle} onValueChange={setChatStyle} className="space-y-4">
                <div className="flex items-center space-x-3 p-4 border rounded-md has-[:checked]:border-primary has-[:checked]:bg-accent">
                  <RadioGroupItem value="friendly" id="friendly" />
                  <Label htmlFor="friendly" className="w-full">
                    <h3 className="font-semibold">{t.friendly}</h3>
                    <p className="text-sm text-muted-foreground">{t.friendlyDesc}</p>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 border rounded-md has-[:checked]:border-primary has-[:checked]:bg-accent">
                  <RadioGroupItem value="professional" id="professional" />
                  <Label htmlFor="professional" className="w-full">
                    <h3 className="font-semibold">{t.professional}</h3>
                    <p className="text-sm text-muted-foreground">{t.professionalDesc}</p>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 border rounded-md has-[:checked]:border-primary has-[:checked]:bg-accent">
                  <RadioGroupItem value="analytical" id="analytical" />
                  <Label htmlFor="analytical" className="w-full">
                    <h3 className="font-semibold">{t.analytical}</h3>
                    <p className="text-sm text-muted-foreground">{t.analyticalDesc}</p>
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
