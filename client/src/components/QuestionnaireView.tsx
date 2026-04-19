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

type Step = 1 | 2 | 3;

type Props = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  onSubmitted: (data: { summary: ScoreSummary; answers: AnswerMap }) => void;
};

const firstPageQuestions = questions.slice(0, 10);
const secondPageQuestions = questions.slice(10, 18);

export function QuestionnaireView({ locale, setLocale, onSubmitted }: Props) {
  const text = ui[locale];
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>(1);
  const [profile, setProfile] = useState<RespondentProfile>(defaultProfile);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const completed = useMemo(() => Object.keys(answers).length, [answers]);

  const stepQuestions = step === 2 ? firstPageQuestions : step === 3 ? secondPageQuestions : [];
  const currentProgress = step === 1 ? 0 : step === 2 ? 50 : 100;

  const canGoStep2 =
    profile.name &&
    profile.company &&
    profile.title &&
    profile.email &&
    profile.country &&
    profile.industry;

  const canGoStep3 = firstPageQuestions.every((q) => answers[q.id] !== undefined);
  const canSubmit = secondPageQuestions.every((q) => answers[q.id] !== undefined);

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
        <section className="card">
          <div className="card-header">
            <div>
              <h1 className="hero-title">{text.title}</h1>
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

        <section className="card">
          <div className="stepper">
            <div className={`step-pill ${step === 1 ? 'active' : ''}`}>
              {locale === 'en' ? 'User info' : '基本情報'}
            </div>
            <div className={`step-pill ${step === 2 ? 'active' : ''}`}>
              {locale === 'en' ? 'Questions 1–10' : '設問 1〜10'}
            </div>
            <div className={`step-pill ${step === 3 ? 'active' : ''}`}>
              {locale === 'en' ? 'Questions 11–18' : '設問 11〜18'}
            </div>
          </div>

          <div className="progress-bar" aria-hidden="true">
            <span style={{ width: `${currentProgress}%` }} />
          </div>
        </section>

        {step === 1 && (
          <section className="card">
            <h2 className="section-title">{locale === 'en' ? 'User info' : '基本情報'}</h2>
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

            <div className="page-actions">
              <button
                type="button"
                className="primary"
                disabled={!canGoStep2}
                onClick={() => setStep(2)}
              >
                {locale === 'en' ? 'Next' : '次へ'}
              </button>
            </div>
          </section>
        )}

        {(step === 2 || step === 3) && (
          <>
            {stepQuestions.map((q, index) => (
              <section className="card question-card" key={q.id}>
                <div className="question-meta">
                  {step === 2 ? index + 1 : index + 11}. {getCategoryLabel(q.category, locale)}
                </div>

                <h2 className="question-title">{q.prompt[locale]}</h2>

                <div className="slider-card">
                  <div className="slider-scale-labels">
                    <span>{q.anchors.left[locale]}</span>
                    <span>{q.anchors.right[locale]}</span>
                  </div>

                  <input
                    type="range"
                    min={1}
                    max={5}
                    step={1}
                    value={answers[q.id] ?? 3}
                    onChange={(e) =>
                      setAnswers((prev) => ({
                        ...prev,
                        [q.id]: Number(e.target.value)
                      }))
                    }
                    className="range-slider"
                    aria-label={q.prompt[locale]}
                  />

                  <div className="slider-values">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        type="button"
                        className={`slider-dot ${answers[q.id] === value ? 'active' : ''}`}
                        onClick={() =>
                          setAnswers((prev) => ({
                            ...prev,
                            [q.id]: value
                          }))
                        }
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
              </section>
            ))}

            {error && (
              <div className="notice-error" role="alert">
                {error}
              </div>
            )}

            <section className="card">
              <div className="page-actions">
                {step === 2 && (
                  <>
                    <button type="button" className="secondary" onClick={() => setStep(1)}>
                      {locale === 'en' ? 'Back' : '戻る'}
                    </button>
                    <button
                      type="button"
                      className="primary"
                      disabled={!canGoStep3}
                      onClick={() => setStep(3)}
                    >
                      {locale === 'en' ? 'Next' : '次へ'}
                    </button>
                  </>
                )}

                {step === 3 && (
                  <>
                    <button type="button" className="secondary" onClick={() => setStep(2)}>
                      {locale === 'en' ? 'Back' : '戻る'}
                    </button>
                    <button
                      type="button"
                      className="primary"
                      disabled={!canSubmit || loading}
                      onClick={submit}
                    >
                      {loading ? text.loading : text.submit}
                    </button>
                  </>
                )}
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}