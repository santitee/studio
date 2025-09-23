'use server';

import {
  recommendInsurancePlans,
  type RecommendInsurancePlansInput,
} from '@/ai/flows/recommend-insurance-plans';

export async function getInsurancePlans(data: RecommendInsurancePlansInput) {
  try {
    const result = await recommendInsurancePlans(data);
    if (!result || !result.plans) {
      return { success: false, error: 'AI failed to provide a valid response.' };
    }
    return { success: true, plans: result.plans };
  } catch (error) {
    console.error('Error getting insurance plans:', error);
    return { success: false, error: 'An unexpected error occurred while fetching recommendations.' };
  }
}
