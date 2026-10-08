import { pad2 } from '../../lib/game'
import s from './CharacterStatus.module.css'

type Props = { name: string; hearts: number; level: number; xpRate: number }

function Heart({ on }: { on: boolean }) {
  return (
    <svg viewBox="0 0 24 22" width="25" height="23">
      <path
        d="M12 21s-9.5-6-9.5-12.2A5.3 5.3 0 0 1 12 5.6a5.3 5.3 0 0 1 9.5 3.2C21.5 15 12 21 12 21z"
        fill={on ? 'var(--red)' : 'var(--gray-light)'}
      />
    </svg>
  )
}

export default function CharacterStatus({ name, hearts, level, xpRate }: Props) {
  return (
    <section className={s.wrap}>
      <div className={s.row}>
        <div className={s.left}>
          <span className={'pixel ' + s.name}>{name}</span>
          <span className={s.hearts}>
            {[0, 1, 2].map((i) => (
              <Heart key={i} on={i < hearts} />
            ))}
          </span>
        </div>
        <span className={'pixel ' + s.lv}>LV.{pad2(level)}</span>
      </div>
      <div className={s.bar}>
        <div className={s.fill} style={{ width: Math.round(xpRate * 100) + '%' }} />
      </div>
    </section>
  )
}