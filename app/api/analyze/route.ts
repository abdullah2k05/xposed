import { NextRequest, NextResponse } from 'next/server'
import { fetchTwitterProfile } from '@/lib/twitter'
import { analyzeProfile } from '@/lib/analyze'
import { saveProfile, getTopProfiles } from '@/lib/supabase'

export const maxDuration = 60

export async function GET(req: NextRequest) {
  const username = req.nextUrl.searchParams.get('username')
  if (!username || typeof username !== 'string') {
    return NextResponse.json({ error: 'Username required' }, { status: 400 })
  }

  const clean = username.replace(/^@/, '').trim().toLowerCase()
  if (!/^[a-zA-Z0-9_]{1,15}$/.test(clean)) {
    return NextResponse.json({ error: 'Invalid username' }, { status: 400 })
  }

  try {
    const profile = await fetchTwitterProfile(clean)
    if (!profile) {
      return NextResponse.json(
        { error: 'Could not fetch profile. The account may not exist or Twitter API rate limits.' },
        { status: 404 }
      )
    }

    const result = await analyzeProfile(profile)

    await saveProfile({
      username: result.username,
      display_name: result.displayName,
      profile_image_url: result.avatarUrl,
      overall_score: result.overallScore,
      aura_color: result.aura.hex,
      aura_vibe: result.aura.vibe,
      npc_class: result.npcClass.title,
      npc_emoji: result.npcClass.emoji,
      beauty_score: result.beautyRanking.score,
      ban_clock_score: result.banClock.score,
      profile_rating: result.profileRating.overall,
    })

    const topUsers = await getTopProfiles(20)

    return NextResponse.json({ result, topUsers })
  } catch (err) {
    console.error('Analyze error:', err)
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 })
  }
}
