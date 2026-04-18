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
  const progress = Math.round((completed / questions.length) * 100);

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
    <main className="page">
      <div className="grid">
        <section className="card" aria-labelledby="questionnaire-title">
          <div className="card-header">
            <div>
              <h1 id="questionnaire-title" className="hero-title">{text.title}</h1>
              <p className="hero-subtitle">{text.subtitle}</p>
            </div>
            <div className="top-actions">
              <button
                type="button"
                className="secondary"
                onClick={() => setLocale(locale === 'en' ? 'ja' : 'en')}
                aria-label={locale === 'en' ? 'Switch language to Japanese' : 'Switch language to English'}
              >
                {text.language}
              </button>
            </div>
          </div>
        </section>

        <section className="card" aria-labelledby="profile-title">
          <h2 id="profile-title" className="section-title">{text.profile}</h2>
          <div className="form-grid">
            <label className="label">
              <span>{locale === 'en' ? 'Name' : '氏名'}</span>
              <input
                name="name"
                autoComplete="name"
                placeholder={locale === 'en' ? 'Name' : '氏名'}
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              />
            </label>

            <label className="label">
              <span>{locale === 'en' ? 'Company' : '会社名'}</span>
              <input
                name="organization"
                autoComplete="organization"
                placeholder={locale === 'en' ? 'Company' : '会社名'}
                value={profile.company}
                onChange={(e) => setProfile({ ...profile, company: e.target.value })}
              />
            </label>

            <label className="label">
              <span>{locale === 'en' ? 'Title' : '役職'}</span>
              <input
                name="title"
                autoComplete="organization-title"
                placeholder={locale === 'en' ? 'Title' : '役職'}
                value={profile.title}
                onChange={(e) => setProfile({ ...profile, title: e.target.value })}
              />
            </label>

            <label className="label">
              <span>Email</span>
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              />
            </label>
          </div>
        </section>

        <section className="card" aria-labelledby="progress-title">
          <div className="progress-wrap">
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
              <h2 id="progress-title" className="section-title" style={{ marginBottom: 0 }}>
                {locale === 'en' ? 'Progress' : '進捗'}
              </h2>
              <span className="small" aria-live="polite">
                {completed} / {questions.length}
              </span>
            </div>
            <div
              className="progress-bar"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={questions.length}
              aria-valuenow={completed}
              aria-label={locale === 'en' ? 'Questionnaire progress' : '質問票の進捗'}
            >
              <span style={{ width: `${progress}%` }} />
            </div>
          </div>
        </section>

        {questions.map((q, index) => (
          <section className="card question-card" key={q.id} aria-labelledby={`${q.id}-title`}>
            <div className="question-meta">
              {index + 1}. {getCategoryLabel(q.category, locale)}
            </div>

            <h2 id={`${q.id}-title`} className="question-title">
              {q.prompt[locale]}
            </h2>

            <p className="small">{q.theory[locale]}</p>

            <fieldset className="answer-group">
              <legend className="answer-legend">
                {locale === 'en' ? 'Choose one answer from 1 to 5' : '1から5の中で1つ選択してください'}
              </legend>

              <div className="question-scale">
                <div className="scale-labels">
                  <span>
                    {locale === 'en' ? 'Short-term / profit-first' : '短期利益・効率優先'}
                  </span>
                  <span>
                    {locale === 'en' ? 'Long-term / value-centered' : '長期価値・人・社会重視'}
                  </span>
                </div>

                <div className="bubbles" role="radiogroup" aria-labelledby={`${q.id}-title`}>
                  {scale.map((value) => (
                    <button
                      key={value}
                      type="button"
                      role="radio"
                      aria-checked={answers[q.id] === value}
                      aria-label={`${locale === 'en' ? 'Answer' : '回答'} ${value}`}
                      className={`bubble ${answers[q.id] === value ? 'selected' : ''}`}
                      onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: value }))}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
            </fieldset>
          </section>
        ))}

        {error && (
          <div className="notice-error" role="alert" aria-live="assertive">
            {error}
          </div>
        )}

        <section className="card">
          <button
            type="button"
            className="primary"
            disabled={completed !== questions.length || loading}
            onClick={submit}
            aria-busy={loading}
          >
            {loading ? text.loading : text.submit}
          </button>
        </section>
      </div>
    </main>
  );
}