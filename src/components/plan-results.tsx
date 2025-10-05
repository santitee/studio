import type { InsurancePlan } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, DollarSign, ListChecks, ShieldCheck } from 'lucide-react';

interface PlanResultsProps {
  plans: InsurancePlan[];
  onSelectPlan: (plan: InsurancePlan) => void;
  language: string;
}

const PlanResults = ({ plans, onSelectPlan, language }: PlanResultsProps) => {

  const t = language === 'TH' ? {
    premium: 'เบี้ยประกัน',
    coverageDetails: 'รายละเอียดความคุ้มครอง',
    benefits: 'ผลประโยชน์',
    viewDetails: 'ดูรายละเอียด'
  } : {
    premium: 'Premium',
    coverageDetails: 'Coverage Details',
    benefits: 'Benefits',
    viewDetails: 'View Details'
  };

  return (
    <div className="p-4 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader>
              <CardTitle className="font-headline text-primary">
                {plan.name}
              </CardTitle>
              <CardDescription>{plan.coverage}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <DollarSign className="w-5 h-5 mt-1 text-primary/80" />
                <div>
                  <h4 className="font-semibold">{t.premium}</h4>
                  <p className="text-sm text-muted-foreground">
                    {plan.premium}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 mt-1 text-primary/80" />
                <div>
                  <h4 className="font-semibold">{t.coverageDetails}</h4>
                  <p className="text-sm text-muted-foreground">
                    {plan.coverage}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ListChecks className="w-5 h-5 mt-1 text-primary/80" />
                <div>
                  <h4 className="font-semibold">{t.benefits}</h4>
                  <p className="text-sm text-muted-foreground">
                    {plan.benefits}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => onSelectPlan(plan)}
              >
                {t.viewDetails}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PlanResults;
