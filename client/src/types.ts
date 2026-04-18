export type Locale = 'en' | 'ja';

export type QuestionCategory =
  | 'timeHorizon'
  | 'valueDefinition'
  | 'sourceOfTruth'
  | 'peopleCulture'
  | 'executionStyle'
  | 'responsibilityEthics';

export interface Question {
  id: string;
  category: QuestionCategory;
  prompt: {
    en: string;
    ja: string;
  };
  theory: {
    en: string;
    ja: string;
  };
}

export interface RespondentProfile {
  name: string;
  company: string;
  title: string;
  email: string;
  country: string;
  industry: string;
}

export type AnswerMap = Record<string, number>;

export interface SubmissionPayload {
  profile: RespondentProfile;
  locale: Locale;
  answers: AnswerMap;
  submittedAt: string;
}

export interface ScoreSummary {
  overall: number;
  byCategory: Record<QuestionCategory, number>;
  orientation: {
    en: string;
    ja: string;
  };
}

export interface SimilarMatch {
  id: string;
  score: number;
  metadata?: Record<string, unknown>;
}

export interface AdminClusterSummary {
  label: string;
  count: number;
  average: number;
}

export interface SubmissionRecord {
  id: string;
  submittedAt: string;
  profile: RespondentProfile;
  locale: Locale;
  summary: ScoreSummary;
}

export interface AdminSummary {
  totalResponses: number;
  averageOverall: number;
  categoryAverages: Record<QuestionCategory, number>;
  orientationBreakdown: { label: string; count: number }[];
  clusterSummary: AdminClusterSummary[];
  recentSubmissions: SubmissionRecord[];
}