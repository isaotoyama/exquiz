import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Locale, AnswerMap, ScoreSummary, SimilarMatch, AdminSummary } from './types';
import { QuestionnaireView } from './components/QuestionnaireView';
import { ReportView } from './components/ReportView';
import { AdminDashboard } from './components/AdminDashboard';

export default function App() {
  const [locale, setLocale] = useState<Locale>('ja');
  const [reportData, setReportData] = useState<{
    summary: ScoreSummary;
    answers: AnswerMap;
  } | null>(null);

  const [adminData, setAdminData] = useState<AdminSummary | null>(null);
  const [similarPatterns, setSimilarPatterns] = useState<SimilarMatch[]>([]);

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
      <Route
        path="/admin"
        element={
          <AdminDashboard
            locale={locale}
            setLocale={setLocale}
            adminData={adminData}
            setAdminData={setAdminData}
            similarPatterns={similarPatterns}
            setSimilarPatterns={setSimilarPatterns}
          />
        }
      />
    </Routes>
  );
}