'use client'

import { useState, useSyncExternalStore } from 'react'
import { useRouter } from 'next/navigation'
import TopBar from '../ui/TopBar'
import Button from '../ui/Button'
import DonePopup from './DonePopup'
import { findMission } from '../../lib/missions'
import { TOPICS, pickTopic } from '../../lib/topics'
import { today } from '../../lib/game'
import { saveMission } from './saveMission'
import s from './MissionScreen.module.css'

type Form = { guide: string; fields: string[]; min: number }

// 미션마다 안내문, 입력칸, 최소 글자수
const FORM: Record<string, Form> = {
  connect: { guide: '두 단어 사이의 연결고리 3개를 찾아보세요', fields: ['연결 고리 단어 1', '연결 고리 단어 2', '연결 고리 단어 3'], min: 1 },
  explain: { guide: '천천히 읽고 이해해 보세요', fields: ['내 말로 정리하기...'], min: 150 },
  write: { guide: '아래 주제로 한 문단의 짧은 글을 자유롭게 써 보세요!\n떠오르는 대로 편하게 써도 좋아요.', fields: ['내용을 입력해주세요'], min: 100 },
  debate: { guide: '반대 입장도 최대한 설득력 있게 써보세요', fields: ['내 생각과 그 이유', '반대 입장 변호하기'], min: 20 },
  hypo: { guide: '아래 제시된 현상에 대한 원인을 3가지 생각해보세요', fields: ['원인 가설 1', '원인 가설 2', '원인 가설 3'], min: 5 },
}

export default function MissionScreen({ type }: { type: string }) {
  const router = useRouter()
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false)
  const [vals, setVals] = useState(['', '', ''])
  const [hidden, setHidden] = useState(false) // 설명하기: 쓰기 시작하면 본문 가림
  const [lang, setLang] = useState<'ko' | 'en'>('ko')
  const [saving, setSaving] = useState(false)
  const [popups, setPopups] = useState<string[]>([])

  const m = findMission(type)
  const f = FORM[type]
  if (!m || !f) {
    return (
      <main className={s.page}>
        <TopBar back="/category" />
        <p className={s.head}>없는 미션이에요</p>
      </main>
    )
  }
  // 날짜로 주제 뽑아서 브라우저에서만 그림
  if (!mounted) {
    return (
      <main className={s.page}>
        <TopBar back="/category" />
      </main>
    )
  }

  const date = today()
  let title = ''
  let body: React.ReactNode = null
  let guide = f.guide
  let words = ['', '']

  if (type === 'connect') {
    words = pickTopic(TOPICS.connect, type, date)
    title = `${words[0]} ↔ ${words[1]}`
  } else if (type === 'explain') {
    const t = pickTopic(TOPICS.explain, type, date)
    title = t.q
    if (hidden) {
      guide = '이제 안 보고 초등학생에게 설명하듯 써보세요'
      body = <p className={s.hiddenNote}>내용은 가려졌어요. 기억나는 대로 내 말로 써보세요!</p>
    } else {
      body = <p className={s.body}>({t.text})</p>
    }
  } else if (type === 'write') {
    title = pickTopic(TOPICS.write, type, date)
  } else if (type === 'debate') {
    const t = pickTopic(TOPICS.debate, type, date)
    const d = lang === 'ko' ? t : t.en
    title = d.claim
    body = (
      <div className={s.counter}>
        <b>{lang === 'ko' ? '반대쪽 사람들은 이렇게 말해요' : 'The other side says'}</b>
        <p>{d.counter}</p>
      </div>
    )
  } else {
    title = pickTopic(TOPICS.hypo, type, date)
  }

  const single = f.fields.length === 1
  const len = vals[0].trim().length
  const ready = f.fields.every((_, i) => vals[i].trim().length >= f.min)

  function setVal(i: number, e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    // 쓰는 만큼 칸 늘리기 (아래 입력창만)
    if (single && type !== 'write') {
      e.target.style.height = 'auto'
      e.target.style.height = Math.min(e.target.scrollHeight, 140) + 'px'
    }
    setVals(vals.map((x, j) => (j === i ? e.target.value : x)))
  }

  const submitBtn = (
    <div className={s.bottom}>
      <Button onClick={submit} disabled={!ready || saving}>{saving ? '저장 중...' : '제출하기'}</Button>
    </div>
  )

  async function submit() {
    if (!ready || saving) return
    setSaving(true)
    const answer = f.fields.map((label, i) => (single ? '' : label + ': ') + vals[i].trim()).join('\n')
    const res = await saveMission(type, title, answer)
    setSaving(false)
    if (!res.ok) {
      alert(res.error)
      return
    }
    setPopups(res.messages)
  }

  function closePopup() {
    const rest = popups.slice(1)
    setPopups(rest)
    if (rest.length === 0) router.push('/home')
  }

  return (
    <main className={s.page}>
      <TopBar back="/category" />

      <div className={s.head}>
        <h2>{m.name}</h2>
        <p>{guide}</p>
      </div>

      {type === 'write' && (
        <>
          <p className={s.topic}>&lt;{title}&gt;</p>
          <div className={s.writeBox}>
            <textarea
              value={vals[0]}
              onChange={(e) => setVal(0, e)}
              onPaste={(e) => e.preventDefault()}
              placeholder={f.fields[0]}
            />
            <span className={s.writeCount}>{len}/{f.min}</span>
          </div>
          {submitBtn}
        </>
      )}

      {(type === 'connect' || type === 'hypo') && (
        <>
          {type === 'connect' ? (
            <div className={s.words}>
              <b>{words[0]}</b>
              <span>and</span>
              <b>{words[1]}</b>
            </div>
          ) : (
            <section className={s.hypoCard}>
              <p>{title}</p>
              <p>이 현상에 대한 원인은 무엇일까요?</p>
            </section>
          )}
          <div className={s.pills}>
            {f.fields.map((label, i) => (
              <input
                key={label}
                className={s.pill}
                value={vals[i]}
                onChange={(e) => setVal(i, e)}
                onPaste={(e) => e.preventDefault()}
                placeholder={label}
              />
            ))}
          </div>
          {submitBtn}
        </>
      )}

      {(type === 'explain' || type === 'debate') && (
        <>
          <section className={s.card}>
            {type === 'debate' && (
              <div className={s.lang}>
                <button className={lang === 'ko' ? s.on : ''} onClick={() => setLang('ko')}>한국어</button>
                <button className={lang === 'en' ? s.on : ''} onClick={() => setLang('en')}>English</button>
              </div>
            )}
            <p className={s.q}>“ {title} “</p>
            {body}
          </section>

          {single ? (
            <div className={s.composer}>
              <textarea
                rows={1}
                value={vals[0]}
                onChange={(e) => setVal(0, e)}
                onFocus={() => setHidden(true)}
                onPaste={(e) => e.preventDefault()}
                placeholder={f.fields[0]}
              />
              <span className={s.count}>{len}/{f.min}</span>
              <button className={s.send} onClick={submit} disabled={!ready || saving} aria-label="제출">
                <svg viewBox="0 0 24 24" width="28" height="28">
                  <path d="M21 3L10 14M21 3l-7 18-4-7-7-4 18-7z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          ) : (
            <div className={s.fields}>
              {f.fields.map((label, i) => (
                <textarea
                  key={label}
                  className={s.field}
                  rows={2}
                  value={vals[i]}
                  onChange={(e) => setVal(i, e)}
                  onPaste={(e) => e.preventDefault()}
                  placeholder={label}
                />
              ))}
              {submitBtn}
            </div>
          )}
        </>
      )}

      <DonePopup messages={popups} onClose={closePopup} />
    </main>
  )
}