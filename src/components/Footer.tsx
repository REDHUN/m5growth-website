'use client';

import { useEffect, useState } from 'react';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const [indiaTime, setIndiaTime] = useState('00:00:00');
  const [dubaiTime, setDubaiTime] = useState('00:00:00');

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      setIndiaTime(
        now.toLocaleTimeString('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour12: false,
        })
      );
      setDubaiTime(
        now.toLocaleTimeString('en-GB', {
          timeZone: 'Asia/Dubai',
          hour12: false,
        })
      );
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleScrollToTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.4 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.querySelector(id);
    if (!target) return;
    if (window.__lenis) {
      window.__lenis.scrollTo(target as HTMLElement, { offset: -70, duration: 1.2 });
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer" role="contentinfo">
      <div className="wrap footer-top">
        <div className="f-col">
          <div className="f-brand">
            <div className="f-logo-badge">
              <Image
                src="/logo.png"
                alt="M5 Growth Logo"
                width={40}
                height={40}
                className="f-logo-img"
              />
            </div>
            <span className="f-brand-title display">M5 GROWTH<sup>®</sup></span>
          </div>
          <p className="f-tag">
            Digital growth studio for brands that <em>refuse to plateau.</em>
          </p>
          <div className="f-clock label">
            <span>IST (Kerala) — {indiaTime}</span>
            <span>DXB (Dubai) — {dubaiTime}</span>
          </div>
        </div>

        <div className="f-col">
          <span className="label">Navigation</span>
          <ul>
            <li>
              <Link href="#studio" onClick={(e) => handleAnchorClick(e, '#studio')}>
                Studio
              </Link>
            </li>
            <li>
              <Link href="#services" onClick={(e) => handleAnchorClick(e, '#services')}>
                Services
              </Link>
            </li>
            <li>
              <Link href="#contact" onClick={(e) => handleAnchorClick(e, '#contact')}>
                Get In Touch
              </Link>
            </li>
          </ul>
        </div>

        <div className="f-col">
          <span className="label">Socials</span>
          <ul>
            <li>
              <a
                href="https://www.instagram.com/m5_growth?stkn=MWN1ZXM2amN4MnhqZA%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram <ArrowUpRight size={13} />
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn <ArrowUpRight size={13} />
              </a>
            </li>
            <li>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                X <ArrowUpRight size={13} />
              </a>
            </li>
            <li>
              <a
                href="https://dribbble.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Dribbble <ArrowUpRight size={13} />
              </a>
            </li>
          </ul>
        </div>

        <div className="f-col">
          <span className="label">Headquarters</span>
          <address>
            Muhamma, Alappuzha
            <br />
            Kerala, India
            <br />
            <br />
            Global Client Support
            <br />
            India · UAE · International
          </address>
        </div>
      </div>

      <div className="wrap footer-bottom">
        <span className="label">© 2026 M5 Digital Growth — All rights reserved</span>
        <button className="to-top" id="toTop" onClick={handleScrollToTop}>
          Back to top <ArrowUp size={15} />
        </button>
      </div>

      <div className="footer-mark display" aria-hidden="true">
        M5<sup>®</sup>
      </div>
    </footer>
  );
}
