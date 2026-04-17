import React, { useMemo, useState } from 'react';
import { questions } from '../questions';
import { ui } from '../i18n';
import { AnswerMap, Locale, RespondentProfile, ScoreSummary, SimilarMatch, SubmissionPayload } from '../types';

const defaultProfile: RespondentProfile = { name: '', company: '', title: '', email: '' };
const scale = [1, 2, 3, 4, 5];

export function QuestionnaireView({ locale }: { locale: Locale }) {
  const text = ui[locale];
  const [profile, setProfile] = useState<RespondentProfile>(defaultProfile);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [summary, setSummary] = useState<ScoreSummary | null>(null);
  const [similar, setSimilar] = useState<SimilarMatch[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const completed = useMemo(() => Object.keys(answers).length, [answers]);

  const submit = async () => {
    setLoading(true);
    setError(null);

    try {
      const payload: SubmissionPayload = {
        profile,
        locale,
        answers,
        submittedAt: new Date().toISOString()
      };

      const saveRes = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!saveRes.ok) {
        const text = await saveRes.text();
        throw new Error(`Submit failed: ${saveRes.status} ${text}`);
      }

      const saveData = await saveRes.json();
      setSummary(saveData.summary);

      const simRes = await fetch('/api/search-similar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!simRes.ok) {
        const text = await simRes.text();
        throw new Error(`Similarity search failed: ${simRes.status} ${text}`);
      }

      const simData = await simRes.json();
      setSimilar(simData.matches ?? []);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid">
      <div className="card">
        <h2>{text.profile}</h2>
        <div className="grid-2">
          <input
            placeholder={locale === 'en' ? 'Name' : '氏名'}
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          />
          <input
            placeholder={locale === 'en' ? 'Company' : '会社名'}
            value={profile.company}
            onChange={(e) => setProfile({ ...profile, company: e.target.value })}
          />
          <input
            placeholder={locale === 'en' ? 'Title' : '役職'}
            value={profile.title}
            onChange={(e) => setProfile({ ...profile, title: e.target.value })}
          />
          <input
            placeholder="Email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />
        </div>
        <p className="small" style={{ marginTop: 12 }}>
          {completed} / {questions.length}
        </p>
      </div>

      {questions.map((q, index) => (
        <div className="card" key={q.id}>
          <div className="small">
            {index + 1}. {q.category}
          </div>
          <h3>{q.prompt[locale]}</h3>
          <p className="small">{q.theory[locale]}</p>
          <div className="question-scale">
            <span className="small">1</span>
            <div className="bubbles">
              {scale.map((value) => (
                <button
                  key={value}
                  type="button"
                  className={`bubble ${answers[q.id] === value ? 'selected' : ''}`}
                  onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: value }))}
                >
                  {value}
                </button>
              ))}
            </div>
            <span className="small">5</span>
          </div>
        </div>
      ))}

      {error && (
        <div className="card" style={{ border: '1px solid #d33', color: '#b00020' }}>
          {error}
        </div>
      )}

      <div className="card">
        <button
          type="button"
          className="primary"
          disabled={completed !== questions.length || loading}
          onClick={submit}
        >
          {loading ? text.loading : text.submit}
        </button>
      </div>

      {summary && (
        <div className="grid-2">
          <div className="card">
            <h2>
              {text.overall}: {summary.overall.toFixed(2)} / 5
            </h2>
            <p>
              <strong>{text.interpretation}:</strong> {summary.orientation[locale]}
            </p>
            <div className="grid">
              {Object.entries(summary.byCategory).map(([key, value]) => (
                <div key={key} className="metric">
                  <div className="small">{key}</div>
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
        </div>
      )}
    </div>
  );
}