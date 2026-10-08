import type { Metadata, Viewport } from 'next'
import { Silkscreen } from 'next/font/google'
import './globals.css'
import './braino.css'

// 픽셀 폰트 (BRAINO, RINO, LV, START, HOME)
const pixel = Silkscreen({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-pixel',
})

export const metadata: Metadata = {
  title: 'BRAINO',
  description: '하루 10분, AI 대신 내 뇌로 생각하기',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#fbfaf3',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={pixel.variable}>
      <head>
        {/* 한글 기본 폰트 Pretendard */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body>
        <div className="app">{children}</div>
      </body>
    </html>
  )
}