
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import { exampleSnippets } from '@/utils/analysisUtils';
import { useState } from 'react';

interface ExampleSnippetsProps {
  onSelectSnippet: (text: string) => void;
}

const ExampleSnippets = ({ onSelectSnippet }: ExampleSnippetsProps) => {
  const [showAll, setShowAll] = useState(false);
  const displayedSnippets = showAll ? exampleSnippets : exampleSnippets.slice(0, 3);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium">Example Content</span>
        <Button 
          variant="link" 
          size="sm" 
          className="h-auto p-0"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? 'Show fewer examples' : 'Show more examples'}
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {displayedSnippets.map((snippet, index) => (
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
    </div>
  );
};

export default ExampleSnippets;
