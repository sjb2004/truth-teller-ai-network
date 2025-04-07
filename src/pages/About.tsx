
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Github, Mail, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const About = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        <section className="bg-grid-pattern py-12">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                About the Project
              </h1>
              <p className="mt-4 text-muted-foreground">
                Learn about TruthTeller AI and the journey behind it
              </p>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container">
            <div className="mx-auto max-w-3xl space-y-8">
              <div>
                <h2 className="text-2xl font-bold">Project Background</h2>
                <p className="mt-4">
                  TruthTeller AI was born from the recognition that misinformation spreads rapidly online and traditional "black box" AI solutions lack transparency. By using Bayesian Networks, this project aims to create a system that not only detects fake news but also explains its reasoning in a way that users can understand and trust.
                </p>
              </div>

              <Separator />

              <div>
                <h2 className="text-2xl font-bold">Why Transparent AI Matters</h2>
                <p className="mt-4">
                  In the fight against misinformation, transparency is crucial. When an AI system labels content as "fake news," users need to understand why. TruthTeller AI provides this transparency by visualizing the probabilistic reasoning process through its Bayesian Network structure.
                </p>
                <p className="mt-4">
                  This approach not only helps combat misinformation but also addresses the growing concern of AI accountability. By making the decision-making process transparent, TruthTeller AI aims to set a standard for responsible AI in content evaluation.
                </p>
              </div>

              <Separator />

              <div>
                <h2 className="text-2xl font-bold">Research Applications</h2>
                <p className="mt-4">
                  Beyond its practical application in detecting fake news, this project contributes to research in several areas:
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>Probabilistic graphical models for natural language processing</li>
                  <li>Explainable AI techniques and evaluation methods</li>
                  <li>Hybrid systems combining machine learning with structured knowledge</li>
                  <li>Human-computer interaction in trust and decision support</li>
                </ul>
              </div>

              <Separator />

              <div>
                <h2 className="text-2xl font-bold">Future Directions</h2>
                <p className="mt-4">
                  TruthTeller AI is an ongoing project with several exciting directions for future development:
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>Integration with fact-checking databases for enhanced verification</li>
                  <li>Development of domain-specific models for specialized topics</li>
                  <li>Browser extension for real-time news verification</li>
                  <li>API services for integration with other platforms</li>
                  <li>Multilingual support to address global misinformation</li>
                </ul>
              </div>

              <Separator />

              <div className="text-center">
                <h2 className="text-2xl font-bold">Get In Touch</h2>
                <p className="mt-4">
                  Interested in collaborating, learning more, or contributing to the project? Feel free to reach out!
                </p>
                <div className="mt-6 flex justify-center gap-4">
                  <Button variant="outline" size="icon" asChild>
                    <a href="#" aria-label="GitHub Repository">
                      <Github className="h-5 w-5" />
                    </a>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <a href="#" aria-label="Email Contact">
                      <Mail className="h-5 w-5" />
                    </a>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <a href="#" aria-label="Twitter Profile">
                      <Twitter className="h-5 w-5" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
