import { useEffect, useState } from 'react';

export default function createBreakpoint<T extends Record<string, number>>(
  breakpoints: T,
): () => keyof T {
  return function () {
    const [breakpoint, setBreakpoint] = useState<keyof T>('');
    useEffect(() => {
      function updateBreakpoint(): keyof T {
        const keys = Object.keys(breakpoints);
        keys.sort((x, y) => breakpoints[y] - breakpoints[x]);
        const width = window.innerWidth;
        for (const key of keys) {
          if (width >= breakpoints[key]) {
            setBreakpoint(key);
            return key;
          }
        }
        return keys[0];
      }
      updateBreakpoint();
      window.addEventListener('resize', updateBreakpoint);

      return () => window.removeEventListener('resize', updateBreakpoint);
    }, []);

    return breakpoint;
  };
}

export const useBreakpoint = createBreakpoint({
  mobile: 0,
  tablet: 768,
  desktop: 1024,
});
