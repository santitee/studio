'use client';

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, BrainCircuit, Heart, MessageCircle, UserCheck } from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ChatStylePage() {
  const [language, setLanguage] = useState('TH');
  const [chatStyle, setChatStyle] = useState('professional');

  const content = {
    TH: {
      backToChat: "กลับไปหน้าแชท",
      title: "เลือกสไตล์การสนทนา",
      description: "เลือกรูปแบบการสื่อสารที่เหมาะกับคุณที่สุด",
      friendly: "เป็นกันเอง",
      friendlyDesc: "อบอุ่นและห่วงใย",
      professional: "มืออาชีพ",
      professionalDesc: "เป็นทางการและละเอียด",
      analytical: "นักวิเคราะห์",
      analyticalDesc: "เน้นข้อมูล",
      friendlyTitle: "ที่ปรึกษาที่เป็นมิตร",
      friendlySubtitle: "อบอุ่น เข้าถึงง่าย และเห็นอกเห็นใจ",
      professionalTitle: "ที่ปรึกษามืออาชีพ",
      professionalSubtitle: "เป็นทางการ เป็นระบบ และละเอียดถี่ถ้วน",
      analyticalTitle: "นักวิเคราะห์ข้อมูล",
      analyticalSubtitle: "เน้นข้อมูล สถิติ และการวิเคราะห์",
      communicationStyle: "สไตล์การสื่อสาร:",
      benefits: "ประโยชน์:",
      bestFor: "เหมาะสำหรับ:",
      sampleResponse: "ตัวอย่างการตอบกลับ:",
      friendlyCommStyle: "ใช้ภาษาที่อบอุ่น, แสดงความเห็นอกเห็นใจ, เข้าใจง่าย, น้ำเสียงเป็นมิตร",
      friendlyBenefits: "สร้างความไว้วางใจ, ลดความเครียด, เข้าใจง่าย, สร้างความสัมพันธ์ที่ดี",
      friendlyBestFor: "ผู้ที่เพิ่งเริ่มศึกษาประกัน, ชอบคำแนะนำแบบไม่เป็นทางการ, ชอบการสื่อสารที่อบอุ่น",
      professionalCommStyle: "ใช้ภาษาทางการ, วิเคราะห์อย่างละเอียด, ข้อมูลครบถ้วน, เน้นความถูกต้อง",
      professionalBenefits: "ความแม่นยำสูง, ข้อมูลครอบคลุม, การวิเคราะห์เชิงลึก, ความน่าเชื่อถือ",
      professionalBestFor: "นักธุรกิจ, ต้องการข้อมูลโดยละเอียด, การตัดสินใจที่สำคัญ",
      professionalSample: "สวัสดีครับ ในฐานะที่ปรึกษาประกันชีวิต ผมจะวิเคราะห์ความต้องการของคุณและแนะนำผลิตภัณฑ์ที่เหมาะสมตามโปรไฟล์ของคุณ โปรดให้ข้อมูลเบื้องต้นของคุณ เพื่อที่ผมจะสามารถให้คำแนะนำที่แม่นยำที่สุดได้ครับ",
      analyticalCommStyle: "ข้อมูลทางสถิติ, การวิเคราะห์เชิงลึก, การเปรียบเทียบเชิงตัวเลข, การอ้างอิงข้อมูล",
      analyticalBenefits: "ข้อมูลเชิงลึกทางสถิติ, การเปรียบเทียบที่ชัดเจน, การตัดสินใจอย่างมีเหตุผล, ความแม่นยำของตัวเลข",
      analyticalBestFor: "นักวิเคราะห์, ชอบข้อมูลตัวเลข, การตัดสินใจที่ขับเคลื่อนด้วยข้อมูล",
      tip: "คุณสามารถเปลี่ยนสไตล์การสนทนาได้ตลอดเวลาระหว่างการใช้งาน โดยคลิกที่ปุ่ม \"ปรับรูปแบบ Chat\" ที่เมนูด้านบน",
    },
    EN: {
      backToChat: "Back to Chat",
      title: "Choose Chat Style",
      description: "Choose the communication style that suits you best",
      friendly: "Friendly",
      friendlyDesc: "Warm & caring",
      professional: "Professional",
      professionalDesc: "Formal & thorough",
      analytical: "Analytical",
      analyticalDesc: "Data-driven",
      friendlyTitle: "Friendly Advisor",
      friendlySubtitle: "Warm, approachable, empathetic",
      professionalTitle: "Professional Consultant",
      professionalSubtitle: "Formal, systematic, thorough",
      analyticalTitle: "Data Analyst",
      analyticalSubtitle: "Data-driven, statistical, analytical",
      communicationStyle: "Communication Style:",
      benefits: "Benefits:",
      bestFor: "Best For:",
      sampleResponse: "Sample Response:",
      friendlyCommStyle: "Warm language, Shows empathy, Easy to understand, Friendly tone",
      friendlyBenefits: "Builds trust, Reduces stress, Easy to understand, Creates good rapport",
      friendlyBestFor: "New to insurance, Prefer casual advice, Like warm communication",
      professionalCommStyle: "Formal language, Detailed analysis, Comprehensive info, Focus on accuracy",
      professionalBenefits: "High accuracy, Comprehensive data, Deep analysis, Credibility",
      professionalBestFor: "Business professionals, Need detailed info, Important decisions",
      professionalSample: "Good day. As your life insurance consultant, I will analyze your needs and recommend suitable products based on your profile. Please provide your basic information so I can offer the most accurate recommendations.",
      analyticalCommStyle: "Statistical data, Deep analysis, Numerical comparison, Data references",
      analyticalBenefits: "Statistical insights, Clear comparisons, Rational decisions, Numerical accuracy",
      analyticalBestFor: "Analysts, Like numerical data, Data-driven decisions",
      tip: "You can change conversation style anytime during use by clicking the \"Chat Style\" button in the header",
    }
  }

  const t = content[language as keyof typeof content];

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header language={language} setLanguage={setLanguage} chatStyle={chatStyle} />
      <main className="flex-1 overflow-auto p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <Button asChild variant="ghost" className="mb-4">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t.backToChat}
            </Link>
          </Button>
          <Card className="overflow-hidden">
            <CardHeader className="text-center bg-muted/30">
              <CardTitle className="text-2xl font-bold text-primary">{t.title}</CardTitle>
              <CardDescription>{t.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <RadioGroup defaultValue={chatStyle} onValueChange={setChatStyle} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Label htmlFor="friendly" className="block p-4 border rounded-lg cursor-pointer has-[:checked]:border-primary has-[:checked]:ring-2 has-[:checked]:ring-primary/50 has-[:checked]:bg-accent transition-all">
                  <RadioGroupItem value="friendly" id="friendly" className="sr-only" />
                  <Heart className="w-8 h-8 mb-2 text-primary" />
                  <h3 className="font-semibold">{t.friendly}</h3>
                  <p className="text-sm text-muted-foreground">{t.friendlyDesc}</p>
                </Label>
                <Label htmlFor="professional" className="block p-4 border rounded-lg cursor-pointer has-[:checked]:border-primary has-[:checked]:ring-2 has-[:checked]:ring-primary/50 has-[:checked]:bg-accent transition-all">
                  <RadioGroupItem value="professional" id="professional" className="sr-only" />
                  <UserCheck className="w-8 h-8 mb-2 text-primary" />
                  <h3 className="font-semibold">{t.professional}</h3>
                  <p className="text-sm text-muted-foreground">{t.professionalDesc}</p>
                </Label>
                <Label htmlFor="analytical" className="block p-4 border rounded-lg cursor-pointer has-[:checked]:border-primary has-[:checked]:ring-2 has-[:checked]:ring-primary/50 has-[:checked]:bg-accent transition-all">
                  <RadioGroupItem value="analytical" id="analytical" className="sr-only" />
                  <BrainCircuit className="w-8 h-8 mb-2 text-primary" />
                  <h3 className="font-semibold">{t.analytical}</h3>
                  <p className="text-sm text-muted-foreground">{t.analyticalDesc}</p>
                </Label>
              </RadioGroup>

              <Tabs defaultValue={chatStyle} value={chatStyle} className="w-full">
                <TabsContent value="friendly">
                  <Card>
                    <CardHeader>
                      <CardTitle>{t.friendlyTitle}</CardTitle>
                      <CardDescription>{t.friendlySubtitle}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div><strong className="font-semibold">{t.communicationStyle}</strong> <p className="text-sm text-muted-foreground">{t.friendlyCommStyle}</p></div>
                      <div><strong className="font-semibold">{t.benefits}</strong> <p className="text-sm text-muted-foreground">{t.friendlyBenefits}</p></div>
                      <div><strong className="font-semibold">{t.bestFor}</strong> <p className="text-sm text-muted-foreground">{t.friendlyBestFor}</p></div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="professional">
                  <Card>
                    <CardHeader>
                      <CardTitle>{t.professionalTitle}</CardTitle>
                      <CardDescription>{t.professionalSubtitle}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div><strong className="font-semibold">{t.communicationStyle}</strong> <p className="text-sm text-muted-foreground">{t.professionalCommStyle}</p></div>
                      <div><strong className="font-semibold">{t.benefits}</strong> <p className="text-sm text-muted-foreground">{t.professionalBenefits}</p></div>
                      <div><strong className="font-semibold">{t.bestFor}</strong> <p className="text-sm text-muted-foreground">{t.professionalBestFor}</p></div>
                       <div><strong className="font-semibold">{t.sampleResponse}</strong> <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md mt-1">"{t.professionalSample}"</p></div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="analytical">
                  <Card>
                    <CardHeader>
                      <CardTitle>{t.analyticalTitle}</CardTitle>
                      <CardDescription>{t.analyticalSubtitle}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div><strong className="font-semibold">{t.communicationStyle}</strong> <p className="text-sm text-muted-foreground">{t.analyticalCommStyle}</p></div>
                      <div><strong className="font-semibold">{t.benefits}</strong> <p className="text-sm text-muted-foreground">{t.analyticalBenefits}</p></div>
                      <div><strong className="font-semibold">{t.bestFor}</strong> <p className="text-sm text-muted-foreground">{t.analyticalBestFor}</p></div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
              <div className="mt-6 text-center text-sm text-muted-foreground p-4 bg-accent/50 rounded-lg flex items-center justify-center gap-2">
                <MessageCircle className="w-4 h-4" />
                <span>{t.tip}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

    