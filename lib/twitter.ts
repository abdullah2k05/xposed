import type { TwitterProfile } from './types'

const GUEST_BEARER =
  'AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA'

export async function fetchTwitterProfile(username: string): Promise<TwitterProfile | null> {
  // Zero-auth methods only: guest token → syndication → page scrape
  const guest = await fetchViaGuestToken(username)
  if (guest) return guest

  const syndi = await fetchViaSyndication(username)
  if (syndi) return syndi

  const scraped = await fetchViaPageScrape(username)
  if (scraped) return scraped

  console.error(`[xposed] All fetchers failed for @${username}`)
  return null
}

async function fetchViaGuestToken(username: string): Promise<TwitterProfile | null> {
  try {
    const tokenRes = await fetch('https://api.twitter.com/1.1/guest/activate.json', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GUEST_BEARER}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    if (!tokenRes.ok) {
      const body = await tokenRes.text()
      console.error(`[xposed] Guest token error (${tokenRes.status}):`, body.slice(0, 200))
      return null
    }
    const tokenData = await tokenRes.json()
    const guestToken = tokenData.guest_token
    if (!guestToken) return null

    const profileRes = await fetch(
      `https://api.twitter.com/1.1/users/show.json?screen_name=${username}`,
      {
        headers: {
          Authorization: `Bearer ${GUEST_BEARER}`,
          'x-guest-token': guestToken,
        },
      }
    )
    if (!profileRes.ok) {
      const body = await profileRes.text()
      console.error(`[xposed] Guest profile error (${profileRes.status}):`, body.slice(0, 200))
      return null
    }
    const u = await profileRes.json()
    if (!u || u.errors) {
      console.error(`[xposed] Guest profile errors:`, JSON.stringify(u?.errors).slice(0, 200))
      return null
    }
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
    console.error(`[xposed] Guest token exception:`, err)
    return null
  }
}

async function fetchViaSyndication(username: string): Promise<TwitterProfile | null> {
  try {
    const res = await fetch(
      `https://cdn.syndication.twimg.com/widgets/followbutton/info.json?screen_names=${username}`,
      {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
      }
    )
    if (!res.ok) return null
    const json = await res.json()
    const u = Array.isArray(json) ? json[0] : json
    if (!u || !u.screen_name) return null
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
  } catch {
    return null
  }
}

async function fetchViaPageScrape(username: string): Promise<TwitterProfile | null> {
  try {
    const res = await fetch(`https://x.com/${username}`, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml',
      },
    })
    if (!res.ok) return null
    const html = await res.text()

    const ogTitle = html.match(/<meta[^>]+property="og:title"[^>]+content="([^"]+)"/)?.[1]
    const ogDesc = html.match(/<meta[^>]+property="og:description"[^>]+content="([^"]+)"/)?.[1]
    const ogImage = html.match(/<meta[^>]+property="og:image"[^>]+content="([^"]+)"/)?.[1]
    const displayName = ogTitle?.replace(/ on X$/, '')?.replace(/ \(@\w+\)$/, '')?.trim() || username
    const bio = ogDesc?.replace(/^"(.+)"$/, '$1') || ''

    const followersMatch = html.match(/([\d,]+)\s*(?:Follower|follower)/)
    const followersCount = followersMatch
      ? parseInt(followersMatch[1].replace(/,/g, ''))
      : 0

    return {
      username,
      displayName,
      bio,
      avatarUrl: ogImage || '',
      bannerUrl: '',
      followersCount,
      followingCount: 0,
      tweetsCount: 0,
      verified: html.includes('verified') || html.includes('Verified') || false,
      joinDate: '',
      recentTweets: [],
      profileLinkColor: '#1d9bf0',
    }
  } catch {
    return null
  }
}
