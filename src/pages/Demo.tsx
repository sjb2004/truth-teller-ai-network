
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
