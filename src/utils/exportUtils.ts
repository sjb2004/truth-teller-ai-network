
import { AnalysisResult } from './analysisUtils';

export const generateAnalysisSummary = (newsText: string, result: AnalysisResult): string => {
  const { verdict } = getVerdictDetails(result.probability);
  
  const summary = `
News or Nonsense? Analysis Report
================================

Analyzed Content:
----------------
${newsText}

Analysis Results:
----------------
Verdict: ${verdict}
Authenticity Score: ${(result.probability * 100).toFixed(1)}%

Contributing Factors:
-------------------
${result.factorsContributing
  .map(factor => `- ${factor.factor}: ${(factor.score * 100).toFixed(1)}%`)
  .join('\n')}

Network Analysis:
----------------
The Bayesian network analysis considered ${result.evidenceNodes.length} different factors
and their relationships to determine the final verdict.

Generated on: ${new Date().toLocaleString()}
`;

  return summary;
};
