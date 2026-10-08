'use client'

import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'

export default function Home() {
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <div className="center">
      <h2>홈 화면</h2>
      <p className="sub">로그인 성공! 여기에 캐릭터 화면이 들어갑니다.</p>
      <button className="btn" onClick={handleLogout}>
        로그아웃
      </button>
    </div>
  )
}