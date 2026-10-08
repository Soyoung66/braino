import Asset from '../ui/Asset'
import type { DayState } from '../../lib/useHomeData'
import s from './StreakCard.module.css'

const DAYS = ['월', '화', '수', '목', '금', '토', '일']

function Mark({ state }: { state: DayState }) {
  if (state === 'done') {
    return (
      <svg viewBox="0 0 20 20" width="19" height="19">
        <circle cx="10" cy="10" r="10" fill="var(--green-bright)" />
        <path d="M5.5 10.3l3 3 6-6.3" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  if (state === 'miss') {
    return (
      <svg viewBox="0 0 20 20" width="19" height="19">
        <circle cx="10" cy="10" r="10" fill="var(--red)" />
        <path d="M6.5 6.5l7 7M13.5 6.5l-7 7" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 20 20" width="19" height="19">
      <circle cx="10" cy="10" r="9" fill="#fff" stroke="var(--green-bright)" strokeWidth="1.5" />
    </svg>
  )
}

export default function StreakCard({ streak, week }: { streak: number; week: DayState[] }) {
  return (
    <section className={s.card}>
      <div className={s.flameWrap}>
        <Asset src="/images/icon-flame.png" alt="" fallback="🔥" className={s.flame} />
      </div>
      <b className={s.num}>{streak}</b>
      <p className={s.label}>일 연속 학습 중!</p>
      <ul className={s.week}>
        {week.map((st, i) => (
          <li key={i} className={st === 'miss' ? s.miss : ''}>
            <Mark state={st} />
            <span>{DAYS[i]}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}