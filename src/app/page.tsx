'use client';

import { useState, useCallback } from 'react';
import SmoothScroll from '@/components/SmoothScroll';
import NoiseGrain from '@/components/NoiseGrain';
import CustomCursor from '@/components/CustomCursor';
import ScrollProgress from '@/components/ScrollProgress';
import Preloader from '@/components/Preloader';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import Manifesto from '@/components/Manifesto';
import Services from '@/components/Services';
import Stats from '@/components/Stats';
import Quotes from '@/components/Quotes';
import CtaSection from '@/components/CtaSection';
import Footer from '@/components/Footer';
import Toast from '@/components/Toast';

export default function Home() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleShowToast = useCallback((msg: string) => {
    setToastMessage(msg);
  }, []);

  const handleClearToast = useCallback(() => {
    setToastMessage(null);
  }, []);

  return (
    <SmoothScroll>
      <NoiseGrain />
      <CustomCursor />
      <ScrollProgress />
      <Preloader />

      <Navigation />

      <main>
        <Hero />
        <Marquee />
        <Manifesto />
        <Services />
        <Stats />
        <Quotes />
        <CtaSection onShowToast={handleShowToast} />
      </main>

      <Footer />

      <Toast message={toastMessage} onClear={handleClearToast} />
    </SmoothScroll>
  );
}
