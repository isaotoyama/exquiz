import { orderedQuestionIds } from '../../lib/questions.js';
import { AnswerMap } from '../../lib/types.js';

export function answersToVector(answers: AnswerMap): number[] {
  const values = orderedQuestionIds.map((id) => answers[id] ?? 0);
  const vector = [...values];
  while (vector.length < 1024) vector.push(0);
  return vector.slice(0, 1024);
}
