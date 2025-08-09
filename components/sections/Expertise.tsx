'use client';

import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers,
  faUtensils,
  faMapMarkedAlt,
  faChartLine,
  faEdit,
  faCamera,
} from '@fortawesome/free-solid-svg-icons';
import { ExpertiseItem } from '@/types';
import {
  staggerContainerVariants,
  staggerItemVariants,
  floatVariants,
} from '@/lib/animations';
import Card3D from '@/components/ui/Card3D';

// アイコンマッピング
const iconMap = {
  'fa-users': faUsers,
  'fa-utensils': faUtensils,
  'fa-map-marked-alt': faMapMarkedAlt,
  'fa-chart-line': faChartLine,
  'fa-edit': faEdit,
  'fa-camera': faCamera,
};

// カラーマッピング
const colorMap: Record<string, { text: string; border: string; bg: string }> = {
  'sunset-gold': {
    text: 'text-sunset-gold',
    border: 'border-sunset-gold',
    bg: 'from-sunset-gold/0 to-sunset-gold/10',
  },
  'coral-pink': {
    text: 'text-coral-pink',
    border: 'border-coral-pink',
    bg: 'from-coral-pink/0 to-coral-pink/10',
  },
  'ocean-cobalt': {
    text: 'text-ocean-cobalt',
    border: 'border-ocean-cobalt',
    bg: 'from-ocean-cobalt/0 to-ocean-cobalt/10',
  },
  'seaweed-green': {
    text: 'text-seaweed-green',
    border: 'border-seaweed-green',
    bg: 'from-seaweed-green/0 to-seaweed-green/10',
  },
  'aurora-purple': {
    text: 'text-aurora-purple',
    border: 'border-aurora-purple',
    bg: 'from-aurora-purple/0 to-aurora-purple/10',
  },
  'aurora-teal': {
    text: 'text-aurora-teal',
    border: 'border-aurora-teal',
    bg: 'from-aurora-teal/0 to-aurora-teal/10',
  },
};

interface ExpertiseProps {
  title: string;
  items: ExpertiseItem[];
  description: string;
}

export default function Expertise({
  title,
  items,
  description,
}: ExpertiseProps) {
  return (
    <section
      id="expertise"
      className="py-20 bg-gradient-to-br from-sea-foam to-sand-white relative overflow-hidden"
    >
      {/* アニメーション背景要素 */}
      <motion.div
        className="absolute top-0 left-0 w-64 h-64 bg-ocean-cobalt/10 rounded-full filter blur-3xl"
        animate="animate"
        variants={floatVariants}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-coral-pink/10 rounded-full filter blur-3xl"
        animate="animate"
        variants={floatVariants}
        transition={{ delay: 3 }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          className="text-4xl font-zen font-medium text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerItemVariants}
        >
          <span className="gradient-text">{title}</span>
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainerVariants}
        >
          {items.map((item, index) => {
            const icon = iconMap[item.icon as keyof typeof iconMap];
            const colors = colorMap[item.color] || colorMap['ocean-cobalt'];

            return (
              <motion.div
                key={item.id}
                variants={staggerItemVariants}
                custom={index}
              >
                <Card3D delay={index * 100}>
                  <div className="group relative bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:scale-105 overflow-hidden hover:shadow-xl border-2 border-transparent hover:border-ocean-cobalt">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${colors.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    />

                    <div
                      className={`relative text-5xl ${colors.text} mb-6 text-center transform group-hover:scale-110 transition-transform duration-500`}
                    >
                      {icon && <FontAwesomeIcon icon={icon} />}
                    </div>

                    <h3 className="text-xl font-zen font-medium mb-4 text-center relative z-10">
                      {item.title}
                    </h3>

                    <p className="text-gray-700 text-center font-kiwi font-light relative z-10">
                      {item.description}
                    </p>

                    <div
                      className={`absolute inset-0 border-2 ${colors.border} rounded-2xl opacity-0 group-hover:opacity-100 transform scale-110 group-hover:scale-100 transition-all duration-500`}
                    />
                  </div>
                </Card3D>
              </motion.div>
            );
          })}
        </motion.div>

        {/* 説明文（HTMLとして表示） */}
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
    </section>
  );
}
