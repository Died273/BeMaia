import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

// Animation delays
const headlineDelay = 0.05;
const descDelay = headlineDelay + 0.18;
const sectionDelay = (idx: number) => descDelay + 0.15 + idx * 0.12;

const PrivacyPolicy = () => (
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
            Privacy Policy
          </h1>
          <p className="text-xl text-muted-foreground max-w-xl mx-auto mb-6">
            Last Updated: October 11, 2025
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            BeMaia (“we”, “us”, “our”) is committed to protecting your privacy and personal data. This Privacy Policy explains how we collect, use, store, share, and protect your information according to GDPR and Dutch law.
          </p>
        </motion.div>

        {/* Identity & Contact Information */}
        <motion.section
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: sectionDelay(0), ease: [0.39, 1.69, 0.36, 1] }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold mb-2">Who We Are</h2>
          <p className="mb-2">
            BeMaia B.V.<br/>
            Registered Address: <strong>Roetersstraat 11, 1018 WB Amsterdam</strong><br/>
            Email: <a href="mailto:info@bemaia.nl" className="text-accent font-medium">info@bemaia.nl</a>
          </p>
        </motion.section>

        {/* Data Collected */}
        <motion.section
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: sectionDelay(1), ease: [0.39, 1.69, 0.36, 1] }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold mb-2">What Data We Collect</h2>
          <ul className="list-disc ml-6 text-muted-foreground mb-2">
            <li>Identifiers: name, email, organization</li>
            <li>Account info: company details, team size</li>
            <li>User-generated content: survey answers, feedback</li>
            <li>Technical: IP address, device, browser, usage & analytics (cookies)</li>
            <li>Billing: payment and invoicing (via secure third-party processors)</li>
            <li>Any other data you voluntarily share</li>
          </ul>
        </motion.section>

        {/* How & Why Data is Used */}
        <motion.section
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: sectionDelay(2), ease: [0.39, 1.69, 0.36, 1] }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold mb-2">How We Use Your Data</h2>
          <ul className="list-disc ml-6 text-muted-foreground mb-2">
            <li>To provide our burnout prevention services and dashboard to your organization</li>
            <li>To process and analyze survey and feedback data in aggregate and anonymously</li>
            <li>To manage user accounts and process payments</li>
            <li>To communicate important security or service updates</li>
            <li>To improve our product, customer support, and analytics</li>
            <li>For legal and regulatory compliance</li>
          </ul>
        </motion.section>

        {/* Legal Basis */}
        <motion.section
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: sectionDelay(3), ease: [0.39, 1.69, 0.36, 1] }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold mb-2">Legal Basis for Processing</h2>
          <p>
            We process personal data on the following bases:
          </p>
          <ul className="list-disc ml-6 text-muted-foreground mb-2">
            <li>Consent: with your clear permission</li>
            <li>Contract: to provide our services under signed agreements</li>
            <li>Legitimate interest: to develop, secure, and improve our platform</li>
            <li>Legal obligation: where required by applicable law</li>
          </ul>
        </motion.section>
        
        {/* Cookies & Tracking */}
        <motion.section
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: sectionDelay(4), ease: [0.39, 1.69, 0.36, 1] }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold mb-2">Cookies & Tracking Technologies</h2>
          <p>
            We use essential cookies to ensure basic site functionality and analytics cookies (Google Analytics, etc.) to evaluate usage. You may opt-out or control cookies via your browser settings. No cookies are used for advertising or non-essential tracking.
          </p>
        </motion.section>

        {/* Data Security */}
        <motion.section
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: sectionDelay(5), ease: [0.39, 1.69, 0.36, 1] }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold mb-2">How We Keep Your Data Safe</h2>
          <p>
            All data is encrypted in transit (TLS) and at rest (AES-256). Access is protected by multi-factor authentication and role-based permissions. Regular security audits are performed. Data stays in secure EU data centers in Amsterdam.
          </p>
        </motion.section>
        
        {/* Data Sharing */}
        <motion.section
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: sectionDelay(6), ease: [0.39, 1.69, 0.36, 1] }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold mb-2">Data Sharing & Third Parties</h2>
          <p>
            We never sell or rent your data. Your data may be shared or processed by:
          </p>
          <ul className="list-disc ml-6 text-muted-foreground mb-2">
            <li>Authorized team members under strict contractual and technical controls</li>
            <li>Payment processors (Stripe, PayPal – for billing only)</li>
            <li>Analytics providers (Google Analytics, for anonymized usage data)</li>
            <li>Legal authorities when required by law</li>
          </ul>
          <p>
            All third-party providers are GDPR-compliant and located in the EU, unless otherwise specified.
          </p>
        </motion.section>
        
        {/* Data Retention */}
        <motion.section
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: sectionDelay(7), ease: [0.39, 1.69, 0.36, 1] }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold mb-2">Data Retention</h2>
          <p>
            We keep your data only as long as needed to provide our services, fulfill legal or contractual obligations, or unless you request deletion. Account and survey data are purged after contract termination or deletion requests.
          </p>
        </motion.section>
        
        {/* User Rights */}
        <motion.section
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: sectionDelay(8), ease: [0.39, 1.69, 0.36, 1] }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold mb-2">Your Rights Under GDPR</h2>
          <ul className="list-disc ml-6 text-muted-foreground mb-2">
            <li>The right to access your personal data</li>
            <li>The right to correct or erase your data</li>
            <li>The right to restrict or object to processing</li>
            <li>The right to data portability</li>
            <li>The right to withdraw consent at any time</li>
            <li>The right to complain to the Dutch Data Protection Authority (<a href="https://autoriteitpersoonsgegevens.nl/en" target="_blank" rel="noopener noreferrer" className="underline font-medium">AP</a>)</li>
          </ul>
          <p>
            To exercise your rights, contact us at <a href="mailto:info@bemaia.nl" className="text-accent font-medium">info@bemaia.nl</a>
          </p>
        </motion.section>
        
        {/* Automated Decision-Making */}
        <motion.section
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: sectionDelay(9), ease: [0.39, 1.69, 0.36, 1] }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold mb-2">Automated Decision-Making</h2>
          <p>
            BeMaia does not use automated decision-making or profiling that produces legal or significant effects on individuals. All analytics and recommendations are provided in aggregate and anonymously.
          </p>
        </motion.section>
        
        {/* Changes to Privacy Policy */}
        <motion.section
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: sectionDelay(10), ease: [0.39, 1.69, 0.36, 1] }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold mb-2">Changes to This Policy</h2>
          <p>
            We may update this Policy to reflect legal or operational changes. Changes will be posted here, and we encourage you to review this page periodically.
          </p>
        </motion.section>
      </div>
    </section>

    <Footer />
  </div>
);

export default PrivacyPolicy;
