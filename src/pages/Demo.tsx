
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import NewsAnalyzer from "@/components/NewsAnalyzer";

const Demo = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        <section className="bg-grid-pattern py-12">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Interactive Demo
              </h1>
              <p className="mt-4 text-muted-foreground">
                Test our Bayesian Network algorithm by entering news content to analyze its authenticity
              </p>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container">
            <div className="mx-auto max-w-3xl">
              <div className="mb-6 p-4 bg-muted rounded-lg">
                <h3 className="text-lg font-medium mb-2">About This Demo</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  This is a simulation showing how our analysis system works. In a production environment, 
                  TruthTeller AI would analyze current news against our trained models.
                </p>
                <p className="text-sm text-muted-foreground">
                  Our system was benchmarked on <span className="font-medium">FakeNewsNet</span> and <span className="font-medium">LIAR</span> datasets, 
                  containing thousands of verified and fake news articles from various time periods and sources.
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
