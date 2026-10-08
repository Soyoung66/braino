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
  const [code, setCode] = useState('')

  const [idChecked, setIdChecked] = useState(false)
  const [codeSent, setCodeSent] = useState(false)
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

  const sendCode = async () => {
    if (!name.trim()) return showMsg('이름을 입력하세요.')
    if (!idChecked) return showMsg('아이디 중복확인을 해주세요.')
    if (password.length < 6) return showMsg('비밀번호는 6자 이상이어야 합니다.')
    if (password !== password2) return showMsg('비밀번호가 일치하지 않습니다.')
    if (!email.trim()) return showMsg('이메일을 입력하세요.')

    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name, username } },
    })
    setLoading(false)

    if (error) return showMsg(error.message)
    setCodeSent(true)
    showMsg('인증코드를 이메일로 보냈습니다.', 'success')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!codeSent) return showMsg('이메일 인증코드를 먼저 전송해주세요.')
    if (!code.trim()) return showMsg('인증코드를 입력하세요.')

    setLoading(true)
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token: code,
      type: 'email',
    })

    if (error || !data.user) {
      setLoading(false)
      return showMsg('인증코드가 올바르지 않습니다.')
    }

    const { error: profileError } = await supabase.from('profiles').insert({
      id: data.user.id,
      username,
      name,
      email,
    })

    if (profileError) {
      setLoading(false)
      return showMsg('프로필 저장 중 오류가 발생했습니다.')
    }

    await supabase.auth.signOut()
    setLoading(false)
    alert('회원가입이 완료되었습니다!')
    router.push('/')
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

      <div className="row">
        <input
          className="input"
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={codeSent}
          required
        />
        <button
          type="button"
          className="btn small"
          onClick={sendCode}
          disabled={loading || codeSent}
        >
          {codeSent ? '전송됨' : '코드전송'}
        </button>
      </div>

      <input
        className="input"
        placeholder="이메일 인증코드"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        disabled={!codeSent}
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