import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Locale, QuestionCategory, ScoreSummary, SimilarMatch } from '../types';
import { ui } from '../i18n';
import { getCategoryLabel } from '../categoryLabels';

type Props = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  reportData: {
    summary: ScoreSummary;
    similar: SimilarMatch[];
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
      <div className="card">
        <h1>{text.reportTitle}</h1>
        <p>No report data found.</p>
        <button type="button" onClick={() => navigate('/')}>
          {text.reportBack}
        </button>
      </div>
    );
  }

  const { summary, similar } = reportData;

  const entries = Object.entries(summary.byCategory) as [QuestionCategory, number][];

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
        <div className="grid">
          {entries.map(([key, value]) => (
            <div key={key} className="metric">
              <div className="small">{getCategoryLabel(key, locale)}</div>
              <div style={{ fontSize: 28, fontWeight: 700 }}>{value.toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h2>{text.similar}</h2>
        <div className="grid">
          {similar.length === 0 ? (
            <div className="small">No matches yet.</div>
          ) : (
            similar.map((match) => (
              <div className="metric" key={match.id}>
                <div style={{ fontWeight: 700 }}>{match.id}</div>
                <div className="small">score: {match.score.toFixed(3)}</div>
                {typeof match.metadata?.company === 'string' && (
                  <div className="small">{match.metadata.company}</div>
                )}
              </div>
            ))
          )}
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