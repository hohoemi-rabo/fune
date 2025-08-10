'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ContactFormData } from '@/types';
import { fadeInUpVariants } from '@/lib/animations';
import { validateContactForm } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface ContactProps {
  title?: string;
}

export default function Contact({ title = 'お問い合わせ' }: ContactProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    inquiryType: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // エラーをクリア
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // バリデーション
    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // 実際のフォーム送信処理をここに実装
      // 現在は仮実装（2秒待機）
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // 成功時の処理
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        inquiryType: '',
        message: '',
      });

      // 成功メッセージを3秒後に非表示
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } catch (error) {
      setSubmitStatus('error');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-br from-ocean-cobalt via-cobalt-blue to-deep-cobalt text-white"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-zen font-medium text-center mb-12 text-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUpVariants}
        >
          {title}
        </motion.h2>

        <div className="max-w-2xl mx-auto">
          <motion.form
            className="glassmorphism rounded-lg p-8"
            onSubmit={handleSubmit}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUpVariants}
          >
            {/* お名前 */}
            <div className="mb-6">
              <label htmlFor="name" className="block mb-2">
                お名前 <span className="text-coral-pink">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={cn(
                  'w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30',
                  'focus:outline-none focus:ring-2 focus:ring-coral-pink',
                  'placeholder-white/70 text-white',
                  errors.name && 'border-coral-pink'
                )}
                placeholder="山田太郎"
                disabled={isSubmitting}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-coral-pink">{errors.name}</p>
              )}
            </div>

            {/* メールアドレス */}
            <div className="mb-6">
              <label htmlFor="email" className="block mb-2">
                メールアドレス <span className="text-coral-pink">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={cn(
                  'w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30',
                  'focus:outline-none focus:ring-2 focus:ring-coral-pink',
                  'placeholder-white/70 text-white',
                  errors.email && 'border-coral-pink'
                )}
                placeholder="example@email.com"
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-coral-pink">{errors.email}</p>
              )}
            </div>

            {/* お問い合わせ内容 */}
            <div className="mb-6">
              <label htmlFor="inquiryType" className="block mb-2">
                お問い合わせ内容 <span className="text-coral-pink">*</span>
              </label>
              <select
                id="inquiryType"
                name="inquiryType"
                value={formData.inquiryType}
                onChange={handleChange}
                className={cn(
                  'w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30',
                  'focus:outline-none focus:ring-2 focus:ring-coral-pink',
                  'text-white [&>option]:bg-gray-800 [&>option]:text-white',
                  errors.inquiryType && 'border-coral-pink'
                )}
                disabled={isSubmitting}
              >
                <option value="">選択してください</option>
                <option value="writing">執筆依頼</option>
                <option value="interview">取材依頼</option>
                <option value="other">その他</option>
              </select>
              {errors.inquiryType && (
                <p className="mt-1 text-sm text-coral-pink">
                  {errors.inquiryType}
                </p>
              )}
            </div>

            {/* メッセージ */}
            <div className="mb-6">
              <label htmlFor="message" className="block mb-2">
                メッセージ <span className="text-coral-pink">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className={cn(
                  'w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30',
                  'focus:outline-none focus:ring-2 focus:ring-coral-pink',
                  'placeholder-white/70 text-white resize-none',
                  errors.message && 'border-coral-pink'
                )}
                placeholder="お気軽にお問い合わせください"
                disabled={isSubmitting}
              />
              {errors.message && (
                <p className="mt-1 text-sm text-coral-pink">{errors.message}</p>
              )}
            </div>

            {/* 送信ボタン */}
            <div className="flex flex-col items-center">
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  'w-64 py-3 bg-gradient-to-r from-coral-pink to-sunset-gold',
                  'text-white rounded-lg font-zen font-medium',
                  'hover:shadow-lg transition-all duration-300',
                  'transform hover:scale-105',
                  'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
                )}
                whileHover={!isSubmitting ? { scale: 1.05 } : {}}
                whileTap={!isSubmitting ? { scale: 0.95 } : {}}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    送信中...
                  </span>
                ) : (
                  '送信する'
                )}
              </motion.button>

              {/* ステータスメッセージ */}
              {submitStatus === 'success' && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 text-sm text-green-300"
                >
                  お問い合わせありがとうございます。内容を確認後、ご連絡させていただきます。
                </motion.p>
              )}

              {submitStatus === 'error' && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 text-sm text-coral-pink"
                >
                  送信に失敗しました。もう一度お試しください。
                </motion.p>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
