
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { type AnalysisResult } from '@/utils/analysisUtils';
import { AlertTriangle, CheckCircle, Info } from 'lucide-react';
import NetworkGraph from '../NetworkGraph';
import { getVerdictDetails } from '@/utils/analysisUtils';

interface AnalysisResultTabsProps {
  result: AnalysisResult | null;
}

const AnalysisResultTabs = ({ result }: AnalysisResultTabsProps) => {
  if (!result) return null;

  const { verdict, color } = getVerdictDetails(result.probability);

  const getVerdictIcon = (probability: number) => {
    if (probability > 0.7) return <CheckCircle className="h-5 w-5 text-truth-600" />;
    if (probability > 0.3) return <Info className="h-5 w-5 text-amber-500" />;
    return <AlertTriangle className="h-5 w-5 text-destructive" />;
  };

  return (
    <Tabs defaultValue="summary" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="summary">Summary</TabsTrigger>
        <TabsTrigger value="factors">Contributing Factors</TabsTrigger>
        <TabsTrigger value="network">Bayesian Network</TabsTrigger>
      </TabsList>
      
      <TabsContent value="summary" className="space-y-4 pt-4">
        <div className="flex items-center gap-2 justify-center">
          {getVerdictIcon(result.probability)}
          <span className={`text-2xl font-bold ${color}`}>
            {verdict}
          </span>
        </div>
        <div className="space-y-1">
          <div className="text-sm font-medium">Authenticity Score</div>
          <div className="probability-bar">
            <div 
              className="probability-fill bg-gradient-to-r from-destructive to-truth-500"
              style={{ width: `${result.probability * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Likely Fake</span>
            <span>Uncertain</span>
            <span>Likely Authentic</span>
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="factors" className="space-y-4 pt-4">
        <h4 className="text-sm font-medium">Top Contributing Factors</h4>
        <div className="space-y-3">
          {result.factorsContributing.map((factor, i) => (
            <div key={i} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{factor.factor}</span>
                <span>{(factor.score * 100).toFixed(0)}%</span>
              </div>
              <div className="probability-bar">
                <div 
                  className={`probability-fill ${
                    factor.score > 0.7 ? 'bg-truth-500' : 
                    factor.score > 0.3 ? 'bg-amber-500' : 
                    'bg-destructive'
                  }`}
                  style={{ width: `${factor.score * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="network" className="pt-4">
        <NetworkGraph
          nodes={result.evidenceNodes}
          edges={result.evidenceEdges} 
          className="h-[250px]"
        />
        <p className="text-xs text-muted-foreground mt-2">
          This visualization shows how different factors influence the final verdict through the Bayesian Network.
        </p>
      </TabsContent>
    </Tabs>
  );
};

export default AnalysisResultTabs;
