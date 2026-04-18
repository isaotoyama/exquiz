import React, { useEffect, useMemo, useState } from 'react';
import { ui } from '../i18n';
import { getCategoryLabel } from '../categoryLabels';
import { AdminSummary, Locale, QuestionCategory, SimilarMatch } from '../types';

type Props = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  adminData: AdminSummary | null;
  setAdminData: (data: AdminSummary | null) => void;
  similarPatterns: SimilarMatch[];
  setSimilarPatterns: (patterns: SimilarMatch[]) => void;
};

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
        </div>
      ))}
    </div>
  );
}

export function AdminDashboard({
  locale,
  setLocale,
  adminData,
  setAdminData,
  similarPatterns,
  setSimilarPatterns
}: Props) {
  const text = ui[locale];
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setError(null);

        const summaryRes = await fetch('/api/admin/summary');
        if (!summaryRes.ok) {
          const body = await summaryRes.text();
          throw new Error(body);
        }
        const summaryJson = await summaryRes.json();
        setAdminData(summaryJson);

        const patternsRes = await fetch('/api/admin/similar-patterns');
        if (!patternsRes.ok) {
          const body = await patternsRes.text();
          throw new Error(body);
        }
        const patternsJson = await patternsRes.json();
        setSimilarPatterns(patternsJson.matches ?? []);
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      }
    };

    load();
  }, [setAdminData, setSimilarPatterns]);

  const patternLabels = useMemo(
    () => [text.patternA, text.patternB, text.patternC],
    [text.patternA, text.patternB, text.patternC]
  );

  return (
    <div className="grid">
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1>{text.adminTitle}</h1>
          </div>
          <button type="button" onClick={() => setLocale(locale === 'en' ? 'ja' : 'en')}>
            {text.language}
          </button>
        </div>
      </div>

      {error && (
        <div className="card" style={{ border: '1px solid #d33', color: '#b00020' }}>
          {error}
        </div>
      )}

      {adminData && (
        <>
          <div className="grid-2">
            <div className="card">
              <h2>{text.responses}</h2>
              <div style={{ fontSize: 36, fontWeight: 700 }}>{adminData.totalResponses}</div>
            </div>

            <div className="card">
              <h2>{text.averageScore}</h2>
              <div style={{ fontSize: 36, fontWeight: 700 }}>
                {adminData.averageOverall.toFixed(2)}
              </div>
            </div>
          </div>

          <div className="card">
            <h2>{text.radar}</h2>
            <RadarBars locale={locale} byCategory={adminData.categoryAverages} />
          </div>

          <div className="card">
            <h2>{text.clusters}</h2>
            <div className="grid-2">
              {adminData.clusterSummary.map((cluster) => (
                <div key={cluster.label} className="metric">
                  <div style={{ fontWeight: 700 }}>{cluster.label}</div>
                  <div className="small">count: {cluster.count}</div>
                  <div className="small">average: {cluster.average.toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h2>{text.similarPatterns}</h2>
            <div className="grid">
              {patternLabels.map((label, index) => (
                <div className="metric" key={label}>
                  <div style={{ fontWeight: 700 }}>{label}</div>
                  {similarPatterns[index] ? (
                    <>
                      <div className="small">score: {similarPatterns[index].score.toFixed(3)}</div>
                      {typeof similarPatterns[index].metadata?.company === 'string' && (
                        <div className="small">{similarPatterns[index].metadata?.company}</div>
                      )}
                    </>
                  ) : (
                    <div className="small">-</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h2>{text.recent}</h2>
            <div className="grid">
              {adminData.recentSubmissions.map((item) => (
                <div key={item.id} className="metric">
                  <div style={{ fontWeight: 700 }}>
                    {item.profile?.company || '-'}
                  </div>
                  <div className="small">{item.profile?.title || '-'}</div>
                  <div className="small">{item.submittedAt}</div>
                  <div className="small">{text.overall}: {item.summary.overall.toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}