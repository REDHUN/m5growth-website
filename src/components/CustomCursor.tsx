'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isFine = window.matchMedia('(pointer: fine)').matches;
    if (!isFine) return;

    document.body.classList.add('cursor-on');

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 });

    const dx = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3' });
    const dy = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3' });
    const rx = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3' });
    const ry = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3' });

    const onMouseMove = (e: MouseEvent) => {
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    };

    const onMouseLeave = () => {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };

    const attachHoverListeners = () => {
      const interactives = document.querySelectorAll('a, button, [data-cursor], .work-item, .hero-badge');
      interactives.forEach((el) => {
        el.addEventListener('mouseenter', () => {
          if (el.getAttribute('data-cursor') === 'view') {
            ring.classList.add('view');
          } else {
            ring.classList.add('grow');
          }
        });
        el.addEventListener('mouseleave', () => {
          ring.classList.remove('grow', 'view');
        });
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    const timer = setTimeout(attachHoverListeners, 400);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      clearTimeout(timer);
      document.body.classList.remove('cursor-on');
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" id="cDot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" id="cRing" aria-hidden="true">
        <span className="cursor-label">View</span>
      </div>
    </>
  );
}
