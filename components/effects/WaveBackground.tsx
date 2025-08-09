'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface WaveBackgroundProps {
  className?: string;
  pauseOnScroll?: boolean;
}

export default function WaveBackground({
  className,
  pauseOnScroll = true,
}: WaveBackgroundProps) {
  const waveRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pauseOnScroll || !waveRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            entry.target.classList.add('animation-paused');
          } else {
            entry.target.classList.remove('animation-paused');
          }
        });
      },
      { threshold: 0.1 }
    );

    const element = waveRef.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [pauseOnScroll]);

  return (
    <div ref={waveRef} className={cn('wave-flow-background', className)} />
  );
}

// SVG波アニメーション
interface WaveSVGProps {
  className?: string;
  color?: string;
  height?: number;
  animate?: boolean;
}

export function WaveSVG({
  className,
  color = '#FAFAFA',
  height = 120,
  animate = true,
}: WaveSVGProps) {
  return (
    <svg
      viewBox={`0 0 1440 ${height}`}
      className={cn('w-full', animate && 'wave-animation', className)}
      preserveAspectRatio="none"
    >
      <path
        fill={color}
        d="M0,40 C150,80 350,0 600,40 C850,80 1050,0 1300,40 C1370,50 1410,70 1440,50 L1440,120 L0,120 Z"
      />
    </svg>
  );
}

// 上部波SVG（セクション区切り用）
interface TopWaveSVGProps extends WaveSVGProps {
  dropShadow?: boolean;
}

export function TopWaveSVG({
  className,
  color = '#FAFAFA',
  height = 120,
  animate = true,
  dropShadow = true,
}: TopWaveSVGProps) {
  return (
    <div
      className={cn(
        'absolute top-0 left-0 right-0 transform -translate-y-1/2',
        dropShadow && 'drop-shadow-lg'
      )}
    >
      <svg
        viewBox={`0 0 1440 ${height}`}
        className={cn('w-full', animate && 'wave-animation', className)}
        preserveAspectRatio="none"
      >
        {dropShadow && (
          <defs>
            <filter id="waveShadow">
              <feDropShadow
                dx="0"
                dy="-5"
                stdDeviation="10"
                floodOpacity="0.15"
              />
            </filter>
          </defs>
        )}
        <path
          fill={color}
          filter={dropShadow ? 'url(#waveShadow)' : undefined}
          d="M0,80 C150,40 350,120 600,80 C850,40 1050,120 1300,80 C1370,70 1410,70 1440,70 L1440,0 L0,0 Z"
        />
      </svg>
    </div>
  );
}

// グラデーション波背景
interface GradientWaveBackgroundProps {
  className?: string;
  fromColor?: string;
  toColor?: string;
}

export function GradientWaveBackground({
  className,
  fromColor = '#005a9c',
  toColor = '#003d6b',
}: GradientWaveBackgroundProps) {
  return (
    <div
      className={cn('wave-flow-background', className)}
      style={{
        background: `linear-gradient(to bottom, ${fromColor}, ${toColor})`,
      }}
    />
  );
}
