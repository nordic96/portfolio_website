import { cn } from '@/src/utils';
import { useId } from 'react';

type CircularTextOptions = {
  width?: number;
  height?: number;
  fontSize?: number;
  spin?: boolean;
};

type CircularTextProps = {
  text: string;
  options: CircularTextOptions;
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
