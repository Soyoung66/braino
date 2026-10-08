'use client'

import { useState, useSyncExternalStore } from 'react'

type Props = {
  src: string
  alt: string
  fallback: string // 이미지 아직 없으면 대신 보여줄 이모지
  className?: string
}

// public/images 에 이미지 넣기 전에도 안 깨지게 해주는 이미지 컴포넌트
export default function Asset({ src, alt, fallback, className }: Props) {
  const [broken, setBroken] = useState(false)
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false)

  if (!mounted) return <span className={className} />
  if (broken) {
    return (
      <span className={className} role="img" aria-label={alt} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5em' }}>
        {fallback}
      </span>
    )
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className={className} onError={() => setBroken(true)} />
}