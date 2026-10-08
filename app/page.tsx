'use client'

import { useRouter } from 'next/navigation'
import { supabase } from '../lib/supabase'
import Button from '../components/ui/Button'
import Asset from '../components/ui/Asset'
import s from './page.module.css'

export default function Splash() {
  const router = useRouter()

  // 로그인 돼있으면 바로 홈, 아니면 로그인
  async function start() {
    const { data } = await supabase.auth.getSession()
    router.push(data.session ? '/home' : '/login')
  }

  return (
    <main className={s.page}>
      <div className={s.text}>
        <h1>오늘도 뇌 써볼까요?</h1>
        <p>AI에게 맡겨 뒀던 뇌, 잠시 되찾아 봐요</p>
      </div>
      <Asset src="/images/splash-egg.png" alt="알에서 나오는 캐릭터" fallback="🥚" className={s.egg} />
      <div className={s.bottom}>
        <Button onClick={start}>시작하기</Button>
      </div>
    </main>
  )
}