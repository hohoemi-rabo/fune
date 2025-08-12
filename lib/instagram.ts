export interface InstagramMedia {
  id: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  caption?: string;
  timestamp: string;
}

export interface InstagramApiResponse {
  data: InstagramMedia[];
  paging?: {
    cursors: {
      before: string;
      after: string;
    };
    next?: string;
  };
}

export async function fetchInstagramPosts(limit: number = 12): Promise<InstagramMedia[]> {
  const accessToken = process.env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN;
  const userId = process.env.NEXT_PUBLIC_INSTAGRAM_USER_ID;

  if (!accessToken || !userId) {
    console.warn('Instagram API credentials not configured');
    return [];
  }

  try {
    const fields = 'id,media_type,media_url,thumbnail_url,permalink,caption,timestamp';
    const url = `https://graph.instagram.com/${userId}/media?fields=${fields}&limit=${limit}&access_token=${accessToken}`;
    
    const response = await fetch(url, {
      next: { 
        revalidate: 3600 // キャッシュを1時間保持
      }
    });

    if (!response.ok) {
      throw new Error(`Instagram API error: ${response.status}`);
    }

    const data: InstagramApiResponse = await response.json();
    
    // デバッグ情報
    console.log(`Instagram API: 取得した投稿数 ${data.data.length}`);
    const mediaTypes = data.data.reduce((acc, post) => {
      acc[post.media_type] = (acc[post.media_type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    console.log('メディアタイプ別内訳:', mediaTypes);
    
    // すべてのメディアタイプを含める（動画も表示）
    // 動画の場合はthumbnail_urlを使用
    return data.data.map(post => {
      if (post.media_type === 'VIDEO' && post.thumbnail_url) {
        return { ...post, media_url: post.thumbnail_url };
      }
      return post;
    });
  } catch (error) {
    console.error('Failed to fetch Instagram posts:', error);
    return [];
  }
}

export function transformInstagramPost(media: InstagramMedia) {
  return {
    id: media.id,
    image: media.media_url,
    alt: media.caption || 'Instagram post',
    permalink: media.permalink,
    timestamp: media.timestamp,
  };
}