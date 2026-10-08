'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'

export default function Login() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { data: email, error: rpcError } = await supabase.rpc(
      'get_email_by_username',
      { p_username: username }
    )

    if (rpcError || !email) {
      setError('아이디 또는 비밀번호가 올바르지 않습니다.')
      setLoading(false)
      return
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setLoading(false)

    if (signInError) {
      setError('아이디 또는 비밀번호가 올바르지 않습니다.')
      return
    }

    router.push('/home')
  }

  return (
    <form onSubmit={handleLogin} className="form">
      <h2>로그인</h2>

      <input
        className="input"
        type="text"
        placeholder="아이디"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        className="input"
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {error && <p className="msg error">{error}</p>}

      <button className="btn primary" type="submit" disabled={loading}>
        {loading ? '로그인 중...' : '로그인'}
      </button>
      <button className="btn" type="button" onClick={() => router.push('/')}>
        뒤로가기
      </button>
    </form>
  )
}