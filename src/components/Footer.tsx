import { motion } from "framer-motion";
import { useContactModal } from '@/contexts/ContactModalContext';
import { Link } from 'react-router-dom';
import BeMaiaLogo from "@/assets/logo.svg";

// Animation delays
const logoDelay = 0.05;
const getColumnDelay = (idx: number) => logoDelay + 0.15 + idx * 0.1;
const bottomBarDelay = getColumnDelay(2) + 0.1;

const Footer = () => {
  const { openModal } = useContactModal();
  const productLinks = [
    { href: "/pricing", label: "Pricing" },
    { href: "/security", label: "Security" },
    { href: "/mission", label: "Mission" },
  ];

  const companyLinks = [
    { href: "/team", label: "Team" },
    {
      href: "#contact",
      label: "Contact",
      onClick: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        e.preventDefault();
        openModal('info@bemaia.nl');
      }
    },
    { href: "https://forms.gle/e2NVkE9HFfcT78SS6", label: "Careers", external: true }
  ];

  return (
    <footer className="text-foreground py-12" style={{ background: 'var(--background-light)' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <motion.div
              className="md:col-span-2 text-center md:text-left"
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.8,
                delay: logoDelay,
                ease: [0.39, 1.69, 0.36, 1]
              }}
            >
              <div className="flex items-start mb-4 -ml-4">
                <div className="relative flex items-left justify-left mx-auto md:mx-0 h-16 w-full max-w-[425px]">
                  <img src={BeMaiaLogo} alt="BeMaia Logo" className="w-auto h-16" />
                </div>
              </div>
              <p className="text-foreground/80 max-w-md mx-auto md:mx-0">
                Empowering organizations to prevent burnout before it starts, through real-time
                data-driven company health analytics.
              </p>
            </motion.div>

            {/* Product */}
            <motion.div
              className="text-center md:text-left"
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.8,
                delay: getColumnDelay(0),
                ease: [0.39, 1.69, 0.36, 1]
              }}
            >
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                {productLinks.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-foreground/80 hover:text-foreground transition-colors hover:underline">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Company */}
            <motion.div
              className="text-center md:text-left"
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.8,
                delay: getColumnDelay(1),
                ease: [0.39, 1.69, 0.36, 1]
              }}
            >
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    {link.onClick ? (
                      // keep the onClick handler (contact opens modal)
                      <button
                        className="text-foreground/80 hover:text-foreground transition-colors hover:underline cursor-pointer"
                        onClick={link.onClick}
                      >
                        {link.label}
                      </button>
                    ) : link.external ? (
                      <a
                        href={link.href}
                        className="text-foreground/80 hover:text-foreground transition-colors hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link to={link.href} className="text-foreground/80 hover:text-foreground transition-colors hover:underline">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <motion.div
            className="pt-8 border-t border-foreground flex flex-col md:flex-row justify-between items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.7,
              delay: bottomBarDelay,
              ease: [0.39, 1.69, 0.36, 1]
            }}
          >
            <p className="text-foreground/60 text-sm text-center md:text-left">
              © 2025 BeMaia. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm justify-center md:justify-start">
              <a href="/privacy" className="text-foreground/80 hover:text-foreground transition-colors hover:underline">
                Privacy Policy
              </a>
              <a href="/terms" className="text-foreground/80 hover:text-foreground transition-colors hover:underline">
                Terms of Service
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
