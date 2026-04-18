export const ui = {
  en: {
    title: 'Executive UX Questionnaire',
    subtitle:
      'Assess whether leadership shapes the business for short-term profit or long-term value creation.',
    language: '日本語',
    profile: 'Profile',
    submit: 'Submit',
    loading: 'Submitting...',
    overall: 'Overall score',
    interpretation: 'Interpretation',
    reportTitle: 'Executive Report',
    reportSubtitle:
      'This report shows how leadership philosophy may shape product quality, employee value, ethics, and long-term business resilience.',
    reportBack: 'Back to questionnaire',
    radarTitle: 'Strategic profile',
    themesTitle: 'What this suggests',
    answerLabel: 'Your answer',
    questionInterpretation: 'Question-by-question interpretation',
    adminTitle: 'Admin Dashboard',
    responses: 'Responses',
    averageScore: 'Average overall score',
    radar: 'Radar Chart',
    clusters: 'Clusters',
    recent: 'Recent Submissions',
    similarPatterns: 'Similar response patterns',
    patternA: 'Pattern A: Short-term profit dominant',
    patternB: 'Pattern B: Balanced model',
    patternC: 'Pattern C: Long-term value oriented',
    categoryLabels: {
      timeHorizon: 'Time Horizon',
      valueDefinition: 'Definition of Value',
      sourceOfTruth: 'Source of Truth',
      peopleCulture: 'People and Culture',
      executionStyle: 'Execution Style',
      responsibilityEthics: 'Responsibility and Ethics'
    },
    categorySummaries: {
      timeHorizon: 'How much leadership prioritizes long-term value over short-term results.',
      valueDefinition: 'Whether success is defined only by profit or more broadly across people, customers, and society.',
      sourceOfTruth: 'Whether decisions are driven by hierarchy and pressure or by grounded human understanding and evidence.',
      peopleCulture: 'Whether employees are treated as cost or as a source of judgment, learning, and value creation.',
      executionStyle: 'Whether the organization values speed alone or speed with quality and durability.',
      responsibilityEthics: 'Whether the business is governed only by profit or also by ethics, trust, and social responsibility.'
    },
    reportThemes: {
      longTerm:
        'This organization appears more willing to invest in durable trust, product quality, employee value, ethics, and long-term relevance rather than only chasing near-term profit.',
      shortTerm:
        'This organization appears more exposed to short-term pressure. That can increase speed and financial focus, but also raises the risk of weaker product quality, employee undervaluation, and ethical compromise.',
      balanced:
        'This organization shows mixed signals. It may be trying to balance near-term performance with long-term value, but leadership assumptions are not yet fully aligned.'
    },
    answerScale: {
      left: 'Short-term / profit-first',
      middle: 'Balanced',
      right: 'Long-term / human and value-centered'
    }
  },
  ja: {
    title: '経営層向け UX 質問票',
    subtitle:
      '経営が短期利益中心か、長期的価値創造中心かを評価します。',
    language: 'English',
    profile: '基本情報',
    submit: '送信',
    loading: '送信中...',
    overall: '総合スコア',
    interpretation: '解釈',
    reportTitle: '診断レポート',
    reportSubtitle:
      'このレポートは、経営思想がプロダクト品質、従業員価値、倫理、そして長期的な事業持続性にどう影響するかを示します。',
    reportBack: '質問票に戻る',
    radarTitle: '戦略プロファイル',
    themesTitle: 'この結果が示すこと',
    answerLabel: 'あなたの回答',
    questionInterpretation: '設問ごとの解釈',
    adminTitle: '管理ダッシュボード',
    responses: '回答数',
    averageScore: '平均総合スコア',
    radar: 'レーダーチャート',
    clusters: 'クラスター',
    recent: '最近の回答',
    similarPatterns: '近い回答パターン',
    patternA: '回答パターンA: 短期利益重視型',
    patternB: '回答パターンB: バランス型',
    patternC: '回答パターンC: 長期価値志向型',
    categoryLabels: {
      timeHorizon: '時間軸',
      valueDefinition: '価値の定義',
      sourceOfTruth: '判断の基準',
      peopleCulture: '人と文化',
      executionStyle: '実行スタイル',
      responsibilityEthics: '責任と倫理'
    },

    categorySummaries: {
      timeHorizon: '短期成果よりも長期的価値をどれだけ重視しているかを示します。',
      valueDefinition: '利益だけでなく、顧客・従業員・社会まで含めて価値を定義しているかを示します。',
      sourceOfTruth: '意思決定が階層や圧力ではなく、現場理解や根拠に基づいているかを示します。',
      peopleCulture: '従業員をコストではなく価値創造の源泉として見ているかを示します。',
      executionStyle: '速さだけでなく、品質や持続性も重視して実行しているかを示します。',
      responsibilityEthics: '利益だけでなく、倫理・信頼・社会的責任を重視しているかを示します。'
    },
    reportThemes: {
      longTerm:
        'この組織は、短期利益だけでなく、信頼、品質、従業員価値、倫理、長期的な競争力への投資を比較的重視している可能性があります。',
      shortTerm:
        'この組織は短期的な圧力に強く影響されている可能性があります。それはスピードや財務重視につながる一方で、プロダクト品質の低下、従業員価値の軽視、倫理的な妥協を招くリスクがあります。',
      balanced:
        'この組織は短期成果と長期価値の両立を目指しているものの、経営の前提や判断基準はまだ十分に揃っていない可能性があります。'
    },
    answerScale: {
      left: '短期利益・効率優先',
      middle: '中間・バランス型',
      right: '長期価値・人・社会重視'
    }
  }
} as const;