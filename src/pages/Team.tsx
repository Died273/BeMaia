import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Linkedin, Mail } from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useContactModal } from "@/contexts/ContactModalContext";
import { motion } from "framer-motion";

// Team Members
const founders = [
  {
    name: "Louis Enrico Böker",
    role: "Co-Founder",
    expertise: "Business & Growth",
    bio: "",
    photo: "/team/louis.jpg",
    color: "from-secondary to-primary",
    linkedin: "https://www.linkedin.com/in/louis-enrico-böker-1616191b1",
    email: "l.boeker@bemaia.nl",
  },
  {
    name: "Jakob Blin",
    role: "Co-Founder",
    expertise: "Design & Customer Success",
    bio: "",
    photo: "/team/jakob.jpg",
    color: "from-primary to-secondary",
    linkedin: "https://www.linkedin.com/in/jakob-blin-6043a1203/",
    email: "j.blin@bemaia.nl",
  },
  {
    name: "Tim Spaargaren",
    role: "Co-Founder",
    expertise: "Sales & Product Development",
    bio: "",
    photo: "/team/tim.jpeg",
    color: "from-secondary to-primary",
    email: "t.spaargaren@bemaia.nl",
    linkedin: "https://www.linkedin.com/in/tim-spaargaren-a15412244/",
  },
  {
    name: "Tanhushri Chidanand",
    role: "Co-Founder",
    expertise: "Marketing & Organizational Psychology",
    bio: "",
    photo: "/team/tanhushri.jpg",
    color: "from-primary to-secondary",
    email: "info@bemaia.com",
    linkedin: "https://www.linkedin.com/in/tanushri-chidanand-a721a0234/",
  },
  {
    name: "Diederick de Gier",
    role: "Co-Founder",
    expertise: "Technology & Data Science",
    bio: "",
    photo: "/assets/team/diederick.jpeg",
    color: "from-secondary to-primary",
    email: "d.gier@bemaia.nl",
    linkedin: "https://www.linkedin.com/in/diederickdegier/",
  },
];

// Advisors
const advisors = [
  {
    name: "Mascha Mooy",
    role: "Advisor",
    expertise: "Organizational Psychology",
    bio: "Founder of Bye Bye Burnout and a leading Dutch burnout prevention expert. With over 10 years of experience, Mascha has helped thousands of professionals and organizations tackle burnout effectively.",
    photo: "https://www.maschamooy.nl/wp-content/uploads/2017/06/Mascha-Mooy-Bye-Bye-Burnout-Dutch-Global-Media-3.jpg",
    color: "from-primary to-accent",
    linkedin: "https://www.linkedin.com/in/maschamooy/",
    email: "mascha@byebyeburnout.nl."
  },
];

// Animation delays
const getDelay = (idx: number) => 0.18 + idx * 0.12;
const headlineDelay = 0.05;
const descDelay = headlineDelay + 0.2;

const Team = () => {
  const { openModal } = useContactModal();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/30 to-background">
      <Header />
      <section className="py-36">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Team Intro */}
          <motion.div 
            className="max-w-4xl mx-auto text-center mb-16"
            initial={{ opacity: 0, y: -38, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ 
              duration: 0.9, 
              delay: headlineDelay,
              ease: [0.39, 1.69, 0.36, 1]
            }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">BeMaia Team</span>
            </h1>
            <motion.p 
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.9, 
                delay: descDelay,
                ease: [0.39, 1.69, 0.36, 1]
              }}
            >
              Five experts united by a shared mission: to make employee burnout preventable through innovative technology and evidence-based insights.
            </motion.p>
          </motion.div>

          {/* Founders */}
          <div className="max-w-7xl mx-auto space-y-8">
            {founders.map((founder, index) => (
              <motion.div
                key={founder.name}
                initial={{ opacity: 0, y: -38, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 1.1, 
                  delay: getDelay(index),
                  ease: [0.39, 1.69, 0.36, 1]
                }}
              >
                <Card className="relative overflow-hidden p-8 md:p-12 hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/30 group bg-gradient-to-br from-card/50 via-card to-card/50 backdrop-blur-sm hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative grid md:grid-cols-[200px_1fr] gap-8 items-start">
                    <div className="mx-auto md:mx-0">
                      <img
                        src={founder.photo}
                        alt={founder.name}
                        className="w-40 h-48 rounded-3xl object-cover shadow-xl group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-3xl font-bold mb-2 group-hover:text-primary transition-colors">{founder.name}</h3>
                        <p className="text-lg font-medium text-primary mb-1">{founder.role}</p>
                        <p className="text-sm text-muted-foreground">{founder.expertise}</p>
                      </div>
                      <p className="text-lg text-muted-foreground leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity">
                        {founder.bio}
                      </p>
                      <div className="flex gap-4 pt-4 flex-wrap">
                        {founder.linkedin && (
                          <a href={founder.linkedin} target="_blank" rel="noopener noreferrer">
                            <Button variant="hero" size="lg" className="group text-white">
                              <Linkedin className="mr-2 w-5 h-5" />
                              LinkedIn
                            </Button>
                          </a>
                        )}
                        <Button
                          variant="secondary"
                          size="lg"
                          className="text-white relative overflow-hidden group before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700"
                          onClick={() => openModal(founder.email)}
                        >
                          <Mail className="mr-2 w-5 h-5" />
                          Contact
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Advisors Section */}
          <motion.div 
            className="max-w-4xl mx-auto text-center mt-32 mb-16"
            initial={{ opacity: 0, y: -38, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ 
              duration: 0.9, 
              delay: 0.05,
              ease: [0.39, 1.69, 0.36, 1]
            }}
          >
            <h2 className="text-5xl sm:text-6xl font-bold mb-6">
              Meet the{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                BeMaia Advisors
              </span>
            </h2>
            <motion.p 
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.9, 
                delay: 0.25,
                ease: [0.39, 1.69, 0.36, 1]
              }}
            >
              Our advisors bring world-class expertise and strategic guidance to power our mission.
            </motion.p>
          </motion.div>

          <div className="max-w-7xl mx-auto space-y-8">
            {advisors.map((advisor, index) => (
              <motion.div
                key={advisor.name}
                initial={{ opacity: 0, y: -38, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 1.1, 
                  delay: getDelay(index),
                  ease: [0.39, 1.69, 0.36, 1]
                }}
              >
                <Card className="relative overflow-hidden p-8 md:p-12 hover:shadow-2xl transition-all duration-300 border-2 hover:border-accent/40 group bg-gradient-to-br from-card/50 via-card to-card/50 backdrop-blur-sm hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative grid md:grid-cols-[200px_1fr] gap-8 items-start">
                    <div className="mx-auto md:mx-0">
                      <img
                        src={advisor.photo}
                        alt={advisor.name}
                        className="w-44 h-60 rounded-3xl object-cover shadow-xl group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-3xl font-bold mb-2 group-hover:text-accent transition-colors">{advisor.name}</h3>
                        <p className="text-lg font-medium text-accent mb-1">{advisor.role}</p>
                        <p className="text-sm text-muted-foreground">{advisor.expertise}</p>
                      </div>
                      <p className="text-lg text-muted-foreground leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity">
                        {advisor.bio}
                      </p>
                      <div className="flex gap-4 pt-4 flex-wrap">
                        {advisor.linkedin && (
                          <a href={advisor.linkedin} target="_blank" rel="noopener noreferrer">
                            <Button variant="hero" size="lg" className="group text-white">
                              <Linkedin className="mr-2 w-5 h-5" />
                              LinkedIn
                            </Button>
                          </a>
                        )}
                        <Button
                          variant="accent"
                          size="lg"
                          className="relative overflow-hidden group before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700"
                          onClick={() => openModal(advisor.email)}
                        >
                          <Mail className="mr-2 w-5 h-5" />
                          Contact
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Team;
