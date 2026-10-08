'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'

export default function Signup() {
  const router = useRouter()

  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [email, setEmail] = useState('')

  const [idChecked, setIdChecked] = useState(false)
  const [sent, setSent] = useState(false)
  const [msg, setMsg] = useState({ text: '', type: '' })
  const [loading, setLoading] = useState(false)

  const showMsg = (text: string, type = 'error') => setMsg({ text, type })

  const checkUsername = async () => {
    if (!username.trim()) return showMsg('아이디를 입력하세요.')
    const { data, error } = await supabase.rpc('is_username_available', {
      p_username: username,
    })
    if (error) return showMsg('중복확인 중 오류가 발생했습니다.')
    if (data) {
      setIdChecked(true)
      showMsg('사용 가능한 아이디입니다.', 'success')
    } else {
      setIdChecked(false)
      showMsg('이미 사용 중인 아이디입니다.')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return showMsg('이름을 입력하세요.')
    if (!idChecked) return showMsg('아이디 중복확인을 해주세요.')
    if (password.length < 6) return showMsg('비밀번호는 6자 이상이어야 합니다.')
    if (password !== password2) return showMsg('비밀번호가 일치하지 않습니다.')
    if (!email.trim()) return showMsg('이메일을 입력하세요.')

    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, username },
        emailRedirectTo: window.location.origin,
      },
    })
    setLoading(false)

    if (error) return showMsg(error.message)
    setSent(true)
  }

  if (sent) {
    return (
      <div className="center">
        <h2>메일을 확인해주세요</h2>
        <p className="sub">
          {email}로 인증 링크를 보냈어요.
          <br />
          링크를 누르면 회원가입이 완료돼요.
        </p>
        <button className="btn primary" onClick={() => router.push('/')}>
          처음 화면으로
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>회원가입</h2>

      <input
        className="input"
        placeholder="이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <div className="row">
        <input
          className="input"
          placeholder="아이디"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value)
            setIdChecked(false)
          }}
          required
        />
        <button type="button" className="btn small" onClick={checkUsername}>
          중복확인
        </button>
      </div>

      <input
        className="input"
        type="password"
        placeholder="비밀번호 (6자 이상)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        className="input"
        type="password"
        placeholder="비밀번호 재확인"
        value={password2}
        onChange={(e) => setPassword2(e.target.value)}
        required
      />
      {password2 && password !== password2 && (
        <p className="msg error">비밀번호가 일치하지 않습니다.</p>
      )}

      <input
        className="input"
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      {msg.text && <p className={`msg ${msg.type}`}>{msg.text}</p>}

      <button className="btn primary" type="submit" disabled={loading}>
        {loading ? '처리 중...' : '확인'}
      </button>
      <button className="btn" type="button" onClick={() => router.push('/')}>
        취소
      </button>
    </form>
  )
}