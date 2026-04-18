import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'node:crypto';
import { calculateSummary } from '../server/src/score.js';
import { answersToVector } from '../server/src/embed.js';
import { upsertVector } from '../server/src/pinecone.js';
import type { SubmissionPayload } from '../server/src/types.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  try {
    const payload = req.body as SubmissionPayload;

    if (!payload || !payload.profile || !payload.answers || !payload.submittedAt) {
      return res.status(400).json({ ok: false, error: 'Invalid payload' });
    }

    const id = crypto.randomUUID();
    const summary = calculateSummary(payload.answers);
    const vector = answersToVector(payload.answers);

    await upsertVector({
      id,
      values: vector,
      metadata: {
        name: payload.profile.name ?? '',
        company: payload.profile.company ?? '',
        title: payload.profile.title ?? '',
        email: payload.profile.email ?? '',
        locale: payload.locale ?? 'en',
        submittedAt: payload.submittedAt,
        overall: summary.overall,
        timeHorizon: summary.byCategory.timeHorizon,
        valueDefinition: summary.byCategory.valueDefinition,
        sourceOfTruth: summary.byCategory.sourceOfTruth,
        investmentLogic: summary.byCategory.investmentLogic,
        researchEvidence: summary.byCategory.researchEvidence,
        orgAlignment: summary.byCategory.orgAlignment
      }
    });

    return res.status(200).json({
      ok: true,
      id,
      summary
    });
  } catch (error) {
    console.error('POST /api/submissions failed', error);
    return res.status(500).json({
      ok: false,
      error: error instanceof Error ? error.message : 'Internal server error'
    });
  }
}