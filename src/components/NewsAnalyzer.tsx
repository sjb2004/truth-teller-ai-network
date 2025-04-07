
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Progress } from '@/components/ui/progress';
import NetworkGraph from './NetworkGraph';
import { AlertTriangle, CheckCircle, Info, RefreshCw } from 'lucide-react';

interface AnalysisResult {
  probability: number;
  factorsContributing: Array<{
    factor: string;
    score: number;
  }>;
  evidenceNodes: Array<{
    id: string;
    label: string;
    x: number;
    y: number;
    probability: number;
  }>;
  evidenceEdges: Array<{
    from: string;
    to: string;
  }>;
}

const NewsAnalyzer = () => {
  const [newsText, setNewsText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const { toast } = useToast();

  const analyzeNews = () => {
    if (!newsText.trim()) {
      toast({
        title: 'Empty Input',
        description: 'Please enter some news text to analyze.',
        variant: 'destructive'
      });
      return;
    }

    setIsAnalyzing(true);

    // Simulated analysis - in a real app, this would call an API
    setTimeout(() => {
      // Mock result
      const mockResult: AnalysisResult = {
        probability: Math.random(),
        factorsContributing: [
          { factor: 'Source Credibility', score: Math.random() * 0.8 + 0.2 },
          { factor: 'Language Analysis', score: Math.random() * 0.8 + 0.1 },
          { factor: 'Factual Consistency', score: Math.random() * 0.7 + 0.3 },
          { factor: 'Emotional Content', score: Math.random() * 0.5 }
        ],
        evidenceNodes: [
          { id: 'n1', label: 'Source', x: 100, y: 100, probability: Math.random() },
          { id: 'n2', label: 'Language', x: 200, y: 80, probability: Math.random() },
          { id: 'n3', label: 'Facts', x: 180, y: 180, probability: Math.random() },
          { id: 'n4', label: 'Emotion', x: 100, y: 220, probability: Math.random() },
          { id: 'n5', label: 'Verdict', x: 300, y: 150, probability: Math.random() }
        ],
        evidenceEdges: [
          { from: 'n1', to: 'n5' },
          { from: 'n2', to: 'n5' },
          { from: 'n3', to: 'n5' },
          { from: 'n4', to: 'n5' }
        ]
      };

      setResult(mockResult);
      setIsAnalyzing(false);
    }, 2000);
  };

  const resetAnalysis = () => {
    setNewsText('');
    setResult(null);
  };

  const getVerdict = (probability: number) => {
    if (probability > 0.7) return 'Likely Authentic';
    if (probability > 0.3) return 'Uncertain';
    return 'Likely Fake';
  };

  const getVerdictColor = (probability: number) => {
    if (probability > 0.7) return 'text-truth-600';
    if (probability > 0.3) return 'text-amber-500';
    return 'text-destructive';
  };

  const getVerdictIcon = (probability: number) => {
    if (probability > 0.7) return <CheckCircle className="h-5 w-5 text-truth-600" />;
    if (probability > 0.3) return <Info className="h-5 w-5 text-amber-500" />;
    return <AlertTriangle className="h-5 w-5 text-destructive" />;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>News Authenticity Analyzer</CardTitle>
        <CardDescription>
          Enter a news article or content to analyze its authenticity using Bayesian Networks
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Textarea
            placeholder="Paste news content here..."
            className="min-h-[200px] resize-none"
            value={newsText}
            onChange={(e) => setNewsText(e.target.value)}
            disabled={isAnalyzing}
          />

          {isAnalyzing && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Analyzing content...</span>
                <span>Please wait</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>
          )}

          {result && (
            <Tabs defaultValue="summary" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="factors">Contributing Factors</TabsTrigger>
                <TabsTrigger value="network">Bayesian Network</TabsTrigger>
              </TabsList>
              <TabsContent value="summary" className="space-y-4 pt-4">
                <div className="flex items-center gap-2 justify-center">
                  {getVerdictIcon(result.probability)}
                  <span className={`text-2xl font-bold ${getVerdictColor(result.probability)}`}>
                    {getVerdict(result.probability)}
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
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={resetAnalysis} disabled={isAnalyzing || !newsText}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Reset
        </Button>
        <Button onClick={analyzeNews} disabled={isAnalyzing || !newsText}>
          {isAnalyzing ? 'Analyzing...' : 'Analyze Article'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NewsAnalyzer;
