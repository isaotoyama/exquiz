import { Question } from './types';

export const questions: Question[] = [
  {
    id: 'q1',
    category: 'timeHorizon',
    theory: {
      en: 'Experience strategy values durable trust over short-term market noise.',
      ja: '体験戦略は、短期的な市場ノイズよりも持続的な信頼を重視する。'
    },
    prompt: {
      en: 'Do you pay more attention to daily stock price, weekly sales, or short-term conversion than to whether customers will still trust your product in five years?',
      ja: '日々の株価や週次売上、短期的なコンバージョンよりも、5年後も顧客に信頼される製品かどうかを重視していますか？'
    }
  },
  {
    id: 'q2',
    category: 'timeHorizon',
    theory: {
      en: 'Long-term loyalty sometimes requires short-term tradeoffs.',
      ja: '長期的なロイヤルティには、短期的なトレードオフが必要なことがある。'
    },
    prompt: {
      en: 'Would you accept a short-term revenue dip if it led to stronger customer trust over the next three years?',
      ja: '今後3年間の顧客信頼向上につながるなら、短期的な売上低下を受け入れられますか？'
    }
  },
  {
    id: 'q3',
    category: 'timeHorizon',
    theory: {
      en: 'Current success does not guarantee future relevance.',
      ja: '現在の成功は将来の適合性を保証しない。'
    },
    prompt: {
      en: 'Can a product remain competitive without continuous investment in understanding changing user needs?',
      ja: '変化するユーザーニーズへの継続的な理解なしに、製品は競争力を保てると思いますか？'
    }
  },
  {
    id: 'q4',
    category: 'valueDefinition',
    theory: {
      en: 'Business success and user success are related but not identical.',
      ja: '事業成功とユーザー成功は関連するが同一ではない。'
    },
    prompt: {
      en: 'When business metrics improve, do you assume the customer experience is also improving?',
      ja: '事業指標が改善したとき、顧客体験も改善していると考えますか？'
    }
  },
  {
    id: 'q5',
    category: 'valueDefinition',
    theory: {
      en: 'Outcome-driven organizations measure customer progress, not just output.',
      ja: 'アウトカム志向の組織は、アウトプットだけでなく顧客の前進を測る。'
    },
    prompt: {
      en: 'Do you evaluate teams more by release volume or by improvement in customer outcomes after release?',
      ja: 'チームはリリース量よりも、リリース後の顧客成果の改善で評価されていますか？'
    }
  },
  {
    id: 'q6',
    category: 'valueDefinition',
    theory: {
      en: 'Service design frames customers as long-term relationships.',
      ja: 'サービスデザインは、顧客を長期的な関係として捉える。'
    },
    prompt: {
      en: 'Do you see customers primarily as transactions to optimize or relationships to build over time?',
      ja: '顧客を最適化すべき取引として見ることが多いですか、それとも時間をかけて築く関係として見ていますか？'
    }
  },
  {
    id: 'q7',
    category: 'sourceOfTruth',
    theory: {
      en: 'User-centered strategy depends on evidence, not only authority.',
      ja: 'ユーザー中心の戦略は、権限だけでなく根拠に基づく。'
    },
    prompt: {
      en: 'Whose feedback most strongly shapes major product decisions: investors, internal stakeholders, or users?',
      ja: '重要なプロダクト意思決定に最も強く影響するのは誰ですか。投資家、社内ステークホルダー、それともユーザーですか？'
    }
  },
  {
    id: 'q8',
    category: 'sourceOfTruth',
    theory: {
      en: 'Research reduces strategic risk.',
      ja: 'リサーチは戦略リスクを下げる。'
    },
    prompt: {
      en: 'Before major decisions, do you invest more in understanding user behavior than in validating internal assumptions?',
      ja: '大きな判断の前に、社内前提の正当化よりもユーザー行動の理解に投資していますか？'
    }
  },
  {
    id: 'q9',
    category: 'sourceOfTruth',
    theory: {
      en: 'Leadership distance from customers weakens experience quality.',
      ja: '経営層が顧客から遠いほど体験品質は弱くなる。'
    },
    prompt: {
      en: 'How often do senior leaders directly observe customers using the product or service?',
      ja: '経営層はどの程度の頻度で、顧客が製品やサービスを使う様子を直接観察していますか？'
    }
  },
  {
    id: 'q10',
    category: 'investmentLogic',
    theory: {
      en: 'Speed matters only when teams are learning the right thing.',
      ja: 'スピードは、正しい学びにつながる時に意味を持つ。'
    },
    prompt: {
      en: 'When forced to choose, do you prioritize shipping quickly or solving the right problem well?',
      ja: 'どちらかを優先する必要がある場合、早く出すことと、正しい課題を適切に解くことのどちらを優先しますか？'
    }
  },
  {
    id: 'q11',
    category: 'investmentLogic',
    theory: {
      en: 'Mature organizations fund UX as strategic capability.',
      ja: '成熟した組織は、UXを戦略的能力として投資する。'
    },
    prompt: {
      en: 'Is UX funded mainly to improve appearance and usability, or to influence strategy and business direction?',
      ja: 'UXへの投資は、見た目や使いやすさの改善のためですか、それとも戦略や事業の方向性に影響を与えるためですか？'
    }
  },
  {
    id: 'q12',
    category: 'investmentLogic',
    theory: {
      en: 'Capability building requires protected budget and time.',
      ja: '能力形成には、確保された予算と時間が必要である。'
    },
    prompt: {
      en: 'Do teams have protected time and budget for discovery, research, and design before delivery begins?',
      ja: '開発着手前に、ディスカバリー、調査、設計のための確保された時間と予算がありますか？'
    }
  },
  {
    id: 'q13',
    category: 'researchEvidence',
    theory: {
      en: 'Good decisions combine qualitative and quantitative evidence.',
      ja: '良い意思決定は、定性と定量の両方の根拠を組み合わせる。'
    },
    prompt: {
      en: 'Are strategic decisions supported by both qualitative user insight and quantitative behavioral data?',
      ja: '戦略的意思決定は、定性的なユーザー洞察と定量的な行動データの両方で支えられていますか？'
    }
  },
  {
    id: 'q14',
    category: 'researchEvidence',
    theory: {
      en: 'Research maturity means learning before building.',
      ja: 'リサーチ成熟度とは、作る前に学ぶことである。'
    },
    prompt: {
      en: 'Do you usually conduct user research before committing to major roadmap decisions?',
      ja: '重要なロードマップ判断を確定する前に、通常ユーザー調査を行っていますか？'
    }
  },
  {
    id: 'q15',
    category: 'researchEvidence',
    theory: {
      en: 'Strategy succeeds when users can achieve goals with less friction.',
      ja: '戦略は、ユーザーがより少ない摩擦で目標を達成できる時に成功する。'
    },
    prompt: {
      en: 'Do you track whether customers complete important tasks more easily over time?',
      ja: '顧客が重要なタスクを以前より容易に完了できているかを継続的に追跡していますか？'
    }
  },
  {
    id: 'q16',
    category: 'orgAlignment',
    theory: {
      en: 'Internal complexity should be absorbed by the organization, not pushed onto customers.',
      ja: '社内の複雑さは組織が吸収すべきであり、顧客に押し付けるべきではない。'
    },
    prompt: {
      en: 'When processes become complex, do you redesign the system for the customer or ask the customer to absorb the complexity?',
      ja: '業務プロセスが複雑になった時、顧客のために仕組みを再設計しますか、それとも顧客側に複雑さを受け入れてもらいますか？'
    }
  },
  {
    id: 'q17',
    category: 'orgAlignment',
    theory: {
      en: 'Cross-functional alignment is essential for coherent end-to-end experience.',
      ja: '一貫したエンドツーエンド体験には、部門横断の整合が不可欠である。'
    },
    prompt: {
      en: 'Are product, design, engineering, sales, and operations aligned around shared customer outcomes?',
      ja: 'プロダクト、デザイン、開発、営業、運用は、共通の顧客アウトカムに沿って連携していますか？'
    }
  },
  {
    id: 'q18',
    category: 'orgAlignment',
    theory: {
      en: 'Leadership behavior sets the operating model for UX maturity.',
      ja: 'リーダーの行動がUX成熟度の運営モデルを規定する。'
    },
    prompt: {
      en: 'Do senior leaders consistently reinforce that customer experience is a strategic responsibility, not just a team function?',
      ja: '経営層は、顧客体験が一部門の役割ではなく経営上の責任であると一貫して示していますか？'
    }
  }
];
