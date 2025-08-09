'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { PortfolioDetail } from '@/types';
import { modalOverlayVariants, modalContentVariants } from '@/lib/animations';
import { cn } from '@/lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioDetail | null;
  className?: string;
}

export default function Modal({
  isOpen,
  onClose,
  data,
  className,
}: ModalProps) {
  // ESCキーでモーダルを閉じる
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // モーダルが開いている時はbodyのスクロールを無効化
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!data) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* オーバーレイ */}
          <motion.div
            className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-sm"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalOverlayVariants}
            onClick={onClose}
          />

          {/* モーダルコンテンツ */}
          <motion.div
            className="fixed inset-0 z-[1001] flex items-center justify-center p-4 pointer-events-none"
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className={cn(
                'modal-content pointer-events-auto',
                'bg-white rounded-[20px] w-full max-w-[700px] max-h-[90vh] overflow-hidden',
                'shadow-2xl',
                className
              )}
              variants={modalContentVariants}
              onClick={(e) => e.stopPropagation()}
            >
              {/* ヘッダー */}
              <div className="modal-header bg-gradient-to-r from-ocean-cobalt to-light-cobalt text-white p-8 relative">
                <button
                  onClick={onClose}
                  className="modal-close absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-300 flex items-center justify-center group"
                  aria-label="閉じる"
                >
                  <FontAwesomeIcon
                    icon={faTimes}
                    className="text-white text-xl group-hover:rotate-90 transition-transform duration-300"
                  />
                </button>
                <h2 className="text-2xl font-zen font-medium pr-12">
                  {data.title}
                </h2>
              </div>

              {/* ボディ */}
              <div className="modal-body p-8 overflow-y-auto max-h-[calc(90vh-8rem)]">
                {/* メタ情報 */}
                <div className="modal-meta grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 p-6 bg-gradient-to-br from-blue-50 to-green-50 rounded-[15px]">
                  {Object.entries(data.meta).map(([key, value]) => (
                    <div key={key} className="modal-meta-item">
                      <div className="modal-meta-label text-sm text-gray-600 mb-1 font-medium">
                        {key}
                      </div>
                      <div className="modal-meta-value text-base text-gray-800 font-semibold">
                        {value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* 説明文 */}
                <div
                  className="modal-description text-gray-700 leading-relaxed mb-6 font-kiwi"
                  dangerouslySetInnerHTML={{
                    __html: data.description.replace(/\n/g, '<br>'),
                  }}
                />

                {/* タグ */}
                <div className="modal-tags flex flex-wrap gap-2">
                  {data.tags.map((tag, index) => (
                    <motion.span
                      key={index}
                      className="modal-tag bg-gradient-to-r from-aurora-teal to-seaweed-green text-white px-4 py-1.5 rounded-[20px] text-sm font-medium"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// シンプルなモーダル（汎用）
interface SimpleModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function SimpleModal({
  isOpen,
  onClose,
  title,
  children,
  className,
}: SimpleModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-sm"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalOverlayVariants}
            onClick={onClose}
          />

          <motion.div
            className="fixed inset-0 z-[1001] flex items-center justify-center p-4 pointer-events-none"
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className={cn(
                'pointer-events-auto bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl',
                className
              )}
              variants={modalContentVariants}
              onClick={(e) => e.stopPropagation()}
            >
              {title && (
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-zen font-medium">{title}</h3>
                  <button
                    onClick={onClose}
                    className="w-8 h-8 rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center"
                    aria-label="閉じる"
                  >
                    <FontAwesomeIcon icon={faTimes} className="text-gray-500" />
                  </button>
                </div>
              )}
              {children}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
