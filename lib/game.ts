// 레벨, 하트, 연속학습 계산 (화면마다 같은 계산 쓰려고 한곳에 모음)

export const dateStr = (d: Date) => d.toLocaleDateString('sv') // 2026-10-09 형식
export const today = () => dateStr(new Date())

export const daysBetween = (a: string, b: string) =>
  Math.round((new Date(b).getTime() - new Date(a).getTime()) / 86400000)

export const getLevel = (xp: number) => Math.floor(xp / 50) + 1

// 다음 레벨까지 몇 % 찼는지 (0~1)
export const xpRate = (xp: number) => (xp % 50) / 50

export const pad2 = (n: number) => String(n).padStart(2, '0')

// 하루 빠질때마다 hp -20
export function currentHp(hp: number, lastDone: string | null) {
  if (!lastDone) return hp
  const missed = Math.max(0, daysBetween(lastDone, today()) - 1)
  return Math.max(0, hp - missed * 20)
}

// hp 100 -> 하트 3개
export const heartCount = (hp: number) => Math.min(3, Math.max(0, Math.ceil(hp / (100 / 3))))

// 어제나 오늘 안했으면 연속기록 끊긴걸로
export function currentStreak(streak: number, lastDone: string | null) {
  if (!lastDone) return 0
  return daysBetween(lastDone, today()) <= 1 ? streak : 0
}

// 진화 이미지 나오면 여기만 바꾸면 됨
export function charImage(level: number) {
  if (level >= 1) return '/images/char-egg.png'
  return '/images/char-egg.png'
}

// 미션 끝났을때 profiles에 저장할 값 (미션 화면 만들때 씀)
export function afterMission(p: { xp: number; hp: number; streak: number; last_done: string | null }) {
  const t = today()
  const gap = p.last_done ? daysBetween(p.last_done, t) : null
  let streak = 1
  if (gap === 0) streak = p.streak
  if (gap === 1) streak = p.streak + 1
  return {
    xp: p.xp + 10,
    hp: Math.min(100, currentHp(p.hp, p.last_done) + 25),
    streak,
    last_done: t,
  }
}