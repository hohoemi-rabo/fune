'use client';

import { cn } from '@/lib/utils';

interface AuroraTextProps {
  children: string;
  className?: string;
  reverse?: boolean;
}

export default function AuroraText({
  children,
  className,
  reverse = false,
}: AuroraTextProps) {
  const baseClass = reverse ? 'aurora-wave-text-reverse' : 'aurora-wave-text';

  return (
    <span className={cn(baseClass, className)} data-text={children}>
      {children}
    </span>
  );
}

// 複数行のオーロラテキスト用コンポーネント
interface AuroraTextLinesProps {
  lines: string[];
  className?: string;
  reverse?: boolean;
  lineClassName?: string;
}

export function AuroraTextLines({
  lines,
  className,
  reverse = false,
  lineClassName,
}: AuroraTextLinesProps) {
  return (
    <div className={className}>
      {lines.map((line, index) => (
        <span key={index} className={cn('block', lineClassName)}>
          <AuroraText reverse={reverse}>{line}</AuroraText>
        </span>
      ))}
    </div>
  );
}

// アニメーション遅延付きオーロラテキスト
interface DelayedAuroraTextProps extends AuroraTextProps {
  delay?: number;
}

export function DelayedAuroraText({
  children,
  className,
  reverse = false,
  delay = 0,
}: DelayedAuroraTextProps) {
  return (
    <span
      className={cn(
        reverse ? 'aurora-wave-text-reverse' : 'aurora-wave-text',
        className
      )}
      data-text={children}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </span>
  );
}
