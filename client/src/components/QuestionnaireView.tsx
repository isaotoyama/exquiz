import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { questions } from '../questions';
import { ui } from '../i18n';
import { getCategoryLabel } from '../categoryLabels';
import { countryOptions, industryOptions } from '../profileOptions';
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
  email: '',
  country: '',
  industry: ''
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
        const body = await saveRes.text();
        throw new Error(body);
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
            <button
              type="button"
              className="secondary"
              onClick={() => setLocale(locale === 'en' ? 'ja' : 'en')}
            >
              {text.language}
            </button>
          </div>
        </section>

        <section className="card" aria-labelledby="profile-title">
          <h2 id="profile-title" className="section-title">{text.profile}</h2>
          <div className="form-grid">
            <label className="label">
              <span>{locale === 'en' ? 'Name' : '氏名'}</span>
              <input
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              />
            </label>

            <label className="label">
              <span>{locale === 'en' ? 'Company' : '会社名'}</span>
              <input
                value={profile.company}
                onChange={(e) => setProfile({ ...profile, company: e.target.value })}
              />
            </label>

            <label className="label">
              <span>{locale === 'en' ? 'Title' : '役職'}</span>
              <input
                value={profile.title}
                onChange={(e) => setProfile({ ...profile, title: e.target.value })}
              />
            </label>

            <label className="label">
              <span>Email</span>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              />
            </label>

<label className="label">
  <span>{locale === 'en' ? 'Country' : '国'}</span>
  <select
    value={profile.country}
    onChange={(e) => setProfile({ ...profile, country: e.target.value })}
  >
    {countryOptions.map((option) => (
      <option key={option.value} value={option.value}>
        {locale === 'en' ? option.en : option.ja}
      </option>
    ))}
  </select>
</label>

<label className="label">
  <span>{locale === 'en' ? 'Industry' : '業界'}</span>
  <select
    value={profile.industry}
    onChange={(e) => setProfile({ ...profile, industry: e.target.value })}
  >
    {industryOptions.map((option) => (
      <option key={option.value} value={option.value}>
        {locale === 'en' ? option.en : option.ja}
      </option>
    ))}
  </select>
</label>
          </div>
        </section>

        <section className="card">
          <div className="progress-wrap">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h2 className="section-title" style={{ marginBottom: 0 }}>
                {locale === 'en' ? 'Progress' : '進捗'}
              </h2>
              <span className="small">{completed} / {questions.length}</span>
            </div>
            <div className="progress-bar">
              <span style={{ width: `${progress}%` }} />
            </div>
          </div>
        </section>

        {questions.map((q, index) => (
          <section className="card question-card" key={q.id}>
            <div className="question-meta">
              {index + 1}. {getCategoryLabel(q.category, locale)}
            </div>

            <h2 className="question-title">{q.prompt[locale]}</h2>

            <fieldset className="answer-group">
              <legend className="answer-legend">
                {locale === 'en' ? 'Choose one answer from 1 to 5' : '1から5の中で1つ選択してください'}
              </legend>

              <div className="question-scale">
                <div className="scale-labels">
                  <span>{locale === 'en' ? 'Short-term / profit-first' : '短期利益・効率優先'}</span>
                  <span>{locale === 'en' ? 'Long-term / value-centered' : '長期価値・人・社会重視'}</span>
                </div>

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
              </div>
            </fieldset>
          </section>
        ))}

        {error && (
          <div className="notice-error" role="alert">
            {error}
          </div>
        )}

        <section className="card">
          <button
            type="button"
            className="primary"
            disabled={completed !== questions.length || loading}
            onClick={submit}
          >
            {loading ? text.loading : text.submit}
          </button>
        </section>
      </div>
    </main>
  );
}