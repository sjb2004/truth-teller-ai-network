
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Progress } from '@/components/ui/progress';
import NetworkGraph from './NetworkGraph';
import { AlertTriangle, CheckCircle, Info, RefreshCw, FileText } from 'lucide-react';

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

// Sample news snippets for users to try
const exampleSnippets = [
  {
    title: "Verified News Example",
    text: "Scientists at the University of California have published a peer-reviewed study showing that regular exercise can reduce the risk of heart disease by up to 30%. The research involved 10,000 participants over a five-year period and controlled for factors such as diet and genetic predisposition."
  },
  {
    title: "Potential Misinformation Example",
    text: "BREAKING: Scientists discover that drinking lemon water mixed with baking soda cures all types of cancer in just 7 days! Big Pharma doesn't want you to know this miracle cure that costs just pennies a day. Share before this gets taken down!"
  },
  {
    title: "Current Event Example",
    text: "The Central Bank announced today that interest rates will remain unchanged following their quarterly meeting. The decision was widely anticipated by financial analysts, who cited stable inflation metrics and moderate economic growth as key factors in the decision."
  }
];

const NewsAnalyzer = () => {
  const [newsText, setNewsText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const { toast } = useToast();

  // Enhanced analysis algorithm that considers more factors for current news
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
      // Enhanced mock result with more sophisticated analysis factors
      const textLength = newsText.length;
      
      // Determine analysis factors based on content patterns
      const hasEmotionalLanguage = /exclaim|urgent|breaking|shocking|miracle|cure|secret|conspiracy/i.test(newsText);
      const hasSourceCitation = /according to|published by|reported by|study|research|professor|expert|official/i.test(newsText);
      const hasNumericalData = /\d+%|\d+ percent|statistics|survey|study of \d+/i.test(newsText);
      
      // Calculate base probability (more sophisticated in real implementation)
      let baseProbability = 0.5;
      baseProbability += hasSourceCitation ? 0.2 : -0.1;
      baseProbability += hasNumericalData ? 0.15 : -0.05;
      baseProbability -= hasEmotionalLanguage ? 0.25 : 0;
      
      // Clamp probability between 0.05 and 0.95
      const probability = Math.min(Math.max(baseProbability, 0.05), 0.95);
      
      // Mock result with more current-news relevant factors
      const mockResult: AnalysisResult = {
        probability,
        factorsContributing: [
          { factor: 'Source Credibility', score: hasSourceCitation ? Math.random() * 0.3 + 0.6 : Math.random() * 0.4 + 0.2 },
          { factor: 'Language Analysis', score: hasEmotionalLanguage ? Math.random() * 0.3 + 0.1 : Math.random() * 0.3 + 0.6 },
          { factor: 'Factual Consistency', score: hasNumericalData ? Math.random() * 0.3 + 0.6 : Math.random() * 0.5 + 0.3 },
          { factor: 'Topic Relevance', score: Math.random() * 0.6 + 0.3 },
          { factor: 'Temporal Consistency', score: Math.random() * 0.6 + 0.4 }
        ],
        evidenceNodes: [
          { id: 'n1', label: 'Source', x: 100, y: 100, probability: hasSourceCitation ? Math.random() * 0.3 + 0.6 : Math.random() * 0.4 + 0.3 },
          { id: 'n2', label: 'Language', x: 200, y: 80, probability: hasEmotionalLanguage ? Math.random() * 0.3 + 0.1 : Math.random() * 0.3 + 0.6 },
          { id: 'n3', label: 'Facts', x: 180, y: 180, probability: hasNumericalData ? Math.random() * 0.3 + 0.6 : Math.random() * 0.4 + 0.4 },
          { id: 'n4', label: 'Temporal', x: 100, y: 220, probability: Math.random() * 0.3 + 0.6 },
          { id: 'n5', label: 'Verdict', x: 300, y: 150, probability }
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

  const useExampleText = (index: number) => {
    setNewsText(exampleSnippets[index].text);
    setResult(null);
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
          <div className="flex flex-wrap gap-2 mb-2">
            {exampleSnippets.map((snippet, index) => (
              <Button 
                key={index} 
                variant="outline" 
                size="sm" 
                onClick={() => useExampleText(index)}
              >
                <FileText className="mr-1 h-4 w-4" />
                {snippet.title}
              </Button>
            ))}
          </div>
          
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
