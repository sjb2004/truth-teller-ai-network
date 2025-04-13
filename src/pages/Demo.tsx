
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import NewsAnalyzer from "@/components/NewsAnalyzer";
import { useIsMobile } from "@/hooks/use-mobile";

const Demo = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        <section className="bg-grid-pattern py-8 md:py-12">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center px-3 md:px-0">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">
                Interactive Demo
              </h1>
              <p className="mt-3 md:mt-4 text-sm md:text-base text-muted-foreground">
                Test our Bayesian Network algorithm by entering news content to analyze its authenticity
              </p>
            </div>
          </div>
        </section>

        <section className="py-8 md:py-12">
          <div className="container">
            <div className="mx-auto max-w-3xl">
              <div className="mb-6 p-3 md:p-4 bg-muted rounded-lg">
                <h3 className="text-base md:text-lg font-medium mb-2">About This Demo</h3>
                <p className="text-xs md:text-sm text-muted-foreground mb-2">
                  This is a simulation showing how our analysis system works. In a production environment, 
                  News or Nonsense? would analyze current news against our continuously updated models.
                </p>
                <p className="text-xs md:text-sm text-muted-foreground mb-2">
                  Our system was initially benchmarked on <span className="font-medium">FakeNewsNet</span> and <span className="font-medium">LIAR</span> datasets, 
                  containing thousands of verified and fake news articles from various time periods and sources.
                </p>
                <p className="text-xs md:text-sm text-muted-foreground">
                  <span className="font-medium">Current news compatibility:</span> Our production system is regularly updated with new training data to maintain 
                  relevance with current news topics, events, and emerging misinformation patterns.
                </p>
              </div>
              <NewsAnalyzer />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Demo;
