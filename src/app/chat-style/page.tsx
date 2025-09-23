import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ChatStylePage() {
  return (
    <div className="flex flex-col h-screen bg-background">
      <Header />
      <main className="flex-1 overflow-auto p-4 md:p-6">
        <div className="max-w-2xl mx-auto">
          <Button asChild variant="ghost" className="mb-4">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              กลับไปหน้าแชท
            </Link>
          </Button>
          <Card>
            <CardHeader>
              <CardTitle>ปรับรูปแบบการตอบของ Chatbot</CardTitle>
              <CardDescription>เลือกสไตล์การสนทนาที่คุณต้องการให้ AI ตอบกลับ</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup defaultValue="professional" className="space-y-4">
                <div className="flex items-center space-x-3 p-4 border rounded-md has-[:checked]:border-primary has-[:checked]:bg-accent">
                  <RadioGroupItem value="friendly" id="friendly" />
                  <Label htmlFor="friendly" className="w-full">
                    <h3 className="font-semibold">เป็นกันเอง</h3>
                    <p className="text-sm text-muted-foreground">ลักษณะเป็นมิตร คุยกันภาษาเพื่อน เสมือนคนรู้ใจ</p>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 border rounded-md has-[:checked]:border-primary has-[:checked]:bg-accent">
                  <RadioGroupItem value="professional" id="professional" />
                  <Label htmlFor="professional" className="w-full">
                    <h3 className="font-semibold">เป็นมืออาชีพ</h3>
                    <p className="text-sm text-muted-foreground">ลักษณะเป็นทางการ ลงท้ายด้วยคำว่า ครับ/ค่ะ หรือ นะครับ/นะคะ</p>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 border rounded-md has-[:checked]:border-primary has-[:checked]:bg-accent">
                  <RadioGroupItem value="analytical" id="analytical" />
                  <Label htmlFor="analytical" className="w-full">
                    <h3 className="font-semibold">เป็นนักวิเคราะห์</h3>
                    <p className="text-sm text-muted-foreground">ลักษณะเน้นตัวเลข การคำนวณที่ละเอียด รวดเร็ว แม่นยำ</p>
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
