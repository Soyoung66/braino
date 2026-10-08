// 미션 5개 목록. 카테고리 카드, 미션 화면에서 같이 씀
export const MISSIONS = [
  {
    type: 'connect',
    name: '개념 연결',
    desc: '개념 연결 : 랜덤 단어 두 개 사이 연결고리 3개 찾기',
    image: '/images/mission-connect.png',
    emoji: '🧩',
  },
  {
    type: 'explain',
    name: '설명하기',
    desc: '파인만미션 : 키워드와 관련된 내용 보여주고 자신만의 단어로 단순하게 정리',
    image: '/images/mission-explain.png',
    emoji: '🧑‍🏫',
  },
  {
    type: 'write',
    name: '글쓰기',
    desc: '문단 창작 : 자유롭게 아는 내용',
    image: '/images/mission-write.png',
    emoji: '✍️',
  },
  {
    type: 'debate',
    name: '반대편 변호',
    desc: '토론 주제와 반대편 입장을 보고 내 생각과 반대 입장 설명하기',
    image: '/images/mission-debate.png',
    emoji: '⚖️',
  },
  {
    type: 'hypo',
    name: '가설 세우기',
    desc: '현상을 주고 왜인지 원인 3개 추론',
    image: '/images/mission-hypo.png',
    emoji: '🔍',
  },
]

export type MissionType = 'connect' | 'explain' | 'write' | 'debate' | 'hypo'

export const findMission = (type: string) => MISSIONS.find((m) => m.type === type)