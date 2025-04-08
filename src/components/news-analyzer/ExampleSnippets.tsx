
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import { exampleSnippets } from '@/utils/analysisUtils';

interface ExampleSnippetsProps {
  onSelectSnippet: (text: string) => void;
}

const ExampleSnippets = ({ onSelectSnippet }: ExampleSnippetsProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-2">
      {exampleSnippets.map((snippet, index) => (
        <Button 
          key={index} 
          variant="outline" 
          size="sm" 
          onClick={() => onSelectSnippet(snippet.text)}
        >
          <FileText className="mr-1 h-4 w-4" />
          {snippet.title}
        </Button>
      ))}
    </div>
  );
};

export default ExampleSnippets;
