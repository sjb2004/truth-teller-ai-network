import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { RefreshCw, FileExport } from 'lucide-react';

import { analyzeNewsContent, type AnalysisResult } from '@/utils/analysisUtils';
import { generateAnalysisSummary } from '@/utils/exportUtils';
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

  const handleExport = () => {
    if (!result || !newsText) return;

    const summary = generateAnalysisSummary(newsText, result);
    const blob = new Blob([summary], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'news-analysis-report.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Export Successful",
      description: "Analysis report has been downloaded.",
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>News or Nonsense? Analyzer</CardTitle>
        <CardDescription className="text-sm">
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
      <CardFooter className="flex justify-between flex-wrap gap-2">
        <div className="flex gap-2">
          <Button variant="outline" onClick={resetAnalysis} disabled={isAnalyzing || !newsText}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset
          </Button>
          {result && (
            <Button variant="secondary" onClick={handleExport}>
              <FileExport className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          )}
        </div>
        <Button onClick={analyzeNews} disabled={isAnalyzing || !newsText}>
          {isAnalyzing ? 'Analyzing...' : 'Analyze Article'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NewsAnalyzer;
