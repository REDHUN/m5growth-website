'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function ScrollProgress() {
  const progRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prog = progRef.current;
    if (!prog) return;

    const onScroll = () => {
      const scrollY = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
      gsap.set(prog, { scaleX: progress });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return <div ref={progRef} className="scroll-progress" id="scrollProg" aria-hidden="true" />;
}
