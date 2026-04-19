import { Question } from './types';

export const questions: Question[] = [
  {
    id: 'q1',
    category: 'timeHorizon',
    prompt: {
      en: 'When leadership makes major decisions, what matters more: this quarter’s numbers or the company’s strength three to five years from now?',
      ja: '経営が重要な意思決定をするとき、今四半期の数字と3〜5年後の会社の強さのどちらをより重視しますか？'
    },
    theory: {
      en: 'This shows whether the company is managed for immediate financial pressure or long-term resilience.',
      ja: 'これは、会社が短期的な財務圧力で動いているのか、長期的な持続性を重視しているのかを示します。'
    },
    anchors: {
      left: {
        en: 'This quarter’s numbers',
        ja: '今四半期の数字'
      },
      right: {
        en: 'Three-to-five-year strength',
        ja: '3〜5年後の会社の強さ'
      }
    }
  },
  {
    id: 'q2',
    category: 'timeHorizon',
    prompt: {
      en: 'Would leadership accept short-term profit pressure if it protected long-term trust, quality, or reputation?',
      ja: '長期的な信頼、品質、評判を守れるなら、経営は短期的な利益圧力を受け入れますか？'
    },
    theory: {
      en: 'This reveals whether the organization can protect long-term value when short-term trade-offs appear.',
      ja: 'これは、短期的な損得が発生したときにも長期的な価値を守れるかを示します。'
    },
    anchors: {
      left: {
        en: 'Protect short-term profit first',
        ja: '短期利益を優先する'
      },
      right: {
        en: 'Protect long-term trust and quality',
        ja: '長期的な信頼と品質を守る'
      }
    }
  },
  {
    id: 'q3',
    category: 'timeHorizon',
    prompt: {
      en: 'Does the company invest in capabilities that may not pay off immediately but are important for the future?',
      ja: 'すぐに成果が出なくても、将来に重要な能力や仕組みに投資していますか？'
    },
    theory: {
      en: 'This shows whether the business is building future capability or only reacting to present pressure.',
      ja: 'これは、会社が未来の力を育てているのか、それとも目先の圧力に反応しているだけなのかを示します。'
    },
    anchors: {
      left: {
        en: 'Only invest in what pays off soon',
        ja: 'すぐ成果が出るものだけに投資する'
      },
      right: {
        en: 'Invest in future capability',
        ja: '将来の能力づくりにも投資する'
      }
    }
  },

  {
    id: 'q4',
    category: 'valueDefinition',
    prompt: {
      en: 'How does the company define success: mainly financial performance, or broader value including customers, employees, and society?',
      ja: '会社は成功をどう定義していますか。主に財務成果ですか、それとも顧客・従業員・社会を含む広い価値ですか？'
    },
    theory: {
      en: 'This reveals whether value is defined narrowly as profit or broadly as sustainable impact.',
      ja: 'これは、価値を利益だけで捉えるのか、持続的な影響まで含めて捉えるのかを示します。'
    },
    anchors: {
      left: {
        en: 'Mainly financial performance',
        ja: '主に財務成果'
      },
      right: {
        en: 'Broader value for people and society',
        ja: '人や社会も含む広い価値'
      }
    }
  },
  {
    id: 'q5',
    category: 'valueDefinition',
    prompt: {
      en: 'When trade-offs arise, does the company focus more on extracting value quickly or creating value over time?',
      ja: 'トレードオフが起きたとき、会社は短期的に価値を取りにいくことと、時間をかけて価値を生み出すことのどちらを重視しますか？'
    },
    theory: {
      en: 'This distinguishes short-term extraction logic from long-term value creation logic.',
      ja: 'これは、短期的な回収型か、長期的な価値創造型かを見分ける視点です。'
    },
    anchors: {
      left: {
        en: 'Extract value quickly',
        ja: '短期的に価値を取りにいく'
      },
      right: {
        en: 'Create value over time',
        ja: '時間をかけて価値を生み出す'
      }
    }
  },
  {
    id: 'q6',
    category: 'valueDefinition',
    prompt: {
      en: 'Does leadership believe that strong business performance automatically means people are better off?',
      ja: '経営層は、事業成果が良ければ自動的に人々にとっても良い状態だと考えていますか？'
    },
    theory: {
      en: 'This reveals whether the company can separate financial success from human outcomes.',
      ja: 'これは、財務的成功と人間的な成果を区別して考えられるかを示します。'
    },
    anchors: {
      left: {
        en: 'Business success is enough',
        ja: '事業成果が出れば十分'
      },
      right: {
        en: 'Human outcomes must also improve',
        ja: '人にとっての成果も必要'
      }
    }
  },

  {
    id: 'q7',
    category: 'sourceOfTruth',
    prompt: {
      en: 'What shapes major decisions more: hierarchy, investor pressure, or evidence from customers and employees?',
      ja: '重要な意思決定に最も影響するのは何ですか。階層、投資家圧力、それとも顧客や従業員の実際の声ですか？'
    },
    theory: {
      en: 'This shows who the company is actually built to serve.',
      ja: 'これは、その会社が本当は誰のために動いているのかを示します。'
    },
    anchors: {
      left: {
        en: 'Hierarchy and pressure',
        ja: '階層や圧力'
      },
      right: {
        en: 'Evidence from people',
        ja: '人の実態や根拠'
      }
    }
  },
  {
    id: 'q8',
    category: 'sourceOfTruth',
    prompt: {
      en: 'Before major decisions, does the organization try to learn first, or mostly defend assumptions it already has?',
      ja: '大きな意思決定の前に、組織はまず学ぼうとしますか。それとも、すでに持っている前提を正当化することが多いですか？'
    },
    theory: {
      en: 'This reveals whether the company is evidence-driven or assumption-driven.',
      ja: 'これは、会社が根拠で動くのか、思い込みで動くのかを示します。'
    },
    anchors: {
      left: {
        en: 'Defend existing assumptions',
        ja: '既存の前提を正当化する'
      },
      right: {
        en: 'Learn before deciding',
        ja: 'まず学んでから決める'
      }
    }
  },
  {
    id: 'q9',
    category: 'sourceOfTruth',
    prompt: {
      en: 'How often do leaders directly see what customers, employees, or partners actually experience?',
      ja: '経営層は、顧客・従業員・パートナーが実際に何を経験しているかをどの程度直接見ていますか？'
    },
    theory: {
      en: 'This shows how close leadership is to reality on the ground.',
      ja: 'これは、経営が現場の現実にどれだけ近いかを示します。'
    },
    anchors: {
      left: {
        en: 'Rarely see real experience',
        ja: '実際の体験をほとんど見ていない'
      },
      right: {
        en: 'Directly observe real experience often',
        ja: '実際の体験をよく直接見ている'
      }
    }
  },

  {
    id: 'q10',
    category: 'peopleCulture',
    prompt: {
      en: 'Are employees treated mainly as cost, or as a core source of learning, judgment, and value creation?',
      ja: '従業員は主にコストとして扱われていますか、それとも学習・判断・価値創造の中核として扱われていますか？'
    },
    theory: {
      en: 'This reveals whether people are seen as replaceable resources or strategic contributors.',
      ja: 'これは、人を交換可能な資源と見るのか、価値創造の担い手と見るのかを示します。'
    },
    anchors: {
      left: {
        en: 'Employees are mainly cost',
        ja: '従業員は主にコスト'
      },
      right: {
        en: 'Employees are a source of value creation',
        ja: '従業員は価値創造の源泉'
      }
    }
  },
  {
    id: 'q11',
    category: 'peopleCulture',
    prompt: {
      en: 'Does the culture allow people to challenge decisions, raise concerns, and surface risks safely?',
      ja: '組織文化には、異議を唱えたり懸念を示したりリスクを共有したりできる安全性がありますか？'
    },
    theory: {
      en: 'This shows whether the culture supports healthy correction or suppresses difficult truth.',
      ja: 'これは、文化が健全な修正を可能にするのか、不都合な真実を抑え込むのかを示します。'
    },
    anchors: {
      left: {
        en: 'Difficult truth is hard to raise',
        ja: '不都合なことは言いにくい'
      },
      right: {
        en: 'People can speak up safely',
        ja: '安心して声を上げられる'
      }
    }
  },
  {
    id: 'q12',
    category: 'peopleCulture',
    prompt: {
      en: 'When performance pressure rises, does the company protect people, or sacrifice them first?',
      ja: '成果圧力が高まったとき、会社は人を守りますか。それとも最初に人を犠牲にしますか？'
    },
    theory: {
      en: 'This reveals the company’s real operating ethics under pressure.',
      ja: 'これは、プレッシャー下における会社の本当の倫理観を示します。'
    },
    anchors: {
      left: {
        en: 'People are sacrificed first',
        ja: 'まず人が犠牲になる'
      },
      right: {
        en: 'People are protected',
        ja: '人を守ろうとする'
      }
    }
  },

  {
    id: 'q13',
    category: 'executionStyle',
    prompt: {
      en: 'When forced to choose, does the company prioritize speed alone, or speed with quality and sustainability?',
      ja: 'どちらかを優先する必要があるとき、会社は速さだけを取りますか。それとも品質と持続性を伴う速さを取りますか？'
    },
    theory: {
      en: 'This shows whether execution is optimized for output alone or for durable outcomes.',
      ja: 'これは、実行が単なる量の最適化か、持続的な成果志向かを示します。'
    },
    anchors: {
      left: {
        en: 'Speed alone',
        ja: '速さだけを優先'
      },
      right: {
        en: 'Speed with quality and sustainability',
        ja: '品質と持続性を伴う速さ'
      }
    }
  },
  {
    id: 'q14',
    category: 'executionStyle',
    prompt: {
      en: 'Are teams rewarded more for shipping fast, or for solving the right problem well?',
      ja: 'チームは早く出すことよりも、正しい問題をしっかり解くことで評価されていますか？'
    },
    theory: {
      en: 'This reveals whether the business rewards motion or meaningful progress.',
      ja: 'これは、動いた量を評価するのか、意味のある前進を評価するのかを示します。'
    },
    anchors: {
      left: {
        en: 'Reward speed of output',
        ja: '出す速さが評価される'
      },
      right: {
        en: 'Reward solving the right problem well',
        ja: '正しい問題を解くことが評価される'
      }
    }
  },
  {
    id: 'q15',
    category: 'executionStyle',
    prompt: {
      en: 'Does internal complexity get absorbed by the organization, or pushed onto customers and employees?',
      ja: '社内の複雑さは組織側で吸収されていますか。それとも顧客や従業員に押し付けられていますか？'
    },
    theory: {
      en: 'This reveals whether the organization protects people from complexity or exports it to them.',
      ja: 'これは、組織が複雑さから人を守るのか、それとも複雑さを外に押し出すのかを示します。'
    },
    anchors: {
      left: {
        en: 'Complexity is pushed outward',
        ja: '複雑さを外に押し付ける'
      },
      right: {
        en: 'Complexity is absorbed internally',
        ja: '複雑さを組織内で吸収する'
      }
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
      en: 'This shows whether ethics is treated as principle or just messaging.',
      ja: 'これは、倫理が原則なのか、単なるメッセージなのかを示します。'
    },
    anchors: {
      left: {
        en: 'Profit comes first',
        ja: '利益が先になる'
      },
      right: {
        en: 'Ethics are protected',
        ja: '倫理を守ろうとする'
      }
    }
  },
  {
    id: 'q17',
    category: 'responsibilityEthics',
    prompt: {
      en: 'Does the company consider the social impact of its products, services, and decisions?',
      ja: '会社は、自社の製品・サービス・意思決定が社会に与える影響をどの程度考慮していますか？'
    },
    theory: {
      en: 'This reveals whether the business sees itself as socially responsible or purely transactional.',
      ja: 'これは、会社が社会的責任を持つ存在として自分を捉えているのか、単なる取引主体として捉えているのかを示します。'
    },
    anchors: {
      left: {
        en: 'Focus mainly on transactions',
        ja: '主に取引だけを見る'
      },
      right: {
        en: 'Consider social impact seriously',
        ja: '社会的影響も重視する'
      }
    }
  },
  {
    id: 'q18',
    category: 'responsibilityEthics',
    prompt: {
      en: 'Would leadership reject a profitable decision if it damaged trust, fairness, or long-term legitimacy?',
      ja: '信頼、公平性、長期的な正当性を損なうなら、利益の出る意思決定でも経営は拒否できますか？'
    },
    theory: {
      en: 'This reveals whether the company is governed only by profit or by a broader sense of responsibility.',
      ja: 'これは、その会社が利益だけで動くのか、より広い責任感で統治されているのかを示します。'
    },
    anchors: {
      left: {
        en: 'Profitable decisions should proceed',
        ja: '利益が出るなら進める'
      },
      right: {
        en: 'Reject if trust or fairness is damaged',
        ja: '信頼や公平性を損なうなら拒否する'
      }
    }
  }
];