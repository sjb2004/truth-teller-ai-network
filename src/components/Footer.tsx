
import { FileText } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-truth-600" />
          <span className="text-sm font-semibold">TruthTeller AI</span>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
          <Link to="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            Home
          </Link>
          <Link to="/demo" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            Demo
          </Link>
          <Link to="/methodology" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            Methodology
          </Link>
          <Link to="/about" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            About
          </Link>
        </div>
        <div className="text-xs text-muted-foreground">
          © 2025 TruthTeller AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
