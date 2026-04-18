import { QuestionCategory, Locale } from './types';
import { ui } from './i18n';

export function getCategoryLabel(category: QuestionCategory, locale: Locale) {
  return ui[locale].categoryLabels[category];
}