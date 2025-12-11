import { TimeToHireCard } from './TimeToHireCard';
import { FunnelCard } from './FunnelCard';
import { SourcesCard } from './SourcesCard';
import { TimeInStageCard } from './TimeInStageCard';
import { ReportsOverview } from '@/data/mockReportsData';

interface ReportsOverviewTabProps {
  data: ReportsOverview;
}

export function ReportsOverviewTab({ data }: ReportsOverviewTabProps) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TimeToHireCard data={data.timeToHire} />
        <FunnelCard data={data.funnel} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SourcesCard data={data.sourceEffectiveness} />
        <TimeInStageCard data={data.timeInStage} />
      </div>
    </div>
  );
}
