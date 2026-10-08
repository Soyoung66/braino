import Link from 'next/link'
import Asset from '../ui/Asset'
import s from './CalendarCard.module.css'

// 누르면 학습 달력(/record)으로. 그 화면은 디자인 나오면 만들 예정
export default function CalendarCard() {
  return (
    <Link href="/record" className={s.card}>
      <span>학습 달력 보기</span>
      <Asset src="/images/icon-calendar.png" alt="" fallback="📅" className={s.icon} />
    </Link>
  )
}