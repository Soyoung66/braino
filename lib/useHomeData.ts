import { useEffect, useState } from 'react'
import { supabase } from './supabase'
import { currentHp, currentStreak, dateStr, getLevel, heartCount, today, xpRate } from './game'

// done 함 / miss 빠짐 / today 오늘(아직) / future 아직 안온날
export type DayState = 'done' | 'miss' | 'today' | 'future'

export type HomeData = {
  charName: string
  level: number
  hearts: number
  xpRate: number
  streak: number
  week: DayState[] // 월~일 7개
  left: number // 오늘 남은 학습 개수
  demo: boolean
}

// 로그인 안했거나 db 없을때 보여줄 값 (피그마 화면이랑 똑같이)
export const DEMO: HomeData = {
  charName: 'RINO',
  level: 5,
  hearts: 3,
  xpRate: 0.82,
  streak: 12,
  week: ['done', 'miss', 'done', 'done', 'done', 'future', 'future'],
  left: 5,
  demo: true,
}

const TOTAL_MISSIONS = 5

function thisWeek() {
  const now = new Date()
  const mon = new Date(now)
  mon.setDate(now.getDate() - ((now.getDay() + 6) % 7))
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(mon)
    d.setDate(mon.getDate() + i)
    return dateStr(d)
  })
}

async function load(): Promise<HomeData> {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return DEMO

    const { data: p, error } = await supabase.from('profiles').select('*').eq('id', user.id).single()
    if (error || !p) return DEMO

    const days = thisWeek()
    const { data: logs } = await supabase
      .from('logs')
      .select('category, done_date')
      .gte('done_date', days[0])

    const doneDays = new Set((logs || []).map((l) => l.done_date))
    const t = today()
    const week: DayState[] = days.map((d) => {
      if (doneDays.has(d)) return 'done'
      if (d < t) return 'miss'
      if (d === t) return 'today'
      return 'future'
    })
    const todayCats = new Set((logs || []).filter((l) => l.done_date === t).map((l) => l.category))

    return {
      charName: p.char_name || 'RINO',
      level: getLevel(p.xp || 0),
      hearts: heartCount(currentHp(p.hp ?? 100, p.last_done)),
      xpRate: xpRate(p.xp || 0),
      streak: currentStreak(p.streak || 0, p.last_done),
      week,
      left: Math.max(0, TOTAL_MISSIONS - todayCats.size),
      demo: false,
    }
  } catch {
    return DEMO
  }
}

// 홈 화면 데이터. 불러오는 중이면 null
export function useHomeData() {
  const [data, setData] = useState<HomeData | null>(null)
  useEffect(() => {
    load().then(setData)
  }, [])
  return data
}