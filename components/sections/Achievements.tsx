'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { Achievement } from '@/types';
import { fadeInUpVariants } from '@/lib/animations';
import { isMobile } from '@/lib/animations';

// Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay';

interface AchievementsProps {
  title: string;
  items: Achievement[];
  description: string;
}

export default function Achievements({
  title,
  items,
  description,
}: AchievementsProps) {
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobileView(isMobile());
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // モバイルでは通常のリスト表示
  if (isMobileView) {
    return (
      <section className="py-20 bg-gradient-to-r from-ocean-cobalt to-cobalt-blue text-white">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-zen font-medium text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUpVariants}
          >
            {title}
          </motion.h2>

          <div className="space-y-4 max-w-2xl mx-auto">
            {items.map((item, index) => (
              <motion.a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white/20 rounded-lg p-6 glassmorphism hover:bg-white/30 transition-all duration-300"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUpVariants}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <h3 className="text-xl font-zen font-medium mb-1">
                  {item.title}
                </h3>
                <p className="font-kiwi font-light mb-2">{item.subtitle}</p>
                <p className="text-sm opacity-80 flex items-center gap-1">
                  クリックして記事を見る
                  <FontAwesomeIcon
                    icon={faExternalLinkAlt}
                    className="text-xs"
                  />
                </p>
              </motion.a>
            ))}
          </div>

          {description && (
            <motion.div
              className="mt-12 text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUpVariants}
            >
              <div
                className="text-white/90 font-kiwi"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </motion.div>
          )}
        </div>
      </section>
    );
  }

  // デスクトップではSwiperスライダー
  return (
    <section className="py-20 bg-gradient-to-r from-ocean-cobalt to-cobalt-blue text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-zen font-medium text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUpVariants}
        >
          {title}
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUpVariants}
          transition={{ delay: 0.2 }}
        >
          <Swiper
            modules={[Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
            className="achievements-swiper"
          >
            {items.map((item, index) => (
              <SwiperSlide key={index}>
                <motion.a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white/20 rounded-lg p-8 glassmorphism hover:bg-white/30 transition-all duration-300 transform hover:scale-105 h-full"
                  whileHover={{ y: -5 }}
                >
                  <h3 className="text-2xl font-zen font-medium mb-2 text-center">
                    {item.title}
                  </h3>
                  <p className="font-kiwi font-light text-center mb-4">
                    {item.subtitle}
                  </p>
                  <p className="text-sm opacity-80 text-center flex items-center justify-center gap-1">
                    クリックして記事を見る
                    <FontAwesomeIcon
                      icon={faExternalLinkAlt}
                      className="text-xs"
                    />
                  </p>
                </motion.a>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {description && (
          <motion.div
            className="mt-12 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUpVariants}
            transition={{ delay: 0.4 }}
          >
            <div
              className="text-white/90 font-kiwi max-w-3xl mx-auto"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </motion.div>
        )}
      </div>
    </section>
  );
}

// 静的バージョン（Swiperを使わない）
export function StaticAchievements({
  title,
  items,
  description,
}: AchievementsProps) {
  return (
    <section className="py-20 bg-gradient-to-r from-ocean-cobalt to-cobalt-blue text-white">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-zen font-medium text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUpVariants}
        >
          {title}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {items.map((item, index) => (
            <motion.a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white/20 rounded-lg p-6 glassmorphism hover:bg-white/30 transition-all duration-300"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUpVariants}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <h3 className="text-xl font-zen font-medium mb-2 text-center">
                {item.title}
              </h3>
              <p className="font-kiwi font-light text-center mb-3">
                {item.subtitle}
              </p>
              <p className="text-sm opacity-80 text-center flex items-center justify-center gap-1">
                記事を見る
                <FontAwesomeIcon icon={faExternalLinkAlt} className="text-xs" />
              </p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
