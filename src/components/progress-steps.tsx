'use client';

import { cn } from '@/lib/utils';
import { BotMessageSquare, FileText, Check, Pencil, CreditCard, Lock } from 'lucide-react';
import type { Step } from '@/lib/types';

interface ProgressStepsProps {
  currentStep: Step;
  language: string;
}

const ProgressSteps = ({ currentStep, language }: ProgressStepsProps) => {
  const steps: { id: Step, icon: React.ElementType, text: {TH: string, EN: string} }[] = [
    { id: 'Enquiry', icon: BotMessageSquare, text: { TH: "สอบถาม", EN: "Enquiry" } },
    { id: 'Recommendation', icon: Check, text: { TH: "แนะนำ", EN: "Recommendation" } },
    { id: 'Product', icon: FileText, text: { TH: "เลือกผลิตภัณฑ์", EN: "Product" } },
    { id: 'Form', icon: Pencil, text: { TH: "กรอกข้อมูล", EN: "Form" } },
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
          // Special case for 'Payment' to be disabled
          const isDisabled = step.id === 'Payment' && !isActive && !isCompleted;

          return (
            <div
              key={step.id}
              className="flex flex-col items-center flex-1"
            >
              <div
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors duration-300",
                  isActive && "bg-primary border-primary text-primary-foreground",
                  isCompleted && "bg-green-500 border-green-500 text-white",
                  isFuture && !isDisabled && "bg-muted border-border text-muted-foreground",
                  isDisabled && "bg-muted border-dashed text-muted-foreground/50"
                )}
              >
                {isCompleted ? <Check className="w-5 h-5" /> : (isDisabled ? <Lock className="w-5 h-5" /> : <step.icon className="w-5 h-5" />) }
              </div>
              <p
                className={cn(
                  "mt-2 text-xs text-center font-medium transition-colors duration-300",
                  isActive ? "text-primary" : "text-muted-foreground",
                  isDisabled && "text-muted-foreground/50"
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
