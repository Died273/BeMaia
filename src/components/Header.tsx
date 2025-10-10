import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate(); 

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
          ${
            scrolled
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
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <span className="text-white font-bold text-sm sm:text-base">BM</span>
            </div>
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              BeMaia
            </span>
          </div>

          {/* Navigation */}
          <div className="flex flex-wrap gap-x-6 items-center">
            <Link to="/team" className="text-foreground hover:text-primary transition-colors font-medium text-sm sm:text-base">Our Team</Link>
            <Link to="/features" className="text-foreground hover:text-primary transition-colors font-medium text-sm sm:text-base">Features</Link>
            <Button variant="hero" size="sm" className="text-white">
              Contact
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
