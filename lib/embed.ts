import { orderedQuestionIds } from './questions';
import { AnswerMap } from './types';

export function answersToVector(answers: AnswerMap): number[] {
  const values = orderedQuestionIds.map((id) => answers[id] ?? 0);
  const vector = [...values];
  while (vector.length < 1024) vector.push(0);
  return vector.slice(0, 1024);
}
