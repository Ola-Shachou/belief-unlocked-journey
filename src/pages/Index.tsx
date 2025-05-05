
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const features = [
  {
    title: "Identify Limiting Beliefs",
    description: "Discover the thoughts that are holding you back through our guided questionnaire process."
  },
  {
    title: "Understand Your Patterns",
    description: "Gain insights into how these beliefs affect your emotions, decisions, and life outcomes."
  },
  {
    title: "Track Your Growth",
    description: "Save your analyses and review them over time to see how your beliefs evolve."
  },
  {
    title: "Create New Possibilities",
    description: "Imagine and plan for a future where these limiting beliefs no longer control you."
  }
];

const testimonials = [
  {
    quote: "This app helped me identify beliefs I didn't even know were limiting me. A true game-changer for personal growth.",
    author: "Sarah J."
  },
  {
    quote: "The questionnaire format made it easy to dig deep into thoughts I usually avoid. Highly recommended.",
    author: "Michael T."
  }
];

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-belief-lightpurple to-white py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-belief-purple leading-tight">
                Unlock Your Full Potential
              </h1>
              <p className="text-xl md:text-2xl text-belief-purple/80">
                Identify and overcome the limiting beliefs that are holding you back
              </p>
              <div className="pt-4">
                <Link to="/questionnaire">
                  <Button size="lg" className="rounded-full px-8 text-lg bg-belief-purple hover:bg-belief-purple/90">
                    Start Your Journey
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-belief-purple">How It Works</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="belief-card space-y-3">
                  <div className="inline-flex items-center justify-center bg-belief-lightpurple w-10 h-10 rounded-full text-belief-purple font-bold text-lg mb-2">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold text-belief-purple">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-belief-softblue/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-belief-purple">What People Are Saying</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="belief-card bg-white">
                  <div className="space-y-4">
                    <p className="text-lg italic">"{testimonial.quote}"</p>
                    <p className="text-right font-medium text-belief-purple">— {testimonial.author}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-belief-softpeach/30">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto space-y-6">
              <h2 className="text-3xl font-bold text-belief-purple">Ready to Overcome Your Limiting Beliefs?</h2>
              <p className="text-xl text-muted-foreground">
                Take the first step toward personal growth and transformation.
              </p>
              <div className="pt-4 space-x-4">
                <Link to="/signup">
                  <Button size="lg" className="rounded-full px-8">
                    Create Account
                  </Button>
                </Link>
                <Link to="/questionnaire">
                  <Button size="lg" variant="outline" className="rounded-full px-8">
                    Try Without Account
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
