'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { TopWaveSVG } from '@/components/effects/WaveBackground';
import {
  fadeInUpVariants,
  slideInLeftVariants,
  slideInRightVariants,
} from '@/lib/animations';
import { useCounter } from '@/hooks/useCounter';
import { ProfileStats } from '@/types';

interface AboutProps {
  name: string;
  profileImage: string;
  bio: string;
  stats: ProfileStats[];
}

// 統計カウンターコンポーネント
function StatCounter({ stat }: { stat: ProfileStats }) {
  const { ref, animatedDigits, suffix, className } = useCounter({
    target: stat.value,
    suffix: stat.suffix,
  });

  return (
    <div className="text-center">
      <div
        ref={ref}
        className={`text-3xl font-zen font-medium text-ocean-cobalt stat-number ${className}`}
      >
        {animatedDigits.map(({ digit, delay, key }) => (
          <span
            key={key}
            className="number-roller-digit"
            style={{ animationDelay: `${delay}ms` }}
          >
            {digit}
          </span>
        ))}
        {suffix}
      </div>
      <div className="text-sm text-gray-600 font-kiwi font-light stat-label">
        {stat.label}
      </div>
    </div>
  );
}

export default function About({ name, profileImage, bio, stats }: AboutProps) {
  return (
    <section id="about" className="mt-10 py-20 bg-sand-white relative">
      {/* 上部の波 */}
      <TopWaveSVG />

      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-zen font-medium text-center mb-12 gradient-text"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUpVariants}
        >
          プロフィール
        </motion.h2>

        <div className="flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto">
          {/* プロフィール画像 */}
          <motion.div
            className="flex-shrink-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideInRightVariants}
          >
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden shadow-2xl border-4 border-white relative">
              {profileImage.startsWith('http') ? (
                <img
                  src={profileImage}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={profileImage}
                  alt={name}
                  width={192}
                  height={192}
                  className="w-full h-full object-cover"
                  priority
                />
              )}
            </div>
          </motion.div>

          {/* 自己紹介テキスト */}
          <motion.div
            className="flex-1 text-center md:text-left"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideInLeftVariants}
          >
            <h3 className="text-2xl font-zen font-medium mb-4 text-cobalt-blue">
              {name}
            </h3>
            <div
              className="text-gray-700 mb-6 leading-relaxed font-kiwi font-light"
              dangerouslySetInnerHTML={{ __html: bio }}
            />

            {/* 統計カウンター */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {stats.map((stat, index) => (
                <StatCounter key={index} stat={stat} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
