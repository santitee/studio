import { config } from 'dotenv';
config();

import '@/ai/flows/recommend-insurance-plans.ts';
import '@/ai/flows/process-user-input.ts';
import '@/ai/tools/knowledge-base-tool.ts';
