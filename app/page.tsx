'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '../lib/supabase'
import styles from './login.module.css'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [agree, setAgree] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!agree) {
      setError('개인정보 수집 및 이용에 동의해주세요.')
      return
    }

    setLoading(true)
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    setLoading(false)

    if (signInError) {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.')
      return
    }

    router.push('/home')
  }

  return (
    <form onSubmit={handleLogin} className={styles.page}>
      <div className={styles.top}>
        <h1 className={styles.logo}>BRAINO</h1>
        <p className={styles.slogan}>하루 10분, AI 대신 내 뇌로 생각하기</p>
      </div>

      <div className={styles.fields}>
        <label className={styles.label}>이메일</label>
        <input
          className={styles.input}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className={styles.label}>비밀번호</label>
        <input
          className={styles.input}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Link href="/forgot" className={styles.forgot}>
          비밀번호를 잊으셨나요?
        </Link>
      </div>

      <div className={styles.bottom}>
        {error && <p className={styles.error}>{error}</p>}

        <label className={styles.agree}>
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
          />
          <span className={styles.checkIcon} data-checked={agree}>
            ✓
          </span>
          <span>개인정보 수집 및 이용에 동의합니다.</span>
        </label>

        <button className={styles.loginBtn} type="submit" disabled={loading}>
          {loading ? '로그인 중...' : '로그인'}
        </button>

        <Link href="/signup" className={styles.signup}>
          회원가입
        </Link>
      </div>
    </form>
  )
}