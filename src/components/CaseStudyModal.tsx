'use client';

import { useEffect } from 'react';
import { X, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

export interface CaseStudyData {
  id: string;
  idx: string;
  category: string;
  year: string;
  title: string;
  headlineResult: string;
  fullDesc: string;
  img: string;
  metrics: {
    label: string;
    value: string;
  }[];
  services: string[];
}

interface CaseStudyModalProps {
  study: CaseStudyData | null;
  onClose: () => void;
  onInquire: () => void;
}

export default function CaseStudyModal({ study, onClose, onInquire }: CaseStudyModalProps) {
  useEffect(() => {
    if (study) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('modal-open');
    };
  }, [study, onClose]);

  if (!study) return null;

  return (
    <div
      className={`modal-overlay ${study ? 'active' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal-card">
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close Case Study"
        >
          <X size={20} />
        </button>

        <span className="modal-badge">
          {study.category} · {study.year}
        </span>

        <h3 className="modal-title display" id="modal-title">
          {study.title}
        </h3>

        <p className="modal-desc">{study.fullDesc}</p>

        <div className="modal-metrics">
          {study.metrics.map((m, i) => (
            <div key={i}>
              <span className="modal-metric-val">{m.value}</span>
              <span className="modal-metric-lbl">{m.label}</span>
            </div>
          ))}
        </div>

        <div style={{ position: 'relative', height: '320px', borderRadius: '12px', overflow: 'hidden', marginBottom: '28px' }}>
          <Image
            src={study.img}
            alt={study.title}
            fill
            style={{ objectFit: 'cover' }}
            unoptimized
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div className="svc-tags">
            {study.services.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </div>

          <button
            className="btn btn-accent"
            onClick={() => {
              onClose();
              onInquire();
            }}
          >
            <span className="roll">
              <span>Discuss similar results</span>
              <span>Discuss similar results</span>
            </span>
            <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
