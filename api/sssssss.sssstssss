import express from 'express';
import cors from 'cors';
import crypto from 'node:crypto';
import { answersToVector } from '../server/src/embed.js';
import { upsertVector, querySimilar } from '../server/src/pinecone.js';
import { calculateSummary, buildAdminSummary } from '../server/src/score.js';
import { SubmissionPayload } from '../server/src/types.js';

// Temporary in-memory fallback for serverless.
// Replace with Postgres / KV / Supabase for real persistence.
const records: any[] = [];

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.post('/api/submissions', async (req, res) => {
  try {
    const payload = req.body as SubmissionPayload;
    const summary = calculateSummary(payload.answers);
    const id = crypto.randomUUID();

    records.push({ ...payload, id, summary });

    await upsertVector({
      id,
      values: answersToVector(payload.answers),
      metadata: {
        name: payload.profile.name,
        company: payload.profile.company,
        title: payload.profile.title,
        email: payload.profile.email,
        locale: payload.locale,
        submittedAt: payload.submittedAt,
        overall: summary.overall,
        ...summary.byCategory
      }
    });

    res.json({ ok: true, id, summary });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error: 'Failed to save submission' });
  }
});

app.post('/api/search-similar', async (req, res) => {
  try {
    const payload = req.body as SubmissionPayload;
    const matches = await querySimilar(answersToVector(payload.answers));
    res.json({ ok: true, matches });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error: 'Failed to search similar responses' });
  }
});

app.get('/api/admin/summary', (_req, res) => {
  try {
    res.json(buildAdminSummary(records));
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error: 'Failed to build admin summary' });
  }
});

export default app;