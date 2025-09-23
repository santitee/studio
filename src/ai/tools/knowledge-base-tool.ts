'use server';

import {ai} from '@/ai/genkit';
import {insuranceProductsKnowledgeBase} from '@/ai/knowledge/insurance-products';
import {z} from 'genkit';

export const getProductKnowledgeBase = ai.defineTool(
  {
    name: 'getProductKnowledgeBase',
    description: 'Returns the knowledge base of insurance products.',
    inputSchema: z.object({}),
    outputSchema: z.string(),
  },
  async () => {
    return insuranceProductsKnowledgeBase;
  }
);
