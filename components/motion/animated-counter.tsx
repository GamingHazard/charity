'use client';

import { useCounterAnimation } from '@/hooks/use-counter-animation';
import { ReactNode } from 'react';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export function AnimatedCounter({
  value,
  duration = 2000,
  decimals = 0,
  suffix = '',
  prefix = '',
  className = '',
}: AnimatedCounterProps) {
  const { count, ref } = useCounterAnimation({
    end: value,
    duration,
    decimals,
  });

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}
