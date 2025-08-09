// ポートフォリオアイテムの型定義
export interface PortfolioItem {
  id: string;
  title: string;
  category: 'magazine' | 'web';
  image: string;
  imageAlt: string;
  shortDescription: string;
}

// ポートフォリオ詳細データの型定義
export interface PortfolioDetail {
  title: string;
  meta: {
    [key: string]: string;
  };
  description: string;
  tags: string[];
}

// 専門分野の型定義
export interface ExpertiseItem {
  icon: string;
  title: string;
  description: string;
  color: string;
  delay?: number;
}

// 実績の型定義
export interface Achievement {
  title: string;
  subtitle: string;
  link: string;
}

// スキル・サービスの型定義
export interface SkillItem {
  icon: string;
  title: string;
  description: string;
  color: string;
}

// 料金プランの型定義
export interface PricingPlan {
  name: string;
  price: string;
  features: string[];
  isPopular?: boolean;
  color?: string;
}

// プロフィール統計の型定義
export interface ProfileStats {
  value: number;
  suffix: string;
  label: string;
}

// ナビゲーションアイテムの型定義
export interface NavItem {
  href: string;
  label: string;
}

// フォームデータの型定義
export interface ContactFormData {
  name: string;
  email: string;
  inquiryType: 'writing' | 'interview' | 'other' | '';
  message: string;
}

// モーダルの型定義
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioDetail | null;
}

// セクションの共通Props
export interface SectionProps {
  className?: string;
}

// カウンターの型定義
export interface CounterProps {
  target: number;
  suffix?: string;
  duration?: number;
}

// 3Dカードの型定義
export interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

// パーティクル設定の型定義
export interface ParticlesConfig {
  particles: {
    number: {
      value: number;
      density: {
        enable: boolean;
        value_area: number;
      };
    };
    color: {
      value: string;
    };
    shape: {
      type: string;
    };
    opacity: {
      value: number;
      random: boolean;
    };
    size: {
      value: number;
      random: boolean;
    };
    line_linked: {
      enable: boolean;
      distance: number;
      color: string;
      opacity: number;
      width: number;
    };
    move: {
      enable: boolean;
      speed: number;
      direction: string;
      random: boolean;
      straight: boolean;
      out_mode: string;
      bounce: boolean;
    };
  };
  interactivity: {
    detect_on: string;
    events: {
      onhover: {
        enable: boolean;
        mode: string;
      };
      onclick: {
        enable: boolean;
        mode: string;
      };
      resize: boolean;
    };
    modes: {
      grab: {
        distance: number;
        line_linked: {
          opacity: number;
        };
      };
      push: {
        particles_nb: number;
      };
    };
  };
  retina_detect: boolean;
}

// Swiperのブレークポイント設定
export interface SwiperBreakpoints {
  [key: number]: {
    slidesPerView: number;
    spaceBetween?: number;
  };
}

// インスタグラム投稿の型定義
export interface InstagramPost {
  id: string;
  image: string;
  alt: string;
}

// ソーシャルリンクの型定義
export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}
