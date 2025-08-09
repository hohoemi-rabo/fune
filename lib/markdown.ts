import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const contentDirectory = path.join(process.cwd(), 'content');

// MDファイルを読み込んでパースする関数
export async function getMarkdownContent(filename: string) {
  const fullPath = path.join(contentDirectory, `${filename}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // gray-matterでフロントマターと本文を分離
  const { data, content } = matter(fileContents);

  // Markdownを HTMLに変換
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    data,
    contentHtml,
  };
}

// プロフィール情報を取得
export async function getProfileData() {
  const { data, contentHtml } = await getMarkdownContent('profile');
  return {
    name: data.name,
    title: data.title,
    tagline: data.tagline,
    subtitle1: data.subtitle1,
    subtitle2: data.subtitle2,
    subtagline: data.subtagline,
    profileImage: data.profileImage,
    stats: data.stats,
    bio: contentHtml,
  };
}

// 専門分野情報を取得
export async function getExpertiseData() {
  const { data, contentHtml } = await getMarkdownContent('expertise');
  return {
    title: data.title,
    items: data.items,
    description: contentHtml,
  };
}

// ポートフォリオ情報を取得
export async function getPortfolioData() {
  const { data, contentHtml } = await getMarkdownContent('portfolio');
  return {
    title: data.title,
    items: data.items,
    description: contentHtml,
  };
}

// 実績情報を取得
export async function getAchievementsData() {
  const { data, contentHtml } = await getMarkdownContent('achievements');
  return {
    title: data.title,
    items: data.items,
    description: contentHtml,
  };
}

// スキル・サービス情報を取得
export async function getSkillsData() {
  const { data, contentHtml } = await getMarkdownContent('skills');
  return {
    title: data.title,
    skills: data.skills,
    pricing: data.pricing,
    description: contentHtml,
  };
}

// すべてのコンテンツデータを一度に取得
export async function getAllContentData() {
  const [profile, expertise, portfolio, achievements, skills] =
    await Promise.all([
      getProfileData(),
      getExpertiseData(),
      getPortfolioData(),
      getAchievementsData(),
      getSkillsData(),
    ]);

  return {
    profile,
    expertise,
    portfolio,
    achievements,
    skills,
  };
}
