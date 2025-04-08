
import { Progress } from '@/components/ui/progress';

interface AnalysisProgressProps {
  isAnalyzing: boolean;
}

const AnalysisProgress = ({ isAnalyzing }: AnalysisProgressProps) => {
  if (!isAnalyzing) return null;
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Analyzing content...</span>
        <span>Please wait</span>
      </div>
      <Progress value={45} className="h-2" />
    </div>
  );
};

export default AnalysisProgress;
