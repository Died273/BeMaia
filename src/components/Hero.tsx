import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, TrendingUp, Activity } from "lucide-react";
import heroImage from "@/assets/hero-visualization.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-muted/30 to-background pt-24 sm:pt-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in-up">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
              Catch Burnout
              <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Before It Starts
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl">
              We turn insights into recommended changes that actively boost employee well-being 
              and company performance. Real data. Real recommendations. Real results.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
              variant="hero" 
              size="lg" 
              className="group text-white"
              onClick={() => window.open('https://calendly.com/l-boeker-bemaia/30min', '_blank')}
                >
                Book a Demo
                 <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                variant="accent" 
                size="lg" 
                className="relative overflow-hidden group before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700"
              >
                Get in Touch
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/50">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-2xl font-bold text-primary">
                  <TrendingUp className="w-5 h-5" />
                  €20k 
                </div>
                <p className="text-sm text-muted-foreground">Cost per person on Bornout</p>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-secondary">Continuous</div>
                <p className="text-sm text-muted-foreground">Insights delivered</p>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-accent">Proactive</div>
                <p className="text-sm text-muted-foreground">Early intervention</p>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src={heroImage} 
                alt="BeMaia Analytics Dashboard" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
            </div>
            
            {/* Floating stats cards */}
            <div className="absolute -left-6 top-1/4 bg-card p-4 rounded-2xl shadow-xl animate-float hidden lg:block">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Team Health</p>
                  <p className="text-2xl font-bold text-primary">89%</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -right-6 bottom-1/4 bg-card p-4 rounded-2xl shadow-xl animate-float hidden lg:block" style={{ animationDelay: '1.5s' }}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <Activity className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium">Risk Score</p>
                  <p className="text-2xl font-bold text-accent">Low</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
