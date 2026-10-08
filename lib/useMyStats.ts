import { useEffect, useState } from 'react'
import { supabase } from './supabase'
import { currentStreak, daysBetween, getLevel, today, xpRate } from './game'
import { MISSIONS } from './missions'

export type MyStats = {
  charName: string
  displayId: string // 이메일 @ 앞부분
  level: number
  xpRate: number
  streak: number // 현재 연속
  maxStreak: number // 최대 연속
  monthCount: number // 이번달 출석한 날 수
  left: number // 오늘 남은 학습
  doneDates: string[] // 학습한 날짜들 '2026-10-09'
  doneToday: string[] // 오늘 끝낸 미션 type
  demo: boolean
}

// 로그인 안했거나 db 없을때 (피그마 값)
export const DEMO_STATS: MyStats = {
  charName: 'RINO',
  displayId: 'rino1234',
  level: 5,
  xpRate: 0.73,
  streak: 12,
  maxStreak: 28,
  monthCount: 16,
  left: 5,
  doneDates: [],
  doneToday: [],
  demo: true,
}

// 날짜 목록에서 제일 길게 이어진 날 수
function longestRun(dates: string[]) {
  let best = 0
  let run = 0
  let prev = ''
  for (const d of dates) {
    run = prev && daysBetween(prev, d) === 1 ? run + 1 : 1
    best = Math.max(best, run)
    prev = d
  }
  return best
}

async function load(): Promise<MyStats> {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return DEMO_STATS

    const { data: p, error } = await supabase.from('profiles').select('*').eq('id', user.id).single()
    if (error || !p) return DEMO_STATS

    const { data: logs } = await supabase.from('logs').select('category, done_date')
    const rows = logs || []
    const dates = [...new Set(rows.map((l) => l.done_date as string))].sort()
    const t = today()
    const doneToday = [...new Set(rows.filter((l) => l.done_date === t).map((l) => l.category as string))]
    const streak = currentStreak(p.streak || 0, p.last_done)

    return {
      charName: p.char_name || 'RINO',
      displayId: (user.email || '').split('@')[0],
      level: getLevel(p.xp || 0),
      xpRate: xpRate(p.xp || 0),
      streak,
      maxStreak: Math.max(streak, longestRun(dates)),
      monthCount: dates.filter((d) => d.startsWith(t.slice(0, 7))).length,
      left: Math.max(0, MISSIONS.length - doneToday.length),
      doneDates: dates,
      doneToday,
      demo: false,
    }
  } catch {
    return DEMO_STATS
  }
}

// 마이페이지, 달력, 카테고리에서 씀. 불러오는 중이면 null
export function useMyStats() {
  const [data, setData] = useState<MyStats | null>(null)
  useEffect(() => {
    load().then(setData)
  }, [])
  return data
}