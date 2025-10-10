import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Linkedin, Mail, X, Copy } from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useState } from "react";
import { link } from "fs";


// Team Members
const founders = [
  {
    name: "Louis Enrico Böker",
    role: "Co-Founder",
    expertise: "Business Strategy & Growth",
    bio: "",
    initials: "LB",
    color: "from-primary to-secondary",
    linkedin: "https://www.linkedin.com/in/louis-enrico-böker-1616191b1",
    email: "l.boeker@bemaia.nl",
  },
  {
    name: "Jakob Blin",
    role: "Co-Founder",
    expertise: "Design & Customer Success",
    bio: "",
    initials: "MB",
    linkedin: "https://www.linkedin.com/in/jakob-blin-6043a1203/",
    color: "from-secondary to-accent",
    email: "j.blin@bemaia.nl",
  },
  {
    name: "Tim Spaargaren ",
    role: "Co-Founder",
    expertise: "Sales & Product Development",
    bio: "",
    initials: "LR",
    color: "from-accent to-primary",
    email: "t.spaargaren@bemaia.nl",
  },
  {
    name: "Tanhushri Chidanand",
    role: "Co-Founder",
    expertise: "Marketing & Organizational Psychology",
    bio: "",
    initials: "JO",
    color: "from-primary to-accent",
    email: "info@bemaia.com",
  },
  {
    name: "Diederick de Gier",
    role: "Co-Founder",
    expertise: "Technology & Data Science",
    bio: "",
    initials: "DG",
    color: "from-secondary to-primary",
    email: "d.gier@bemaia.nl",
  },
];

// Advisors
const advisors = [
  {
    name: "Mascha Mooy",
    role: "Advisor",
    expertise: "Organizational Psychology",
    bio: "Founder of Bye Bye Burnout and a leading Dutch burnout prevention expert. With over 10 years of experience, Mascha has helped thousands of professionals and organizations tackle burnout effectively.",
    initials: "MM",
    color: "from-primary to-accent",
    linkedin: "https://www.linkedin.com/in/maschamooy/",
    email: "mascha@byebyeburnout.nl."
  },

];


const Team = () => {
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [copied, setCopied] = useState(false);


  const handleContactClick = (email) => {
    setSelectedEmail(email);
    setShowEmailModal(true);
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(selectedEmail);
      setCopied(true);
      setShowEmailModal(false);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      alert('Failed to copy email. Please try again.');
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/30 to-background">
      <Header />
      {/* Team Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          {/* Team Intro */}
          <div className="max-w-4xl mx-auto text-center mb-16 animate-fade-in-up">
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              Meet the{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                BeMaia Team
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Five experts united by a shared mission: to make employee burnout preventable through
              innovative technology and evidence-based insights.
            </p>
          </div>

          {/* Team Grid */}
          <div className="max-w-7xl mx-auto space-y-8">
            {founders.map((founder, index) => (
              <Card
                key={founder.name}
                className="relative overflow-hidden p-8 md:p-12 hover:shadow-2xl transition-all duration-500 border-2 hover:border-primary/30 group animate-fade-in-up bg-gradient-to-br from-card/50 via-card to-card/50 backdrop-blur-sm"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Transparent gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative grid md:grid-cols-[200px_1fr] gap-8 items-start">
                  {/* Avatar */}
                  <div className="mx-auto md:mx-0">
                    <div className={`w-48 h-48 rounded-3xl bg-gradient-to-br ${founder.color} flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform duration-500`}>
                      <span className="text-white font-bold text-5xl">{founder.initials}</span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-3xl font-bold mb-2 group-hover:text-primary transition-colors">{founder.name}</h3>
                      <p className="text-lg font-medium text-primary mb-1">{founder.role}</p>
                      <p className="text-sm text-muted-foreground">{founder.expertise}</p>
                    </div>
                    <p className="text-lg text-muted-foreground leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity">
                      {founder.bio}
                    </p>
                    {/* Buttons with new designs */}
                    <div className="flex gap-4 pt-4 flex-wrap">
                      <a
                        href={founder.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >

                        <Button
                          variant="hero"
                          size="lg"
                          className="group text-white"
                        >
                          <Linkedin className="mr-2 w-5 h-5" />
                          LinkedIn
                        </Button>
                      </a>

                      <Button
                        variant="accent"
                        size="lg"
                        className="relative overflow-hidden group before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700"
                        onClick={() => handleContactClick(founder.email)}
                      >
                        <Mail className="mr-2 w-5 h-5" />
                        Contact
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Advisors Section */}
          <div className="max-w-4xl mx-auto text-center mt-32 mb-16 animate-fade-in-up">
            <h2 className="text-5xl sm:text-6xl font-bold mb-6">
              Meet the{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                BeMaia Advisors
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our advisors bring world-class expertise and strategic guidance to power our mission.
            </p>
          </div>
          <div className="max-w-7xl mx-auto space-y-8">
            {advisors.map((advisor, index) => (
              <Card
                key={advisor.name}
                className="relative overflow-hidden p-8 md:p-12 hover:shadow-2xl transition-all duration-500 border-2 hover:border-accent/40 group animate-fade-in-up bg-gradient-to-br from-card/50 via-card to-card/50 backdrop-blur-sm"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Transparent gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative grid md:grid-cols-[200px_1fr] gap-8 items-start">
                  {/* Avatar */}
                  <div className="mx-auto md:mx-0">
                    <div className={`w-48 h-48 rounded-3xl bg-gradient-to-br ${advisor.color} flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform duration-500`}>
                      <span className="text-white font-bold text-5xl">{advisor.initials}</span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-3xl font-bold mb-2 group-hover:text-accent transition-colors">{advisor.name}</h3>
                      <p className="text-lg font-medium text-accent mb-1">{advisor.role}</p>
                      <p className="text-sm text-muted-foreground">{advisor.expertise}</p>
                    </div>
                    <p className="text-lg text-muted-foreground leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity">
                      {advisor.bio}
                    </p>
                    {/* Same Buttons as team */}
                    <div className="flex gap-4 pt-4 flex-wrap">
                      <Button
                        variant="hero"
                        size="lg"
                        className="group text-white"
                      >
                        <Linkedin className="mr-2 w-5 h-5" />
                        LinkedIn
                      </Button>
                      <Button
                        variant="accent"
                        size="lg"
                        className="relative overflow-hidden group before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700"
                      >
                        <Mail className="mr-2 w-5 h-5" />
                        Contact
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="max-w-3xl mx-auto mt-16 text-center animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 border-2 border-primary/20">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                Want to Join Our Mission?
              </h3>
              <p className="text-lg text-muted-foreground mb-6">
                We're always looking for talented individuals who share our passion for improving workplace well-being.
              </p>
              <a
                href="https://forms.gle/e2NVkE9HFfcT78SS6"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="hero" size="lg" className="text-white">
                  Apply Now
                </Button>
              </a>
            </Card>
          </div>
        </div>
      </section>
      <Footer />
      {copied && (
        <div className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-primary to-secondary text-white py-3 px-8 rounded-xl shadow-xl font-semibold text-lg flex items-center gap-3 animate-fade-in-up">
          <Mail className="w-5 h-5" />
          Email copied to clipboard!
        </div>
      )}
      {/* Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4 border-2 border-primary/20">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">Contact Options</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowEmailModal(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <p className="text-muted-foreground mb-6">
              How would you like to send an email to <strong>{selectedEmail}</strong>?
            </p>

            <div className="space-y-3">
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${selectedEmail}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowEmailModal(false)}
                className="block"
              >
                <Button variant="hero" size="lg" className="w-full text-white">
                  <span className="mr-2 flex items-center">
                    <svg width="2000px" height="2000px" viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg" fill="none"><path stroke="#FFFFFF" stroke-linejoin="round" stroke-width="20" d="M22 57.265V142c0 5.523 4.477 10 10 10h24V95.056l40 30.278 40-30.278V152h24c5.523 0 10-4.477 10-10V57.265c0-13.233-15.15-20.746-25.684-12.736L96 81.265 47.684 44.53C37.15 36.519 22 44.032 22 57.265Z" /></svg>
                  </span>
                  Open in Gmail
                </Button>
              </a>

              <a
                href={`mailto:${selectedEmail}`}
                onClick={() => setShowEmailModal(false)}
                className="block"
              >
                <Button variant="outline" size="lg" className="w-full">
                  <Mail className="mr-2 w-5 h-5" />
                  Use  Mail Client
                </Button>
              </a>

              <Button
                variant="accent"
                size="lg"
                className="relative overflow-hidden group before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700 w-full"
                onClick={handleCopyEmail}
              >
                <Copy className="mr-2 w-5 h-5" />
                Copy Email Address
              </Button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Team;
