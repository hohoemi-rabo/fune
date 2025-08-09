'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FilterButtonProps {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  className?: string;
}

export default function FilterButton({
  children,
  active,
  onClick,
  className,
}: FilterButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        'px-6 py-2 rounded-full font-zen font-medium transition-all duration-300',
        active
          ? 'bg-ocean-cobalt text-white'
          : 'bg-gray-200 text-gray-700 hover:bg-ocean-cobalt hover:text-white',
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      layout
    >
      {children}
    </motion.button>
  );
}

// バリエーション：アイコン付きフィルターボタン
interface IconFilterButtonProps extends FilterButtonProps {
  icon?: React.ReactNode;
}

export function IconFilterButton({
  children,
  active,
  onClick,
  icon,
  className,
}: IconFilterButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        'flex items-center gap-2 px-6 py-2 rounded-full font-zen font-medium transition-all duration-300',
        active
          ? 'bg-ocean-cobalt text-white'
          : 'bg-gray-200 text-gray-700 hover:bg-ocean-cobalt hover:text-white',
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      layout
    >
      {icon && <span className="text-lg">{icon}</span>}
      {children}
    </motion.button>
  );
}

// バリエーション：カウント表示付きフィルターボタン
interface CountFilterButtonProps extends FilterButtonProps {
  count?: number;
}

export function CountFilterButton({
  children,
  active,
  onClick,
  count,
  className,
}: CountFilterButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        'relative px-6 py-2 rounded-full font-zen font-medium transition-all duration-300',
        active
          ? 'bg-ocean-cobalt text-white'
          : 'bg-gray-200 text-gray-700 hover:bg-ocean-cobalt hover:text-white',
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      layout
    >
      {children}
      {count !== undefined && count > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={cn(
            'absolute -top-2 -right-2 w-6 h-6 rounded-full text-xs flex items-center justify-center font-medium',
            active ? 'bg-coral-pink text-white' : 'bg-ocean-cobalt text-white'
          )}
        >
          {count}
        </motion.span>
      )}
    </motion.button>
  );
}
