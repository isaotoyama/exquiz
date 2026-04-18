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
      investmentLogic: 'Investment Logic',
      researchEvidence: 'Research and Evidence',
      orgAlignment: 'Organizational Alignment'
    },
    categorySummaries: {
      timeHorizon: 'How much leadership prioritizes long-term value over short-term results.',
      valueDefinition: 'Whether success is defined by profit alone or by customer and social value as well.',
      sourceOfTruth: 'Whether decisions are driven by hierarchy, market pressure, or real human evidence.',
      investmentLogic: 'How leadership chooses to invest in speed, quality, trust, and strategic UX capability.',
      researchEvidence: 'How much decisions are grounded in research, evidence, and real-world learning.',
      orgAlignment: 'How well the organization aligns functions around long-term customer and business value.'
    },
    reportThemes: {
      longTerm:
        'This organization appears more willing to invest in durable trust, product quality, employee value, ethics, and long-term relevance rather than only chasing near-term profit.',
      shortTerm:
        'This organization appears more exposed to short-term pressure. That can increase speed and financial focus, but also raises the risk of weaker product quality, employee undervaluation, and ethical compromise.',
      balanced:
        'This organization shows mixed signals. It may be trying to balance near-term performance with long-term value, but leadership assumptions are not yet fully aligned.'
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
      investmentLogic: '投資の考え方',
      researchEvidence: '調査と根拠',
      orgAlignment: '組織の整合性'
    },
    categorySummaries: {
      timeHorizon: '短期成果よりも長期的価値をどれだけ重視しているかを示します。',
      valueDefinition: '利益だけでなく、顧客価値や社会的価値まで含めて成功を定義しているかを示します。',
      sourceOfTruth: '意思決定が上意下達、市場圧力、または人間理解のどこに基づいているかを示します。',
      investmentLogic: 'スピード、品質、信頼、UX能力のどこに投資しているかを示します。',
      researchEvidence: '調査や根拠に基づく学習が意思決定にどれだけ使われているかを示します。',
      orgAlignment: '組織全体が長期的な顧客価値と事業価値に向けてどれだけ整合しているかを示します。'
    },
    reportThemes: {
      longTerm:
        'この組織は、短期利益だけでなく、信頼、品質、従業員価値、倫理、長期的な競争力への投資を比較的重視している可能性があります。',
      shortTerm:
        'この組織は短期的な圧力に強く影響されている可能性があります。それはスピードや財務重視につながる一方で、プロダクト品質の低下、従業員価値の軽視、倫理的な妥協を招くリスクがあります。',
      balanced:
        'この組織は短期成果と長期価値の両立を目指しているものの、経営の前提や判断基準はまだ十分に揃っていない可能性があります。'
    }
  }
} as const;