import { questionCategoryMap } from './questions';
import type {
  AnswerMap,
  QuestionCategory,
  ScoreSummary,
  SubmissionRecord
} from './types';

export function calculateSummary(answers: AnswerMap): ScoreSummary {
  const buckets: Record<QuestionCategory, number[]> = {
    timeHorizon: [],
    valueDefinition: [],
    sourceOfTruth: [],
    peopleCulture: [],
    executionStyle: [],
    responsibilityEthics: []
  };

  Object.entries(answers).forEach(([id, value]) => {
    const category = questionCategoryMap[id];
    if (category) {
      buckets[category].push(value);
    }
  });

  const byCategory = Object.fromEntries(
    Object.entries(buckets).map(([key, values]) => [
      key,
      values.length ? values.reduce((sum, current) => sum + current, 0) / values.length : 0
    ])
  ) as Record<QuestionCategory, number>;

  const values = Object.values(answers);
  const overall = values.length
    ? values.reduce((sum, current) => sum + current, 0) / values.length
    : 0;

  let orientation = {
    en: 'Mixed company profile. The organization appears to balance short-term results with some awareness of longer-term human and social value.',
    ja: '混合型の企業プロファイルです。短期成果を重視しつつも、長期的な人間価値や社会的価値への意識も一部見られます。'
  };

  if (overall < 2.5) {
    orientation = {
      en: 'Short-term profit dominant. The company likely prioritizes efficiency, control, and immediate financial outcomes over long-term trust, people, and responsibility.',
      ja: '短期利益重視型です。この企業は、長期的な信頼、人、責任よりも、効率・統制・短期財務成果を優先している可能性があります。'
    };
  } else if (overall >= 4.2) {
    orientation = {
      en: 'Long-term value oriented. The company likely sees business as long-term value creation across customers, employees, society, and sustainable performance.',
      ja: '長期価値志向型です。この企業は、顧客・従業員・社会・持続的成果を含む長期的価値創造として事業を捉えている可能性があります。'
    };
  } else if (overall >= 3.5) {
    orientation = {
      en: 'Emerging long-term company profile. Leadership appears to be moving beyond pure short-term profit logic toward broader value creation.',
      ja: '長期価値への移行型です。経営は短期利益中心の考え方から、より広い価値創造へ移行しつつある可能性があります。'
    };
  }

  return {
    overall,
    byCategory,
    orientation
  };
}

export function buildAdminSummary(records: SubmissionRecord[]) {
  const totalResponses = records.length;
  const averageOverall = totalResponses
    ? records.reduce((sum, item) => sum + item.summary.overall, 0) / totalResponses
    : 0;

  const categories: QuestionCategory[] = [
    'timeHorizon',
    'valueDefinition',
    'sourceOfTruth',
    'peopleCulture',
    'executionStyle',
    'responsibilityEthics'
  ];

  const categoryAverages = Object.fromEntries(
    categories.map((category) => [
      category,
      totalResponses
        ? records.reduce((sum, item) => sum + item.summary.byCategory[category], 0) / totalResponses
        : 0
    ])
  ) as Record<QuestionCategory, number>;

  const clusterSummary = [
    { label: '短期利益重視型', filter: (score: number) => score < 2.5 },
    { label: 'バランス型', filter: (score: number) => score >= 2.5 && score < 3.5 },
    { label: '長期価値志向型', filter: (score: number) => score >= 3.5 }
  ].map((group) => {
    const items = records.filter((item) => group.filter(item.summary.overall));
    return {
      label: group.label,
      count: items.length,
      average: items.length
        ? items.reduce((sum, item) => sum + item.summary.overall, 0) / items.length
        : 0
    };
  });

  const orientationBreakdown = clusterSummary.map(({ label, count }) => ({ label, count }));

  return {
    totalResponses,
    averageOverall,
    categoryAverages,
    orientationBreakdown,
    clusterSummary,
    recentSubmissions: [...records]
      .sort((a, b) => Date.parse(b.submittedAt) - Date.parse(a.submittedAt))
      .slice(0, 12)
  };
}