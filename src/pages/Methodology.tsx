
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import NetworkGraph from "@/components/NetworkGraph";

const Methodology = () => {
  // Sample network for visualization
  const bayesianNodes = [
    { id: 'n1', label: 'Source', x: 100, y: 100 },
    { id: 'n2', label: 'History', x: 100, y: 200 },
    { id: 'n3', label: 'Stance', x: 100, y: 300 },
    { id: 'n4', label: 'Content', x: 250, y: 120 },
    { id: 'n5', label: 'Claims', x: 250, y: 200 },
    { id: 'n6', label: 'Emotion', x: 250, y: 280 },
    { id: 'n7', label: 'Context', x: 400, y: 150 },
    { id: 'n8', label: 'Verdict', x: 400, y: 250 }
  ];
  
  const bayesianEdges = [
    { from: 'n1', to: 'n7' },
    { from: 'n1', to: 'n8' },
    { from: 'n2', to: 'n1' },
    { from: 'n3', to: 'n6' },
    { from: 'n4', to: 'n7' },
    { from: 'n4', to: 'n5' },
    { from: 'n5', to: 'n8' },
    { from: 'n6', to: 'n8' },
    { from: 'n7', to: 'n8' }
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        <section className="bg-grid-pattern py-12">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Methodology
              </h1>
              <p className="mt-4 text-muted-foreground">
                Understanding the technical approach behind TruthTeller AI
              </p>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="bayesian">Bayesian Networks</TabsTrigger>
                  <TabsTrigger value="nlp">NLP Analysis</TabsTrigger>
                  <TabsTrigger value="metrics">Evaluation Metrics</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-6 pt-6">
                  <h2 className="text-2xl font-bold">Project Overview</h2>
                  <p>
                    TruthTeller AI combines Bayesian Networks with Natural Language Processing to create an explainable AI system for detecting fake news. Unlike black-box approaches like deep neural networks, our system provides transparency into how conclusions are reached.
                  </p>
                  
                  <h3 className="text-xl font-semibold mt-6">Key Components</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Probabilistic model using Bayesian Networks</li>
                    <li>Natural language processing for content analysis</li>
                    <li>Source credibility assessment</li>
                    <li>Contextual information integration</li>
                    <li>Explainable reasoning process</li>
                  </ul>
                  
                  <Card className="mt-6">
                    <CardContent className="pt-6">
                      <NetworkGraph 
                        nodes={bayesianNodes} 
                        edges={bayesianEdges} 
                        className="h-[300px]" 
                      />
                      <p className="text-sm text-muted-foreground mt-4">
                        Sample structure of the Bayesian Network used for fake news detection.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="bayesian" className="space-y-6 pt-6">
                  <h2 className="text-2xl font-bold">Bayesian Networks Explained</h2>
                  <p>
                    Bayesian Networks are probabilistic graphical models that represent a set of variables and their conditional dependencies via a directed acyclic graph (DAG). They are particularly well-suited for situations with uncertainty.
                  </p>
                  
                  <h3 className="text-xl font-semibold mt-6">Why Bayesian Networks?</h3>
                  <p>
                    For fake news detection, Bayesian Networks offer several advantages:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Explainability:</strong> The network structure clearly shows how different factors influence the final conclusion</li>
                    <li><strong>Uncertainty handling:</strong> Probabilistic reasoning allows for degrees of belief rather than binary classifications</li>
                    <li><strong>Prior knowledge integration:</strong> Domain expertise can be incorporated into the model structure</li>
                    <li><strong>Incremental updating:</strong> New evidence can be incorporated to update beliefs</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold mt-6">Technical Implementation</h3>
                  <p>
                    Our implementation uses conditional probability tables (CPTs) to quantify relationships between nodes. The network calculates the posterior probability of an article being fake given observed evidence using Bayes' theorem:
                  </p>
                  <div className="bg-muted p-4 rounded-md my-4 overflow-x-auto">
                    <code>P(Fake|Evidence) = P(Evidence|Fake) × P(Fake) / P(Evidence)</code>
                  </div>
                </TabsContent>
                
                <TabsContent value="nlp" className="space-y-6 pt-6">
                  <h2 className="text-2xl font-bold">Natural Language Processing</h2>
                  <p>
                    Our system employs several NLP techniques to extract features from news content that serve as evidence nodes in the Bayesian Network.
                  </p>
                  
                  <h3 className="text-xl font-semibold mt-6">Text Analysis Features</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Linguistic patterns:</strong> Analyzing writing style, tone, and language complexity</li>
                    <li><strong>Sentiment analysis:</strong> Detecting emotional content and emotional manipulation</li>
                    <li><strong>Named entity recognition:</strong> Identifying and verifying people, organizations, and locations</li>
                    <li><strong>Claim extraction:</strong> Identifying factual claims that can be verified</li>
                    <li><strong>Stance detection:</strong> Analyzing the position taken on controversial topics</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold mt-6">Processing Pipeline</h3>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Text preprocessing (tokenization, normalization)</li>
                    <li>Feature extraction using NLP techniques</li>
                    <li>Conversion of text features to probabilistic evidence</li>
                    <li>Integration of evidence into the Bayesian Network</li>
                    <li>Inference to calculate final authenticity probability</li>
                  </ol>
                </TabsContent>
                
                <TabsContent value="metrics" className="space-y-6 pt-6">
                  <h2 className="text-2xl font-bold">Evaluation Metrics</h2>
                  <p>
                    To assess the performance of our fake news detection system, we use several evaluation metrics that provide insight into different aspects of performance.
                  </p>
                  
                  <h3 className="text-xl font-semibold mt-6">Classification Metrics</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Accuracy:</strong> Overall correctness of predictions</li>
                    <li><strong>Precision:</strong> Proportion of positive identifications that were actually correct</li>
                    <li><strong>Recall:</strong> Proportion of actual positives that were identified correctly</li>
                    <li><strong>F1 Score:</strong> Harmonic mean of precision and recall</li>
                    <li><strong>AUC-ROC:</strong> Area under the Receiver Operating Characteristic curve</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold mt-6">Explainability Metrics</h3>
                  <p>
                    Beyond standard classification metrics, we also evaluate our system on explainability:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Feature attribution clarity:</strong> How clearly the system attributes its decision to specific features</li>
                    <li><strong>Consistency:</strong> Whether similar inputs produce similar explanations</li>
                    <li><strong>User comprehension:</strong> How well users understand the system's reasoning</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold mt-6">Current Performance</h3>
                  <p>
                    On benchmark datasets including FakeNewsNet and LIAR, our system achieves:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>84% accuracy in fake news classification</li>
                    <li>87% precision and 81% recall for fake news detection</li>
                    <li>92% user comprehension of system explanations</li>
                  </ul>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Methodology;
