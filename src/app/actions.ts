'use server';

import {
  recommendInsurancePlans,
  type RecommendInsurancePlansInput,
} from '@/ai/flows/recommend-insurance-plans';
import type { InsurancePlan } from '@/lib/types';

export async function getInsurancePlans(data: RecommendInsurancePlansInput) {
  try {
    const result = await recommendInsurancePlans(data);

    if (!result || !result.plans || result.plans.length === 0) {
      console.log('AI did not return any plans.');
      return {
        success: false,
        plans: [],
        error: 'No plans found.',
      };
    }

    return { success: true, plans: result.plans };
  } catch (error)
  {
    console.error('Error getting insurance plans from AI:', error);
    // In case of an error, return mock data to prevent application failure
    // during development or demos.
    const mockPlansTH: InsurancePlan[] = [
      {
        name: 'ประกันชีวิต LifePlus Secure',
        coverage: 'คุ้มครอง 1,000,000 - 5,000,000 บาท',
        premium: 'เริ่มต้น 300 บาท/เดือน',
        benefits:
          'คุ้มครองสูงในราคาเบาๆ, จ่ายผลประโยชน์กรณีเสียชีวิตหรือทุพพลภาพถาวรสิ้นเชิง, เหมาะสำหรับเป็นหลักประกันให้ครอบครัว',
      },
      {
        name: 'ประกันสุขภาพ HealthGuard Pro',
        coverage: 'ค่ารักษาพยาบาลเหมาจ่ายสูงสุด 5,000,000 บาทต่อปี',
        premium: 'เริ่มต้น 1,200 บาท/เดือน',
        benefits:
          'ครอบคลุมค่าห้อง, ค่าอาหาร, ค่าแพทย์, ค่ายา, คุ้มครองผู้ป่วยใน (IPD) และผู้ป่วยนอก (OPD)',
      },
    ];

    const mockPlansEN: InsurancePlan[] = [
      {
        name: 'LifePlus Secure',
        coverage: 'Coverage 1,000,000 - 5,000,000 THB',
        premium: 'Starts at 300 THB/month',
        benefits:
          'High coverage at a light price, pays benefits in case of death or total permanent disability, suitable as security for the family.',
      },
      {
        name: 'HealthGuard Pro',
        coverage: 'Lump-sum medical expenses up to 5,000,000 THB per year',
        premium: 'Starts at 1,200 THB/month',
        benefits:
          'Covers room, food, doctor, and medicine costs, protects both in-patient (IPD) and out-patient (OPD).',
      },
    ];
    
    return { 
      success: false, 
      plans: data.language === 'EN' ? mockPlansEN : mockPlansTH, 
      error: 'Failed to get recommendations from AI. Showing popular plans instead.' 
    };
  }
}
