'use client'

import { useRouter } from 'next/navigation'
import s from './TopBar.module.css'

type Props = {
  bell?: boolean // 오른쪽 종 버튼 보일지
  back?: string // 뒤로가기 누르면 갈 주소
}

// 카테고리, 마이페이지, 달력 위에 공통으로 쓰는 바
export default function TopBar({ bell = false, back = '/home' }: Props) {
  const router = useRouter()

  return (
    <header className={s.bar}>
      <button className={s.round} onClick={() => router.push(back)} aria-label="뒤로가기">
        <svg viewBox="0 0 24 24" width="22" height="22">
          <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <h1 className={'pixel ' + s.title}>BRAINO</h1>
      {bell ? (
        <button className={s.round} onClick={() => alert('알림은 준비 중이에요')} aria-label="알림">
          <svg viewBox="0 0 24 24" width="22" height="22">
            <path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15L6 16z M10 20.5a2 2 0 0 0 4 0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          </svg>
        </button>
      ) : (
        <span className={s.empty} />
      )}
    </header>
  )
}