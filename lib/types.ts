export interface TwitterProfile {
  username: string
  displayName: string
  bio: string
  avatarUrl: string
  bannerUrl: string
  followersCount: number
  followingCount: number
  tweetsCount: number
  verified: boolean
  joinDate: string
  recentTweets: string[]
  profileLinkColor: string
}

export interface XposedResult {
  username: string
  displayName: string
  avatarUrl: string
  banClock: BanClock
  profileRating: ProfileRating
  aura: Aura
  beautyRanking: BeautyRanking
  signatureTweet: SignatureTweet
  npcClass: NpcClass
  overusedWord: OverusedWord
  flopRate: FlopRate
  spiritAnimal: SpiritAnimal
  toast: string
  overallScore: number
  analyzedAt: string
}

export interface BanClock {
  score: number
  daysEstimate: number
  mostViolative: string
  analysis: string
}

export interface ProfileRating {
  overall: number
  breakdown: {
    bio: number
    banner: number
    avatar: number
    pinTweet: number
    vibe: number
  }
}

export interface Aura {
  color: string
  hex: string
  vibe: string
  description: string
}

export interface BeautyRanking {
  score: number
  worldRank: number
  nationalRank: number
  description: string
}

export interface SignatureTweet {
  text: string
  commentary: string
}

export interface NpcClass {
  title: string
  emoji: string
  description: string
}

export interface OverusedWord {
  word: string
  count: number
  commentary: string
}

export interface FlopRate {
  percentage: number
  label: string
  commentary: string
}

export interface SpiritAnimal {
  animal: string
  emoji: string
  description: string
}

export interface StoredProfile {
  id: number
  username: string
  display_name: string
  profile_image_url: string
  overall_score: number
  aura_color: string
  aura_vibe: string
  npc_class: string
  npc_emoji: string
  beauty_score: number
  ban_clock_score: number
  profile_rating: number
  created_at: string
}
