import { TrendingUp, Users, Building2, Euro } from "lucide-react";
import { Card } from "@/components/ui/card";

const MarketOpportunity = () => {
  return (
    <section className="py-24" style={{ backgroundColor: "#ffffffff" }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              The Burnout Crisis is Real
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Employee burnout costs billions annually. Organizations that act now gain a competitive advantage 
              in talent retention, productivity, and financial performance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="p-6 text-center bg-card hover:shadow-xl transition-all duration-300 animate-fade-in-up border-2">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Euro className="w-8 h-8 text-primary" />
              </div>
              <p className="text-3xl font-bold text-primary mb-2">€4B+</p>
              <p className="text-sm text-muted-foreground">Annual cost in Netherlands alone</p>
            </Card>

            <Card className="p-6 text-center bg-card hover:shadow-xl transition-all duration-300 animate-fade-in-up border-2" style={{ animationDelay: '0.1s' }}>
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-secondary" />
              </div>
              <p className="text-3xl font-bold text-secondary mb-2">50%+</p>
              <p className="text-sm text-muted-foreground">Employees experience burnout</p>
            </Card>

            <Card className="p-6 text-center bg-card hover:shadow-xl transition-all duration-300 animate-fade-in-up border-2" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-accent" />
              </div>
              <p className="text-3xl font-bold text-accent mb-2">85%</p>
              <p className="text-sm text-muted-foreground">Organizations affected</p>
            </Card>

            <Card className="p-6 text-center bg-card hover:shadow-xl transition-all duration-300 animate-fade-in-up border-2" style={{ animationDelay: '0.3s' }}>
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <p className="text-3xl font-bold text-primary mb-2">3X</p>
              <p className="text-sm text-muted-foreground">ROI on prevention vs treatment</p>
            </Card>
          </div>

          <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 border-2 border-primary/20 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                Early Intervention Saves Money
              </h3>
              <p className="text-lg text-muted-foreground mb-6">
                Organizations using predictive analytics to combat burnout see up to 40% reduction in turnover costs, 
                25% increase in productivity, and significant improvements in employee satisfaction and retention.
              </p>
              <div className="flex flex-wrap justify-center gap-8 pt-6 border-t border-border/50">
                <div>
                  <p className="text-3xl font-bold text-primary">40%</p>
                  <p className="text-sm text-muted-foreground">Lower turnover</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-secondary">25%</p>
                  <p className="text-sm text-muted-foreground">More productive</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-accent">60%</p>
                  <p className="text-sm text-muted-foreground">Higher engagement</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default MarketOpportunity;
