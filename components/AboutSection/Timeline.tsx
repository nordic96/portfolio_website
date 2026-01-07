'use client';

import { useEffect, useRef, useState } from 'react';
import TimelineItem from './TimelineItem';

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

interface TimelineProps {
  events: TimelineEvent[];
  title: string;
}

export default function Timeline({ events, title }: TimelineProps) {
  const [isVisible, setIsVisible] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    if (timelineRef.current) {
      observer.observe(timelineRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <article ref={timelineRef} className="mb-20">
      <h3 className="text-2xl md:text-3xl font-bold text-text-dark text-center mb-12">
        {title}
      </h3>

      <div className="relative">
        {/* Timeline container */}
        <ol
          className="relative flex flex-col md:flex-row md:justify-between gap-8 md:gap-4"
          aria-label="Career timeline"
        >
          {events.map((event, index) => (
            <TimelineItem
              key={event.year}
              year={event.year}
              title={event.title}
              description={event.description}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </ol>

        {/* Connecting line - horizontal on desktop */}
        <div
          className="absolute top-10 left-8 right-8 h-0.5
                     bg-gradient-to-r from-pastel-green/20 via-pastel-green to-pastel-green/20
                     hidden md:block -z-10 rounded-full"
          aria-hidden="true"
        />
      </div>
    </article>
  );
}
