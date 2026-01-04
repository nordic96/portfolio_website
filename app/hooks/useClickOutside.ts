import { RefObject, useEffect, useRef } from 'react';

export function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null>,
  handler: (event: MouseEvent | TouchEvent | FocusEvent) => void,
  eventType: 'mousedown' | 'touchstart' = 'mousedown',
  eventListenerOptions?: boolean | AddEventListenerOptions,
) {
  const handlerRef = useRef(handler);
  // eslint-disable-next-line react-hooks/refs
  handlerRef.current = handler;

  useEffect(() => {
    function listener(event: MouseEvent | TouchEvent | FocusEvent) {
      const target = event.target as Node;
      if (!target || !target.isConnected) {
        return;
      }

      const outside = ref.current && !ref.current.contains(target);
      if (!outside) return;

      handlerRef.current(event);
    }
    window.addEventListener(eventType, listener);
    return () =>
      window.removeEventListener(eventType, listener, eventListenerOptions);
  }, [eventListenerOptions, eventType, handler, ref]);
}
