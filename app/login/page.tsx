'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'
import Button from '../../components/ui/Button'
import s from './login.module.css'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const [agree, setAgree] = useState(false)
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)

  async function login(e: React.FormEvent) {
    e.preventDefault()
    if (!agree) {
      setErr('개인정보 수집 및 이용에 동의해 주세요')
      return
    }
    setLoading(true)
    setErr('')
    const { error } = await supabase.auth.signInWithPassword({ email, password: pw })
    setLoading(false)
    if (error) {
      setErr('이메일 또는 비밀번호를 확인해 주세요')
      return
    }
    router.push('/home')
  }

  return (
    <main className={s.page}>
      <form className={s.form} onSubmit={login}>
        <div className={s.head}>
          <h1 className={'pixel ' + s.logo}>BRAINO</h1>
          <p>하루 10분, AI 대신 내 뇌로 생각하기</p>
        </div>

        <label className="b-label" htmlFor="email">이메일</label>
        <input
          id="email"
          className="b-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일을 입력해 주세요"
          autoComplete="email"
          required
        />

        <label className={'b-label ' + s.gap} htmlFor="pw">비밀번호</label>
        <input
          id="pw"
          className="b-input"
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          placeholder="비밀번호를 입력해 주세요"
          autoComplete="current-password"
          required
        />

        <button type="button" className={s.forgot} onClick={() => alert('비밀번호 찾기는 준비 중이에요')}>
          비밀번호를 잊으셨나요?
        </button>

        <div className={s.bottom}>
          <label className={s.agree}>
            <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
            <span className={s.circle}>
              <svg viewBox="0 0 24 24" width="16" height="16">
                <path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            개인정보 수집 및 이용에 동의합니다.
          </label>
          {err && <p className={s.err}>{err}</p>}
          <Button type="submit" disabled={loading}>{loading ? '로그인 중...' : '로그인'}</Button>
          <Link href="/signup" className={s.signup}>회원가입</Link>
        </div>
      </form>
    </main>
  )
}