import type React from 'react';

export type Message = {
  id: string;
  text?: string;
  sender: 'user' | 'bot';
  component?: React.ReactNode;
};

export type InsurancePlan = {
  name: string;
  coverage: string;
  premium: string;
  benefits: string;
};

export type UserInfo = {
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  notes?: string;
}

export type FormData = {
  age?: number;
  income?: number;
  familyStatus?: string;
  healthCondition?: string;
  preferences?: string;
  language?: string;
  chatStyle?: string;
};

export type ActionResponse = {
  success: boolean;
  plans: InsurancePlan[];
  error?: string;
}

    