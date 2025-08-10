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
import { getPlaceholderImage } from '@/lib/utils';

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

export default function Instagram({ posts = defaultPosts }: InstagramProps) {
  const instagramUrl = 'https://instagram.com'; // 実際のURLに変更してください

  return (
    <section className="py-20 bg-sea-foam">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-zen font-medium text-center mb-12 gradient-text"
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
            <motion.div
              key={post.id}
              variants={scaleInVariants}
              custom={index}
              className="aspect-square overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative w-full h-full">
                <Image
                  src={post.image}
                  alt={post.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 33vw"
                  unoptimized={post.image.startsWith('http')}
                />

                {/* オーバーレイ */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faInstagram}
                    className="text-white text-4xl transform scale-0 group-hover:scale-100 transition-transform duration-300"
                  />
                </div>
              </div>
            </motion.div>
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

// インスタグラムフィード（API連携版）
interface InstagramFeedProps {
  accessToken?: string;
  limit?: number;
}

export function InstagramFeed({ limit = 6 }: InstagramFeedProps) {
  // API連携する場合はここでデータ取得処理を実装
  // 現在はデモ用の静的データを使用

  return <Instagram posts={defaultPosts.slice(0, limit)} />;
}

// インスタグラムグリッド（マソンリーレイアウト）
export function InstagramMasonry({ posts = defaultPosts }: InstagramProps) {
  return (
    <section className="py-20 bg-sea-foam">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-zen font-medium text-center mb-12 gradient-text"
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
