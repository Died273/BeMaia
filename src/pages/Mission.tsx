import { Card } from "@/components/ui/card";
import { Target, Heart, TrendingUp } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Animation delays
const headlineDelay = 0.05;
const descDelay = headlineDelay + 0.2;
const getDelay = (idx: number) => 0.18 + idx * 0.12;

const values = [
  {
    icon: <Target className="w-8 h-8 text-white" />,
    gradient: "from-primary to-secondary",
    title: "Proactive",
    desc: "Identify risks before they become crises",
  },
  {
    icon: <Heart className="w-8 h-8 text-white" />,
    gradient: "from-secondary to-accent",
    title: "Empathetic",
    desc: "Put people first with privacy-protected insights",
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-white" />,
    gradient: "from-primary to-secondary",
    title: "Results-Driven",
    desc: "Deliver measurable impact on well-being and profits",
  },
];

const Mission = () => (
  <>
    <Header />
    <section className="min-h-screen w-full py-36 bg-gradient-to-br from-primary/5 via-blue-400/10 to-secondary/10 relative overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1
            className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent py-4 animate-fade-down"
            style={{ animationDelay: `${headlineDelay}s` }}
          >
            Building Healthier Organizations
          </h1>
          <p
            className="text-xl text-muted-foreground max-w-xl mx-auto animate-fade-down"
            style={{ animationDelay: `${descDelay}s` }}
          >
            BeMaia was founded on the belief that employee burnout is preventable. By combining cutting-edge data science
            with deep organizational psychology insights, we empower companies to create workplaces where people thrive—and 
            businesses prosper.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {values.map((v, idx) => (
            <Card
              key={v.title}
              className={`group p-8 relative bg-white/80 border border-border/30 shadow-xl 
              hover:scale-105 hover:shadow-2xl hover:border-primary/40 transition-all duration-300 animate-snake-in`}
              style={{ animationDelay: `${getDelay(idx)}s` }}
            >
              <div className={`group relative flex justify-center items-center mb-4`}>
                <div
                  className={`absolute inset-0 z-0 rounded-full bg-gradient-to-br ${v.gradient} transition-transform duration-200 group-hover:scale-150`}
                />
                <div className="relative z-10">{v.icon}</div>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-foreground">{v.title}</h3>
              <p className="text-muted-foreground">{v.desc}</p>
            </Card>
          ))}
        </div>
      </div>
      <div className="pointer-events-none z-0 absolute top-32 -left-32 w-56 h-56 rounded-full bg-primary/20 blur-3xl animate-float" />
      <div className="pointer-events-none z-0 absolute bottom-12 right-12 w-64 h-64 rounded-full bg-secondary/20 blur-3xl animate-float" style={{ animationDelay: '1.1s' }} />
      <style>{`
        .animate-snake-in { animation: snakeIn 1.1s cubic-bezier(.39,1.69,.36,1) both; }
        @keyframes snakeIn { 
          0% {opacity: 0; transform: translateY(-38px) scale(0.94);}
          70% {opacity:.8;}
          100% { opacity:1; transform: translateY(0) scale(1);}
        }
        .animate-fade-down { 
          opacity: 0; 
          transform: translateY(-30px); 
          animation: fadeDown .9s cubic-bezier(.39,1.69,.36,1) both;
        }
        @keyframes fadeDown {
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-float { animation: float 8s ease-in-out infinite alternate;}
        @keyframes float { 0%,100%{transform:translateY(0);}50%{transform:translateY(-26px);} }
      `}</style>
    </section>
    <Footer />
  </>
);

export default Mission;
