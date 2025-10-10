import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Activity, UserCheck, Users, Lightbulb, ShieldCheck } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const features = [

  {
    icon: <UserCheck className="w-8 h-8 text-accent" />,
    title: "Anonymous Surveys",
    desc: "Confidential insights encourage honest feedback and create real change.",
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-green-600" />,
    title: "Secure & GDPR Friendly",
    desc: "Private, encrypted, and compliant with the toughest European standards.",
  },
  {
    icon: <Lightbulb className="w-8 h-8 text-yellow-500" />,
    title: "Personalized Recommendations",
    desc: "Research-backed action plans tailored automatically to your team’s needs.",
  },
  {
    icon: <Activity className="w-8 h-8 text-secondary" />,
    title: "Proactive Alerts",
    desc: "Get notified when thresholds are crossed. Never miss an opportunity to intervene early.",
  },
  {
    icon: <Users className="w-8 h-8 text-blue-500" />,
    title: "Role-Based Dashboards",
    desc: "HR, managers, and leaders each get the right data at the right time.",
  },

  {
    icon: <BarChart3 className="w-8 h-8 text-primary" />,
    title: "Live Burnout Analytics",
    desc: "See risk levels and trends instantly, sliced by team, seniority, or department.",
  },
];

const Features = () => (
  <>
    <Header />
    {/* Added pt-24 to section to ensure headline is not cut off */}
    <section className="min-h-screen w-full pt-24 py-20 bg-gradient-to-br from-background via-muted/40 to-background relative overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Main Features
          </h1>
          <p className="text-xl text-muted-foreground max-w-xl mx-auto">
            Everything you need for proactive and effective burnout prevention in one sleek, secure environment.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {features.map((f, idx) => (
            <Card
              key={f.title}
              className={`
                group p-8 relative bg-white/80 border border-border/30 shadow-xl
                hover:scale-105 hover:shadow-2xl hover:border-primary/40
                transition-all duration-300 animate-fade-in-up
              `}
              style={{ animationDelay: `${0.18 + idx * 0.09}s` }}
            >
              <div className="flex items-center mb-4">
                <div className="rounded-2xl bg-white/60 p-3 shadow backdrop-blur">
                  {f.icon}
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-foreground">{f.title}</h3>
              <p className="text-muted-foreground">{f.desc}</p>
            </Card>
          ))}
        </div>
        <div className="text-center mt-16">
          <Button variant="hero" size="lg" className="group text-white">
            Try a Live Demo
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
      <div className="pointer-events-none z-0 absolute top-32 -left-32 w-56 h-56 rounded-full bg-primary/20 blur-3xl animate-float" />
      <div className="pointer-events-none z-0 absolute bottom-12 right-12 w-64 h-64 rounded-full bg-secondary/20 blur-3xl animate-float" style={{ animationDelay: '1.1s' }} />
      <style>{`
        .animate-fade-in-up { animation: fadeinUp 0.9s cubic-bezier(.39,1.69,.36,1) both; }
        @keyframes fadeinUp { 0% {opacity: 0;transform: translateY(32px);} 70%{opacity:.8} 100% {opacity:1; transform:translateY(0);} }
        .animate-float { animation: float 8s ease-in-out infinite alternate;}
        @keyframes float { 0%,100%{transform:translateY(0);}50%{transform:translateY(-26px);} }
      `}</style>
    </section>
    <Footer />
  </>
);

export default Features;
