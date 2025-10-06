'use client';

import { cn } from '@/lib/utils';
import { BotMessageSquare, FileText, Handshake, Pencil, CreditCard } from 'lucide-react';
import type { Step } from '@/lib/types';

interface ProgressStepsProps {
  currentStep: Step;
  language: string;
}

const ProgressSteps = ({ currentStep, language }: ProgressStepsProps) => {
  const steps: { id: Step, icon: React.ElementType, text: {TH: string, EN: string} }[] = [
    { id: 'Enquiry', icon: BotMessageSquare, text: { TH: "สอบถาม", EN: "Enquiry" } },
    { id: 'Recommendation', icon: Handshake, text: { TH: "แนะนำ", EN: "Recommendation" } },
    { id: 'Product', icon: FileText, text: { TH: "เลือกผลิตภัณฑ์", EN: "Choose Product" } },
    { id: 'Form', icon: Pencil, text: { TH: "กรอกข้อมูล", EN: "Fill Form" } },
    { id: 'Payment', icon: CreditCard, text: { TH: "ชำระเงิน", EN: "Payment" } },
  ];

  const currentStepIndex = steps.findIndex((step) => step.id === currentStep);

  return (
    <div className="p-4 md:p-6 border-b">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isActive = index === currentStepIndex;
          const isCompleted = index < currentStepIndex;
          const isFuture = index > currentStepIndex;

          return (
            <div
              key={step.id}
              className="flex flex-col items-center flex-1"
            >
              <div
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors duration-300",
                  isActive ? "bg-primary border-primary text-primary-foreground" : "",
                  isCompleted ? "bg-green-500 border-green-500 text-white" : "",
                  isFuture ? "bg-muted border-border text-muted-foreground" : ""
                )}
              >
                {isCompleted ? <Handshake className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
              </div>
              <p
                className={cn(
                  "mt-2 text-xs text-center font-medium transition-colors duration-300",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                {step.text[language as keyof typeof step.text]}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};


export default ProgressSteps;
