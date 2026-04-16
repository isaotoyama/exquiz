import React, { useEffect, useMemo, useState } from 'react';
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Scatter, ScatterChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { ui } from '../i18n';
import { AdminSummary, Locale, SubmissionRecord } from '../types';

function ClusterPlot({ items }: { items: SubmissionRecord[] }) {
  const data = items.map((item) => ({
    x: item.summary.byCategory.timeHorizon,
    y: item.summary.byCategory.researchEvidence,
    z: item.summary.overall,
    name: item.profile.company || item.profile.name || item.id,
    cluster: item.summary.overall >= 4.2 ? 'Leadership-level' : item.summary.overall >= 3.5 ? 'Emerging' : item.summary.overall >= 2.5 ? 'Mixed' : 'Short-term'
  }));

  return (
    <ResponsiveContainer width="100%" height={320}>
      <ScatterChart>
        <CartesianGrid />
        <XAxis type="number" dataKey="x" name="Time Horizon" domain={[1, 5]} />
        <YAxis type="number" dataKey="y" name="Research Evidence" domain={[1, 5]} />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter data={data} />
      </ScatterChart>
    </ResponsiveContainer>
  );
}

export function AdminDashboard({ locale }: { locale: Locale }) {
  const text = ui[locale];
  const [summary, setSummary] = useState<AdminSummary | null>(null);

  useEffect(() => {
    fetch('/api/admin/summary')
      .then((res) => res.json())
      .then(setSummary);
  }, []);

  const radarData = useMemo(() => {
    if (!summary) return [];
    return Object.entries(summary.categoryAverages).map(([subject, value]) => ({ subject, value }));
  }, [summary]);

  if (!summary) return <div className="card">{text.loading}</div>;

  return (
    <div className="grid">
      <div className="grid-2">
        <div className="metric">
          <div className="small">{text.responses}</div>
          <div style={{ fontSize: 32, fontWeight: 800 }}>{summary.totalResponses}</div>
        </div>
        <div className="metric">
          <div className="small">{text.overall}</div>
          <div style={{ fontSize: 32, fontWeight: 800 }}>{summary.averageOverall.toFixed(2)}</div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <h2>{text.radar}</h2>
          <ResponsiveContainer width="100%" height={360}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis domain={[0, 5]} />
              <Radar dataKey="value" fillOpacity={0.3} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <h2>{text.clusters}</h2>
          <ClusterPlot items={summary.recentSubmissions} />
          <div className="grid">
            {summary.clusterSummary.map((cluster) => (
              <div key={cluster.label} className="metric">
                <div style={{ fontWeight: 700 }}>{cluster.label}</div>
                <div className="small">count: {cluster.count}</div>
                <div className="small">avg: {cluster.average.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <h2>{text.recent}</h2>
        <div className="grid">
          {summary.recentSubmissions.map((item) => (
            <div key={item.id} className="metric">
              <div style={{ fontWeight: 700 }}>{item.profile.company || item.profile.name || item.id}</div>
              <div className="small">{item.profile.title}</div>
              <div className="small">overall: {item.summary.overall.toFixed(2)}</div>
              <div className="small">{new Date(item.submittedAt).toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
