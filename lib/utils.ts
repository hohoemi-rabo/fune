import { clsx, type ClassValue } from 'clsx';

// クラス名を結合するユーティリティ（Tailwind CSS用）
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// スムーズスクロール
export const smoothScrollTo = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
};

// デバウンス関数
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func(...args);
    }, wait);
  };
};

// スロットル関数
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle = false;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
};

// フォームデータのバリデーション
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateContactForm = (data: {
  name: string;
  email: string;
  inquiryType: string;
  message: string;
}) => {
  const errors: Record<string, string> = {};

  if (!data.name.trim()) {
    errors.name = 'お名前を入力してください';
  }

  if (!data.email.trim()) {
    errors.email = 'メールアドレスを入力してください';
  } else if (!validateEmail(data.email)) {
    errors.email = '有効なメールアドレスを入力してください';
  }

  if (!data.inquiryType) {
    errors.inquiryType = 'お問い合わせ内容を選択してください';
  }

  if (!data.message.trim()) {
    errors.message = 'メッセージを入力してください';
  } else if (data.message.trim().length < 10) {
    errors.message = 'メッセージは10文字以上で入力してください';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// LocalStorageヘルパー（クライアントサイドのみ）
export const storage = {
  get: (key: string) => {
    if (typeof window === 'undefined') return null;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error reading from localStorage:`, error);
      return null;
    }
  },
  set: (key: string, value: any) => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing to localStorage:`, error);
    }
  },
  remove: (key: string) => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing from localStorage:`, error);
    }
  },
};

// ナビゲーションアイテム
export const navigationItems = [
  { href: '#home', label: 'ホーム' },
  { href: '#about', label: 'プロフィール' },
  { href: '#expertise', label: '専門分野' },
  { href: '#portfolio', label: 'ポートフォリオ' },
  { href: '#skills', label: 'サービス' },
  { href: '#contact', label: 'お問い合わせ' },
];

// ソーシャルリンク
export const socialLinks = [
  {
    name: 'Instagram',
    url: 'https://instagram.com',
    icon: 'fab fa-instagram',
  },
  {
    name: 'Facebook',
    url: 'https://facebook.com',
    icon: 'fab fa-facebook',
  },
];

// 画像のプレースホルダーURL生成
export const getPlaceholderImage = (
  width: number,
  height: number,
  bgColor: string = '87CEEB',
  textColor: string = 'FFFFFF',
  text: string = 'Image'
) => {
  return `https://via.placeholder.com/${width}x${height}/${bgColor}/${textColor}?text=${encodeURIComponent(
    text
  )}`;
};

// 日付フォーマット
export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d);
};

// 数値フォーマット（カンマ区切り）
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('ja-JP').format(num);
};

// URLパラメータの取得
export const getQueryParam = (param: string): string | null => {
  if (typeof window === 'undefined') return null;
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
};

// クリップボードにコピー
export const copyToClipboard = async (text: string): Promise<boolean> => {
  if (typeof window === 'undefined') return false;

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy:', err);
    return false;
  }
};

// ランダムな遅延時間を生成（アニメーション用）
export const getRandomDelay = (min: number = 0, max: number = 1000): number => {
  return Math.random() * (max - min) + min;
};

// 配列をシャッフル
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// ページトップへスクロール
export const scrollToTop = () => {
  if (typeof window !== 'undefined') {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
};

// スクロール位置の取得
export const getScrollPosition = () => {
  if (typeof window === 'undefined') return 0;
  return window.pageYOffset || document.documentElement.scrollTop;
};

// 要素が画面内にあるかチェック
export const isElementInViewport = (element: HTMLElement): boolean => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};
