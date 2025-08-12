import { fetchInstagramPosts, transformInstagramPost } from '@/lib/instagram';
import InstagramClient from './InstagramClient';
import { InstagramPost } from '@/types';
import { getPlaceholderImage } from '@/lib/utils';

// デフォルトの投稿データ（APIが利用できない場合のフォールバック）
const defaultPosts: InstagramPost[] = [
  {
    id: '1',
    image: getPlaceholderImage(300, 300, '87CEEB', 'FFFFFF', '島の風景1'),
    alt: '島の風景1',
  },
  {
    id: '2',
    image: getPlaceholderImage(300, 300, 'FFD700', 'FFFFFF', '島の風景2'),
    alt: '島の風景2',
  },
  {
    id: '3',
    image: getPlaceholderImage(300, 300, 'FF6B6B', 'FFFFFF', '島の風景3'),
    alt: '島の風景3',
  },
  {
    id: '4',
    image: getPlaceholderImage(300, 300, '26A69A', 'FFFFFF', '島の風景4'),
    alt: '島の風景4',
  },
  {
    id: '5',
    image: getPlaceholderImage(300, 300, '4A90E2', 'FFFFFF', '島の風景5'),
    alt: '島の風景5',
  },
  {
    id: '6',
    image: getPlaceholderImage(300, 300, 'E0F2F1', '333333', '島の風景6'),
    alt: '島の風景6',
  },
];

export default async function InstagramServer() {
  // Instagram APIから投稿を取得
  const instagramPosts = await fetchInstagramPosts(6);
  
  // APIレスポンスを変換
  const posts: InstagramPost[] = instagramPosts.length > 0
    ? instagramPosts.map(transformInstagramPost)
    : defaultPosts;

  // あなたのInstagramアカウントURLをここに設定してください
  const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://instagram.com/your_username';

  return <InstagramClient posts={posts} instagramUrl={instagramUrl} />;
}