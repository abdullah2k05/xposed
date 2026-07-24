import type { TwitterProfile } from './types'

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY
const TWITTER_BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN

export async function fetchTwitterProfile(username: string): Promise<TwitterProfile | null> {
  if (TWITTER_BEARER_TOKEN) {
    return fetchViaTwitterAPI(username)
  }
  return fetchViaScraping(username)
}

async function fetchViaTwitterAPI(username: string): Promise<TwitterProfile | null> {
  try {
    const res = await fetch(
      `https://api.twitter.com/2/users/by/username/${username}?user.fields=description,profile_image_url,public_metrics,created_at,verified`,
      {
        headers: { Authorization: `Bearer ${TWITTER_BEARER_TOKEN}` },
      }
    )
    if (!res.ok) return null
    const data = await res.json()
    const u = data.data
    if (!u) return null

    const tweetsRes = await fetch(
      `https://api.twitter.com/2/users/${u.id}/tweets?max_results=5&tweet.fields=text`,
      { headers: { Authorization: `Bearer ${TWITTER_BEARER_TOKEN}` } }
    )
    let recentTweets: string[] = []
    if (tweetsRes.ok) {
      const tweetsData = await tweetsRes.json()
      recentTweets = (tweetsData.data || []).map((t: { text: string }) => t.text)
    }

    return {
      username: u.username,
      displayName: u.name,
      bio: u.description || '',
      avatarUrl: u.profile_image_url?.replace('_normal', '_400x400') || '',
      bannerUrl: '',
      followersCount: u.public_metrics?.followers_count || 0,
      followingCount: u.public_metrics?.following_count || 0,
      tweetsCount: u.public_metrics?.tweet_count || 0,
      verified: u.verified || false,
      joinDate: u.created_at || '',
      recentTweets,
      profileLinkColor: '#1d9bf0',
    }
  } catch {
    return null
  }
}

async function fetchViaScraping(username: string): Promise<TwitterProfile | null> {
  try {
    const res = await fetch(
      `https://api.twitter.com/1.1/users/show.json?screen_name=${username}`,
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
          ...(TWITTER_BEARER_TOKEN
            ? { Authorization: `Bearer ${TWITTER_BEARER_TOKEN}` }
            : {}),
        },
      }
    )
    if (!res.ok) return null
    const u = await res.json()

    return {
      username: u.screen_name,
      displayName: u.name,
      bio: u.description || '',
      avatarUrl: u.profile_image_url_https?.replace('_normal', '_400x400') || '',
      bannerUrl: u.profile_banner_url || '',
      followersCount: u.followers_count || 0,
      followingCount: u.friends_count || 0,
      tweetsCount: u.statuses_count || 0,
      verified: u.verified || false,
      joinDate: u.created_at || '',
      recentTweets: [],
      profileLinkColor: u.profile_link_color || '#1d9bf0',
    }
  } catch {
    return null
  }
}
