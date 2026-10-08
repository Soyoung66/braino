// 임시 파일 - C 담당이 바꿀 예정
import type { DayState } from '../../lib/useHomeData'

export default function StreakCard({ streak, week }: { streak: number; week: DayState[] }) {
  return <div style={{ padding: 12, border: '2px dashed #ccc' }}>StreakCard (C 담당) {streak}일 {week.join(',')}</div>
}