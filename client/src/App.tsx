import React, { useState } from 'react';
import { AdminDashboard } from './components/AdminDashboard';
import { QuestionnaireView } from './components/QuestionnaireView';
import { ui } from './i18n';
import { Locale } from './types';

export default function App() {
  const [locale, setLocale] = useState<Locale>('en');
  const [tab, setTab] = useState<'questionnaire' | 'admin'>('questionnaire');
  const text = ui[locale];

  return (
    <div className="container">
      <div className="toolbar">
        <div>
          <h1 style={{ marginBottom: 6 }}>{text.title}</h1>
          <div className="small">{text.subtitle}</div>
        </div>
        <div className="tabs">
          <button className={`tab ${tab === 'questionnaire' ? 'active' : ''}`} onClick={() => setTab('questionnaire')}>
            {text.questionnaire}
          </button>
          <button className={`tab ${tab === 'admin' ? 'active' : ''}`} onClick={() => setTab('admin')}>
            {text.admin}
          </button>
          <button className="pill" onClick={() => setLocale(locale === 'en' ? 'ja' : 'en')}>
            {text.language}
          </button>
        </div>
      </div>

      {tab === 'questionnaire' ? <QuestionnaireView locale={locale} /> : <AdminDashboard locale={locale} />}
    </div>
  );
}
