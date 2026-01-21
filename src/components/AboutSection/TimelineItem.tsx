'use client';

interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  index: number;
  isVisible?: boolean;
}

export default function TimelineItem({
  year,
  title,
  description,
  index,
  isVisible = true,
}: TimelineItemProps) {
  return (
    <li
      className={`flex flex-row md:flex-col items-start md:items-center gap-4 md:gap-3 flex-1
                  transition-all duration-600 ease-out
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                  motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0`}
      style={{
        transitionDelay: isVisible ? `${index * 150}ms` : '0ms',
      }}
    >
      {/* Vertical line connector for mobile */}
      {index > 0 && (
        <div
          className="absolute left-8 top-0 w-0.5 h-full bg-gradient-to-b from-pastel-green to-pastel-green/20 md:hidden -z-10"
          aria-hidden="true"
        />
      )}

      {/* Year badge */}
      <time
        dateTime={year.split('-')[0]}
        className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-full
                   bg-gradient-to-br from-pastel-green to-pastel-green-hover
                   flex items-center justify-center
                   shadow-lg shadow-pastel-green/30
                   text-white font-bold text-sm md:text-base
                   transition-transform duration-300 hover:scale-110
                   motion-reduce:hover:scale-100"
      >
        {year}
      </time>

      {/* Content */}
      <div className="flex-1 md:text-center pb-8 md:pb-0">
        <h4 className="font-semibold text-base md:text-lg text-text-dark mb-1">
          {title}
        </h4>
        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
    </li>
  );
}
