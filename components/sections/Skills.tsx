'use client';

import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMicrophone,
  faPenFancy,
  faCamera,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { SkillItem, PricingPlan } from '@/types';
import {
  fadeInUpVariants,
  slideInLeftVariants,
  slideInRightVariants,
} from '@/lib/animations';
import { useTimelineObserver } from '@/hooks/useIntersectionObserver';
import Card3D from '@/components/ui/Card3D';
import { cn } from '@/lib/utils';

// アイコンマッピング
const iconMap = {
  'fa-microphone': faMicrophone,
  'fa-pen-fancy': faPenFancy,
  'fa-camera': faCamera,
};

interface SkillsProps {
  title: string;
  skills: SkillItem[];
  pricing: PricingPlan[];
  description: string;
}

// タイムラインアイテムコンポーネント
function TimelineItem({ skill, index }: { skill: SkillItem; index: number }) {
  const { ref, className } = useTimelineObserver();
  const isEven = index % 2 === 0;
  const icon = iconMap[skill.icon as keyof typeof iconMap];

  return (
    <div ref={ref} className={`relative flex items-center mb-16 ${className}`}>
      {isEven ? (
        <>
          <div className="w-1/2 pr-8 text-right">
            <motion.div
              className="glass-premium rounded-2xl p-6 transform hover:scale-105 transition-all duration-300"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInRightVariants}
            >
              <h3 className="text-xl font-zen font-medium mb-2">
                {skill.title}
              </h3>
              <p className="text-gray-700 font-kiwi font-light">
                {skill.description}
              </p>
            </motion.div>
          </div>
          <div
            className={`absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-${skill.color} rounded-full border-4 border-white flex items-center justify-center shadow-lg z-10`}
          >
            {icon && <FontAwesomeIcon icon={icon} className="text-white" />}
          </div>
          <div className="w-1/2 pl-8"></div>
        </>
      ) : (
        <>
          <div className="w-1/2 pr-8"></div>
          <div
            className={`absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-${skill.color} rounded-full border-4 border-white flex items-center justify-center shadow-lg z-10`}
          >
            {icon && <FontAwesomeIcon icon={icon} className="text-white" />}
          </div>
          <div className="w-1/2 pl-8">
            <motion.div
              className="glass-premium rounded-2xl p-6 transform hover:scale-105 transition-all duration-300"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInLeftVariants}
            >
              <h3 className="text-xl font-zen font-medium mb-2">
                {skill.title}
              </h3>
              <p className="text-gray-700 font-kiwi font-light">
                {skill.description}
              </p>
            </motion.div>
          </div>
        </>
      )}
    </div>
  );
}

// 料金プランカードコンポーネント
function PricingCard({ plan, index }: { plan: PricingPlan; index: number }) {
  const isPopular = plan.isPopular;
  const delay = index * 100;

  return (
    <Card3D delay={delay} scale={isPopular ? 1.08 : 1.05}>
      <div
        className={cn(
          'relative bg-white rounded-2xl shadow-xl p-8 text-center',
          isPopular &&
            'bg-gradient-to-br from-ocean-cobalt to-cobalt-blue text-white'
        )}
      >
        {isPopular && plan.popularText && (
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-coral-pink rounded-full text-sm">
            {plan.popularText}
          </div>
        )}

        <h3
          className={cn(
            'text-xl font-zen font-medium mb-4',
            isPopular ? 'text-white mt-2' : 'text-ocean-cobalt'
          )}
        >
          {plan.name}
        </h3>

        <p
          className={cn(
            'text-4xl font-zen font-medium mb-4',
            isPopular ? 'text-white' : 'gradient-text'
          )}
        >
          {plan.price}
        </p>

        <ul
          className={cn(
            'space-y-3 mb-6',
            isPopular ? 'text-white' : 'text-gray-700'
          )}
        >
          {plan.features.map((feature, featureIndex) => (
            <li key={featureIndex} className="flex items-center justify-center">
              <FontAwesomeIcon
                icon={faCheck}
                className={cn(
                  'mr-2',
                  isPopular ? 'text-white' : 'text-seaweed-green'
                )}
              />
              {feature}
            </li>
          ))}
        </ul>

        <button
          className={cn(
            'w-full py-3 rounded-full transition-all duration-300',
            isPopular
              ? 'bg-white text-ocean-cobalt hover:bg-gray-100 font-medium'
              : 'border-2 border-ocean-cobalt text-ocean-cobalt hover:bg-ocean-cobalt hover:text-white'
          )}
        >
          詳細を見る
        </button>
      </div>
    </Card3D>
  );
}

export default function Skills({
  title,
  skills,
  pricing,
  description,
}: SkillsProps) {
  return (
    <section
      id="skills"
      className="py-20 bg-sand-white relative overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-zen font-medium text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUpVariants}
        >
          <span className="gradient-text">{title}</span>
        </motion.h2>

        <div className="max-w-4xl mx-auto">
          {/* タイムライン */}
          <div className="relative">
            {/* タイムラインの線 */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-ocean-cobalt to-coral-pink"></div>

            {/* スキルアイテム */}
            {skills.map((skill, index) => (
              <TimelineItem key={skill.title} skill={skill} index={index} />
            ))}
          </div>

          {/* モバイル版タイムライン（シンプル版） */}
          <div className="lg:hidden space-y-6">
            {skills.map((skill, index) => {
              const icon = iconMap[skill.icon as keyof typeof iconMap];
              return (
                <motion.div
                  key={skill.title}
                  className="glass-premium rounded-2xl p-6"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUpVariants}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center mb-3">
                    <div
                      className={`w-10 h-10 bg-${skill.color} rounded-full flex items-center justify-center mr-3`}
                    >
                      {icon && (
                        <FontAwesomeIcon
                          icon={icon}
                          className="text-white text-sm"
                        />
                      )}
                    </div>
                    <h3 className="text-lg font-zen font-medium">
                      {skill.title}
                    </h3>
                  </div>
                  <p className="text-gray-700 font-kiwi font-light">
                    {skill.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* 料金プラン */}
          <motion.div
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUpVariants}
          >
            {pricing.map((plan, index) => (
              <PricingCard key={plan.name} plan={plan} index={index} />
            ))}
          </motion.div>

          {/* 説明文 */}
          {description && (
            <motion.div
              className="mt-16 text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUpVariants}
            >
              <div
                className="text-gray-700 leading-relaxed font-kiwi max-w-3xl mx-auto"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
