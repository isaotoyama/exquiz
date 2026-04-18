import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Locale, ScoreSummary, SimilarMatch } from './types';
import { QuestionnaireView } from './components/QuestionnaireView';
import { ReportView } from './components/ReportView';

export default function App() {
  const [locale, setLocale] = useState<Locale>('en');
  const [reportData, setReportData] = useState<{
    summary: ScoreSummary;
    similar: SimilarMatch[];
  } | null>(null);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <QuestionnaireView
            locale={locale}
            setLocale={setLocale}
            onSubmitted={(data) => setReportData(data)}
          />
        }
      />
      <Route
        path="/report"
        element={
          <ReportView
            locale={locale}
            setLocale={setLocale}
            reportData={reportData}
          />
        }
      />
    </Routes>
  );
}