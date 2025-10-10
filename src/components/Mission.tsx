import { Target, Heart, TrendingUp } from "lucide-react";

const Mission = () => {
  return (
    <section className="py-24 bg-card" style={{ backgroundColor: "#ffffffff" }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Building Healthier Organizations
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              BeMaia was founded on the belief that employee burnout is preventable. By combining cutting-edge data science 
              with deep organizational psychology insights, we empower companies to create workplaces where people thrive—and 
              businesses prosper.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center space-y-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto shadow-lg">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Proactive</h3>
              <p className="text-muted-foreground">
                Identify risks before they become crises
              </p>
            </div>

            <div className="text-center space-y-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center mx-auto shadow-lg">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Empathetic</h3>
              <p className="text-muted-foreground">
                Put people first with privacy-protected insights
              </p>
            </div>

            <div className="text-center space-y-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center mx-auto shadow-lg">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Results-Driven</h3>
              <p className="text-muted-foreground">
                Deliver measurable impact on well-being and profits
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
