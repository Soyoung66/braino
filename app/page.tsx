'use client'

import { useRouter } from 'next/navigation'

export default function Start() {
  const router = useRouter()

  return (
    <div className="center">
      <h1 className="logo">Braino</h1>
      <p className="sub">환영합니다!</p>
      <button className="btn primary" onClick={() => router.push('/login')}>
        로그인
      </button>
      <button className="btn" onClick={() => router.push('/signup')}>
        회원가입
      </button>
    </div>
  )
}