'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { InstagramPost } from '@/types';
import {
  staggerItemVariants,
} from '@/lib/animations';
import { getPlaceholderImage } from '@/lib/utils';
import { SimpleParticlesBackground } from '@/components/effects/ParticlesBackground';

interface InstagramProps {
  posts?: InstagramPost[];
}

// デフォルトの投稿データ
const defaultPosts: InstagramPost[] = [
  {
    id: '1',
    image: getPlaceholderImage(300, 300, '87CEEB', 'FFFFFF', '島の風景1'),
    alt: '島の風景1',
  },
  {
    id: '2',
    image: getPlaceholderImage(300, 300, 'FFD700', 'FFFFFF', '島の風景2'),
    alt: '島の風景2',
  },
  {
    id: '3',
    image: getPlaceholderImage(300, 300, 'FF6B6B', 'FFFFFF', '島の風景3'),
    alt: '島の風景3',
  },
  {
    id: '4',
    image: getPlaceholderImage(300, 300, '26A69A', 'FFFFFF', '島の風景4'),
    alt: '島の風景4',
  },
  {
    id: '5',
    image: getPlaceholderImage(300, 300, '4A90E2', 'FFFFFF', '島の風景5'),
    alt: '島の風景5',
  },
  {
    id: '6',
    image: getPlaceholderImage(300, 300, 'E0F2F1', '333333', '島の風景6'),
    alt: '島の風景6',
  },
];

export default function Instagram() {

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

// インスタグラムフィード（API連携版）
interface InstagramFeedProps {
  accessToken?: string;
  limit?: number;
}

export function InstagramFeed({ limit = 6 }: InstagramFeedProps) {
  // API連携する場合はここでデータ取得処理を実装
  // 現在はデモ用の静的データを使用

  return <Instagram />;
}

// インスタグラムグリッド（マソンリーレイアウト）
export function InstagramMasonry({ posts = defaultPosts }: InstagramProps) {
  return (
    <section className="py-20 bg-sea-foam relative z-20 overflow-hidden">
      <SimpleParticlesBackground
        className="pointer-events-none opacity-50"
        id="instagram-masonry-particles"
      />
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          className="text-4xl font-zen font-medium text-center mb-12 gradient-text"
          style={{ lineHeight: '5.5rem' }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerItemVariants}
        >
          Instagram Gallery
        </motion.h2>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 max-w-6xl mx-auto">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="break-inside-avoid mb-4"
            >
              <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 group cursor-pointer">
                <div className="relative">
                  <Image
                    src={post.image}
                    alt={post.alt}
                    width={300}
                    height={300}
                    className="w-full h-auto group-hover:scale-110 transition-transform duration-500"
                    unoptimized={post.image.startsWith('http')}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faInstagram}
                      className="text-white text-3xl transform scale-0 group-hover:scale-100 transition-transform duration-300"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
