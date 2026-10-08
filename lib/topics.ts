// 미션 주제들. 여기만 늘리면 됨 (날짜로 하루 한 개 고정)

export type Explain = { q: string; text: string }
export type Debate = { claim: string; counter: string; en: { claim: string; counter: string } }

export const TOPICS = {
  connect: [
    ['고양이', '금리'],
    ['우산', '민주주의'],
    ['신경망', '오케스트라'],
  ],
  explain: [
    {
      q: '비교우위란?',
      text: '비교우위는 국제 무역이론에서 가장 핵심적인 개념 중 하나로, 각 국가나 경제 주체가 가장 적은 기회비용으로 생산할 수 있는 재화나 서비스에 집중함으로써 전체적인 경제적 효율성과 부의 극대화를 이끌어 낼 수 있다는 원리를 의미합니다.',
    },
    {
      q: '정언명령이란?',
      text: '칸트가 제시한, 어떤 조건이나 목적과도 무관하게 모든 이성적 존재에게 적용되는 도덕 법칙입니다. 자신의 행위 원칙이 보편적 법칙이 되기를 바랄 수 있을 때에만 그 원칙에 따라 행위하라는 것이며, 특정 목적을 위한 조건부 명령인 가언명령과 구분됩니다.',
    },
  ],
  write: ['10년 뒤의 나에게', '누군가에게 고마웠던 순간', '비 오는 날 편의점'],
  debate: [
    {
      claim: '재택근무가 사무실 근무보다 낫다',
      counter: '소통이 줄고 팀워크와 소속감이 약해진다',
      en: {
        claim: 'Remote work is better than working at the office',
        counter: 'Communication drops and teamwork and belonging get weaker',
      },
    },
  ],
  hypo: ['요즘 20대 사이에서 필름카메라가 다시 유행한다', '요즘 사람들은 전화보다 문자를 선호한다'],
}

const seed = (s: string) => {
  let h = 0
  for (const c of s) h = (h * 31 + c.charCodeAt(0)) | 0
  return Math.abs(h)
}

// 오늘 날짜 + 미션 종류로 하나 고르기
export function pickTopic<T>(list: T[], type: string, date: string): T {
  return list[seed(date + type) % list.length]
}