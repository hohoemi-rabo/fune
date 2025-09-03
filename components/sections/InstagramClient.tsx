'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { InstagramPost } from '@/types';
import {
  staggerContainerVariants,
  staggerItemVariants,
  scaleInVariants,
} from '@/lib/animations';
import { SimpleParticlesBackground } from '@/components/effects/ParticlesBackground';
import { useState } from 'react';

interface InstagramClientProps {
  posts: InstagramPost[];
  instagramUrl: string;
}

export default function InstagramClient({ posts, instagramUrl }: InstagramClientProps) {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [errorImages, setErrorImages] = useState<Set<string>>(new Set());

  const handleImageLoad = (postId: string) => {
    setLoadedImages(prev => new Set(prev).add(postId));
  };

  const handleImageError = (postId: string) => {
    setErrorImages(prev => new Set(prev).add(postId));
  };

  return (
    <section className="py-20 bg-sea-foam relative z-20 overflow-hidden">
      <SimpleParticlesBackground
        className="pointer-events-none opacity-50"
        id="instagram-particles"
      />
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          className="text-4xl font-zen font-medium text-center mb-12 gradient-text"
          style={{ lineHeight: '3rem' }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerItemVariants}
        >
          Instagram
        </motion.h2>

        {/* 準備中メッセージ */}
        <motion.div
          className="text-center py-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerItemVariants}
        >
          <div className="max-w-md mx-auto">
            <FontAwesomeIcon
              icon={faInstagram}
              className="text-6xl text-gray-400 mb-6"
            />
            <h3 className="text-2xl font-zen font-medium text-deep-ocean mb-4">
              準備中
            </h3>
            <p className="text-gray-600 font-kiwi">
              現在インスタグラムとの連携を準備しています。<br />
              しばらくお待ちください。
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}