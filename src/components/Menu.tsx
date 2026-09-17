'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (href: string) => void;
}

export default function Menu({ isOpen, onClose, onNavigate }: MenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    const items = menu.querySelectorAll('.m-in');
    const foot = menu.querySelector('.menu-foot');

    const tl = gsap.timeline({ paused: true });
    tl.set(menu, { display: 'flex' })
      .fromTo(
        menu,
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 0.65, ease: 'expo.inOut' }
      )
      .fromTo(
        items,
        { yPercent: 130 },
        { yPercent: 0, duration: 0.65, stagger: 0.05, ease: 'expo.out' },
        '-=0.2'
      )
      .fromTo(foot, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.3');

    tlRef.current = tl;

    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    const tl = tlRef.current;
    if (!tl) return;

    if (isOpen) {
      document.body.classList.add('menu-open');
      tl.timeScale(1).play();
    } else {
      document.body.classList.remove('menu-open');
      tl.timeScale(1.5).reverse();
    }
  }, [isOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    onClose();
    setTimeout(() => {
      onNavigate(href);
    }, 450);
  };

  return (
    <div ref={menuRef} className="menu" id="menu" aria-hidden={!isOpen}>
      <div className="menu-in">
        <nav className="menu-links" aria-label="Fullscreen Navigation">
          <a
            className="m-item"
            href="#studio"
            onClick={(e) => handleLinkClick(e, '#studio')}
          >
            <span className="m-in">
              <span className="m-idx">01</span>
              <span className="m-txt display">Studio</span>
            </span>
          </a>
          <a
            className="m-item"
            href="#services"
            onClick={(e) => handleLinkClick(e, '#services')}
          >
            <span className="m-in">
              <span className="m-idx">02</span>
              <span className="m-txt display">Services</span>
            </span>
          </a>
          <a
            className="m-item"
            href="#contact"
            onClick={(e) => handleLinkClick(e, '#contact')}
          >
            <span className="m-in">
              <span className="m-idx">03</span>
              <span className="m-txt display">Get In Touch</span>
            </span>
          </a>
        </nav>
        <div className="menu-foot">
          <div className="menu-socials">
            <a
              href="https://www.instagram.com/m5_growth?stkn=MWN1ZXM2amN4MnhqZA%3D%3D&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer">
              X (Twitter)
            </a>
          </div>
          <a
            href="mailto:hello@m5digitalgrowth.com"
            className="label"
            style={{ color: 'rgba(11,11,11,0.7)', textTransform: 'none' }}
          >
            hello@m5digitalgrowth.com
          </a>
        </div>
      </div>
    </div>
  );
}
