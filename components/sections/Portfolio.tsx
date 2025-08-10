'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Modal from '@/components/ui/Modal';
import { PortfolioItem, PortfolioDetail } from '@/types';
import { staggerItemVariants } from '@/lib/animations';
import { getPlaceholderImage } from '@/lib/utils';

interface PortfolioProps {
  title: string;
  items: Array<PortfolioItem & { detail: PortfolioDetail }>;
  description: string;
}

export default function Portfolio({
  title,
  items,
  description,
}: PortfolioProps) {
  const [filter, setFilter] = useState<'all' | 'magazine' | 'web'>('all');
  const [selectedItem, setSelectedItem] = useState<
    (PortfolioItem & { detail: PortfolioDetail }) | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // フィルター変更処理
  const handleFilterChange = (newFilter: 'all' | 'magazine' | 'web') => {
    setFilter(newFilter);
  };

  // フィルタリングされたアイテム
  const filteredItems = items.filter(
    (item) => filter === 'all' || item.category === filter
  );

  const handleItemClick = (
    item: PortfolioItem & { detail: PortfolioDetail }
  ) => {
    // detailにtitleが含まれていることを確認し、含まれていなければ追加
    const detailWithTitle = {
      ...item.detail,
      title: item.detail.title || item.title,
    };
    setSelectedItem({ ...item, detail: detailWithTitle });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedItem(null), 300);
  };

  // 画像URLの処理（プレースホルダー対応）
  const getImageUrl = (item: PortfolioItem) => {
    if (item.image.startsWith('http')) {
      return item.image;
    }
    if (item.image.startsWith('/')) {
      return item.image;
    }
    // プレースホルダー画像を生成
    const colors: Record<string, string> = {
      koujirai: '87CEEB',
      hyogo1000: 'FFD700',
      mapple: 'FF6B6B',
      'kobe-fashion': '26A69A',
      arukikata: '4A90E2',
      'kobe-dream': 'E0F2F1',
      'mapple-web': '9C27B0',
      lancers: 'F44336',
      'yahoo-news': '00BCD4',
    };
    return getPlaceholderImage(
      400,
      300,
      colors[item.id] || '87CEEB',
      'FFFFFF',
      item.title
    );
  };

  return (
    <section id="portfolio" className="py-20 bg-sand-white">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-zen font-medium text-center mb-12 gradient-text"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerItemVariants}
        >
          {title}
        </motion.h2>

        {/* フィルターボタン */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 relative z-20">
          <button
            className={`px-6 py-2 rounded-full font-zen font-medium transition-all duration-300 cursor-pointer ${
              filter === 'all'
                ? 'bg-ocean-cobalt text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-ocean-cobalt hover:text-white'
            }`}
            onClick={() => handleFilterChange('all')}
            type="button"
          >
            すべて
          </button>
          <button
            className={`px-6 py-2 rounded-full font-zen font-medium transition-all duration-300 cursor-pointer ${
              filter === 'magazine'
                ? 'bg-ocean-cobalt text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-ocean-cobalt hover:text-white'
            }`}
            onClick={() => handleFilterChange('magazine')}
            type="button"
          >
            雑誌媒体
          </button>
          <button
            className={`px-6 py-2 rounded-full font-zen font-medium transition-all duration-300 cursor-pointer ${
              filter === 'web'
                ? 'bg-ocean-cobalt text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-ocean-cobalt hover:text-white'
            }`}
            onClick={() => handleFilterChange('web')}
            type="button"
          >
            Web媒体
          </button>
        </div>

        {/* ポートフォリオグリッド */}
        <AnimatePresence mode="popLayout">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto relative z-10">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    duration: 0.3,
                    delay: index * 0.05,
                    ease: "easeOut"
                  }
                }}
                exit={{ 
                  opacity: 0, 
                  y: -20,
                  transition: { duration: 0.2 }
                }}
                className="portfolio-item relative overflow-hidden rounded-lg shadow-lg group cursor-pointer"
                whileHover={{ 
                  scale: 1.03,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
                style={{ cursor: 'pointer' }}
                onClick={() => handleItemClick(item)}
              >
                <div 
                  className="block w-full h-64 relative"
                >
                  <Image
                    src={getImageUrl(item)}
                    alt={item.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    unoptimized={getImageUrl(item).startsWith('http')}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 pointer-events-none">
                  <div className="text-white">
                    <h3 className="text-xl font-zen font-medium mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm font-kiwi font-light">
                      {item.shortDescription}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>

        {/* 説明文 */}
        {description && (
          <motion.div
            className="mt-16 max-w-4xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerItemVariants}
          >
            <div
              className="text-gray-700 leading-relaxed font-kiwi"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </motion.div>
        )}
      </div>

      {/* モーダル */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        data={selectedItem ? selectedItem.detail : null}
      />
    </section>
  );
}
