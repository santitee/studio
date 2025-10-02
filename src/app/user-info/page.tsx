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
import { useEffect, useState } from 'react';
import { useAuth, useFirestore, useUser } from '@/firebase';
import { doc } from 'firebase/firestore';
import { initiateAnonymousSignIn, setDocumentNonBlocking } from '@/firebase';
import type { UserInfo } from '@/lib/types';
import { useRouter } from 'next/navigation';

const content = {
  TH: {
    backToHome: 'กลับไปหน้าหลัก',
    pageTitle: 'กรอกข้อมูลส่วนตัว',
    pageDescription: 'กรุณากรอกข้อมูลของคุณเพื่อดำเนินการต่อ',
    firstNameLabel: 'ชื่อ',
    firstNamePlaceholder: 'สมชาย',
    firstNameRequired: 'กรุณากรอกชื่อ',
    lastNameLabel: 'นามสกุล',
    lastNamePlaceholder: 'รักดี',
    lastNameRequired: 'กรุณากรอกนามสกุล',
    phoneLabel: 'หมายเลขโทรศัพท์',
    phonePlaceholder: '0812345678',
    phoneInvalid: 'กรุณากรอกหมายเลขโทรศัพท์ในประเทศไทยให้ถูกต้อง (เช่น 0812345678)',
    emailLabel: 'อีเมล (ไม่บังคับ)',
    emailPlaceholder: 'somchai@example.com',
    emailInvalid: 'รูปแบบอีเมลไม่ถูกต้อง',
    notesLabel: 'ข้อมูลอื่นๆ / หมายเหตุ',
    notesPlaceholder: 'เช่น สนใจประกันสุขภาพเพิ่มเติม...',
    submitButton: 'บันทึกข้อมูล',
    toastSuccessTitle: 'บันทึกข้อมูลสำเร็จ',
    toastSuccessDescription: 'ข้อมูลของคุณถูกบันทึกเรียบร้อยแล้ว',
    toastErrorTitle: 'เกิดข้อผิดพลาด',
    toastErrorDescription: 'ไม่สามารถบันทึกข้อมูลได้ กรุณาลองใหม่อีกครั้ง',
  },
  EN: {
    backToHome: 'Back to Home',
    pageTitle: 'Enter Your Information',
    pageDescription: 'Please fill in your details to proceed.',
    firstNameLabel: 'First Name',
    firstNamePlaceholder: 'John',
    firstNameRequired: 'First name is required',
    lastNameLabel: 'Last Name',
    lastNamePlaceholder: 'Doe',
    lastNameRequired: 'Last name is required',
    phoneLabel: 'Phone Number',
    phonePlaceholder: '0812345678',
    phoneInvalid: 'Please enter a valid Thai phone number (e.g., 0812345678)',
    emailLabel: 'Email (Optional)',
    emailPlaceholder: 'john.doe@example.com',
    emailInvalid: 'Invalid email format',
    notesLabel: 'Other Information / Notes',
    notesPlaceholder: 'e.g., Interested in additional health insurance...',
    submitButton: 'Save Information',
    toastSuccessTitle: 'Information Saved Successfully',
    toastSuccessDescription: 'Your information has been saved.',
    toastErrorTitle: 'An Error Occurred',
    toastErrorDescription: 'Could not save your information. Please try again.',
  }
}

export default function UserInfoPage() {
  const [language, setLanguage] = useState('TH');
  const [chatStyle, setChatStyle] = useState('professional');
  const { toast } = useToast();
  const t = content[language as keyof typeof content];
  const router = useRouter();
  
  const auth = useAuth();
  const firestore = useFirestore();
  const { user, isUserLoading } = useUser();

  useEffect(() => {
    if (!isUserLoading && !user) {
      initiateAnonymousSignIn(auth);
    }
  }, [user, isUserLoading, auth]);

  const formSchema = z.object({
    firstName: z.string().min(1, { message: t.firstNameRequired }),
    lastName: z.string().min(1, { message: t.lastNameRequired }),
    phone: z.string().regex(/^(0[6-9]{1}[0-9]{8})$/, {
      message: t.phoneInvalid,
    }),
    email: z
      .string()
      .email({ message: t.emailInvalid })
      .optional()
      .or(z.literal('')),
    notes: z.string().optional(),
  });

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

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) {
      toast({
        variant: "destructive",
        title: t.toastErrorTitle,
        description: "User not authenticated.",
      });
      return;
    }
    
    const userInfo: UserInfo = values;
    const userDocRef = doc(firestore, 'users', user.uid);

    try {
      setDocumentNonBlocking(userDocRef, userInfo, { merge: true });
      
      toast({
        title: t.toastSuccessTitle,
        description: t.toastSuccessDescription,
      });

      // Redirect back to home page after successful submission
      router.push('/');

    } catch (e) {
      console.error("Error saving document: ", e);
      toast({
        variant: "destructive",
        title: t.toastErrorTitle,
        description: t.toastErrorDescription,
      });
    }
  }

  const formKey = language;

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header language={language} setLanguage={setLanguage} chatStyle={chatStyle} />
      <main className="flex-1 overflow-auto p-4 md:p-6">
        <div className="max-w-2xl mx-auto">
          <Button asChild variant="ghost" className="mb-4">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t.backToHome}
            </Link>
          </Button>
          <Card>
            <CardHeader>
              <CardTitle>{t.pageTitle}</CardTitle>
              <CardDescription>{t.pageDescription}</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form key={formKey} onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.firstNameLabel}</FormLabel>
                          <FormControl>
                            <Input placeholder={t.firstNamePlaceholder} {...field} />
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
                          <FormLabel>{t.lastNameLabel}</FormLabel>
                          <FormControl>
                            <Input placeholder={t.lastNamePlaceholder} {...field} />
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
                        <FormLabel>{t.phoneLabel}</FormLabel>
                        <FormControl>
                          <Input placeholder={t.phonePlaceholder} {...field} />
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
                        <FormLabel>{t.emailLabel}</FormLabel>
                        <FormControl>
                          <Input placeholder={t.emailPlaceholder} {...field} />
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
                        <FormLabel>{t.notesLabel}</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder={t.notesPlaceholder}
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isUserLoading}>{isUserLoading ? 'Loading...' : t.submitButton}</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

    