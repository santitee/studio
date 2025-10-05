'use client';

import { cn } from "@/lib/utils";
import type { Step } from "@/lib/types";

interface ProgressStepsProps {
    currentStep: number;
    language: string;
}

const ProgressSteps = ({ currentStep, language }: ProgressStepsProps) => {

    const steps: Step[] = language === 'TH' ? [
        { id: 1, name: 'สอบถามข้อมูล' },
        { id: 2, name: 'แนะนำผลิตภัณฑ์' },
        { id: 3, name: 'เลือกผลิตภัณฑ์' },
        { id: 4, name: 'กรอกข้อมูล' },
        { id: 5, name: 'ชำระเงิน' },
    ] : [
        { id: 1, name: 'Inquiry' },
        { id: 2, name: 'Recommendation' },
        { id: 3, name: 'Select Product' },
        { id: 4, name: 'Information' },
        { id: 5, name: 'Payment' },
    ];

    return (
        <div className="w-full py-4 px-4 md:px-8 bg-card border-b">
            <nav aria-label="Progress">
                <ol role="list" className="flex items-center">
                    {steps.map((step, stepIdx) => (
                        <li key={step.name} className={cn("relative", stepIdx !== steps.length - 1 ? "pr-8 sm:pr-20 flex-1" : "")}>
                            {step.id < currentStep ? (
                                <>
                                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                        <div className="h-0.5 w-full bg-primary" />
                                    </div>
                                    <div
                                        className="relative w-8 h-8 flex items-center justify-center bg-primary rounded-full"
                                    >
                                        <span className="text-primary-foreground text-xs">{step.id}</span>
                                    </div>
                                    <span className="absolute top-10 left-1/2 -translate-x-1/2 text-center text-xs text-primary mt-1 w-24">{step.name}</span>

                                </>
                            ) : step.id === currentStep ? (
                                <>
                                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                        <div className="h-0.5 w-full bg-muted" />
                                    </div>
                                    <div
                                        className="relative w-8 h-8 flex items-center justify-center bg-background border-2 border-primary rounded-full"
                                        aria-current="step"
                                    >
                                        <span className="text-primary text-xs font-semibold">{step.id}</span>
                                    </div>
                                    <span className="absolute top-10 left-1/2 -translate-x-1/2 text-center text-xs text-primary font-semibold mt-1 w-24">{step.name}</span>
                                </>
                            ) : (
                                <>
                                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                        <div className="h-0.5 w-full bg-muted" />
                                    </div>
                                    <div
                                        className="group relative w-8 h-8 flex items-center justify-center bg-background border-2 border-muted-foreground rounded-full"
                                    >
                                        <span className="text-muted-foreground text-xs">{step.id}</span>
                                    </div>
                                    <span className="absolute top-10 left-1/2 -translate-x-1/2 text-center text-xs text-muted-foreground mt-1 w-24">{step.name}</span>
                                </>
                            )}
                        </li>
                    ))}
                </ol>
            </nav>
        </div>
    )
}

export default ProgressSteps;
