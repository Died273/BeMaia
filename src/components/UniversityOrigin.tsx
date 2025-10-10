import { Card } from "@/components/ui/card";
import { GraduationCap, Lightbulb, Rocket, Users } from "lucide-react";

const UniversityOrigin = () => {
  const values = [
    {
      icon: GraduationCap,
      title: "Research-Backed",
      description: "Founded on rigorous academic research and evidence-based methodologies from leading institutions.",
    },
    {
      icon: Lightbulb,
      title: "Innovation-Driven",
      description: "Born from a culture of innovation, we bring fresh perspectives to age-old workplace challenges.",
    },
    {
      icon: Rocket,
      title: "Entrepreneurial Spirit",
      description: "Young, dynamic team combining academic excellence with startup agility and ambition.",
    },
  ];

  return (
    <section className="py-24" style={{ backgroundColor: "#ffffffff" }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Born from Academic Excellence
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              BeMaia originated in the University of Amsterdam's vibrant startup ecosystem, 
              where cutting-edge research meets entrepreneurial innovation.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-center mb-12">
            {/* Main Card */}
            <Card className="p-8 md:p-12 bg-card border-2 border-primary/20 shadow-xl animate-fade-in-up">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">University of Amsterdam</h3>
                    <p className="text-muted-foreground">Minor of Entrepenuership</p>
                  </div>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We started out at the University of Amsterdam, 
                  combining practical research in workplace psychology with data science to tackle burnout in organizations across the Netherlands.
                </p>
                <div className="flex items-center gap-2 pt-4">
                  <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
                  <p className="text-sm font-medium text-primary">
                    Innovating since 2025
                  </p>
                </div>
              </div>
            </Card>

            {/* Values Grid */}
            <div className="space-y-6">
              {values.map((value, index) => (
                <Card
                  key={value.title}
                  className="p-6 hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/30 group animate-fade-in-up"
                  style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <value.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold mb-2">{value.title}</h4>
                      <p className="text-sm text-muted-foreground">{value.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UniversityOrigin;
