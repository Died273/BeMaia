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
  const [menuOpen, setMenuOpen] = useState(false);

  // scale nav link by 1.15 on hover/focus for a subtle emphasis
  const handleScaleUp = (e: React.MouseEvent<HTMLElement> | React.FocusEvent<HTMLElement>) => {
    const el = e.currentTarget as HTMLElement;
    el.style.transition = 'transform 150ms ease';
    el.style.transform = 'scale(1.15)';
  };

  const handleScaleDown = (e: React.MouseEvent<HTMLElement> | React.FocusEvent<HTMLElement>) => {
    const el = e.currentTarget as HTMLElement;
    el.style.transition = 'transform 150ms ease';
    el.style.transform = '';
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // close mobile menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    if (menuOpen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

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
          <div className="hidden md:flex flex-wrap gap-x-6 items-center">
            <Link
              to="/team"
              className={`font-medium text-sm sm:text-base transition-colors
                ${location.pathname === "/team" ? "text-secondary" : "text-foreground hover:text-primary"}
              `}
              onMouseEnter={handleScaleUp}
              onMouseLeave={handleScaleDown}
              onFocus={handleScaleUp}
              onBlur={handleScaleDown}
            >
              Our Team
            </Link>
            <Link
              to="/questionnaire"
              className={`font-medium text-sm sm:text-base transition-colors
                ${location.pathname === "/questionnaire" ? "text-secondary" : "text-foreground hover:text-primary"}
              `}
              onMouseEnter={handleScaleUp}
              onMouseLeave={handleScaleDown}
              onFocus={handleScaleUp}
              onBlur={handleScaleDown}
            >
              Questionnaire
            </Link>
            <Link
              to="/pricing"
              className={`font-medium text-sm sm:text-base transition-colors
                ${location.pathname === "/pricing" ? "text-secondary" : "text-foreground hover:text-primary"}
              `}
              onMouseEnter={handleScaleUp}
              onMouseLeave={handleScaleDown}
              onFocus={handleScaleUp}
              onBlur={handleScaleDown}
            >
              Pricing
            </Link>
            <Button variant="hero" size="sm" className="text-white" onClick={() => openModal('info@bemaia.nl')}>
              Contact
            </Button>
          </div>

          {/* Mobile: Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-md border border-primary/10 bg-primary"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {menuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <>
                    <path d="M3 12h18" />
                    <path d="M3 6h18" />
                    <path d="M3 18h18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile menu panel */}
        {menuOpen && (
          <div className="md:hidden mt-3 px-4 pb-4">
            <div className="backdrop-blur rounded-xl p-4 border border-primary">
              <div className="flex flex-col gap-3">
                <Link
                  to="/team"
                  onClick={() => setMenuOpen(false)}
                  className="font-medium text-base text-primary"
                >
                  Our Team
                </Link>
                <Link
                  to="/questionnaire"
                  onClick={() => setMenuOpen(false)}
                  className="font-medium text-base text-primary"
                >
                  Questionnaire
                </Link>
                <Link
                  to="/pricing"
                  onClick={() => setMenuOpen(false)}
                  className="font-medium text-base text-primary"
                >
                  Pricing
                </Link>
                <Button variant="hero" size="sm" className="text-white mt-2" onClick={() => { openModal('info@bemaia.nl'); setMenuOpen(false); }}>
                  Contact
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
