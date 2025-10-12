import { motion } from "framer-motion";
import { useContactModal } from '@/contexts/ContactModalContext';

// Animation delays
const logoDelay = 0.05;
const getColumnDelay = (idx: number) => logoDelay + 0.15 + idx * 0.1;
const bottomBarDelay = getColumnDelay(2) + 0.1;

const Footer = () => {
  const { openModal } = useContactModal();
  const productLinks = [
    { href: "/features", label: "Features" },
    { href: "/pricing", label: "Pricing" },
    { href: "/security", label: "Security" }
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
    <footer className="bg-primary text-background py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <motion.div
              className="md:col-span-2"
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.8,
                delay: logoDelay,
                ease: [0.39, 1.69, 0.36, 1]
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-white rounded-2xl p-4 flex items-center justify-center" style={{ height: "64px", width: "148px" }}>
                  <img src="/favicon.svg" alt="BeMaia Logo" className="h-20 w-48" />
                </div>
              </div>
              <p className="text-background/80 max-w-md">
                Empowering organizations to prevent burnout before it starts, through real-time
                data-driven company health analytics.
              </p>
            </motion.div>

            {/* Product */}
            <motion.div
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
                    <a href={link.href} className="text-background/80 hover:text-background transition-colors hover:underline">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Company */}
            <motion.div
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
                      <a
                        href={link.href}
                        className="text-background/80 hover:text-background transition-colors hover:underline cursor-pointer"
                        onClick={link.onClick}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <a
                        href={link.href}
                        className="text-background/80 hover:text-background transition-colors hover:underline"
                        {...(link.external && { target: "_blank", rel: "noopener noreferrer" })}
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <motion.div
            className="pt-8 border-t border-background/20 flex flex-col md:flex-row justify-between items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.7,
              delay: bottomBarDelay,
              ease: [0.39, 1.69, 0.36, 1]
            }}
          >
            <p className="text-background/60 text-sm">
              © 2025 BeMaia. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="/privacy" className="text-background/80 hover:text-background transition-colors hover:underline">
                Privacy Policy
              </a>
              <a href="/terms" className="text-background/80 hover:text-background transition-colors hover:underline">
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
