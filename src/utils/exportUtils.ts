
import { AnalysisResult, getVerdictDetails } from './analysisUtils';
import jsPDF from 'jspdf';

export const generateAnalysisSummary = (newsText: string, result: AnalysisResult): void => {
  const { verdict } = getVerdictDetails(result.probability);
  
  const doc = new jsPDF();
  
  // Set initial y position for content
  let yPos = 20;
  
  // Add title
  doc.setFontSize(16);
  doc.text('News or Nonsense? Analysis Report', 20, yPos);
  
  // Add content with proper spacing
  doc.setFontSize(12);
  
  // Analyzed Content section
  yPos += 20;
  doc.text('Analyzed Content:', 20, yPos);
  yPos += 10;
  const splitText = doc.splitTextToSize(newsText, 170);
  doc.text(splitText, 20, yPos);
  
  // Analysis Results section
  yPos += splitText.length * 7 + 10;
  doc.text('Analysis Results:', 20, yPos);
  yPos += 10;
  doc.text(`Verdict: ${verdict}`, 20, yPos);
  yPos += 7;
  doc.text(`Authenticity Score: ${(result.probability * 100).toFixed(1)}%`, 20, yPos);
  
  // Contributing Factors section
  yPos += 15;
  doc.text('Contributing Factors:', 20, yPos);
  yPos += 10;
  result.factorsContributing.forEach(factor => {
    doc.text(`• ${factor.factor}: ${(factor.score * 100).toFixed(1)}%`, 20, yPos);
    yPos += 7;
  });
  
  // Network Analysis section
  yPos += 8;
  doc.text('Network Analysis:', 20, yPos);
  yPos += 7;
  doc.text(`The Bayesian network analysis considered ${result.evidenceNodes.length}`, 20, yPos);
  yPos += 7;
  doc.text('different factors and their relationships to determine the final verdict.', 20, yPos);
  
  // Add generation date
  yPos += 15;
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, yPos);
  
  // Save the PDF
  doc.save('news-analysis-report.pdf');
};
