// 임시 파일 - C 담당이 바꿀 예정
type Props = { messages: string[]; onClose: () => void }

export default function DonePopup({ messages, onClose }: Props) {
  if (messages.length === 0) return null
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
      <div style={{ background: '#fff', padding: 24, borderRadius: 16 }}>
        <p>{messages[0]} (C 담당 팝업)</p>
        <button onClick={onClose}>확인</button>
      </div>
    </div>
  )
}