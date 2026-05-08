import { cn } from '@/src/utils';
import { useId } from 'react';

export type CircularTextOptions = {
  width?: number;
  height?: number;
  fontSize?: number;
  spin?: boolean;
};

type CircularTextProps = {
  text: string;
  options: CircularTextOptions;
};

export const BOOK_CIRCLE_STYLE: CircularTextOptions = {
  width: 650,
  height: 650,
  fontSize: 48,
};

export const BOOK_CIRCLE_MOBILE_STYLE: CircularTextOptions = {
  width: 325,
  height: 325,
  fontSize: 16,
};

export const MOBILE_CIRCLE_STYLE: CircularTextOptions = {
  width: 450,
  height: 450,
  fontSize: 16,
};

export const DESKTOP_CIRCLE_STYLE: CircularTextOptions = {
  width: 900,
  height: 900,
  fontSize: 40,
};

export default function CircularText({ text, options }: CircularTextProps) {
  const id = useId();
  const pathId = `circle-path-${id}`;
  const { width = 300, height = 300, fontSize = 14, spin = true } = options;
  const cx = width / 2;
  const cy = height / 2;
  const radius = Math.min(width, height) / 2 - fontSize; // padding so text isn't clipped

  const path = `M ${cx},${cy} m -${radius},0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      className={cn('fill-white font-bold uppercase', {
        'animate-spin [animation-duration:50s] linear infinite': spin,
      })}
    >
      <defs>
        <path id={pathId} d={path} />
      </defs>
      <text fontSize={fontSize}>
        <textPath href={`#${pathId}`}>{text}</textPath>
      </text>
    </svg>
  );
}
