
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Database, FileText } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import NetworkGraph from "@/components/NetworkGraph";

const Index = () => {
  // Simple demo network for the hero section
  const demoNodes = [
    { id: 'n1', label: 'Source', x: 100, y: 100 },
    { id: 'n2', label: 'Content', x: 220, y: 80 },
    { id: 'n3', label: 'Context', x: 180, y: 180 },
    { id: 'n4', label: 'Verdict', x: 300, y: 130, state: 'true' as const }
  ];
  
  const demoEdges = [
    { from: 'n1', to: 'n4' },
    { from: 'n2', to: 'n4' },
    { from: 'n3', to: 'n4' }
  ];

  const features = [
    {
      title: "Explainable AI",
      description: "Transparent reasoning process that shows exactly how conclusions are reached",
      icon: CheckCircle
    },
    {
      title: "Probabilistic Analysis",
      description: "Uses Bayesian Networks to calculate uncertainty and handle partial information",
      icon: Database
    },
    {
      title: "Natural Language Processing",
      description: "Analyzes text content to identify linguistic patterns associated with fake news",
      icon: FileText
    }
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-grid-pattern py-20 md:py-32">
          <div className="container relative z-10">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="animate-fadeIn text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                <span className="text-truth-600">Truth</span>Teller AI
              </h1>
              <p className="mt-6 text-lg text-muted-foreground md:text-xl">
                Using Bayesian Networks to detect fake news with explainable AI. A transparent approach to fighting misinformation online.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button asChild size="lg" className="gap-2">
                  <Link to="/demo">
                    Try Demo <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/methodology">Learn How It Works</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Network Visualization */}
        <section className="bg-muted py-20">
          <div className="container">
            <div className="mx-auto max-w-5xl">
              <div className="grid gap-8 lg:grid-cols-2">
                <div className="flex flex-col justify-center">
                  <h2 className="text-3xl font-bold tracking-tight">
                    See How the <span className="text-truth-600">Network</span> Thinks
                  </h2>
                  <p className="mt-4 text-muted-foreground">
                    Unlike black box AI, our Bayesian Network approach allows you to see exactly how different factors influence the final verdict on the credibility of news content.
                  </p>
                  <div className="mt-8">
                    <Button asChild>
                      <Link to="/methodology">Explore Methodology</Link>
                    </Button>
                  </div>
                </div>
                <div className="bg-background rounded-lg border shadow-sm p-4">
                  <NetworkGraph nodes={demoNodes} edges={demoEdges} className="h-[300px]" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20">
          <div className="container">
            <h2 className="text-center text-3xl font-bold tracking-tight mb-12">
              Key Features
            </h2>
            <div className="mx-auto max-w-5xl">
              <div className="grid gap-8 md:grid-cols-3">
                {features.map((feature, i) => (
                  <div key={i} className="flex flex-col items-center text-center">
                    <div className="mb-4 rounded-full bg-muted p-3">
                      <feature.icon className="h-6 w-6 text-truth-600" />
                    </div>
                    <h3 className="mb-2 text-xl font-medium">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="bg-truth-600 py-16">
          <div className="container text-center">
            <h2 className="text-3xl font-bold text-white">
              Ready to analyze news content?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-truth-100">
              Try our interactive demo to see how the system evaluates news articles and detects potential misinformation.
            </p>
            <Button asChild size="lg" variant="secondary" className="mt-8">
              <Link to="/demo">
                Try the Demo <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
