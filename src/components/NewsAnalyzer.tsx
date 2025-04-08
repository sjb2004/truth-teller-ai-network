
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { RefreshCw } from 'lucide-react';

import { analyzeNewsContent, type AnalysisResult } from '@/utils/analysisUtils';
import ExampleSnippets from './news-analyzer/ExampleSnippets';
import AnalysisProgress from './news-analyzer/AnalysisProgress';
import AnalysisResultTabs from './news-analyzer/AnalysisResultTabs';

const NewsAnalyzer = () => {
  const [newsText, setNewsText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const { toast } = useToast();

  const analyzeNews = async () => {
    if (!newsText.trim()) {
      toast({
        title: 'Empty Input',
        description: 'Please enter some news text to analyze.',
        variant: 'destructive'
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      const analysisResult = await analyzeNewsContent(newsText);
      setResult(analysisResult);
    } catch (error) {
      toast({
        title: 'Analysis Error',
        description: 'An error occurred while analyzing the news content.',
        variant: 'destructive'
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const useExampleText = (text: string) => {
    setNewsText(text);
    setResult(null);
  };

  const resetAnalysis = () => {
    setNewsText('');
    setResult(null);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>News or Nonsense? Analyzer</CardTitle>
        <CardDescription>
          Enter a news article or content to analyze its authenticity using Bayesian Networks
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <ExampleSnippets onSelectSnippet={useExampleText} />
          
          <Textarea
            placeholder="Paste news content here..."
            className="min-h-[200px] resize-none"
            value={newsText}
            onChange={(e) => setNewsText(e.target.value)}
            disabled={isAnalyzing}
          />

          <AnalysisProgress isAnalyzing={isAnalyzing} />
          <AnalysisResultTabs result={result} />
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
