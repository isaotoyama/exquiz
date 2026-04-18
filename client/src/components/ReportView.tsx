import React from 'react';
import { useNavigate } from 'react-router-dom';
import { questions } from '../questions';
import { ui } from '../i18n';
import { getCategoryLabel, getCategorySummary } from '../categoryLabels';
import { AnswerMap, Locale, QuestionCategory, ScoreSummary } from '../types';
import { RadarChart } from './RadarChart';

type Props = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  reportData: {
    summary: ScoreSummary;
    answers: AnswerMap;
  } | null;
};

function getThemeMessage(summary: ScoreSummary, locale: Locale) {
  const text = ui[locale].reportThemes;
  if (summary.overall >= 4) return text.longTerm;
  if (summary.overall < 2.5) return text.shortTerm;
  return text.balanced;
}

export function ReportView({ locale, setLocale, reportData }: Props) {
  const navigate = useNavigate();
  const text = ui[locale];

  if (!reportData) {
    return (
      <main className="page">
        <div className="card">
          <h1 className="hero-title">{text.reportTitle}</h1>
          <p className="hero-subtitle">
            {locale === 'en' ? 'No report data found.' : 'レポートデータが見つかりません。'}
          </p>
          <button type="button" className="primary" onClick={() => navigate('/')}>
            {text.reportBack}
          </button>
        </div>
      </main>
    );
  }

  const { summary, answers } = reportData;
  const entries = Object.entries(summary.byCategory) as [QuestionCategory, number][];

  return (
    <main className="page">
      <div className="grid">
        <section className="card">
          <div className="card-header">
            <div>
              <h1 className="hero-title">{text.reportTitle}</h1>
              <p className="hero-subtitle">{text.reportSubtitle}</p>
            </div>
            <button
              type="button"
              className="secondary"
              onClick={() => setLocale(locale === 'en' ? 'ja' : 'en')}
            >
              {text.language}
            </button>
          </div>
        </section>

        <section className="grid-2">
          <div className="card">
            <h2 className="section-title">{text.overall}</h2>
            <div className="metric-value">{summary.overall.toFixed(2)} / 5</div>
            <p>
              <strong>{text.interpretation}:</strong> {summary.orientation[locale]}
            </p>
          </div>

          <div className="card">
            <h2 className="section-title">{text.themesTitle}</h2>
            <p>{getThemeMessage(summary, locale)}</p>
          </div>
        </section>

        <section className="card">
          <h2 className="section-title">{text.radarTitle}</h2>
          <RadarChart locale={locale} data={summary.byCategory} />
        </section>

        <section className="card">
          <h2 className="section-title">
            {locale === 'en' ? 'Category summary' : 'カテゴリー別サマリー'}
          </h2>
          <div className="metric-grid">
            {entries.map(([key, value]) => (
              <div key={key} className="metric">
                <div className="small">{getCategoryLabel(key, locale)}</div>
                <div className="metric-value">{value.toFixed(2)}</div>
                <div className="small">{getCategorySummary(key, locale)}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="card">
          <h2 className="section-title">{text.questionInterpretation}</h2>
          <div className="question-review">
            {questions.map((q) => (
              <article key={q.id} className="question-review-card">
                <div className="small">{getCategoryLabel(q.category, locale)}</div>
                <h3>{q.prompt[locale]}</h3>
                <div className="answer-chip">
                  {text.answerLabel}: {answers[q.id] ?? '-'}
                </div>
                <p className="small" style={{ marginTop: 10 }}>
                  {q.theory[locale]}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="card">
          <button type="button" className="primary" onClick={() => navigate('/')}>
            {text.reportBack}
          </button>
        </section>
      </div>
    </main>
  );
}