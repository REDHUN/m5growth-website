'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowUpRight } from 'lucide-react';

interface CtaProps {
  onShowToast?: (msg: string) => void;
}

export default function CtaSection({ onShowToast }: CtaProps) {
  const btnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;

    const isFine = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isFine || prefersReducedMotion) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, { x: x * 0.4, y: y * 0.4, duration: 0.4, ease: 'power3' });
    };

    const onMouseLeave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.4)' });
    };

    btn.addEventListener('mousemove', onMouseMove);
    btn.addEventListener('mouseleave', onMouseLeave);

    return () => {
      btn.removeEventListener('mousemove', onMouseMove);
      btn.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    const email = 'hello@m5digitalgrowth.com';
    navigator.clipboard.writeText(email);
    if (onShowToast) {
      onShowToast('Copied hello@m5digitalgrowth.com to clipboard');
    }
  };

  return (
    <section className="cta" id="contact" aria-label="Get In Touch and Inquiries">
      <div className="cta-mq" aria-hidden="true">
        <div className="cta-mq-track">
          <span>
            Get in <em>touch</em> —
          </span>
          <span>
            Let&apos;s <em>grow</em> —
          </span>
          <span>
            Get in <em>touch</em> —
          </span>
          <span>
            Let&apos;s <em>grow</em> —
          </span>
        </div>
      </div>

      <div className="wrap cta-in">
        <span className="sec-label light" style={{ justifyContent: 'center' }}>
          05 — Next step
        </span>

        <h2 className="cta-title display">
          Ready to make growth your <em className="ital">default?</em>
        </h2>

        <a
          ref={btnRef}
          className="cta-btn"
          href="mailto:hello@m5digitalgrowth.com"
          aria-label="Send email to M5 Digital Growth"
        >
          <span className="cta-btn-in display">
            Get in touch <ArrowUpRight size={20} />
          </span>
        </a>

        <p className="cta-mail">
          Prefer email?
          <button
            type="button"
            className="link-arrow light"
            onClick={handleCopyEmail}
            title="Click to copy email address"
          >
            hello@m5digitalgrowth.com
          </button>
        </p>
      </div>
    </section>
  );
}
