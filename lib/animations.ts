// パーティクル設定
export const particlesConfig = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: '#ffffff',
    },
    shape: {
      type: 'circle',
    },
    opacity: {
      value: 0.3,
      random: true,
    },
    size: {
      value: 3,
      random: true,
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: '#ffffff',
      opacity: 0.2,
      width: 1,
    },
    move: {
      enable: true,
      speed: 2,
      direction: 'none' as const,
      random: false,
      straight: false,
      out_mode: 'out' as const,
      bounce: false,
    },
  },
  interactivity: {
    detect_on: 'canvas' as const,
    events: {
      onhover: {
        enable: true,
        mode: 'grab' as const,
      },
      onclick: {
        enable: true,
        mode: 'push' as const,
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 140,
        line_linked: {
          opacity: 0.5,
        },
      },
      push: {
        particles_nb: 4,
      },
    },
  },
  retina_detect: true,
};

// モバイル用のパーティクル設定
export const mobileParticlesConfig = {
  ...particlesConfig,
  particles: {
    ...particlesConfig.particles,
    number: {
      value: 40, // モバイルでは半分に
      density: {
        enable: true,
        value_area: 800,
      },
    },
  },
};

// Swiperの設定
export const swiperConfig = {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  breakpoints: {
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
    },
  },
};

// AOSアニメーションの設定
export const aosConfig = {
  duration: 1000,
  once: true,
  mirror: false,
};

// スムーズスクロールのオプション
export const smoothScrollOptions: ScrollIntoViewOptions = {
  behavior: 'smooth',
  block: 'start',
};

// 3Dカードのtilt設定
export const tiltConfig = {
  max: 25,
  speed: 400,
  glare: true,
  'max-glare': 0.5,
  perspective: 1000,
  scale: 1.05,
};

// Framer Motionのアニメーションバリアント
export const fadeInUpVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

export const fadeInVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export const scaleInVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export const slideInLeftVariants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

export const slideInRightVariants = {
  hidden: {
    opacity: 0,
    x: 20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

// スタガーアニメーション用のコンテナバリアント
export const staggerContainerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

export const staggerItemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

// 波アニメーションのバリアント
export const waveVariants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      ease: 'easeInOut',
      repeat: Infinity,
    },
  },
};

// フロートアニメーションのバリアント
export const floatVariants = {
  animate: {
    y: [0, -20, -10, -30, 0],
    x: [0, 10, -10, 5, 0],
    transition: {
      duration: 15,
      ease: 'easeInOut',
      repeat: Infinity,
    },
  },
};

// モーダルアニメーションのバリアント
export const modalOverlayVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

export const modalContentVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: 50,
    scale: 0.95,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
};

// タイムラインアニメーションの遅延計算
export const getTimelineDelay = (index: number, baseDelay: number = 0.1) => {
  return index * baseDelay;
};

// デバイスサイズのチェック
export const isMobile = () => {
  if (typeof window !== 'undefined') {
    return window.innerWidth < 768;
  }
  return false;
};

export const isTablet = () => {
  if (typeof window !== 'undefined') {
    return window.innerWidth >= 768 && window.innerWidth < 1024;
  }
  return false;
};

export const isDesktop = () => {
  if (typeof window !== 'undefined') {
    return window.innerWidth >= 1024;
  }
  return false;
};

// アニメーションの有効/無効を判定
export const shouldReduceMotion = () => {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  return false;
};

// パフォーマンスを考慮したアニメーション設定
export const getOptimizedAnimationConfig = () => {
  const reduceMotion = shouldReduceMotion();
  const mobile = isMobile();

  if (reduceMotion) {
    return {
      duration: 0,
      delay: 0,
      stagger: 0,
    };
  }

  if (mobile) {
    return {
      duration: 0.6,
      delay: 0.1,
      stagger: 0.08,
    };
  }

  return {
    duration: 0.8,
    delay: 0.2,
    stagger: 0.1,
  };
};
