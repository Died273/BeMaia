import { Card } from "@/components/ui/card";
import { Award, Users, TrendingUp } from "lucide-react";

const PartnerSection = () => {
  const highlights = [
    {
      icon: Award,
      stat: "5+ Years",
      label: "Experience in Burnout Prevention",
    },
    {
      icon: Users,
      stat: "10,000+",
      label: "Employees Supported",
    },
    {
      icon: TrendingUp,
      stat: "85%",
      label: "Improvement in Well-being",
    },
  ];

  return (
    <section className="py-24" style={{ backgroundColor: "#ffffffff" }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              In Partnership with ByeByeBurnout
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We've joined forces with ByeByeBurnout, a leading expert in burnout prevention
              with years of proven experience helping organizations build healthier workplaces.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Partner Logo/Info Card */}
            <Card className="p-12 bg-white border-2" style={{ borderColor: "#B2DD5C" }}>
              <div className="text-center space-y-8">
                <img
                  src="https://www.byebyeburnout.nl/wp-content/uploads/2018/01/logo-bbb.png"
                  alt="ByeByeBurnout Logo"
                  className="mx-auto rounded-xl shadow-md"
                  style={{ width: "400px", maxWidth: "100%", height: "auto" }}
                />
                <h3 className="text-3xl font-bold"></h3>
                <p className="text-muted-foreground font-bold">
                  Leading experts in workplace well-being and burnout prevention,
                  bringing years of hands-on experience and proven methodologies.
                </p>
              </div>
            </Card>

            {/* Testimonial & Stats */}
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                {highlights.map((item, index) => (
                  <Card
                    key={item.label}
                    className="p-6 text-center border-2 hover:shadow-lg transition-all animate-fade-in-up"
                    style={{ borderColor: "#B2DD5C", animationDelay: `${0.3 + index * 0.1}s` }}
                  >
                    <item.icon className="w-6 h-6 mx-auto mb-2" style={{ color: "#B2DD5C" }} />
                    <p className="text-2xl font-bold mb-1" style={{ color: "#B2DD5C" }}>{item.stat}</p>
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerSection;
