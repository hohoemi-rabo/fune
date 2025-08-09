'use client';

import { useRef, ReactNode, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface Card3DProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  maxTilt?: number;
  glare?: boolean;
  maxGlare?: number;
  perspective?: number;
  scale?: number;
}

export default function Card3D({ 
  children, 
  className = '', 
  delay = 0,
  maxTilt = 25,
  glare = true,
  maxGlare = 0.5,
  perspective = 1000,
  scale = 1.05
}: Card3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 30 });

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    [`${maxTilt}deg`, `-${maxTilt}deg`]
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    [`-${maxTilt}deg`, `${maxTilt}deg`]
  );

  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], [0, 100]);
  const glareOpacity = useTransform(
    mouseXSpring,
    [-0.5, 0, 0.5],
    [maxGlare, 0, maxGlare]
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <div className={`perspective-[${perspective}px] ${className}`}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateY,
          rotateX,
          transformStyle: 'preserve-3d',
        }}
        className="relative transition-transform duration-[400ms]"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ 
          opacity: 1, 
          scale: isHovered ? scale : 1 
        }}
        transition={{ 
          duration: 0.4, 
          delay: delay / 1000,
          ease: 'easeOut' 
        }}
      >
        {children}
        
        {/* グレア効果 */}
        {glare && (
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
            style={{
              opacity: glareOpacity,
            }}
          >
            <motion.div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.8) 0%, transparent 50%)`,
              }}
            />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}