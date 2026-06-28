import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import ThemeToggle from '../ui/ThemeToggle';
import { ThemeMode } from '../../types/theme';
import { NAV_LINKS } from '../../constants/content';
import './Navbar.css';

interface NavbarProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ theme, onToggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        <a className="navbar__brand" href="#top" onClick={() => setMenuOpen(false)}>
          <span className="navbar__cheese">🧀</span>
          <span className="navbar__name">cheese-retry</span>
        </a>

        <nav className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              className="navbar__link"
              onClick={() => handleNavClick(link.href)}
            >
              {link.label}
            </button>
          ))}
          <a
            className="navbar__cta"
            href="https://github.com/sayanth-ranjith/cheese-retry"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub ↗
          </a>
        </nav>

        <div className="navbar__actions">
          <ThemeToggle mode={theme} onToggle={onToggleTheme} />
          <button
            className="navbar__burger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="navbar__mobile-menu">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              className="navbar__mobile-link"
              onClick={() => handleNavClick(link.href)}
            >
              {link.label}
            </button>
          ))}
          <a
            className="navbar__mobile-cta"
            href="https://github.com/sayanth-ranjith/cheese-retry"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub ↗
          </a>
        </div>
      )}
    </header>
  );
};

export default Navbar;
