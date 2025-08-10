'use client';

import { cn } from '@/lib/utils';
import React, { useEffect, useRef } from 'react';

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
  const spanRef = useRef<HTMLSpanElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (spanRef.current) {
      const element = spanRef.current;
      
      // グラデーションスタイルを適用
      element.style.background = `linear-gradient(
        ${reverse ? '-90deg' : '90deg'},
        white 0%,
        white 40%,
        #00ffff 42%,
        #ff00ff 44%,
        #ffff00 46%,
        #ff00aa 48%,
        #00ff00 50%,
        #0099ff 52%,
        #ff0066 54%,
        white 56%,
        white 100%
      )`;
      element.style.backgroundSize = '200% 100%';
      element.style.backgroundPosition = '100% 0';
      
      // ベンダープレフィックス付きスタイル
      const style = element.style as CSSStyleDeclaration & {
        webkitBackgroundClip?: string;
        webkitTextFillColor?: string;
      };
      style.webkitBackgroundClip = 'text';
      element.style.backgroundClip = 'text';
      style.webkitTextFillColor = 'transparent';
      element.style.filter = 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.5))';
      
      // アニメーションを開始
      let position = 100;
      const animationSpeed = reverse ? 0.3 : 0.5;
      
      const animate = () => {
        position -= animationSpeed;
        if (position <= -100) {
          position = 100;
        }
        element.style.backgroundPosition = `${position}% 0`;
        animationRef.current = requestAnimationFrame(animate);
      };
      
      animationRef.current = requestAnimationFrame(animate);
    }

    // クリーンアップ関数でアニメーションを停止
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [reverse]);

  return (
    <span 
      ref={spanRef}
      className={cn('relative inline-block font-medium', className)}
      data-text={children}
      style={{
        position: 'relative',
        display: 'inline-block',
        color: 'white',
        fontWeight: 500,
      }}
    >
      {children}
      {/* オーロラの輝きエフェクト */}
      <span
        style={{
          content: '""',
          position: 'absolute',
          left: 0,
          top: 0,
          zIndex: -1,
          color: 'white',
          filter: 'blur(3px)',
          opacity: 0.8,
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      >
        {children}
      </span>
      {/* グロウエフェクト */}
      <span
        style={{
          content: '""',
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '100%',
          height: '100%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.2) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />
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
  const spanRef = useRef<HTMLSpanElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (spanRef.current) {
        const element = spanRef.current;
        
        element.style.background = `linear-gradient(
          ${reverse ? '-90deg' : '90deg'},
          white 0%,
          white 40%,
          #00ffff 42%,
          #ff00ff 44%,
          #ffff00 46%,
          #ff00aa 48%,
          #00ff00 50%,
          #0099ff 52%,
          #ff0066 54%,
          white 56%,
          white 100%
        )`;
        element.style.backgroundSize = '200% 100%';
        element.style.backgroundPosition = '100% 0';
        
        const style = element.style as CSSStyleDeclaration & {
          webkitBackgroundClip?: string;
          webkitTextFillColor?: string;
        };
        style.webkitBackgroundClip = 'text';
        element.style.backgroundClip = 'text';
        style.webkitTextFillColor = 'transparent';
        element.style.filter = 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.5))';
        
        let position = 100;
        const animationSpeed = reverse ? 0.3 : 0.5;
        
        const animate = () => {
          position -= animationSpeed;
          if (position <= -100) {
            position = 100;
          }
          element.style.backgroundPosition = `${position}% 0`;
          animationRef.current = requestAnimationFrame(animate);
        };
        
        animationRef.current = requestAnimationFrame(animate);
      }
    }, delay * 1000);

    return () => {
      clearTimeout(timer);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [reverse, delay]);

  return (
    <span 
      ref={spanRef}
      className={cn('relative inline-block font-medium', className)}
      data-text={children}
      style={{
        position: 'relative',
        display: 'inline-block',
        color: 'white',
        fontWeight: 500,
      }}
    >
      {children}
    </span>
  );
}