'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Menu from './Menu';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 40);

      if (currentScrollY > 160 && currentScrollY > lastScrollY.current + 4) {
        setIsHidden(true);
      } else if (currentScrollY < lastScrollY.current - 4) {
        setIsHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const target = document.querySelector(href);
    if (!target) return;

    if (window.__lenis) {
      window.__lenis.scrollTo(target as HTMLElement, { offset: -70, duration: 1.2 });
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollToSection(href);
  };

  return (
    <>
      <header
        className={`nav ${isScrolled ? 'scrolled' : ''} ${isHidden && !menuOpen ? 'hidden' : ''}`}
        id="nav"
      >
        <div className="wrap nav-in">
          <Link
            href="#top"
            onClick={(e) => handleNavClick(e, '#top')}
            className="logo"
            aria-label="M5 Digital Growth Home"
          >
            <span className="logo-badge">
              <Image
                src="/logo.png"
                alt="M5 Growth Logo"
                width={36}
                height={36}
                priority
                className="logo-img"
              />
            </span>
            <span className="logo-text-group">
              <span className="logo-main display">M5<sup>®</sup></span>
              <span className="logo-sub">Digital Growth</span>
            </span>
          </Link>

          <nav className="nav-links" aria-label="Primary Navigation">
            <a
              className="nav-link roll-hover"
              href="#studio"
              onClick={(e) => handleNavClick(e, '#studio')}
            >
              <span data-text="Studio">Studio</span>
            </a>
            <a
              className="nav-link roll-hover"
              href="#services"
              onClick={(e) => handleNavClick(e, '#services')}
            >
              <span data-text="Services">Services</span>
            </a>
            <a
              className="nav-link roll-hover"
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
            >
              <span data-text="Get In Touch">Get In Touch</span>
            </a>
          </nav>

          <div className="nav-right">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="btn btn-ink nav-cta"
            >
              <span className="roll">
                <span>Start a project</span>
                <span>Start a project</span>
              </span>
            </a>

            <button
              className={`burger ${menuOpen ? 'active' : ''}`}
              id="burger"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <Menu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        onNavigate={scrollToSection}
      />
    </>
  );
}
