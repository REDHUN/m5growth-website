'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface QuoteItem {
  id: number;
  text: string;
  highlight: string;
  suffix: string;
  name: string;
  role: string;
}

const quotesData: QuoteItem[] = [
  {
    id: 1,
    text: 'M5 took us from side project to ',
    highlight: 'category leader',
    suffix: ' in fourteen months. No fluff — just numbers.',
    name: 'Maya Chen',
    role: 'CEO, Halcyon Skincare',
  },
  {
    id: 2,
    text: "The rare agency that argues with you when you're wrong. Our ROAS doubled and the brand ",
    highlight: 'finally feels like us.',
    suffix: '',
    name: 'Jonas Weber',
    role: 'CMO, Volt Mobility',
  },
  {
    id: 3,
    text: 'Every campaign felt hand-made, because it was. The ',
    highlight: 'best growth partner',
    suffix: " we've ever worked with.",
    name: 'Sofia Marques',
    role: 'Founder, Casa Verde',
  },
];

export default function Quotes() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const barTweenRef = useRef<gsap.core.Tween | null>(null);
  const isAnimatingRef = useRef(false);
  const currentIndexRef = useRef(0);

  // Keep currentIndexRef synced
  currentIndexRef.current = currentIndex;

  const goToSlide = useCallback((nextIndex: number, dir: number) => {
    const stage = stageRef.current;
    if (!stage || isAnimatingRef.current) return;

    const currentIdx = currentIndexRef.current;
    if (currentIdx === nextIndex) return;

    const slides = stage.querySelectorAll<HTMLDivElement>('.quote-slide');
    const prevSlide = slides[currentIdx];
    const nextSlide = slides[nextIndex];

    if (!prevSlide || !nextSlide) return;

    isAnimatingRef.current = true;
    barTweenRef.current?.kill();

    // Update index for count display
    setCurrentIndex(nextIndex);

    // Timeline for smooth slide transition
    const tl = gsap.timeline({
      onComplete: () => {
        isAnimatingRef.current = false;
      },
    });

    // Smoothly animate stage height if slide heights differ
    tl.to(
      stage,
      {
        height: nextSlide.offsetHeight,
        duration: 0.45,
        ease: 'power3.out',
      },
      0
    );

    // Animate previous slide out
    tl.to(
      prevSlide,
      {
        opacity: 0,
        y: -28 * dir,
        duration: 0.35,
        ease: 'power2.in',
        pointerEvents: 'none',
      },
      0
    );

    // Animate next slide in
    tl.fromTo(
      nextSlide,
      {
        opacity: 0,
        y: 28 * dir,
        pointerEvents: 'none',
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power3.out',
        pointerEvents: 'auto',
      },
      0.12
    );
  }, []);

  const nextSlide = useCallback(() => {
    const next = (currentIndexRef.current + 1) % quotesData.length;
    goToSlide(next, 1);
  }, [goToSlide]);

  const prevSlide = useCallback(() => {
    const prev = (currentIndexRef.current - 1 + quotesData.length) % quotesData.length;
    goToSlide(prev, -1);
  }, [goToSlide]);

  // Initial stage & slide positioning (runs once on mount)
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const slides = stage.querySelectorAll<HTMLDivElement>('.quote-slide');
    slides.forEach((slide, idx) => {
      if (idx === 0) {
        gsap.set(slide, { opacity: 1, y: 0, pointerEvents: 'auto' });
      } else {
        gsap.set(slide, { opacity: 0, y: 28, pointerEvents: 'none' });
      }
    });

    if (slides[0]) {
      stage.style.height = `${slides[0].offsetHeight}px`;
    }

    const handleResize = () => {
      const activeSlide = slides[currentIndexRef.current];
      if (activeSlide && stage) {
        stage.style.height = `${activeSlide.offsetHeight}px`;
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Autoplay progress bar (restarts on index change)
  useEffect(() => {
    const bar = barRef.current;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (bar && !prefersReducedMotion) {
      barTweenRef.current?.kill();
      gsap.set(bar, { scaleX: 0 });

      barTweenRef.current = gsap.to(bar, {
        scaleX: 1,
        duration: 6,
        ease: 'none',
        delay: 0.2,
        onComplete: () => {
          nextSlide();
        },
      });
    }

    return () => {
      barTweenRef.current?.kill();
    };
  }, [currentIndex, nextSlide]);

  return (
    <section className="quotes" aria-label="Client Testimonials">
      <div className="wrap">
        <span className="sec-label">04 — Word on the street</span>

        <div
          className="quote-stage"
          ref={stageRef}
          onMouseEnter={() => barTweenRef.current?.pause()}
          onMouseLeave={() => barTweenRef.current?.resume()}
        >
          {quotesData.map((q, idx) => (
            <div
              key={q.id}
              className="quote-slide"
              aria-hidden={idx !== currentIndex}
            >
              <blockquote className="quote-text">
                {q.text}
                <em>{q.highlight}</em>
                {q.suffix}
              </blockquote>
              <div className="quote-author">
                <span className="q-name">{q.name}</span>
                <span className="q-role label">{q.role}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="quote-nav">
          <button
            className="q-btn"
            id="qPrev"
            aria-label="Previous client testimonial"
            onClick={prevSlide}
          >
            <ArrowLeft size={18} />
          </button>

          <div className="q-progress">
            <span ref={barRef} className="q-bar" id="qBar" />
          </div>

          <span className="q-count">
            <span id="qCur">{String(currentIndex + 1).padStart(2, '0')}</span> / 0
            {quotesData.length}
          </span>

          <button
            className="q-btn"
            id="qNext"
            aria-label="Next client testimonial"
            onClick={nextSlide}
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
