import { Card } from "@/components/ui/card";
import { Shield, Lock, Key, Eye, FileCheck, Users, AlertTriangle, CheckCircle, Database, Globe, Building2, Award } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

// Animation delays
const headlineDelay = 0.05;
const descDelay = headlineDelay + 0.2;
const getCardDelay = (idx: number) => descDelay + 0.2 + idx * 0.12;

const Security = () => {
  const securityFeatures = [
    {
      icon: Shield,
      title: "GDPR Compliant",
      description: "Full compliance with EU General Data Protection Regulation. All data processing activities are documented and transparent.",
      color: "from-primary to-secondary"
    },
    {
      icon: Users,
      title: "Anonymous Individual Results",
      description: "Individual survey responses are never shown to managers or HR professionals. Only aggregated, anonymized insights are provided.",
      color: "from-secondary to-accent"
    },
    {
      icon: Database,
      title: "EU Data Residency",
      description: "All data is stored exclusively on secure servers located within the European Union, ensuring compliance with EU data protection laws.",
      color: "from-accent to-primary"
    }
  ];

  const compliance = [
    {
      icon: Building2,
      title: "Dutch Data Protection Authority",
      description: "Registered with Autoriteit Persoonsgegevens (AP) in the Netherlands.",
    },
    {
      icon: Globe,
      title: "EU Servers Only",
      description: "All data is stored and processed exclusively on servers located within the European Union.",
    },
    {
      icon: Eye,
      title: "Employee Privacy First",
      description: "Individual responses remain completely anonymous and are never accessible to management.",
    }
  ];

  const dataRights = [
    "Right to access your data",
    "Right to rectification and correction",
    "Right to erasure (right to be forgotten)",
    "Right to restrict processing",
    "Right to data portability",
    "Right to object to processing",
    "Right to withdraw consent at any time"
  ];

  return (
  <div className="min-h-screen page-bg">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/5 via-blue-400/10 to-secondary/10 pt-36">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1 left-1 w-[5rem] h-[5rem] bg-white/60 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-8 right-12 w-[30rem] h-[28rem] bg-muted/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }}></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="text-5xl sm:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: -38, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.9, 
                delay: headlineDelay,
                ease: [0.39, 1.69, 0.36, 1]
              }}
            >
              Security & Privacy
              <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Built for Trust
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.9, 
                delay: descDelay,
                ease: [0.39, 1.69, 0.36, 1]
              }}
            >
              Your data security and employee privacy are our highest priorities. BeMaia is fully GDPR compliant, with all data stored on EU servers. Individual survey responses remain completely anonymous and are never accessible to managers or HR professionals.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-24 bg-gradient-to-bl from-secondary/10 via-blue-400/10 to-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: -38, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.9, 
                delay: 0.05,
                ease: [0.39, 1.69, 0.36, 1]
              }}
            >
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                Privacy & Security Features
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                BeMaia protects employee privacy while providing valuable organizational insights through anonymized data.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {securityFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: -38, scale: 0.94 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: 1.1, 
                    delay: getCardDelay(index),
                    ease: [0.39, 1.69, 0.36, 1]
                  }}
                >
                  <Card className="p-8 h-full hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/30 group hover:scale-105">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GDPR Compliance */}
      <section className="py-24 bg-gradient-to-br from-primary/5 via-blue-400/10 to-secondary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: -38, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.9, 
                delay: 0.05,
                ease: [0.39, 1.69, 0.36, 1]
              }}
            >
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                GDPR Compliance & Certifications
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                BeMaia adheres to the strictest European data protection standards, ensuring your organization remains compliant.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {compliance.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: -38, scale: 0.94 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: 1.1, 
                    delay: 0.45 + index * 0.12,
                    ease: [0.39, 1.69, 0.36, 1]
                  }}
                >
                  <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30 hover:scale-105">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <item.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: -38, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 1.1, 
                delay: 0.81,
                ease: [0.39, 1.69, 0.36, 1]
              }}
            >
              <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 border-2 border-primary/20">
                <div className="max-w-3xl mx-auto">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <FileCheck className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-3">Your Data Rights Under GDPR</h3>
                      <p className="text-muted-foreground mb-6">
                        As a data subject, you have comprehensive rights over your personal information. BeMaia makes it easy to exercise these rights at any time.
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {dataRights.map((right, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{right}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 pt-6 border-t border-border/50">
                    <p className="text-sm text-muted-foreground">
                      To exercise any of these rights, contact our Data Protection Officer at{" "}
                      <a href="mailto:info@bemaia.nl" className="text-primary hover:underline font-medium">
                        info@bemaia.nl
                      </a>
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Data Processing */}
      <section className="py-24 bg-gradient-to-bl from-secondary/10 via-blue-400/10 to-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: -38, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.9, 
                delay: 0.05,
                ease: [0.39, 1.69, 0.36, 1]
              }}
            >
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                How We Process Your Data
              </h2>
              <p className="text-xl text-muted-foreground">
                Transparency is fundamental to our approach. Here's exactly how we handle your organization's data.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -38, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 1.1, 
                delay: 0.25,
                ease: [0.39, 1.69, 0.36, 1]
              }}
            >
              <Card className="p-8 md:p-12 space-y-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Database className="w-6 h-6 text-primary" />
                    <h3 className="text-2xl font-bold">Data Collection</h3>
                  </div>
                  <p className="text-muted-foreground">
                    We collect only the minimum data necessary to provide burnout prevention insights. Employee survey responses are completely anonymized, with no personally identifiable information stored alongside responses.
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Lock className="w-6 h-6 text-secondary" />
                    <h3 className="text-2xl font-bold">Data Storage</h3>
                  </div>
                  <p className="text-muted-foreground">
                    All data is stored on secure servers located within the European Union. We maintain strict data residency policies to ensure compliance with EU data protection regulations.
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Eye className="w-6 h-6 text-accent" />
                    <h3 className="text-2xl font-bold">Data Access & Privacy</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Individual survey responses are never shown to managers or HR professionals. Only aggregated, anonymized insights are provided to protect employee privacy. We never sell, rent, or share your data with third parties for marketing purposes.
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <AlertTriangle className="w-6 h-6 text-primary" />
                    <h3 className="text-2xl font-bold">Data Retention</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Data is retained only as long as necessary to provide services or as required by law. Organizations can request complete data deletion at any time.
                  </p>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Incident Response */}
      <section className="py-24 bg-gradient-to-br from-primary/5 via-blue-400/10 to-secondary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -38, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 1.1, 
                delay: 0.05,
                ease: [0.39, 1.69, 0.36, 1]
              }}
            >
              <Card className="p-8 md:p-12 bg-card border-2 border-primary/20 shadow-2xl">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-6">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                    Questions About Security?
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    We're committed to transparency and are happy to answer any questions about how we protect your data and maintain employee privacy.
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-border/50 text-center">
                  <p className="text-sm text-muted-foreground mb-4">
                    Contact us for more information
                  </p>
                  <a 
                    href="mailto:info@bemaia.nl" 
                    className="text-primary hover:text-primary/80 font-medium transition-colors inline-flex items-center gap-2"
                  >
                    <AlertTriangle className="w-4 h-4" />
                    info@bemaia.nl
                  </a>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        .animate-float { animation: float 8s ease-in-out infinite alternate;}
        @keyframes float { 0%,100%{transform:translateY(0);}50%{transform:translateY(-26px);} }
      `}</style>
    </div>
  );
};

export default Security;
