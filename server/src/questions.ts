import { QuestionCategory } from './types.js';

export const questionCategoryMap: Record<string, QuestionCategory> = {
  q1: 'timeHorizon', q2: 'timeHorizon', q3: 'timeHorizon',
  q4: 'valueDefinition', q5: 'valueDefinition', q6: 'valueDefinition',
  q7: 'sourceOfTruth', q8: 'sourceOfTruth', q9: 'sourceOfTruth',
  q10: 'investmentLogic', q11: 'investmentLogic', q12: 'investmentLogic',
  q13: 'researchEvidence', q14: 'researchEvidence', q15: 'researchEvidence',
  q16: 'orgAlignment', q17: 'orgAlignment', q18: 'orgAlignment'
};

export const orderedQuestionIds = Object.keys(questionCategoryMap);
