'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface ToastProps {
  message: string | null;
  onClear: () => void;
}

export default function Toast({ message, onClear }: ToastProps) {
  const toastRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const el = toastRef.current;
    if (!el) return;

    if (message) {
      if (timerRef.current) clearTimeout(timerRef.current);

      gsap.timeline()
        .to(el, { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out' })
        .to(el, { y: 16, opacity: 0, duration: 0.4, ease: 'power2.in' }, '+=3.2')
        .add(() => {
          onClear();
        });
    } else {
      gsap.set(el, { y: 16, opacity: 0 });
    }
  }, [message, onClear]);

  return (
    <div ref={toastRef} className="toast" role="status" aria-live="polite">
      <span className="t-dot" />
      <span className="toast-txt">{message || ''}</span>
    </div>
  );
}
