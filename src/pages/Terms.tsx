import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

// Animation delays
const headlineDelay = 0.05;
const sectionDelay = (idx: number) => headlineDelay + 0.18 + idx * 0.12;

const TermsOfService = () => (
  <div className="min-h-screen bg-gradient-to-b from-background via-muted/30 to-background">
    <Header />
    <section className="py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: -38, scale: 0.94 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.9,
            delay: headlineDelay,
            ease: [0.39, 1.69, 0.36, 1]
          }}
        >
          <h1 className="text-5xl sm:text-6xl font-bold mb-5">
            Terms of Service
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Last Updated: October 11, 2025
          </p>
        </motion.div>

        {/* Introduction, Acceptance */}
        <motion.section
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: sectionDelay(0), ease: [0.39, 1.69, 0.36, 1] }}
          className="mb-10"
        >
          <h2 className="text-2xl font-bold mb-2">1. Acceptance of Terms</h2>
          <p>
            By accessing or using BeMaia (“Service”, “we”, “us”), you acknowledge that you (the customer or user) have read, understood and agreed to these Terms of Service (“Terms”). If you do not agree, do not use the platform.
          </p>
        </motion.section>

        {/* Service Description */}
        <motion.section
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: sectionDelay(1), ease: [0.39, 1.69, 0.36, 1] }}
          className="mb-10"
        >
          <h2 className="text-2xl font-bold mb-2">2. Service Description and Access</h2>
          <p>
            BeMaia provides online B2B burnout prevention analytics, dashboards, and survey tools. The Service is delivered at https://bemaia.nl via browser, accessible solely by registered customers and their authorized users.
          </p>
        </motion.section>

        {/* User Obligations & Acceptable Use */}
        <motion.section
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: sectionDelay(2), ease: [0.39, 1.69, 0.36, 1] }}
          className="mb-10"
        >
          <h2 className="text-2xl font-bold mb-2">3. User Responsibilities</h2>
          <ul className="list-disc ml-6 text-muted-foreground mb-2">
            <li>Maintain confidentiality of login credentials.</li>
            <li>Use the Service for lawful business purposes; do not misuse (no hacking, spamming, or illegal data sharing).</li>
            <li>Comply with all applicable local and EU laws, including GDPR.</li>
            <li>Notify us promptly of any unauthorized access or suspected breach.</li>
          </ul>
        </motion.section>

        {/* Privacy and Data Processing */}
        <motion.section
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: sectionDelay(3), ease: [0.39, 1.69, 0.36, 1] }}
          className="mb-10"
        >
          <h2 className="text-2xl font-bold mb-2">4. Privacy & GDPR Compliance</h2>
          <p>
            Use of our Service is also governed by our <a className="underline text-accent font-medium" href="/privacy-policy">Privacy Policy</a>. We comply with all GDPR and Dutch data protection laws concerning your data. Data processing agreements are available upon request.
          </p>
        </motion.section>

        {/* Intellectual Property */}
        <motion.section
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: sectionDelay(4), ease: [0.39, 1.69, 0.36, 1] }}
          className="mb-10"
        >
          <h2 className="text-2xl font-bold mb-2">5. Intellectual Property</h2>
          <p>
            All software, content, and branding (except user submissions) are our intellectual property and protected under international law. You may not copy, decompile, reverse engineer, or resell without permission.
          </p>
        </motion.section>

        {/* Payment Terms */}
        <motion.section
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: sectionDelay(5), ease: [0.39, 1.69, 0.36, 1] }}
          className="mb-10"
        >
          <h2 className="text-2xl font-bold mb-2">6. Fees & Payment</h2>
          <p>
            Fees, pricing, and payment terms are set forth in your subscription agreement or order form. We use secure third-party payment processors (e.g., Stripe, PayPal). Non-payment may result in suspension or termination of Services.
          </p>
        </motion.section>

        {/* Service Availability, Support */}
        <motion.section
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: sectionDelay(6), ease: [0.39, 1.69, 0.36, 1] }}
          className="mb-10"
        >
          <h2 className="text-2xl font-bold mb-2">7. Service Availability & Support</h2>
          <p>
            We aim for 99.5% uptime but do not guarantee uninterrupted access. Planned maintenance will be communicated in advance. Support channels and SLAs are described on our website or as agreed per contract.
          </p>
        </motion.section>

        {/* Term & Termination */}
        <motion.section
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: sectionDelay(7), ease: [0.39, 1.69, 0.36, 1] }}
          className="mb-10"
        >
          <h2 className="text-2xl font-bold mb-2">8. Term & Termination</h2>
          <p>
            Either party may terminate with written notice as per your service/order agreement. Upon termination, we will delete your account and organizational data within 30 days, except where retention is required by law.
          </p>
        </motion.section>

        {/* Warranties, Limitation of Liability */}
        <motion.section
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: sectionDelay(8), ease: [0.39, 1.69, 0.36, 1] }}
          className="mb-10"
        >
          <h2 className="text-2xl font-bold mb-2">9. Disclaimer & Limitation of Liability</h2>
          <p>
            Service is provided “as is” without warranty. To the maximum extent permitted by Dutch law, our liability is limited and does not cover consequential or indirect damages, loss of data, or profit.
          </p>
        </motion.section>

        {/* Changes */}
        <motion.section
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: sectionDelay(9), ease: [0.39, 1.69, 0.36, 1] }}
          className="mb-10"
        >
          <h2 className="text-2xl font-bold mb-2">10. Changes to Terms</h2>
          <p>
            We may update these Terms. Updates will be posted here and effective upon posting. Material changes will be communicated to account holders.
          </p>
        </motion.section>

        {/* Governing Law */}
        <motion.section
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: sectionDelay(10), ease: [0.39, 1.69, 0.36, 1] }}
        >
          <h2 className="text-2xl font-bold mb-2">11. Governing Law & Jurisdiction</h2>
          <p>
            These Terms are governed by the laws of the Netherlands. Disputes are subject to the exclusive jurisdiction of the courts of Amsterdam.
          </p>
        </motion.section>
      </div>
    </section>
    <Footer />
  </div>
);

export default TermsOfService;
