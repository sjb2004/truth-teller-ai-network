
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Database, BookOpen, Home, Info, FileText, MenuIcon, X, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/hooks/use-theme";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  const links = [
    { to: "/", label: "Home", icon: Home },
    { to: "/demo", label: "Demo", icon: Database },
    { to: "/methodology", label: "Methodology", icon: BookOpen },
    { to: "/about", label: "About", icon: Info },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-truth-600" />
          <span className="text-xl font-bold tracking-tight">News or Nonsense?</span>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          ))}
          
          {/* Dark Mode Toggle */}
          <div className="flex items-center gap-2">
            <Sun className="h-4 w-4 text-muted-foreground" />
            <Switch 
              checked={isDark}
              onCheckedChange={() => setTheme(isDark ? "light" : "dark")}
              aria-label="Toggle dark mode"
            />
            <Moon className="h-4 w-4 text-muted-foreground" />
          </div>
        </nav>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "fixed inset-0 top-16 z-50 bg-background md:hidden",
          isMenuOpen ? "flex flex-col" : "hidden"
        )}
      >
        <nav className="container grid gap-2 p-4">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="flex items-center gap-2 rounded-md p-2 text-foreground hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              <link.icon className="h-5 w-5" />
              {link.label}
            </Link>
          ))}
          
          {/* Dark Mode Toggle in mobile menu */}
          <div className="flex items-center justify-between rounded-md p-2 text-foreground hover:bg-accent">
            <span className="flex items-center gap-2">
              {isDark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              {isDark ? "Dark Mode" : "Light Mode"}
            </span>
            <Switch 
              checked={isDark}
              onCheckedChange={() => setTheme(isDark ? "light" : "dark")}
              aria-label="Toggle dark mode"
            />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
