'use client'

// 홈은 부품 조립만 함. 이 파일은 리더만 수정!
import { useHomeData } from '../../lib/useHomeData'
import HomeHero from '../../components/home/HomeHero'
import CharacterStatus from '../../components/home/CharacterStatus'
import StreakCard from '../../components/home/StreakCard'
import StartCard from '../../components/home/StartCard'
import CalendarCard from '../../components/home/CalendarCard'
import BottomNav from '../../components/BottomNav'
import s from './home.module.css'

export default function HomePage() {
  const d = useHomeData()
  if (!d) return <main className={s.page} />

  return (
    <main className={s.page}>
      <HomeHero level={d.level} />
      <div className={s.body}>
        <CharacterStatus name={d.charName} hearts={d.hearts} level={d.level} xpRate={d.xpRate} />
        <div className={s.grid}>
          <div className={s.left}>
            <StreakCard streak={d.streak} week={d.week} />
          </div>
          <div className={s.right}>
            <StartCard left={d.left} />
            <CalendarCard />
          </div>
        </div>
      </div>
      <BottomNav />
    </main>
  )
}