
// Simple utility functions for news analysis

export interface AnalysisResult {
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
export const exampleSnippets = [
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

export const analyzeNewsContent = (newsText: string): Promise<AnalysisResult> => {
  return new Promise((resolve) => {
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

      resolve(mockResult);
    }, 2000);
  });
};

export const getVerdictDetails = (probability: number) => {
  const verdict = probability > 0.7 ? 'Likely Authentic' : 
                 probability > 0.3 ? 'Uncertain' : 
                 'Likely Fake';
                 
  const color = probability > 0.7 ? 'text-truth-600' : 
               probability > 0.3 ? 'text-amber-500' : 
               'text-destructive';
               
  return { verdict, color };
};
