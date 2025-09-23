import type { InsurancePlan } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DollarSign, ListChecks, ShieldCheck } from 'lucide-react';

interface PlanResultsProps {
  plans: InsurancePlan[];
}

const PlanResults = ({ plans }: PlanResultsProps) => {
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
                  <h4 className="font-semibold">เบี้ยประกัน</h4>
                  <p className="text-sm text-muted-foreground">
                    {plan.premium}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 mt-1 text-primary/80" />
                <div>
                  <h4 className="font-semibold">รายละเอียดความคุ้มครอง</h4>
                  <p className="text-sm text-muted-foreground">
                    {plan.coverage}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ListChecks className="w-5 h-5 mt-1 text-primary/80" />
                <div>
                  <h4 className="font-semibold">ผลประโยชน์</h4>
                  <p className="text-sm text-muted-foreground">
                    {plan.benefits}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PlanResults;
