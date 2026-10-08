'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import styles from './login.module.css'

const inputStyle: React.CSSProperties = {
  width: '100%',
  height: 60,
  padding: '0 22px',
  border: '1px solid #d4f7cb',
  borderRadius: 20,
  background: '#ebffe6',
  fontSize: 17,
  fontFamily: 'inherit',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  margin: '0 0 12px 4px',
  fontSize: 16,
  fontWeight: 600,
}

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [agree, setAgree] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!agree) {
      setError('개인정보 수집 및 이용에 동의해주세요.')
      return
    }

    // 시연용: Supabase 로그인 생략
    router.push('/home')
  }

  return (
    <main className={styles.page}>
      <form onSubmit={handleLogin} className={styles.form}>
        <div className={styles.head}>
          <h1 className={styles.logo}>BRAINO</h1>
          <p>하루 10분, AI 대신 내 뇌로 생각하기</p>
        </div>

        <label style={labelStyle}>이메일</label>
        <input
          style={inputStyle}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className={styles.gap} style={labelStyle}>
          비밀번호
        </label>
        <input
          style={inputStyle}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="button" className={styles.forgot}>
          비밀번호를 잊으셨나요?
        </button>

        <div className={styles.bottom}>
          {error && <p className={styles.err}>{error}</p>}

          <label className={styles.agree}>
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />
            <span className={styles.circle}>✓</span>
            <span>개인정보 수집 및 이용에 동의합니다.</span>
          </label>

          <button
            type="submit"
            style={{
              height: 60,
              border: 'none',
              borderRadius: 30,
              background: '#35b511',
              color: '#fff',
              fontSize: 20,
              fontFamily: 'inherit',
              cursor: 'pointer',
            }}
          >
            로그인
          </button>

          <Link href="/signup" className={styles.signup}>
            회원가입
          </Link>
        </div>
      </form>
    </main>
  )
}