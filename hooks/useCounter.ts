import { useEffect, useState, useRef } from 'react';
import { useIntersectionObserver } from './useIntersectionObserver';

interface UseCounterProps {
  target: number;
  duration?: number;
  suffix?: string;
  startOnView?: boolean;
}

export function useCounter({
  target,
  duration = 2000,
  suffix = '',
  startOnView = true,
}: UseCounterProps) {
  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const hasAnimated = useRef(false);

  // Intersection Observerを使用して要素が表示されたかを検出
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.5,
    triggerOnce: true,
  });

  useEffect(() => {
    // startOnViewがfalseの場合、またはビューに入った場合にアニメーション開始
    if (!startOnView || (isIntersecting && !hasAnimated.current)) {
      hasAnimated.current = true;
      setIsAnimating(true);

      const steps = 60;
      const increment = target / steps;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        const newCount = Math.min(Math.round(increment * currentStep), target);
        setCount(newCount);

        if (currentStep >= steps || newCount >= target) {
          clearInterval(timer);
          setCount(target);

          // アニメーション終了後、countingクラスを削除
          setTimeout(() => {
            setIsAnimating(false);
          }, 500);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [target, duration, isIntersecting, startOnView]);

  // 数字を個別の桁に分解するためのデータを返す
  const getAnimatedDigits = () => {
    const numberStr = count.toString();
    return numberStr.split('').map((digit, index) => ({
      digit,
      delay: index * 50,
      key: index,
    }));
  };

  return {
    ref,
    count,
    displayValue: count + suffix,
    animatedDigits: getAnimatedDigits(),
    suffix,
    isAnimating,
    className: isAnimating ? 'counting' : '',
  };
}

// 複数のカウンターを管理するフック
export function useMultipleCounters(
  counters: Array<{ target: number; suffix?: string }>,
  options?: { duration?: number; startOnView?: boolean }
) {
  const [counts, setCounts] = useState<number[]>(counters.map(() => 0));
  const [animatingStates, setAnimatingStates] = useState<boolean[]>(
    counters.map(() => false)
  );
  const hasAnimated = useRef(false);

  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.5,
    triggerOnce: true,
  });

  useEffect(() => {
    if (
      (options?.startOnView ?? true) &&
      isIntersecting &&
      !hasAnimated.current
    ) {
      hasAnimated.current = true;

      // 各カウンターを少しずつ遅延させて開始
      counters.forEach((counter, index) => {
        setTimeout(() => {
          animateCounter(index, counter.target);
        }, index * 300);
      });
    }
  }, [isIntersecting, counters, options?.startOnView]);

  const animateCounter = (index: number, target: number) => {
    setAnimatingStates((prev) => {
      const newStates = [...prev];
      newStates[index] = true;
      return newStates;
    });

    const duration = options?.duration || 2000;
    const steps = 60;
    const increment = target / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newCount = Math.min(Math.round(increment * currentStep), target);

      setCounts((prev) => {
        const newCounts = [...prev];
        newCounts[index] = newCount;
        return newCounts;
      });

      if (currentStep >= steps || newCount >= target) {
        clearInterval(timer);

        setCounts((prev) => {
          const newCounts = [...prev];
          newCounts[index] = target;
          return newCounts;
        });

        setTimeout(() => {
          setAnimatingStates((prev) => {
            const newStates = [...prev];
            newStates[index] = false;
            return newStates;
          });
        }, 500);
      }
    }, duration / steps);
  };

  return {
    ref,
    counts,
    animatingStates,
    getDisplayValue: (index: number) =>
      counts[index] + (counters[index].suffix || ''),
  };
}

// パフォーマンスを考慮したカウンターフック（requestAnimationFrame版）
export function useAnimatedCounter({
  target,
  duration = 2000,
  suffix = '',
  startOnView = true,
  easing = 'easeOutQuart',
}: UseCounterProps & { easing?: 'linear' | 'easeOutQuart' }) {
  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const hasAnimated = useRef(false);

  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.5,
    triggerOnce: true,
  });

  // イージング関数
  const easingFunctions = {
    linear: (t: number) => t,
    easeOutQuart: (t: number) => 1 - Math.pow(1 - t, 4),
  };

  const animate = (timestamp: number) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
    }

    const elapsed = timestamp - startTimeRef.current;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easingFunctions[easing](progress);
    const currentCount = Math.round(target * easedProgress);

    setCount(currentCount);

    if (progress < 1) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      setIsAnimating(false);
    }
  };

  useEffect(() => {
    if (!startOnView || (isIntersecting && !hasAnimated.current)) {
      hasAnimated.current = true;
      setIsAnimating(true);
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [target, duration, isIntersecting, startOnView, easing]);

  return {
    ref,
    count,
    displayValue: count + suffix,
    isAnimating,
    className: `stat-number ${isAnimating ? 'counting' : ''}`,
  };
}
