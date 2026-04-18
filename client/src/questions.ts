import { Question } from './types';

export const questions: Question[] = [
  {
    id: 'q1',
    category: 'timeHorizon',
    prompt: {
      en: 'When making major decisions, what matters more: this quarter’s performance or the company’s relevance five years from now?',
      ja: '重要な意思決定をするとき、今四半期の成果と5年後の企業の存在価値のどちらをより重視しますか？'
    },
    theory: {
      en: 'This reveals whether leadership manages for immediate outcomes or for long-term resilience and value creation.',
      ja: 'これは、経営が短期成果を管理しているのか、長期的な持続性と価値創造を重視しているのかを示します。'
    }
  },
  {
    id: 'q2',
    category: 'timeHorizon',
    prompt: {
      en: 'Would leadership accept short-term profit pressure if it protected long-term trust, quality, or reputation?',
      ja: '長期的な信頼、品質、評判を守るためであれば、短期的な利益圧力を受け入れられますか？'
    },
    theory: {
      en: 'This shows whether the company can sacrifice near-term gain to protect long-term value.',
      ja: 'これは、短期利益よりも長期価値を守れる会社かどうかを示します。'
    }
  },
  {
    id: 'q3',
    category: 'timeHorizon',
    prompt: {
      en: 'Does the company invest in capabilities that may not pay off immediately but strengthen future competitiveness?',
      ja: 'すぐに成果が出なくても、将来の競争力を高める能力や仕組みに投資していますか？'
    },
    theory: {
      en: 'This reflects whether the company sees the future as something to build, not just react to.',
      ja: 'これは、未来を反応的に待つのではなく、自ら作るものと捉えているかを示します。'
    }
  },

  {
    id: 'q4',
    category: 'valueDefinition',
    prompt: {
      en: 'How does the company define success: mostly financial performance, or broader value including customers, employees, and society?',
      ja: '会社は成功をどう定義していますか。主に財務成果ですか、それとも顧客・従業員・社会を含む広い価値ですか？'
    },
    theory: {
      en: 'This reveals whether value is treated narrowly as profit or more broadly as sustainable impact.',
      ja: 'これは、価値を利益だけで捉えるのか、持続的な影響まで含めるのかを示します。'
    }
  },
  {
    id: 'q5',
    category: 'valueDefinition',
    prompt: {
      en: 'When trade-offs arise, does the company prioritize extraction of value or creation of value?',
      ja: 'トレードオフが起きたとき、会社は価値を取りにいくことと価値を生み出すことのどちらを優先しますか？'
    },
    theory: {
      en: 'This distinguishes exploitative growth logic from constructive long-term business building.',
      ja: 'これは、収奪的な成長論理か、長期的な価値創造型かを分ける視点です。'
    }
  },
  {
    id: 'q6',
    category: 'valueDefinition',
    prompt: {
      en: 'Does leadership believe strong business performance automatically means people are better off?',
      ja: '経営層は、事業成果が良ければ人々にとっても良い状態だと自動的に考えていますか？'
    },
    theory: {
      en: 'This reveals whether the company can separate financial success from human outcomes.',
      ja: 'これは、財務的成功と人間的な成果を区別して考えられるかを示します。'
    }
  },

  {
    id: 'q7',
    category: 'sourceOfTruth',
    prompt: {
      en: 'What shapes major decisions more: hierarchy, investor pressure, or evidence from real users, employees, and customers?',
      ja: '重要な意思決定に最も影響するのは何ですか。階層、投資家圧力、それとも実際の顧客・従業員・利用者の声ですか？'
    },
    theory: {
      en: 'This shows who the company is actually built to serve.',
      ja: 'これは、その会社が本当は誰のために動いているのかを示します。'
    }
  },
  {
    id: 'q8',
    category: 'sourceOfTruth',
    prompt: {
      en: 'Before major decisions, does the organization seek evidence and understanding, or mostly defend pre-existing assumptions?',
      ja: '大きな意思決定の前に、組織は証拠と理解を求めますか、それとも既存の前提を正当化することが多いですか？'
    },
    theory: {
      en: 'This reveals whether the company learns before acting, or acts first and rationalizes later.',
      ja: 'これは、行動前に学ぶ組織か、先に動いて後で正当化する組織かを示します。'
    }
  },
  {
    id: 'q9',
    category: 'sourceOfTruth',
    prompt: {
      en: 'How often do leaders directly observe what customers, employees, or partners actually experience?',
      ja: '経営層は、顧客・従業員・パートナーが実際に何を経験しているかをどの程度直接見ていますか？'
    },
    theory: {
      en: 'This reveals how close or distant leadership is from lived reality.',
      ja: 'これは、経営が現実の体験にどれだけ近いか遠いかを示します。'
    }
  },

  {
    id: 'q10',
    category: 'peopleCulture',
    prompt: {
      en: 'Are employees treated primarily as labor cost, or as a core source of judgment, learning, and value creation?',
      ja: '従業員は主に労働コストとして扱われていますか、それとも判断・学習・価値創造の中核として扱われていますか？'
    },
    theory: {
      en: 'This reveals whether people are seen as expendable resources or strategic contributors.',
      ja: 'これは、人を交換可能な資源と見るのか、戦略的な価値創造者と見るのかを示します。'
    }
  },
  {
    id: 'q11',
    category: 'peopleCulture',
    prompt: {
      en: 'Does the company create psychological safety for people to challenge decisions, raise concerns, and surface risk?',
      ja: '組織には、異議を唱えたり懸念を示したりリスクを共有したりできる心理的安全性がありますか？'
    },
    theory: {
      en: 'This shows whether culture supports healthy correction or suppresses uncomfortable truth.',
      ja: 'これは、文化が健全な修正を可能にするのか、不都合な真実を抑え込むのかを示します。'
    }
  },
  {
    id: 'q12',
    category: 'peopleCulture',
    prompt: {
      en: 'When performance pressure rises, does the company protect people, or does it sacrifice them first?',
      ja: '成果圧力が高まったとき、会社は人を守りますか、それとも最初に人を犠牲にしますか？'
    },
    theory: {
      en: 'This reveals the real operating ethics of the organization under stress.',
      ja: 'これは、プレッシャー下における組織の本当の倫理観を示します。'
    }
  },

  {
    id: 'q13',
    category: 'executionStyle',
    prompt: {
      en: 'When forced to choose, does the company prioritize speed alone, or speed with quality and sustainability?',
      ja: 'どちらかを優先する必要があるとき、会社は速さだけを取りますか、それとも品質と持続性を伴う速さを取りますか？'
    },
    theory: {
      en: 'This reveals whether execution is optimized for output or for durable outcomes.',
      ja: 'これは、実行が単なるアウトプット最適化か、持続的な成果志向かを示します。'
    }
  },
  {
    id: 'q14',
    category: 'executionStyle',
    prompt: {
      en: 'Are teams rewarded more for shipping quickly or for solving the right problem well?',
      ja: 'チームは早く出すことよりも、正しい問題をきちんと解くことで評価されていますか？'
    },
    theory: {
      en: 'This shows whether the company rewards motion or meaningful progress.',
      ja: 'これは、動いた量を評価するのか、意味のある前進を評価するのかを示します。'
    }
  },
  {
    id: 'q15',
    category: 'executionStyle',
    prompt: {
      en: 'Does internal complexity get absorbed by the organization, or pushed onto customers and employees?',
      ja: '社内の複雑さは組織側で吸収されていますか、それとも顧客や従業員に押し付けられていますか？'
    },
    theory: {
      en: 'This reveals whether the organization protects people from complexity or exports it to them.',
      ja: 'これは、組織が複雑さから人を守るのか、それとも複雑さを外に押し出すのかを示します。'
    }
  },

  {
    id: 'q16',
    category: 'responsibilityEthics',
    prompt: {
      en: 'When profit conflicts with ethics, how often does the company choose the ethical path?',
      ja: '利益と倫理が衝突したとき、会社はどの程度倫理的な選択を取りますか？'
    },
    theory: {
      en: 'This reveals whether ethics is a principle or only a slogan.',
      ja: 'これは、倫理が原則なのか、単なるスローガンなのかを示します。'
    }
  },
  {
    id: 'q17',
    category: 'responsibilityEthics',
    prompt: {
      en: 'Does the company consider the social consequences of its products, services, and decisions?',
      ja: '会社は、自社の製品・サービス・意思決定が社会に与える影響をどの程度考慮していますか？'
    },
    theory: {
      en: 'This shows whether the business sees itself as socially embedded or purely transactional.',
      ja: 'これは、企業が社会の中の存在として自分を捉えているのか、単なる取引主体として捉えているのかを示します。'
    }
  },
  {
    id: 'q18',
    category: 'responsibilityEthics',
    prompt: {
      en: 'Would leadership reject a profitable decision if it damaged trust, fairness, or long-term social legitimacy?',
      ja: '信頼、公平性、長期的な社会的正当性を損なうなら、利益の出る意思決定でも経営は拒否できますか？'
    },
    theory: {
      en: 'This reveals whether the company is governed only by profit or by a broader sense of responsibility.',
      ja: 'これは、その企業が利益だけで動くのか、より広い責任感で統治されているのかを示します。'
    }
  }
];