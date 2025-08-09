'use client';

import { useEffect, useState, useCallback } from 'react';
import { loadFull } from 'tsparticles';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import type { Container, ISourceOptions } from '@tsparticles/engine';
import {
  particlesConfig,
  mobileParticlesConfig,
  isMobile,
} from '@/lib/animations';
import { cn } from '@/lib/utils';

interface ParticlesBackgroundProps {
  className?: string;
  id?: string;
  config?: ISourceOptions;
}

export default function ParticlesBackground({
  className,
  id = 'particles-js',
  config,
}: ParticlesBackgroundProps) {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = useCallback(async (_container?: Container) => {
    // パーティクルがロードされた後の処理（必要に応じて）
    console.log('Particles loaded');
  }, []);

  // デバイスに応じた設定を選択
  const getConfig = () => {
    if (config) return config;
    return isMobile() ? mobileParticlesConfig : particlesConfig;
  };

  if (!init) {
    return null;
  }

  return (
    <Particles
      id={id}
      className={cn('absolute w-full h-full top-0 left-0 z-[1]', className)}
      particlesLoaded={particlesLoaded}
      options={getConfig()}
    />
  );
}

// シンプルなパーティクル背景（パフォーマンス重視）
export function SimpleParticlesBackground({
  className,
  id = 'simple-particles',
}: ParticlesBackgroundProps) {
  const simpleConfig = {
    particles: {
      number: {
        value: 30,
        density: {
          enable: true,
          area: 1000,
        },
      },
      color: {
        value: '#ffffff',
      },
      shape: {
        type: 'circle',
      },
      opacity: {
        value: 0.5,
        random: true,
      },
      size: {
        value: 2,
        random: true,
      },
      move: {
        enable: true,
        speed: 1,
        direction: 'none' as const,
        random: false,
        straight: false,
        outModes: 'out' as const,
        bounce: false,
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: false,
        },
        onClick: {
          enable: false,
        },
      },
    },
    detectRetina: true,
  };

  return (
    <ParticlesBackground className={className} id={id} config={simpleConfig} />
  );
}

// カラフルなパーティクル背景
export function ColorfulParticlesBackground({
  className,
  id = 'colorful-particles',
}: ParticlesBackgroundProps) {
  const colorfulConfig = {
    particles: {
      number: {
        value: 50,
        density: {
          enable: true,
          area: 800,
        },
      },
      color: {
        value: ['#FF6B6B', '#4A90E2', '#FFD700', '#26A69A', '#9C27B0'],
      },
      shape: {
        type: 'circle',
      },
      opacity: {
        value: 0.6,
        random: true,
      },
      size: {
        value: 4,
        random: true,
      },
      move: {
        enable: true,
        speed: 2,
        direction: 'none' as const,
        random: true,
        straight: false,
        outModes: 'bounce' as const,
        bounce: false,
      },
    },
    interactivity: {
      detectsOn: 'canvas' as const,
      events: {
        onHover: {
          enable: true,
          mode: 'repulse' as const,
        },
        onClick: {
          enable: true,
          mode: 'bubble' as const,
        },
      },
      modes: {
        repulse: {
          distance: 100,
          duration: 0.4,
        },
        bubble: {
          distance: 200,
          size: 10,
          duration: 2,
          opacity: 0.8,
        },
      },
    },
    detectRetina: true,
  };

  return (
    <ParticlesBackground
      className={className}
      id={id}
      config={colorfulConfig}
    />
  );
}

// 星空風パーティクル背景
export function StarsParticlesBackground({
  className,
  id = 'stars-particles',
}: ParticlesBackgroundProps) {
  const starsConfig = {
    particles: {
      number: {
        value: 100,
        density: {
          enable: true,
          area: 1000,
        },
      },
      color: {
        value: '#ffffff',
      },
      shape: {
        type: 'star',
      },
      opacity: {
        value: 0.8,
        random: true,
        animation: {
          enable: true,
          speed: 1,
          minimumValue: 0.1,
          sync: false,
        },
      },
      size: {
        value: 2,
        random: true,
        animation: {
          enable: true,
          speed: 2,
          minimumValue: 0.1,
          sync: false,
        },
      },
      move: {
        enable: true,
        speed: 0.5,
        direction: 'none' as const,
        random: true,
        straight: false,
        outModes: 'out' as const,
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: 'grab' as const,
        },
      },
      modes: {
        grab: {
          distance: 140,
          links: {
            opacity: 0.5,
          },
        },
      },
    },
    detectRetina: true,
  };

  return (
    <ParticlesBackground className={className} id={id} config={starsConfig} />
  );
}
