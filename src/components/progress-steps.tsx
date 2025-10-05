'use client';

import { cn } from "@/lib/utils";
import type { Step } from "@/lib/types";
import { Check, CreditCard, FileText, Lightbulb, MessageSquare } from "lucide-react";

interface ProgressStepsProps {
    currentStep: number;
    language: string;
}

const ProgressSteps = ({ currentStep, language }: ProgressStepsProps) => {

    const steps: Step[] = language === 'TH' ? [
        { id: 1, name: 'สอบถามข้อมูล', icon: MessageSquare },
        { id: 2, name: 'แนะนำผลิตภัณฑ์', icon: Lightbulb },
        { id: 3, name: 'เลือกผลิตภัณฑ์', icon: Check },
        { id: 4, name: 'กรอกข้อมูล', icon: FileText },
        { id: 5, name: 'ชำระเงิน', icon: CreditCard },
    ] : [
        { id: 1, name: 'Inquiry', icon: MessageSquare },
        { id: 2, name: 'Recommendation', icon: Lightbulb },
        { id: 3, name: 'Select Product', icon: Check },
        { id: 4, name: 'Information', icon: FileText },
        { id: 5, name: 'Payment', icon: CreditCard },
    ];

    return (
        <div className="w-full py-4 px-4 md:px-8 bg-card border-b">
            <nav aria-label="Progress">
                <ol role="list" className="grid grid-cols-5">
                    {steps.map((step, stepIdx) => (
                        <li key={step.name} className="relative">
                            <div className="flex items-center text-sm font-medium">
                                <span className={cn(
                                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                                    step.id < currentStep ? 'bg-primary text-primary-foreground' :
                                    step.id === currentStep ? 'border-2 border-primary bg-background text-primary' :
                                    'border-2 border-muted-foreground bg-background text-muted-foreground'
                                )}>
                                    {step.id < currentStep ? (
                                        <Check className="h-5 w-5" />
                                    ) : (
                                        <step.icon className="h-5 w-5" />
                                    )}
                                </span>
                                <span className={cn(
                                    "ml-4 hidden md:block",
                                    step.id === currentStep ? 'text-primary font-semibold' : 'text-muted-foreground'
                                )}>
                                    {step.name}
                                </span>
                            </div>
                            {stepIdx !== steps.length - 1 ? (
                                <div className={cn(
                                    "absolute inset-y-0 right-0 hidden w-full translate-x-1/2 transform md:block",
                                )}>
                                    <div className={cn(
                                        "h-0.5 w-full translate-y-4",
                                        step.id < currentStep ? 'bg-primary' : 'bg-muted'
                                    )} />
                                </div>
                            ) : null}
                        </li>
                    ))}
                </ol>
            </nav>
        </div>
    )
}

export default ProgressSteps;