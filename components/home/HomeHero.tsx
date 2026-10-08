'use client'

import { useRouter } from 'next/navigation'
import Asset from '../ui/Asset'
import { charImage } from '../../lib/game'
import s from './HomeHero.module.css'

export default function HomeHero({ level }: { level: number }) {
  const router = useRouter()

  return (
    <section
      className={s.hero}
      style={{ backgroundImage: "url('/images/home-bg.png'), linear-gradient(180deg, #a6dbf8 0%, #cfeccd 62%, #9fcf7f 100%)" }}
    >
      <div className={s.top}>
        <button className={s.round} onClick={() => router.push('/')} aria-label="뒤로가기">
          <svg viewBox="0 0 24 24" width="22" height="22">
            <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h1 className={'pixel ' + s.title}>BRAINO</h1>
        <button className={s.round} onClick={() => alert('알림은 준비 중이에요')} aria-label="알림">
          <svg viewBox="0 0 24 24" width="22" height="22">
            <path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15L6 16z M10 20.5a2 2 0 0 0 4 0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <Asset src={charImage(level)} alt="내 캐릭터" fallback="🥚" className={s.char} />
    </section>
  )
}