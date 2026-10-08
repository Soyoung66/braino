import './globals.css'

export const metadata = {
  title: 'Braino',
  description: 'Braino 학습 앱',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>
        <div className="app-container">
          <div className="card">{children}</div>
        </div>
      </body>
    </html>
  )
}