'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Header from '@/components/header';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

// Define the validation schema using Zod
const formSchema = z.object({
  firstName: z.string().min(1, { message: 'กรุณากรอกชื่อ' }),
  lastName: z.string().min(1, { message: 'กรุณากรอกนามสกุล' }),
  phone: z.string().regex(/^(0[6-9]{1}[0-9]{8})$/, {
    message: 'กรุณากรอกหมายเลขโทรศัพท์ในประเทศไทยให้ถูกต้อง (เช่น 0812345678)',
  }),
  email: z
    .string()
    .email({ message: 'รูปแบบอีเมลไม่ถูกต้อง' })
    .optional()
    .or(z.literal('')),
  notes: z.string().optional(),
});

export default function UserInfoPage() {
  const { toast } = useToast();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      notes: '',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // For now, we'll just log them and show a toast.
    console.log(values);
    toast({
      title: 'บันทึกข้อมูลสำเร็จ',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header language="TH" setLanguage={() => {}} chatStyle="professional" />
      <main className="flex-1 overflow-auto p-4 md:p-6">
        <div className="max-w-2xl mx-auto">
          <Button asChild variant="ghost" className="mb-4">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              กลับไปหน้าหลัก
            </Link>
          </Button>
          <Card>
            <CardHeader>
              <CardTitle>กรอกข้อมูลส่วนตัว</CardTitle>
              <CardDescription>กรุณากรอกข้อมูลของคุณเพื่อดำเนินการต่อ</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ชื่อ</FormLabel>
                          <FormControl>
                            <Input placeholder="สมชาย" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>นามสกุล</FormLabel>
                          <FormControl>
                            <Input placeholder="รักดี" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>หมายเลขโทรศัพท์</FormLabel>
                        <FormControl>
                          <Input placeholder="0812345678" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>อีเมล (ไม่บังคับ)</FormLabel>
                        <FormControl>
                          <Input placeholder="somchai@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ข้อมูลอื่นๆ / หมายเหตุ</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="เช่น สนใจประกันสุขภาพเพิ่มเติม..."
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">บันทึกข้อมูล</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
