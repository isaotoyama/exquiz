export type Locale = 'en' | 'ja';

export type QuestionCategory =
  | 'timeHorizon'
  | 'valueDefinition'
  | 'sourceOfTruth'
  | 'investmentLogic'
  | 'researchEvidence'
  | 'orgAlignment';

export interface Question {
  id: string;
  category: QuestionCategory;
  theory: Record<Locale, string>;
  prompt: Record<Locale, string>;
}

export interface RespondentProfile {
  name: string;
  company: string;
  title: string;
  email: string;
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
  orientation: Record<Locale, string>;
}

export interface SubmissionRecord extends SubmissionPayload {
  id: string;
  summary: ScoreSummary;
}

export interface SimilarMatch {
  id: string;
  score: number;
  metadata?: Record<string, unknown>;
}

export interface AdminSummary {
  totalResponses: number;
  averageOverall: number;
  categoryAverages: Record<QuestionCategory, number>;
  orientationBreakdown: Array<{ label: string; count: number }>;
  clusterSummary: Array<{ label: string; count: number; average: number }>;
  recentSubmissions: SubmissionRecord[];
}
