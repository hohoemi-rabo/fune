import Navigation from '@/components/ui/Navigation';
import BackToTop from '@/components/ui/BackToTop';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Expertise from '@/components/sections/Expertise';
import Portfolio from '@/components/sections/Portfolio';
import Achievements from '@/components/sections/Achievements';
import Skills from '@/components/sections/Skills';
import Instagram from '@/components/sections/Instagram';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';
import { getAllContentData } from '@/lib/markdown';

export default async function Home() {
  // MDファイルからコンテンツデータを取得
  const { profile, expertise, portfolio, achievements, skills } =
    await getAllContentData();

  return (
    <>
      {/* ナビゲーション */}
      <Navigation />

      {/* メインコンテンツ */}
      <main id="main-content">
        {/* ヒーローセクション */}
        <Hero
          title={profile.title}
          subtitle1={profile.subtitle1}
          subtitle2={profile.subtitle2}
          subtagline={profile.subtagline}
        />

        {/* プロフィールセクション */}
        <About
          name={profile.name}
          profileImage={profile.profileImage}
          bio={profile.bio}
          stats={profile.stats}
        />

        {/* 専門分野セクション */}
        <Expertise
          title={expertise.title}
          items={expertise.items}
          description={expertise.description}
        />

        {/* ポートフォリオセクション */}
        <Portfolio
          title={portfolio.title}
          items={portfolio.items}
          description={portfolio.description}
        />

        {/* 実績セクション */}
        <Achievements
          title={achievements.title}
          items={achievements.items}
          description={achievements.description}
        />

        {/* スキル＆サービスセクション */}
        <Skills
          title={skills.title}
          skills={skills.skills}
          pricing={skills.pricing}
          description={skills.description}
        />

        {/* Instagramセクション */}
        <Instagram />

        {/* お問い合わせセクション */}
        <Contact />
      </main>

      {/* フッター */}
      <Footer name={profile.name} />

      {/* Back to Topボタン */}
      <BackToTop />
    </>
  );
}

// メタデータの生成（SEO対策）
export async function generateMetadata() {
  const { profile } = await getAllContentData();

  return {
    title: `${profile.name} | ${profile.title}`,
    description: profile.bio.replace(/<[^>]*>/g, '').substring(0, 160),
    openGraph: {
      title: `${profile.name} | ${profile.title}`,
      description: profile.tagline,
      images: [profile.profileImage],
    },
  };
}
