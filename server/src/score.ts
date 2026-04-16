import { questionCategoryMap } from './questions.js';
import { AnswerMap, QuestionCategory, ScoreSummary, SubmissionRecord } from './types.js';

export function calculateSummary(answers: AnswerMap): ScoreSummary {
  const buckets: Record<QuestionCategory, number[]> = {
    timeHorizon: [],
    valueDefinition: [],
    sourceOfTruth: [],
    investmentLogic: [],
    researchEvidence: [],
    orgAlignment: []
  };

  Object.entries(answers).forEach(([id, value]) => {
    const category = questionCategoryMap[id];
    if (category) buckets[category].push(value);
  });

  const byCategory = Object.fromEntries(
    Object.entries(buckets).map(([key, values]) => [key, values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0])
  ) as Record<QuestionCategory, number>;

  const values = Object.values(answers);
  const overall = values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;

  let orientation = {
    en: 'Balanced but still operationally mixed.',
    ja: '一定のバランスはあるが、運営面ではまだ混在している。'
  };

  if (overall < 2.5) {
    orientation = {
      en: 'Short-term management dominant. UX is likely tactical rather than strategic.',
      ja: '短期的な経営志向が強い。UXは戦略ではなく戦術的に扱われている可能性が高い。'
    };
  } else if (overall >= 4.2) {
    orientation = {
      en: 'Leadership-level UX maturity. Long-term experience strategy is strong.',
      ja: 'リーダーシップレベルのUX成熟度。長期的な体験戦略が強い。'
    };
  } else if (overall >= 3.5) {
    orientation = {
      en: 'Emerging long-term experience strategy.',
      ja: '長期的な体験戦略が立ち上がりつつある。'
    };
  }

  return { overall, byCategory, orientation };
}

export function buildAdminSummary(records: SubmissionRecord[]) {
  const totalResponses = records.length;
  const averageOverall = totalResponses
    ? records.reduce((sum, item) => sum + item.summary.overall, 0) / totalResponses
    : 0;

  const categories: QuestionCategory[] = ['timeHorizon', 'valueDefinition', 'sourceOfTruth', 'investmentLogic', 'researchEvidence', 'orgAlignment'];
  const categoryAverages = Object.fromEntries(
    categories.map((category) => [
      category,
      totalResponses ? records.reduce((sum, item) => sum + item.summary.byCategory[category], 0) / totalResponses : 0
    ])
  ) as Record<QuestionCategory, number>;

  const clusterSummary = [
    { label: 'Short-term dominant', filter: (s: number) => s < 2.5 },
    { label: 'Mixed model', filter: (s: number) => s >= 2.5 && s < 3.5 },
    { label: 'Emerging strategy', filter: (s: number) => s >= 3.5 && s < 4.2 },
    { label: 'Leadership-level maturity', filter: (s: number) => s >= 4.2 }
  ].map((group) => {
    const items = records.filter((item) => group.filter(item.summary.overall));
    return {
      label: group.label,
      count: items.length,
      average: items.length ? items.reduce((sum, item) => sum + item.summary.overall, 0) / items.length : 0
    };
  });

  const orientationBreakdown = clusterSummary.map(({ label, count }) => ({ label, count }));

  return {
    totalResponses,
    averageOverall,
    categoryAverages,
    orientationBreakdown,
    clusterSummary,
    recentSubmissions: [...records].sort((a, b) => Date.parse(b.submittedAt) - Date.parse(a.submittedAt)).slice(0, 12)
  };
}
