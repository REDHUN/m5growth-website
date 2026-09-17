'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.body.classList.add('is-loading');

    const finish = () => {
      document.body.classList.remove('is-loading');
      setMounted(false);
      if (onComplete) onComplete();
    };

    if (prefersReducedMotion) {
      finish();
      return;
    }

    const obj = { val: 0 };
    const num = numRef.current;
    const bar = barRef.current;
    const preloader = preloaderRef.current;

    const tl = gsap.timeline();

    tl.to(obj, {
      val: 100,
      duration: 1.4,
      ease: 'power2.inOut',
      onUpdate() {
        if (num) num.textContent = String(Math.round(obj.val)).padStart(3, '0');
        if (bar) bar.style.transform = `scaleX(${obj.val / 100})`;
      },
    })
      .to(preloader, {
        yPercent: -100,
        duration: 0.9,
        ease: 'expo.inOut',
      }, '+=0.1')
      .add(() => {
        finish();
      });

    return () => {
      tl.kill();
      document.body.classList.remove('is-loading');
    };
  }, [onComplete]);

  if (!mounted) return null;

  return (
    <div ref={preloaderRef} className="preloader" aria-hidden="true">
      <div className="pre-logo">
        <div className="pre-logo-badge">
          <Image
            src="/logo.png"
            alt="M5 Growth Logo"
            width={40}
            height={40}
            priority
            className="pre-logo-img"
          />
        </div>
        <span className="pre-logo-text display">
          M5<sup>®</sup>
        </span>
      </div>
      <div className="pre-label label">Compounding results…</div>
      <div ref={numRef} className="pre-num display">
        000
      </div>
      <div ref={barRef} className="pre-bar" />
    </div>
  );
}
