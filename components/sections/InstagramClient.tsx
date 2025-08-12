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

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainerVariants}
        >
          {posts.map((post, index) => (
            <motion.a
              key={post.id}
              href={post.permalink || instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              variants={scaleInVariants}
              custom={index}
              className="aspect-square overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 group cursor-pointer block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative w-full h-full bg-gray-100">
                {/* ローディングスケルトン */}
                {!loadedImages.has(post.id) && !errorImages.has(post.id) && (
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
                )}
                
                {/* エラー時のフォールバック */}
                {errorImages.has(post.id) ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100">
                    <FontAwesomeIcon
                      icon={faInstagram}
                      className="text-purple-400 text-6xl"
                    />
                  </div>
                ) : (
                  <Image
                    src={post.image}
                    alt={post.alt}
                    fill
                    className={`object-cover group-hover:scale-110 transition-all duration-500 ${
                      loadedImages.has(post.id) ? 'opacity-100' : 'opacity-0'
                    }`}
                    sizes="(max-width: 768px) 50vw, 33vw"
                    unoptimized={post.image.startsWith('http')}
                    onLoad={() => handleImageLoad(post.id)}
                    onError={() => handleImageError(post.id)}
                    priority={index < 3}
                  />
                )}

                {/* オーバーレイ */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faInstagram}
                    className="text-white text-4xl transform scale-0 group-hover:scale-100 transition-transform duration-300"
                  />
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerItemVariants}
        >
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:shadow-lg transition-all duration-300 font-zen font-medium transform hover:scale-105 group"
          >
            <FontAwesomeIcon
              icon={faInstagram}
              className="text-xl group-hover:rotate-12 transition-transform duration-300"
            />
            フォローする
          </a>
        </motion.div>
      </div>
    </section>
  );
}