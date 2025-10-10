import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Mail, Calendar } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-24" style={{ backgroundColor: "#FFFFFFFF" }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="max-w-4xl mx-auto p-8 md:p-16 bg-card border-2 border-primary/20 shadow-2xl animate-scale-in">
          <div className="text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Ready to Transform Your Organization?
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Join forward-thinking companies using data-driven insights to build healthier, 
              more productive workplaces. Start your journey with BeMaia today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button variant="hero" size="lg" className="group text-white">
                <Calendar className="mr-2 w-5 h-5" />
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

            <div className="pt-8 border-t border-border/50">
              <p className="text-sm text-muted-foreground mb-4">
                Questions? Our team is here to help.
              </p>
              <a href="mailto:info@bemaia.nl" className="text-primary hover:text-primary/80 font-medium transition-colors">
                info@bemaia.nl
              </a>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default CTA;
