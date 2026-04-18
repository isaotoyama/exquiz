import { Locale, QuestionCategory } from './types';
import { ui } from './i18n';

export function getCategoryLabel(category: QuestionCategory, locale: Locale) {
  return ui[locale].categoryLabels[category];
}

export function getCategorySummary(category: QuestionCategory, locale: Locale) {
  return ui[locale].categorySummaries[category];
}