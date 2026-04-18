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
    similar: 'Similar responses',

    reportTitle: 'Executive Report',
    reportSubtitle:
      'This report shows how leadership philosophy may shape product quality, employee value, ethics, and long-term business resilience.',
    reportBack: 'Back to questionnaire',
    radarTitle: 'Strategic profile',
    themesTitle: 'What this suggests',

    responses: 'Responses',
    radar: 'Radar Chart',
    clusters: 'Clusters',
    recent: 'Recent Submissions',

    categoryLabels: {
      timeHorizon: 'Time Horizon',
      valueDefinition: 'Definition of Value',
      sourceOfTruth: 'Source of Truth',
      investmentLogic: 'Investment Logic',
      researchEvidence: 'Research and Evidence',
      orgAlignment: 'Organizational Alignment'
    },

    reportThemes: {
      longTerm:
        'This organization appears more willing to invest in durable trust, product quality, and long-term relevance rather than only chasing near-term profit.',
      shortTerm:
        'This organization appears more exposed to short-term pressure. That often translates into faster decisions, but also higher risk of weaker product quality, employee undervaluation, and ethical compromise.',
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
    similar: '近い回答例',

    reportTitle: '診断レポート',
    reportSubtitle:
      'このレポートは、経営思想がプロダクト品質、従業員価値、倫理、そして長期的な事業持続性にどう影響するかを示します。',
    reportBack: '質問票に戻る',
    radarTitle: '戦略プロファイル',
    themesTitle: 'この結果が示すこと',

    responses: '回答数',
    radar: 'レーダーチャート',
    clusters: 'クラスター',
    recent: '最近の回答',

    categoryLabels: {
      timeHorizon: '時間軸',
      valueDefinition: '価値の定義',
      sourceOfTruth: '判断の基準',
      investmentLogic: '投資の考え方',
      researchEvidence: '調査と根拠',
      orgAlignment: '組織の整合性'
    },

    reportThemes: {
      longTerm:
        'この組織は、短期利益だけでなく、信頼、品質、長期的な競争力への投資を比較的重視している可能性があります。',
      shortTerm:
        'この組織は短期的な圧力に強く影響されている可能性があります。それは意思決定の速さにつながる一方で、プロダクト品質の低下、従業員価値の軽視、倫理的な妥協を招くリスクがあります。',
      balanced:
        'この組織は短期成果と長期価値の両立を目指しているものの、経営の前提や判断基準はまだ十分に揃っていない可能性があります。'
    }
  }
} as const;