'use client';

import { useEffect, useState, useCallback } from 'react';

/**
 * Status types based on Singapore Time (UTC+8)
 *
 * Priority order (highest to lowest):
 * 1. eating - 12:00-13:00, 19:00-20:00
 * 2. sleeping - 00:00-07:00
 * 3. coding - 09:00-18:00
 * 4. break - all other hours
 */
export type StatusType = 'sleeping' | 'coding' | 'eating' | 'break';

interface StatusInfo {
  type: StatusType;
  label: string;
  emoji: string;
}

const STATUS_MAP: Record<StatusType, Omit<StatusInfo, 'type'>> = {
  sleeping: { label: 'Sleeping', emoji: '💤' },
  coding: { label: 'Coding', emoji: '💻' },
  eating: { label: 'Eating', emoji: '🍽️' },
  break: { label: 'Taking a break', emoji: '☕' },
};

/**
 * Get Singapore Time (UTC+8) from current time
 */
function getSingaporeTime(): Date {
  const now = new Date();
  // Get UTC time and add 8 hours for Singapore
  const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
  return new Date(utcTime + 8 * 60 * 60 * 1000);
}

/**
 * Determine status based on Singapore Time hour
 *
 * Time ranges (SGT):
 * - Sleeping: 00:00 - 06:59 (7 hours)
 * - Eating (Lunch): 12:00 - 12:59 (1 hour)
 * - Eating (Dinner): 19:00 - 19:59 (1 hour)
 * - Coding: 09:00 - 17:59 (except lunch) (8 hours)
 * - Break: All other hours
 *
 * Note: Eating takes priority over Coding during overlap hours
 */
function getStatusFromHour(hour: number): StatusType {
  // Eating times take priority (12:00-13:00 and 19:00-20:00)
  if (hour === 12 || hour === 19) {
    return 'eating';
  }

  // Sleeping: 00:00 - 06:59
  if (hour >= 0 && hour < 7) {
    return 'sleeping';
  }

  // Coding: 09:00 - 17:59 (18:00 = 6pm, so < 18)
  if (hour >= 9 && hour < 18) {
    return 'coding';
  }

  // Break: all other hours (07:00-08:59, 18:00-18:59, 20:00-23:59)
  return 'break';
}

interface UseCurrentStatusReturn {
  /** Current status type */
  status: StatusType;
  /** Human-readable status label */
  label: string;
  /** Emoji representation of status */
  emoji: string;
  /** Current Singapore Time hour (0-23) for debugging */
  currentHour: number;
}

interface UseCurrentStatusOptions {
  /** Update interval in milliseconds (default: 60000 = 1 minute) */
  updateInterval?: number;
}

/**
 * useCurrentStatus - A hook for determining current activity status based on Singapore Time
 *
 * Calculates status based on SGT (UTC+8) and updates in real-time.
 *
 * Usage:
 * ```tsx
 * const { status, label, emoji } = useCurrentStatus();
 *
 * return (
 *   <div>
 *     <span>{emoji}</span>
 *     <span>{label}</span>
 *   </div>
 * );
 * ```
 */
export function useCurrentStatus({
  updateInterval = 60000,
}: UseCurrentStatusOptions = {}): UseCurrentStatusReturn {
  const calculateStatus = useCallback((): {
    status: StatusType;
    hour: number;
  } => {
    const sgtTime = getSingaporeTime();
    const hour = sgtTime.getHours();
    return {
      status: getStatusFromHour(hour),
      hour,
    };
  }, []);

  const [currentStatus, setCurrentStatus] = useState<StatusType>(() => {
    // Initialize with actual status on client, 'break' as safe SSR default
    if (typeof window === 'undefined') return 'break';
    return calculateStatus().status;
  });

  const [currentHour, setCurrentHour] = useState<number>(() => {
    if (typeof window === 'undefined') return 0;
    return calculateStatus().hour;
  });

  useEffect(() => {
    // Update immediately on mount to sync with actual time
    const { status, hour } = calculateStatus();
    setCurrentStatus(status);
    setCurrentHour(hour);

    // Set up interval for real-time updates
    const intervalId = setInterval(() => {
      const { status: newStatus, hour: newHour } = calculateStatus();
      setCurrentStatus(newStatus);
      setCurrentHour(newHour);
    }, updateInterval);

    // Cleanup on unmount
    return () => {
      clearInterval(intervalId);
    };
  }, [calculateStatus, updateInterval]);

  const statusInfo = STATUS_MAP[currentStatus];

  return {
    status: currentStatus,
    label: statusInfo.label,
    emoji: statusInfo.emoji,
    currentHour,
  };
}

export type { UseCurrentStatusOptions, UseCurrentStatusReturn };
