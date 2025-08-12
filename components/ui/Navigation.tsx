'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { navigationItems } from '@/lib/utils';
import { cn } from '@/lib/utils';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // モバイルメニューが開いている時はスクロールを無効化
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setIsOpen(false);
    
    // overflow設定を即座に解除
    document.body.style.overflow = '';

    // カスタムスムーズスクロール実装（高性能PC対応）
    setTimeout(() => {
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 800; // 800msで固定（高性能PCでも一貫性を保つ）
        let start: number | null = null;

        const animation = (currentTime: number) => {
          if (start === null) start = currentTime;
          const timeElapsed = currentTime - start;
          const progress = Math.min(timeElapsed / duration, 1);
          
          // easeInOutCubicイージング関数
          const easeInOutCubic = progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;
          
          window.scrollTo(0, startPosition + distance * easeInOutCubic);
          
          if (timeElapsed < duration) {
            requestAnimationFrame(animation);
          }
        };
        
        requestAnimationFrame(animation);
      }
    }, 100);
  };

  return (
    <nav
      className={cn(
        'fixed w-full top-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm'
          : 'bg-white/80 backdrop-blur-sm'
      )}
    >
      <div className="px-4 lg:px-12">
        <div className="flex justify-between items-center py-4">
          {/* ロゴ */}
          <Link
            href="/"
            className="text-2xl font-zen font-medium gradient-text hover:opacity-80 transition-opacity"
          >
            本岡紗代
          </Link>

          {/* デスクトップメニュー */}
          <div className="hidden lg:flex space-x-8">
            {navigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-gray-700 hover:text-ocean-cobalt transition-colors font-zen"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* モバイルメニューボタン */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden relative w-8 h-8 flex items-center justify-center"
            aria-label="メニューを開く"
          >
            <motion.span
              animate={isOpen ? 'open' : 'closed'}
              className="absolute block w-6 h-0.5 bg-gray-700"
            >
              <motion.span
                variants={{
                  closed: { rotate: 0, y: -8 },
                  open: { rotate: 45, y: 0 },
                }}
                transition={{ duration: 0.3 }}
                className="absolute block w-6 h-0.5 bg-gray-700"
              />
              <motion.span
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 },
                }}
                transition={{ duration: 0.3 }}
                className="absolute block w-6 h-0.5 bg-gray-700"
              />
              <motion.span
                variants={{
                  closed: { rotate: 0, y: 8 },
                  open: { rotate: -45, y: 0 },
                }}
                transition={{ duration: 0.3 }}
                className="absolute block w-6 h-0.5 bg-gray-700"
              />
            </motion.span>
          </button>
        </div>
      </div>

      {/* モバイルメニュー */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t"
          >
            <div className="px-4 py-2 space-y-2">
              {navigationItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="block py-2 text-gray-700 hover:text-ocean-cobalt transition-colors font-zen"
                  >
                    {item.label}
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
