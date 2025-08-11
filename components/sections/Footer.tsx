'use client';

import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { socialLinks } from '@/lib/utils';
import { fadeInUpVariants } from '@/lib/animations';
import { SimpleParticlesBackground } from '@/components/effects/ParticlesBackground';

interface FooterProps {
  name?: string;
  year?: number;
}

export default function Footer({
  name = '本岡紗代',
  year = new Date().getFullYear(),
}: FooterProps) {
  // ソーシャルアイコンマッピング
  const iconMap = {
    Instagram: faInstagram,
    Facebook: faFacebook,
  };

  return (
    <footer className="relative bg-deep-ocean text-white z-20 overflow-hidden">
      <SimpleParticlesBackground 
        className="pointer-events-none opacity-30" 
        id="footer-particles" 
      />
      {/* 波のSVG */}
      <div className="absolute top-0 left-0 right-0 transform -translate-y-full z-10">
        <svg viewBox="0 0 1440 120" className="w-full">
          <path
            fill="#1A237E"
            d="M0,80 C150,40 350,120 600,80 C850,40 1050,120 1300,80 C1370,100 1410,100 1440,110 L1440,120 L0,120 Z"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="flex flex-col items-center">
          <motion.h3
            className="text-2xl font-zen font-medium mb-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUpVariants}
          >
            {name}
          </motion.h3>

          <motion.div
            className="flex gap-6 mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUpVariants}
            transition={{ delay: 0.1 }}
          >
            {socialLinks.map((link, index) => {
              const icon = iconMap[link.name as keyof typeof iconMap];
              return (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-3xl hover:text-coral-pink transition-colors transform hover:scale-110"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  aria-label={`${link.name}を開く`}
                >
                  {icon && <FontAwesomeIcon icon={icon} />}
                </motion.a>
              );
            })}
          </motion.div>

          <motion.p
            className="text-sm opacity-70 font-kiwi font-light"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUpVariants}
            transition={{ delay: 0.3 }}
          >
            &copy; {year} {name}. All rights reserved.
          </motion.p>
        </div>
      </div>
    </footer>
  );
}

// 拡張版フッター（リンク付き）
interface ExtendedFooterProps extends FooterProps {
  showLinks?: boolean;
  showNewsletter?: boolean;
}

export function ExtendedFooter({
  name = '本岡紗代',
  year = new Date().getFullYear(),
  showLinks = false,
  showNewsletter = false,
}: ExtendedFooterProps) {
  // ソーシャルアイコンマッピング
  const iconMap = {
    Instagram: faInstagram,
    Facebook: faFacebook,
  };

  const footerLinks = [
    { title: 'ホーム', href: '#home' },
    { title: 'プロフィール', href: '#about' },
    { title: '専門分野', href: '#expertise' },
    { title: 'ポートフォリオ', href: '#portfolio' },
    { title: 'お問い合わせ', href: '#contact' },
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ニュースレター登録処理
  };

  return (
    <footer className="relative bg-deep-ocean text-white z-20 overflow-hidden">
      <SimpleParticlesBackground 
        className="pointer-events-none opacity-30" 
        id="footer-extended-particles" 
      />
      {/* 波のSVG */}
      <div className="absolute top-0 left-0 right-0 transform -translate-y-full z-10">
        <svg viewBox="0 0 1440 120" className="w-full">
          <path
            fill="#1A237E"
            d="M0,80 C150,40 350,120 600,80 C850,40 1050,120 1300,80 C1370,100 1410,100 1440,110 L1440,120 L0,120 Z"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUpVariants}
          >
            <h3 className="text-xl font-zen font-medium mb-4">{name}</h3>
            <p className="text-sm opacity-80 font-kiwi font-light">
              海と離島を愛するWebライター。
              <br />
              地域の魅力を言葉で伝えます。
            </p>
          </motion.div>

          {/* Links */}
          {showLinks && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUpVariants}
              transition={{ delay: 0.1 }}
            >
              <h4 className="text-lg font-zen font-medium mb-4">リンク</h4>
              <ul className="space-y-2">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm opacity-80 hover:opacity-100 hover:text-coral-pink transition-all"
                      onClick={(e) => {
                        e.preventDefault();
                        const target = document.querySelector(link.href);
                        target?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Newsletter */}
          {showNewsletter && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUpVariants}
              transition={{ delay: 0.2 }}
            >
              <h4 className="text-lg font-zen font-medium mb-4">
                ニュースレター
              </h4>
              <p className="text-sm opacity-80 mb-4 font-kiwi font-light">
                最新の記事情報をお届けします
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  placeholder="メールアドレス"
                  className="flex-1 px-3 py-2 rounded bg-white/10 border border-white/20 text-sm placeholder-white/50 focus:outline-none focus:border-coral-pink"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-coral-pink rounded hover:bg-red-500 transition-colors text-sm font-zen"
                >
                  登録
                </button>
              </form>
            </motion.div>
          )}
        </div>

        {/* Social & Copyright */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <motion.p
              className="text-sm opacity-70 font-kiwi font-light mb-4 md:mb-0"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUpVariants}
            >
              &copy; {year} {name}. All rights reserved.
            </motion.p>

            <motion.div
              className="flex gap-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUpVariants}
            >
              {socialLinks.map((link) => {
                const icon = iconMap[link.name as keyof typeof iconMap];
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl hover:text-coral-pink transition-colors transform hover:scale-110"
                    aria-label={`${link.name}を開く`}
                  >
                    {icon && <FontAwesomeIcon icon={icon} />}
                  </a>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}
