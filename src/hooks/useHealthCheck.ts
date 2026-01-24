'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import type { HealthStatus } from '@/src/app/api/health-check/route';

interface HealthCheckState {
  status: HealthStatus;
  isLoading: boolean;
  responseTime?: number;
  lastChecked?: Date;
}

// Cache for health check results (shared across all instances)
const healthCache = new Map<
  string,
  { status: HealthStatus; responseTime?: number; timestamp: number }
>();

// Default cache duration: 5 minutes
const CACHE_DURATION = 5 * 60 * 1000;

/**
 * useHealthCheck - Custom hook for checking website health status
 *
 * Features:
 * - Caches results for 5 minutes to avoid excessive requests
 * - Shared cache across all component instances
 * - Handles loading, error, and success states
 *
 * @param url - The URL to check health for
 * @param enabled - Whether health checking is enabled (default: true)
 */
export function useHealthCheck(
  url: string,
  enabled: boolean = true,
): HealthCheckState {
  const [state, setState] = useState<HealthCheckState>({
    status: 'unknown',
    isLoading: enabled,
  });

  const mountedRef = useRef(true);

  const checkHealth = useCallback(async () => {
    if (!enabled || !url) {
      setState({ status: 'unknown', isLoading: false });
      return;
    }

    // Check cache first
    const cached = healthCache.get(url);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      setState({
        status: cached.status,
        isLoading: false,
        responseTime: cached.responseTime,
        lastChecked: new Date(cached.timestamp),
      });
      return;
    }

    // Set loading state
    setState((prev) => ({ ...prev, isLoading: true }));

    try {
      const response = await fetch(
        `/api/health-check?url=${encodeURIComponent(url)}`,
      );

      if (!mountedRef.current) return;

      if (!response.ok) {
        setState({
          status: 'unknown',
          isLoading: false,
        });
        return;
      }

      const data = await response.json();

      // Update cache
      healthCache.set(url, {
        status: data.status,
        responseTime: data.responseTime,
        timestamp: Date.now(),
      });

      setState({
        status: data.status,
        isLoading: false,
        responseTime: data.responseTime,
        lastChecked: new Date(),
      });
    } catch {
      if (!mountedRef.current) return;

      setState({
        status: 'unknown',
        isLoading: false,
      });
    }
  }, [url, enabled]);

  useEffect(() => {
    mountedRef.current = true;
    checkHealth();

    return () => {
      mountedRef.current = false;
    };
  }, [checkHealth]);

  return state;
}
