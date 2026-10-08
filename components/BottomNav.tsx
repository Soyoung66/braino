import Link from 'next/link'
import Asset from './ui/Asset'
import s from './BottomNav.module.css'

// 왼쪽 메달 = 기록(/record), 오른쪽 사람 = 마이페이지(/mypage). 그 화면들은 디자인 나오면 만들 예정
export default function BottomNav() {
  return (
    <nav className={s.nav}>
      <div className={s.bar}>
        <Link href="/record" className={s.side} aria-label="학습 기록">
          <Asset src="/images/icon-medal.png" alt="" fallback="🏅" className={s.icon} />
        </Link>
        <Link href="/home" className={s.home}>
          <Asset src="/images/icon-home.png" alt="" fallback="🏠" className={s.homeIcon} />
          <span className="pixel">HOME</span>
        </Link>
        <Link href="/mypage" className={s.side} aria-label="마이페이지">
          <Asset src="/images/icon-profile.png" alt="" fallback="👤" className={s.icon} />
        </Link>
      </div>
    </nav>
  )
}