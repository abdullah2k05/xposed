import OpenAI from 'openai'
import type { TwitterProfile, XposedResult } from './types'

const openaiKey = process.env.OPENAI_API_KEY
const openaiModel = process.env.OPENAI_MODEL || 'gpt-4o-mini'

function getClient() {
  if (!openaiKey) return null
  return new OpenAI({ apiKey: openaiKey })
}

export async function analyzeProfile(profile: TwitterProfile): Promise<XposedResult> {
  const client = getClient()
  if (client) {
    try {
      return await analyzeWithAI(client, profile)
    } catch {
      return generateMockResult(profile)
    }
  }
  return generateMockResult(profile)
}

async function analyzeWithAI(
  client: OpenAI,
  profile: TwitterProfile
): Promise<XposedResult> {
  const prompt = `You are "xposed" — a brutally honest, savage, but hilarious Twitter profile analyzer.

Analyze this Twitter profile and return a JSON object (NO markdown, NO backticks, pure JSON only):

Profile:
- Username: @${profile.username}
- Display Name: ${profile.displayName}
- Bio: "${profile.bio}"
- Followers: ${profile.followersCount}
- Following: ${profile.followingCount}
- Tweets: ${profile.tweetsCount}
- Verified: ${profile.verified}
- Recent Tweets (last 5):
${profile.recentTweets.map((t, i) => `  ${i + 1}. "${t}"`).join('\n') || '  (none available)'}

Return valid JSON with these exact fields:
{
  "banClock": {
    "score": <0-100, how close to a ban>,
    "daysEstimate": <estimated days before ban>,
    "mostViolative": <most ban-worthy tweet content or pattern>,
    "analysis": "<funny analysis of their ban risk>"
  },
  "profileRating": {
    "overall": <0.0-10.0>,
    "breakdown": {
      "bio": <0-10>,
      "banner": <0-10>,
      "avatar": <0-10>,
      "pinTweet": <0-10>,
      "vibe": <0-10>
    }
  },
  "aura": {
    "color": "<a color name like 'Burnt Sienna' or 'Digital Purple'>",
    "hex": "<hex code for the color>",
    "vibe": "<3 word vibe>",
    "description": "<funny paragraph about their aura>"
  },
  "beautyRanking": {
    "score": <0-100>,
    "worldRank": <1-1000000>,
    "nationalRank": <1-100000>,
    "description": "<funny description>"
  },
  "signatureTweet": {
    "text": "<their most 'them' tweet or a reconstructed signature tweet style>",
    "commentary": "<funny analysis of what this says about them>"
  },
  "npcClass": {
    "title": "<one of: Main Character, Side Quest, Final Boss, Meme Peasant, Background NPC, Quest Giver, Merchant, The Lorekeeper, The Flop, The Glazer>",
    "emoji": "<relevant emoji>",
    "description": "<funny role description>"
  },
  "overusedWord": {
    "word": "<their most overused word>",
    "count": <number>,
    "commentary": "<funny commentary>"
  },
  "flopRate": {
    "percentage": <0.0-100.0>,
    "label": "<label like 'Viral King' or 'Flop Legend'>",
    "commentary": "<funny analysis>"
  },
  "spiritAnimal": {
    "animal": "<animal name>",
    "emoji": "<emoji>",
    "description": "<funny description of why>"
  },
  "toast": "<one genuinely nice, specific compliment>",
  "overallScore": <0-100>
}

Rules:
- Be SAVAGE but hilarious, not mean-spirited
- Reference actual bio content and tweets
- Every field must be funny and unique
- The toast must be genuine and specific
- banClock score: 0 = saint, 100 = already banned
- flopRate: higher = more tweets flopping
- overallScore: 0 = terrible, 100 = elite`

  const response = await client.chat.completions.create({
    model: openaiModel,
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.9,
    max_tokens: 2000,
  })

  const text = response.choices[0]?.message?.content || '{}'
  const cleaned = text.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim()
  const parsed = JSON.parse(cleaned)

  return {
    username: profile.username,
    displayName: profile.displayName,
    avatarUrl: profile.avatarUrl,
    ...parsed,
    analyzedAt: new Date().toISOString(),
  }
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function generateMockResult(profile: TwitterProfile): XposedResult {
  const banScore = randomInt(5, 95)
  const overall = randomInt(20, 98)

  const colors = [
    { color: 'Burnt Sienna', hex: '#E97451', vibe: 'Chaotic Observer', description: 'You radiate the energy of someone who types in all caps at 2 AM and regrets nothing.' },
    { color: 'Digital Purple', hex: '#7B2D8E', vibe: 'Main Character', description: 'Your profile screams "protagonist energy" but the plot is still in development.' },
    { color: 'Neon Slime', hex: '#39FF14', vibe: 'Unfiltered Chaos', description: 'Your aura is what happens when you give the mic to someone with no filter and too much caffeine.' },
    { color: 'Blue Screen', hex: '#0044CC', vibe: 'Error 404', description: 'Your vibe is crashing. Have you tried turning your personality off and on again?' },
    { color: 'Faded Flex', hex: '#FFD700', vibe: 'Humble Brag', description: 'You are wealthy enough to flex but smart enough to pretend you are not.' },
    { color: 'Ghost Grey', hex: '#B0B0B0', vibe: 'Professional Lurker', description: 'You have been on this app for 6 years and nobody knows who you are. Impressive commitment to obscurity.' },
    { color: 'Rage Red', hex: '#FF3333', vibe: 'Hot Take Machine', description: 'Your aura is a flaming garbage can of opinions nobody asked for. And yet, we read.' },
    { color: 'Cope Pink', hex: '#FF69B4', vibe: 'Delusional Optimist', description: 'You tweet affirmations into a void and call it manifesting. Respect the confidence, question the reality.' },
  ]

  const npcClasses = [
    { title: 'Main Character', emoji: '👑', description: 'The universe revolves around you. Your tweets think they are the protagonist of everyone else timeline.' },
    { title: 'Side Quest', emoji: '🧙', description: 'You show up randomly, say something unhinged, and disappear for 3 weeks. Nobody knows your main plot.' },
    { title: 'Final Boss', emoji: '🐉', description: 'You have been here since 2009. You have seen every discourse. You are tired. You are powerful.' },
    { title: 'Meme Peasant', emoji: '🤡', description: 'Your entire personality is reposting memes from accounts with 12 followers. You are the middleman of humor.' },
    { title: 'Background NPC', emoji: '🚶', description: 'You have 1,247 tweets and 0 viral moments. You are furniture.' },
    { title: 'Quest Giver', emoji: '📜', description: 'You post threads like "Here is how I made $10K in 3 days" and 87% of it is affiliate links.' },
    { title: 'The Flop', emoji: '📉', description: 'Your engagement rate is lower than your following count. You are shouting into a void that blocked you.' },
    { title: 'The Glazer', emoji: '🪞', description: 'Every tweet is either a quote tweet hyping someone or a screenshot of your own metrics.' },
  ]

  const animals = [
    { animal: 'Golden Retriever', emoji: '🐕', description: 'Loyal, loud, and desperately seeking approval through likes.' },
    { animal: 'Raccoon', emoji: '🦝', description: 'Digging through trash at 3 AM and somehow finding gold.' },
    { animal: 'Cat', emoji: '🐱', description: 'Posts once, gets 10K likes, ignores everyone in replies.' },
    { animal: 'Pigeon', emoji: '🐦', description: 'Loud, everywhere, and somehow always involved in drama.' },
    { animal: 'Octopus', emoji: '🐙', description: 'Juggling 7 different personalities across 3 quote tweets.' },
    { animal: 'Sloth', emoji: '🦥', description: 'Posts once a month and acts surprised when nobody remembers them.' },
  ]

  const aura = pick(colors)
  const npc = pick(npcClasses)
  const animal = pick(animals)

  const bioText = profile.bio || 'no bio (coward)'
  const followerWord = profile.followersCount < 100 ? 'single digit' : profile.followersCount < 1000 ? 'triple digit' : 'quadruple digit'

  return {
    username: profile.username,
    displayName: profile.displayName,
    avatarUrl: profile.avatarUrl,
    banClock: {
      score: banScore,
      daysEstimate: banScore > 70 ? randomInt(1, 30) : randomInt(60, 730),
      mostViolative:
        banScore > 70
          ? `Your tweet "${pick(profile.recentTweets) || 'being yourself'}" has been flagged by 4 people`
          : 'Somehow you are too boring to get banned',
      analysis:
        banScore > 70
          ? `X safety team has a folder on you titled "this one again". You are ${banScore}% of the way to the guillotine. Start drafting your apology post.`
          : `You are ${banScore}% ban-risk, which means you are either a saint or smart enough to keep the unhinged thoughts in the drafts.`,
    },
    profileRating: {
      overall: Number((Math.random() * 8 + 1).toFixed(1)),
      breakdown: {
        bio: randomInt(1, 10),
        banner: randomInt(0, 10),
        avatar: randomInt(2, 10),
        pinTweet: randomInt(1, 9),
        vibe: randomInt(3, 10),
      },
    },
    aura,
    beautyRanking: {
      score: randomInt(20, 99),
      worldRank: randomInt(1000, 999999),
      nationalRank: randomInt(100, 99999),
      description: `Your profile looks like it was designed by someone who has seen a color once. Top ${randomInt(5, 50)}% globally.`,
    },
    signatureTweet: {
      text: pick(profile.recentTweets) || `i think ${pick(['twitter is dead', 'hot take:', 'unpopular opinion:', 'just dropped', 'rate my'])} ${pick(['the vibes', 'this fit', 'the timeline', 'my mutuals'])}`,
      commentary: `This tweet is peak ${profile.displayName}. It is giving ${pick(['midlife crisis', 'main character energy', 'dear diary energy', 'desperate for engagement', 'accidentally based'])}.`,
    },
    npcClass: npc,
    overusedWord: {
      word: pick(['literally', 'actually', 'unironically', 'based', 'ratio', 'cooked', 'valid', 'slaps', 'dead', 'vibe']),
      count: randomInt(12, 89),
      commentary: `You have used this word ${randomInt(12, 89)} times in the last 30 days. Your vocabulary is a circle and you are running laps.`,
    },
    flopRate: {
      percentage: Number((Math.random() * 80 + 5).toFixed(1)),
      label: overall > 70 ? 'Viral Adjacent' : overall > 40 ? 'Mid Crisis' : 'Flop Legend',
      commentary:
        overall > 70
          ? `Only ${overall}% of your tweets flop. You are doing numbers. Touch grass while you are up.`
          : `${100 - overall}% of your recent tweets have fewer likes than your bio has characters. It is a drought, not a vibe.`,
    },
    spiritAnimal: animal,
    toast: `Real talk though — ${pick(['your bio is actually funny', 'you seem like a genuinely decent person', 'your thread about ' + pick(['life', 'tech', 'music', 'sports', 'fitness']) + ' was unironically good', 'you have good taste in ' + pick(['mutuals', 'memes', 'opinions', 'profile pictures']), 'the fact that you keep posting despite the numbers shows real heart'])}.`,
    overallScore: overall,
    analyzedAt: new Date().toISOString(),
  }
}
