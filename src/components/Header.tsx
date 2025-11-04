import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, Link, useLocation } from "react-router-dom";
import BeMaiaLogo from "@/assets/logo.svg";
import { useContactModal } from '@/contexts/ContactModalContext';
import { supabase } from '@/lib/supabase';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { openModal } = useContactModal();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if user is logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setIsLoggedIn(!!user);
    };
    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session?.user);
    });

    return () => subscription.unsubscribe();
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
    <header className="fixed top-0 left-0 right-0 z-50 w-full">
      <div
        className={`transition-all duration-300
          ${scrolled
            ? "bg-white/40 border-white/20 backdrop-blur-xl shadow-2xl"
            : "bg-gradient-to-tr from-white/30 via-primary/10 to-white/20 border-white/10 backdrop-blur-md shadow-lg"
          }`}
      >
        <nav className="flex justify-between items-center h-24 px-6 sm:px-12 md:px-16 lg:px-24">
          {/* Logo */}
          <div
            role="button"
            tabIndex={0}
            aria-label="Go to homepage"
            onClick={handleLogoClick}
            onKeyDown={e => { if (e.key === 'Enter') handleLogoClick(); }}
            className="flex items-center space-x-2 group cursor-pointer flex-shrink-0"
          >
            <img
              src={BeMaiaLogo}
              alt="BeMaia Logo"
              className="w-18 h-14 cursor-pointer"
            />
          </div>

          {/* Navigation - Equal spacing between all items */}
          <div className="hidden md:flex items-center gap-12 lg:gap-16">
            <Link
              to="/team"
              className={`font-medium text-sm sm:text-base transition-colors
                ${location.pathname === "/team" ? "text-secondary" : "text-foreground hover:text-primary"}
              `}
            >
              Our Team
            </Link>
            <Link
              to="/questionnaire"
              className={`font-medium text-sm sm:text-base transition-colors
                ${location.pathname === "/questionnaire" ? "text-secondary" : "text-foreground hover:text-primary"}
              `}
              
            >
              Questionnaire
            </Link>
            <Link
              to="/pricing"
              className={`font-medium text-sm sm:text-base transition-colors
                ${location.pathname === "/pricing" ? "text-secondary" : "text-foreground hover:text-primary"}
              `}
  
            >
              Pricing
            </Link>
            <button
              onClick={() => openModal('info@bemaia.nl')}
              className={`font-medium text-sm sm:text-base transition-colors text-foreground hover:text-primary`}
            >
              Contact
            </button>
            <Button 
              variant="hero" 
              size="sm" 
              className="text-white" 
              onClick={() => navigate(isLoggedIn ? '/profile' : '/login')}
            >
              {isLoggedIn ? 'Profile' : 'Login'}
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
          <div className="md:hidden px-6 pb-6">
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
                <button
                  onClick={() => { openModal('info@bemaia.nl'); setMenuOpen(false); }}
                  className="font-medium text-base text-primary text-left"
                >
                  Contact
                </button>
                <Button 
                  variant="hero" 
                  size="sm" 
                  className="text-white mt-2" 
                  onClick={() => { navigate(isLoggedIn ? '/profile' : '/login'); setMenuOpen(false); }}
                >
                  {isLoggedIn ? 'Profile' : 'Login'}
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