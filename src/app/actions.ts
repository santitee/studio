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
    const mockPlans: InsurancePlan[] = [
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
    
    return { 
      success: false, 
      plans: mockPlans, 
      error: 'Failed to get recommendations from AI. Showing popular plans instead.' 
    };
  }
}
