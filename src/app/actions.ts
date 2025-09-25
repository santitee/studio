'use server';

import type { RecommendInsurancePlansInput } from '@/ai/flows/recommend-insurance-plans';
import type { InsurancePlan } from '@/lib/types';

export async function getInsurancePlans(data: RecommendInsurancePlansInput) {
  // Mock data for development to prevent application errors
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
    {
      name: 'ประกันออมทรัพย์ WealthBuilder 10/5',
      coverage: 'ระยะเวลาคุ้มครอง 10 ปี',
      premium: 'ชำระเบี้ย 5 ปี',
      benefits:
        'รับเงินคืน 10% ของทุนประกันทุกสิ้นปี, ครบกำหนดสัญญารับเงินก้อน 550% ของทุนประกัน, ลดหย่อนภาษีได้',
    },
  ];

  // Simulate a network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  return { success: true, plans: mockPlans };
}
