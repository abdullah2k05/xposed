import type { TwitterProfile } from './types'

const TWITTER_BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN

export async function fetchTwitterProfile(username: string): Promise<TwitterProfile | null> {
  const errors: string[] = []

  if (TWITTER_BEARER_TOKEN) {
    const v2 = await fetchViaTwitterAPI(username)
    if (v2) return v2
    errors.push('v2 API failed')
  }

  const v1 = await fetchViaV1API(username)
  if (v1) return v1
  errors.push('v1 API failed')

  const syndi = await fetchViaSyndication(username)
  if (syndi) return syndi
  errors.push('syndication failed')

  console.error(`[xposed] All fetchers failed for @${username}:`, errors.join(', '))
  return null
}

async function fetchViaTwitterAPI(username: string): Promise<TwitterProfile | null> {
  try {
    const res = await fetch(
      `https://api.twitter.com/2/users/by/username/${username}?user.fields=description,profile_image_url,public_metrics,created_at,verified,url`,
      {
        headers: { Authorization: `Bearer ${TWITTER_BEARER_TOKEN}` },
      }
    )
    if (!res.ok) {
      const body = await res.text()
      console.error(`[xposed] Twitter v2 API error (${res.status}):`, body.slice(0, 200))
      return null
    }
    const json = await res.json()
    const u = json.data
    if (!u) {
      console.error(`[xposed] Twitter v2: no user data for @${username}`, JSON.stringify(json).slice(0, 200))
      return null
    }

    let recentTweets: string[] = []
    try {
      const tweetsRes = await fetch(
        `https://api.twitter.com/2/users/${u.id}/tweets?max_results=5&tweet.fields=text`,
        { headers: { Authorization: `Bearer ${TWITTER_BEARER_TOKEN}` } }
      )
      if (tweetsRes.ok) {
        const tweetsData = await tweetsRes.json()
        recentTweets = (tweetsData.data || []).map((t: { text: string }) => t.text)
      }
    } catch { /* tweets are optional */ }

    return {
      username: u.username,
      displayName: u.name,
      bio: u.description || '',
      avatarUrl: (u.profile_image_url || '').replace('_normal', '_400x400'),
      bannerUrl: u.profile_banner_url || '',
      followersCount: u.public_metrics?.followers_count || 0,
      followingCount: u.public_metrics?.following_count || 0,
      tweetsCount: u.public_metrics?.tweet_count || 0,
      verified: u.verified || false,
      joinDate: u.created_at || '',
      recentTweets,
      profileLinkColor: '#1d9bf0',
    }
  } catch (err) {
    console.error(`[xposed] Twitter v2 exception:`, err)
    return null
  }
}

async function fetchViaV1API(username: string): Promise<TwitterProfile | null> {
  try {
    const headers: Record<string, string> = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    }
    if (TWITTER_BEARER_TOKEN) {
      headers['Authorization'] = `Bearer ${TWITTER_BEARER_TOKEN}`
    }
    const res = await fetch(
      `https://api.twitter.com/1.1/users/show.json?screen_name=${username}`,
      { headers }
    )
    if (!res.ok) {
      const body = await res.text()
      console.error(`[xposed] Twitter v1.1 error (${res.status}):`, body.slice(0, 200))
      return null
    }
    const u = await res.json()
    return {
      username: u.screen_name,
      displayName: u.name,
      bio: u.description || '',
      avatarUrl: (u.profile_image_url_https || '').replace('_normal', '_400x400'),
      bannerUrl: u.profile_banner_url || '',
      followersCount: u.followers_count || 0,
      followingCount: u.friends_count || 0,
      tweetsCount: u.statuses_count || 0,
      verified: u.verified || false,
      joinDate: u.created_at || '',
      recentTweets: [],
      profileLinkColor: u.profile_link_color || '#1d9bf0',
    }
  } catch (err) {
    console.error(`[xposed] Twitter v1.1 exception:`, err)
    return null
  }
}

async function fetchViaSyndication(username: string): Promise<TwitterProfile | null> {
  try {
    const res = await fetch(
      `https://cdn.syndication.twimg.com/widgets/followbutton/info.json?screen_names=${username}`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
      }
    )
    if (!res.ok) {
      console.error(`[xposed] Syndication error (${res.status})`)
      return null
    }
    const json = await res.json()
    const u = Array.isArray(json) ? json[0] : json
    if (!u || !u.screen_name) {
      console.error(`[xposed] Syndication: no data for @${username}`, JSON.stringify(json).slice(0, 200))
      return null
    }
    return {
      username: u.screen_name,
      displayName: u.name || username,
      bio: u.description || '',
      avatarUrl: (u.profile_image_url_https || u.profile_image_url || '').replace('_normal', '_400x400'),
      bannerUrl: '',
      followersCount: u.followers_count || 0,
      followingCount: 0,
      tweetsCount: u.statuses_count || 0,
      verified: false,
      joinDate: '',
      recentTweets: [],
      profileLinkColor: '#1d9bf0',
    }
  } catch (err) {
    console.error(`[xposed] Syndication exception:`, err)
    return null
  }
}
