import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl font-bold font-display bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
             BeMaia
           </span>
            </div>

              <p className="text-background/80 max-w-md">
                Empowering organizations to prevent burnout before it starts, through real-time 
                data-driven company health analytics.
              </p>
            </div>

            {/* Product */}
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#features" className="text-background/80 hover:text-background transition-colors hover:underline">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="text-background/80 hover:text-background transition-colors hover:underline">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#security" className="text-background/80 hover:text-background transition-colors hover:underline">
                    Security
                  </a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/team" className="text-background/80 hover:text-background transition-colors hover:underline">
                    Team
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-background/80 hover:text-background transition-colors hover:underline">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="https://forms.gle/e2NVkE9HFfcT78SS6" className="text-background/80 hover:text-background transition-colors hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Careers
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-background/20 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-background/60 text-sm">
              © 2025 BeMaia. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#privacy" className="text-background/80 hover:text-background transition-colors hover:underline">
                Privacy Policy
              </a>
              <a href="#terms" className="text-background/80 hover:text-background transition-colors hover:underline">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
