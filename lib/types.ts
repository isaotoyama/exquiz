export type Locale = 'en' | 'ja';
export type QuestionCategory =
  | 'timeHorizon'
  | 'valueDefinition'
  | 'sourceOfTruth'
  | 'investmentLogic'
  | 'researchEvidence'
  | 'orgAlignment';

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
  orientation: {
    en: string;
    ja: string;
  };
}


export interface SubmissionRecord extends SubmissionPayload {
  id: string;
  summary: ScoreSummary;
}
