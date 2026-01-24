'use client';

import { useState, useEffect } from 'react';

export type PingStatus = 'live' | 'unknown';

interface ImagePingState {
  status: PingStatus;
  isLoading: boolean;
}

const TIMEOUT = 5000; // 5 seconds

/**
 * useImagePing - Client-side health check via image loading
 *
 * Attempts to load the site's favicon to detect if it's reachable.
 * No server-side API needed, no SSRF risk.
 *
 * Returns:
 * - 'live' if the favicon loads successfully
 * - 'unknown' if loading fails, times out, or is blocked by CORS
 *
 * @param url - The URL to check
 * @param enabled - Whether checking is enabled (default: true)
 */
export function useImagePing(
  url: string,
  enabled: boolean = true,
): ImagePingState {
  const [state, setState] = useState<ImagePingState>({
    status: 'unknown',
    isLoading: enabled,
  });

  useEffect(() => {
    if (!enabled || !url) {
      setState({ status: 'unknown', isLoading: false });
      return;
    }

    const img = new Image();
    const timeoutId = setTimeout(() => {
      img.src = ''; // Cancel loading
      setState({ status: 'unknown', isLoading: false });
    }, TIMEOUT);

    img.onload = () => {
      clearTimeout(timeoutId);
      setState({ status: 'live', isLoading: false });
    };

    img.onerror = () => {
      clearTimeout(timeoutId);
      setState({ status: 'unknown', isLoading: false });
    };

    // Try to load favicon
    try {
      const urlObj = new URL(url);
      img.src = `${urlObj.origin}/favicon.ico`;
    } catch {
      setState({ status: 'unknown', isLoading: false });
    }

    return () => {
      clearTimeout(timeoutId);
      img.src = '';
    };
  }, [url, enabled]);

  return state;
}
