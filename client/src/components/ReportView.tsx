import React from 'react';
import { useNavigate } from 'react-router-dom';
import { questions } from '../questions';
import { ui } from '../i18n';
import { getCategoryLabel, getCategorySummary } from '../categoryLabels';
import { AnswerMap, Locale, QuestionCategory, ScoreSummary } from '../types';

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

function RadarBars({
  locale,
  byCategory
}: {
  locale: Locale;
  byCategory: Record<QuestionCategory, number>;
}) {
  const entries = Object.entries(byCategory) as [QuestionCategory, number][];

  return (
    <div className="grid">
      {entries.map(([key, value]) => (
        <div key={key} className="metric">
          <div className="small">{getCategoryLabel(key, locale)}</div>
          <div className="bar-wrap">
            <div className="bar-fill" style={{ width: `${(value / 5) * 100}%` }} />
          </div>
          <div style={{ fontSize: 24, fontWeight: 700 }}>{value.toFixed(2)}</div>
          <div className="small">{getCategorySummary(key, locale)}</div>
        </div>
      ))}
    </div>
  );
}

export function ReportView({ locale, setLocale, reportData }: Props) {
  const navigate = useNavigate();
  const text = ui[locale];

  if (!reportData) {
    return (
      <div className="card">
        <h1>{text.reportTitle}</h1>
        <p>No report data found.</p>
        <button type="button" onClick={() => navigate('/')}>
          {text.reportBack}
        </button>
      </div>
    );
  }

  const { summary, answers } = reportData;

  return (
    <div className="grid">
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1>{text.reportTitle}</h1>
            <p>{text.reportSubtitle}</p>
          </div>
          <button type="button" onClick={() => setLocale(locale === 'en' ? 'ja' : 'en')}>
            {text.language}
          </button>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <h2>{text.overall}: {summary.overall.toFixed(2)} / 5</h2>
          <p>
            <strong>{text.interpretation}:</strong> {summary.orientation[locale]}
          </p>
        </div>

        <div className="card">
          <h2>{text.themesTitle}</h2>
          <p>{getThemeMessage(summary, locale)}</p>
        </div>
      </div>

      <div className="card">
        <h2>{text.radarTitle}</h2>
        <RadarBars locale={locale} byCategory={summary.byCategory} />
      </div>

      <div className="card">
        <h2>{text.questionInterpretation}</h2>
        <div className="grid">
          {questions.map((q) => (
            <div key={q.id} className="metric">
              <div className="small">{getCategoryLabel(q.category, locale)}</div>
              <h3 style={{ marginTop: 8 }}>{q.prompt[locale]}</h3>
              <div className="small" style={{ marginBottom: 8 }}>
                {text.answerLabel}: {answers[q.id] ?? '-'}
              </div>
              <p className="small">{q.theory[locale]}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <button type="button" className="primary" onClick={() => navigate('/')}>
          {text.reportBack}
        </button>
      </div>
    </div>
  );
}