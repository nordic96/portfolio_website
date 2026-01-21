'use client';

import { useTranslations } from 'next-intl';
import Timeline, { TimelineEvent } from './Timeline';
import PullQuote from './PullQuote';
import { useEffect, useRef, useState } from 'react';

export default function AboutSection() {
  const t = useTranslations('AboutSection');
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [isOpeningVisible, setIsOpeningVisible] = useState(false);
  const [isClosingVisible, setIsClosingVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const openingRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    const createObserver = (
      ref: React.RefObject<HTMLDivElement | null>,
      setVisible: (visible: boolean) => void,
    ) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        },
        { threshold: 0.2 },
      );

      if (ref.current) {
        observer.observe(ref.current);
        observers.push(observer);
      }
    };

    createObserver(headerRef, setIsHeaderVisible);
    createObserver(openingRef, setIsOpeningVisible);
    createObserver(closingRef, setIsClosingVisible);

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  // Timeline events from translations
  const timelineEvents: TimelineEvent[] = [
    {
      year: t('timeline.event1.year'),
      title: t('timeline.event1.title'),
      description: t('timeline.event1.description'),
    },
    {
      year: t('timeline.event2.year'),
      title: t('timeline.event2.title'),
      description: t('timeline.event2.description'),
    },
    {
      year: t('timeline.event3.year'),
      title: t('timeline.event3.title'),
      description: t('timeline.event3.description'),
    },
    {
      year: t('timeline.event4.year'),
      title: t('timeline.event4.title'),
      description: t('timeline.event4.description'),
    },
    {
      year: t('timeline.event5.year'),
      title: t('timeline.event5.title'),
      description: t('timeline.event5.description'),
    },
    {
      year: t('timeline.event6.year'),
      title: t('timeline.event6.title'),
      description: t('timeline.event6.description'),
    },
  ];

  return (
    <section
      id="about"
      className="relative bg-white py-24 md:py-32 px-6 md:px-12 w-full"
      aria-label={t('aria_label')}
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-700 ease-out
                      ${isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                      motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-text-dark mb-4">
            {t('title')}
          </h2>
          <p className="text-lg md:text-xl font-light text-gray-600">
            {t.rich('subtitle', {
              highlight: (chunks) => (
                <span className="text-pastel-green">{chunks}</span>
              ),
            })}
          </p>

          {/* Decorative divider */}
          <div
            className="mt-8 w-24 h-1 mx-auto
                       bg-gradient-to-r from-transparent via-pastel-green to-transparent
                       rounded-full"
            aria-hidden="true"
          />
        </div>

        {/* 1. Opening Hook */}
        <div
          ref={openingRef}
          className={`mb-20 transition-all duration-700 ease-out delay-200
                      ${isOpeningVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                      motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0`}
        >
          <div className="flex flex-col md:flex-row gap-8 items-center">
            {/* Profile photo placeholder */}
            <div
              className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden flex-shrink-0
                         ring-4 ring-pastel-green shadow-xl shadow-pastel-green/20 bg-gray-100"
              aria-hidden="true"
            />

            {/* Opening text */}
            <div className="flex-1 text-base md:text-lg leading-relaxed text-gray-700 text-center md:text-left">
              <p>{t('opening_hook')}</p>
            </div>
          </div>
        </div>

        {/* 2. Timeline Journey */}
        <Timeline events={timelineEvents} title={t('timeline.title')} />

        {/* 3. Learning Philosophy (Pull Quote) */}
        <PullQuote
          quote={t('philosophy.quote')}
          citation={t('philosophy.citation')}
        />

        {/* 4. What Drives Me */}
        <div
          ref={closingRef}
          className={`max-w-2xl mx-auto text-center transition-all duration-700 ease-out
                      ${isClosingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                      motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0`}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-text-dark mb-4">
            {t('drives_me.title')}
          </h3>
          <p className="text-base md:text-lg leading-relaxed text-gray-700">
            {t('drives_me.content')}
          </p>
        </div>
      </div>
    </section>
  );
}
