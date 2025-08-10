'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import AuroraText, { AuroraTextLines } from '@/components/effects/AuroraText';
import WaveBackground from '@/components/effects/WaveBackground';
import ParticlesBackground from '@/components/effects/ParticlesBackground';
import { fadeInUpVariants } from '@/lib/animations';

interface HeroProps {
  title: string;
  subtitle1: string;
  subtitle2: string;
  subtagline: string;
}

export default function Hero({
  title,
  subtitle1,
  subtitle2,
  subtagline,
}: HeroProps) {
  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ベース背景色 */}
      <div className="absolute inset-0 bg-gradient-to-b from-cobalt-blue to-deep-cobalt" />

      {/* 波アニメーション背景 */}
      <WaveBackground className="absolute inset-0" />

      {/* パーティクル背景 */}
      <ParticlesBackground />

      {/* オーバーレイ */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />

      {/* コンテンツ */}
      <div className="relative z-10 text-center text-white px-4">
        <motion.h1
          className="text-4xl md:text-6xl font-zen font-medium mb-6"
          initial="hidden"
          animate="visible"
          variants={fadeInUpVariants}
        >
          <AuroraText>{title}</AuroraText>
        </motion.h1>

        <motion.div
          className="text-xl md:text-2xl mb-3 font-noto-serif font-light"
          initial="hidden"
          animate="visible"
          variants={fadeInUpVariants}
          transition={{ delay: 0.2 }}
        >
          <AuroraTextLines
            lines={[subtitle1, subtitle2]}
            reverse
            lineClassName="mb-1"
          />
        </motion.div>

        <motion.p
          className="text-base md:text-lg mb-8 font-noto-serif font-light"
          initial="hidden"
          animate="visible"
          variants={fadeInUpVariants}
          transition={{ delay: 0.3 }}
        >
          {subtagline}
        </motion.p>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUpVariants}
          transition={{ delay: 0.4 }}
        >
          <Link
            href="#contact"
            className="inline-block px-10 py-3 bg-white/10 backdrop-blur-sm border border-white/70 text-white rounded-full transition-all duration-300 transform hover:scale-105 group overflow-hidden relative"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById('contact')
                ?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span className="relative z-10">お問い合わせはこちら</span>
            <span className="absolute inset-0 bg-gradient-to-r from-coral-pink to-sunset-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </Link>
        </motion.div>
      </div>

      {/* 波のアニメーション（削除されていたのでコメントアウト） */}
      {/* <div className="absolute bottom-0 left-0 right-0">
        <WaveSVG />
      </div> */}
    </section>
  );
}
