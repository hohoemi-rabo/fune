import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverProps {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useIntersectionObserver({
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px',
  triggerOnce = true,
}: UseIntersectionObserverProps = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // 既に一度表示されていて、triggerOnceがtrueの場合は何もしない
    if (triggerOnce && hasIntersected) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isCurrentlyIntersecting = entry.isIntersecting;

        if (isCurrentlyIntersecting) {
          setIsIntersecting(true);
          setHasIntersected(true);
        } else if (!triggerOnce) {
          // triggerOnceがfalseの場合のみ、要素が画面外に出たときにリセット
          setIsIntersecting(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, hasIntersected]);

  return { ref, isIntersecting };
}

// フェードインアニメーション用のカスタムフック
export function useFadeInObserver(options?: UseIntersectionObserverProps) {
  const { ref, isIntersecting } = useIntersectionObserver(options);

  return {
    ref,
    className: isIntersecting
      ? 'fade-in-observer is-visible'
      : 'fade-in-observer',
  };
}

// タイムラインアニメーション用のカスタムフック
export function useTimelineObserver(options?: UseIntersectionObserverProps) {
  const { ref, isIntersecting } = useIntersectionObserver(options);

  return {
    ref,
    className: isIntersecting ? 'timeline-item is-visible' : 'timeline-item',
  };
}

// 複数要素の監視用フック
export function useMultipleIntersectionObserver(
  count: number,
  options?: UseIntersectionObserverProps
) {
  const refs = useRef<(HTMLElement | null)[]>([]);
  const [intersectingStates, setIntersectingStates] = useState<boolean[]>(
    new Array(count).fill(false)
  );

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    refs.current.forEach((element, index) => {
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIntersectingStates((prev) => {
              const newStates = [...prev];
              newStates[index] = true;
              return newStates;
            });
          } else if (!options?.triggerOnce) {
            setIntersectingStates((prev) => {
              const newStates = [...prev];
              newStates[index] = false;
              return newStates;
            });
          }
        },
        {
          threshold: options?.threshold || 0.1,
          rootMargin: options?.rootMargin || '0px 0px -50px 0px',
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [count, options]);

  const setRef = (index: number) => (el: HTMLElement | null) => {
    refs.current[index] = el;
  };

  return { setRef, intersectingStates };
}
