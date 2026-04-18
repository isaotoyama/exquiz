import type { QuestionCategory } from './types';

export const orderedQuestionIds = [
  'q1','q2','q3',
  'q4','q5','q6',
  'q7','q8','q9',
  'q10','q11','q12',
  'q13','q14','q15',
  'q16','q17','q18'
] as const;

export const questionCategoryMap: Record<string, QuestionCategory> = {
  q1: 'timeHorizon',
  q2: 'timeHorizon',
  q3: 'timeHorizon',

  q4: 'valueDefinition',
  q5: 'valueDefinition',
  q6: 'valueDefinition',

  q7: 'sourceOfTruth',
  q8: 'sourceOfTruth',
  q9: 'sourceOfTruth',

  q10: 'peopleCulture',
  q11: 'peopleCulture',
  q12: 'peopleCulture',

  q13: 'executionStyle',
  q14: 'executionStyle',
  q15: 'executionStyle',

  q16: 'responsibilityEthics',
  q17: 'responsibilityEthics',
  q18: 'responsibilityEthics'
};