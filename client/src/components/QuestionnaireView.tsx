import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { questions } from '../questions';
import { ui } from '../i18n';
import { getCategoryLabel } from '../categoryLabels';
import {
  AnswerMap,
  Locale,
  RespondentProfile,
  ScoreSummary,
  SubmissionPayload
} from '../types';

const defaultProfile: RespondentProfile = {
  name: '',
  company: '',
  title: '',
  email: ''
};

const scale = [1, 2, 3, 4, 5];

type Props = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  onSubmitted: (data: { summary: ScoreSummary; answers: AnswerMap }) => void;
};

export function QuestionnaireView({ locale, setLocale, onSubmitted }: Props) {
  const text = ui[locale];
  const navigate = useNavigate();

  const [profile, setProfile] = useState<RespondentProfile>(defaultProfile);
  const [answers, setAnswers] = useState<AnswerMap>({});
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

      onSubmitted({
        summary: saveData.summary,
        answers
      });

      navigate('/report');
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1>{text.title}</h1>
            <p>{text.subtitle}</p>
          </div>
          <button type="button" onClick={() => setLocale(locale === 'en' ? 'ja' : 'en')}>
            {text.language}
          </button>
        </div>

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
            {index + 1}. {getCategoryLabel(q.category, locale)}
          </div>
          <h3>{q.prompt[locale]}</h3>
          <p className="small">{q.theory[locale]}</p>

          <div className="question-scale">
            <span className="small">1</span>
            <div className="bubbles">
              {scale.map((value) => (
                <button
                  type="button"
                  key={value}
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
    </div>
  );
}