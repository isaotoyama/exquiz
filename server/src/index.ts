import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import crypto from 'node:crypto';
import { answersToVector } from './embed.js';
import { upsertVector, querySimilar } from './pinecone.js';
import { calculateSummary, buildAdminSummary } from './score.js';
import { loadRecords, saveRecord } from './storage.js';
import { SubmissionPayload, SubmissionRecord } from './types.js';

const app = express();
const port = Number(process.env.PORT || 8787);

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.post('/api/submissions', async (req, res) => {
  const payload = req.body as SubmissionPayload;
  const summary = calculateSummary(payload.answers);
  const id = crypto.randomUUID();
  const record: SubmissionRecord = { ...payload, id, summary };
  saveRecord(record);

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
});

app.post('/api/search-similar', async (req, res) => {
  const payload = req.body as SubmissionPayload;
  const matches = await querySimilar(answersToVector(payload.answers));
  res.json({ matches });
});

app.get('/api/admin/summary', (_req, res) => {
  const records = loadRecords();
  res.json(buildAdminSummary(records));
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
