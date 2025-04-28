
import { AnalysisResult, getVerdictDetails } from './analysisUtils';
import jsPDF from 'jspdf';

const drawNetworkGraph = (doc: jsPDF, nodes: any[], edges: any[], startY: number): number => {
  const pageWidth = doc.internal.pageSize.width;
  const margin = 20;
  const graphWidth = pageWidth - (2 * margin);
  const graphHeight = 150;
  
  // Scale node positions to fit in the PDF
  const scaledNodes = nodes.map(node => ({
    ...node,
    x: margin + (node.x * graphWidth) / 500, // Assuming original width is 500
    y: startY + (node.y * graphHeight) / 300 // Assuming original height is 300
  }));

  // Draw edges
  edges.forEach(edge => {
    const fromNode = scaledNodes.find(n => n.id === edge.from);
    const toNode = scaledNodes.find(n => n.id === edge.to);
    if (fromNode && toNode) {
      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(0.5);
      doc.line(fromNode.x, fromNode.y, toNode.x, toNode.y);
    }
  });

  // Draw nodes
  scaledNodes.forEach(node => {
    // Draw circle
    doc.setFillColor(70, 130, 180);
    doc.circle(node.x, node.y, 4, 'F');
    
    // Draw label
    doc.setFontSize(8);
    doc.text(node.label, node.x + 5, node.y);
  });

  return startY + graphHeight + 10; // Return the new Y position after the graph
};

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
  
  // Network Visualization section
  yPos += 15;
  doc.text('Bayesian Network Visualization:', 20, yPos);
  yPos += 10;
  yPos = drawNetworkGraph(doc, result.evidenceNodes, result.evidenceEdges, yPos);
  
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

