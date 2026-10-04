import { Link, useNavigate } from 'react-router-dom';
import { useState, useCallback } from 'react';

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const scrollToSection = useCallback((id: string) => {
    // If we're not on the home page, navigate there first, then scroll
    if (window.location.pathname !== '/') {
      navigate('/');
      // Wait for the landing page to render, then scroll
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        });
      });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [navigate]);

  const goHome = useCallback(() => {
    if (window.location.pathname !== '/') {
      navigate('/');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [navigate]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
              <span className="text-white font-bold text-sm font-heading">D1</span>
            </div>
            <span className="text-lg font-semibold text-foreground font-heading">
              Day One
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={goHome}
              className="text-sm text-foreground/70 hover:text-foreground transition-colors duration-200 cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-sm text-foreground/70 hover:text-foreground transition-colors duration-200 cursor-pointer"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection('pipeline')}
              className="text-sm text-foreground/70 hover:text-foreground transition-colors duration-200 cursor-pointer"
            >
              Boardroom
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground/70 hover:text-foreground"
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-border/50 pt-4">
            <div className="flex flex-col gap-3">
              <button
                onClick={() => { goHome(); setIsOpen(false); }}
                className="text-sm text-foreground/70 hover:text-foreground transition-colors cursor-pointer text-left"
              >
                Home
              </button>
              <button
                onClick={() => { scrollToSection('how-it-works'); setIsOpen(false); }}
                className="text-sm text-foreground/70 hover:text-foreground transition-colors cursor-pointer text-left"
              >
                How It Works
              </button>
              <button
                onClick={() => { scrollToSection('pipeline'); setIsOpen(false); }}
                className="text-sm text-foreground/70 hover:text-foreground transition-colors cursor-pointer text-left"
              >
                Boardroom
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
