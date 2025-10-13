import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, Link, useLocation } from "react-router-dom";
import BeMaiaLogo from "@/assets/logo.svg";
import { useContactModal } from '@/contexts/ContactModalContext';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { openModal } = useContactModal();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoClick = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-2 sm:px-4 md:px-8">
      <div
        className={`transition-all duration-300 rounded-3xl border
          ${scrolled
            ? "bg-white/40 border-white/20 backdrop-blur-xl shadow-2xl"
            : "bg-gradient-to-tr from-white/30 via-primary/10 to-white/20 border-white/10 backdrop-blur-md shadow-lg"
          }`}
      >
        <nav className="flex justify-between items-center h-16 px-2 sm:px-6">
          {/* Logo */}
          <div
            role="button"
            tabIndex={0}
            aria-label="Go to homepage"
            onClick={handleLogoClick}
            onKeyDown={e => { if (e.key === 'Enter') handleLogoClick(); }}
            className="flex items-center space-x-2 group cursor-pointer"
          >
            <img
              src={BeMaiaLogo}
              alt="BeMaia Logo"
              className="w-18 h-14 transition-transform duration-200 hover:scale-150 cursor-pointer"
            />
          </div>

          {/* Navigation */}
          <div className="flex flex-wrap gap-x-6 items-center">
            <Link
              to="/team"
              className={`font-medium text-sm sm:text-base transition-colors
                ${location.pathname === "/team" ? "text-primary" : "text-foreground hover:text-primary"}
              `}
            >
              Our Team
            </Link>
            <Link
              to="/features"
              className={`font-medium text-sm sm:text-base transition-colors
                ${location.pathname === "/features" ? "text-primary" : "text-foreground hover:text-primary"}
              `}
            >
              Features
            </Link>
            <Link
              to="/pricing"
              className={`font-medium text-sm sm:text-base transition-colors
                ${location.pathname === "/pricing" ? "text-primary" : "text-foreground hover:text-primary"}
              `}
            >
              Pricing
            </Link>
            <Button variant="hero" size="sm" className="text-white" onClick={() => openModal('info@bemaia.nl')}>
              Contact
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
