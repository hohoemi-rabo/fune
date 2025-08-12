import type { Metadata } from 'next';
import { Zen_Maru_Gothic, Kiwi_Maru, Noto_Serif_JP } from 'next/font/google';
import './globals.css';

// フォントの設定
const zenMaruGothic = Zen_Maru_Gothic({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-zen',
  display: 'swap',
});

const kiwiMaru = Kiwi_Maru({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-kiwi',
  display: 'swap',
});

const notoSerifJP = Noto_Serif_JP({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-noto-serif',
  display: 'swap',
});

// メタデータ
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'),
  title: '本岡紗代 | 空気と心を言葉に変えるWebライター',
  description:
    '空気と心を言葉に変える。地域密着の取材記事やインタビューを中心に、観光・飲食・暮らし・IT・リフォーム関係など、多彩なジャンルの執筆を行うWebライターです。',
  keywords:
    'Webライター, ライター, 取材, インタビュー, SEO, 観光記事, 食レポ, 飯田市, 長野県, フリーランス',
  authors: [{ name: '本岡紗代' }],
  openGraph: {
    title: '本岡紗代 | 海と離島を愛するWebライター',
    description:
      '空気と心を言葉に変える。地域密着の取材記事やインタビューを中心に執筆活動を行っています。',
    type: 'website',
    locale: 'ja_JP',
    siteName: '本岡紗代 ポートフォリオ',
  },
  twitter: {
    card: 'summary_large_image',
    title: '本岡紗代 | 海と離島を愛するWebライター',
    description:
      '空気と心を言葉に変える。地域密着の取材記事やインタビューを中心に執筆活動を行っています。',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ja"
      className={`${zenMaruGothic.variable} ${kiwiMaru.variable} ${notoSerifJP.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Font Awesome */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          crossOrigin="anonymous"
        />
        {/* ビューポート設定 */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body
        className="font-zen text-gray-800 bg-sand-white antialiased"
        suppressHydrationWarning
      >
        {/* スキップリンク（アクセシビリティ） */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-ocean-cobalt text-white px-4 py-2 rounded-md z-50"
        >
          メインコンテンツへスキップ
        </a>

        {children}
      </body>
    </html>
  );
}
