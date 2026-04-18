import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'node:crypto';
import { calculateSummary } from '../lib/score';
import { answersToVector } from '../lib/embed';
import { getSql } from '../lib/db';
import type { SubmissionPayload } from '../lib/types';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  try {
    const payload = req.body as SubmissionPayload;

    if (!payload || !payload.profile || !payload.answers || !payload.submittedAt) {
      return res.status(400).json({ ok: false, error: 'Invalid payload' });
    }

    const sql = getSql();
    const id = crypto.randomUUID();
    const summary = calculateSummary(payload.answers);
    const vector = answersToVector(payload.answers);

    await sql`
      insert into submissions (
        id,
        submitted_at,
        locale,
        profile_name,
        profile_company,
        profile_title,
        profile_email,
        profile_country,
        profile_industry,
        answers,
        summary
      ) values (
        ${id},
        ${payload.submittedAt},
        ${payload.locale},
        ${payload.profile.name ?? ''},
        ${payload.profile.company ?? ''},
        ${payload.profile.title ?? ''},
        ${payload.profile.email ?? ''},
        ${payload.profile.country ?? ''},
        ${payload.profile.industry ?? ''},
        ${JSON.stringify(payload.answers)},
        ${JSON.stringify(summary)}
      )
    `;

    return res.status(200).json({
      ok: true,
      id,
      summary,
      vectorLength: vector.length
    });
  } catch (error) {
    console.error('POST /api/submissions failed', error);
    return res.status(500).json({
      ok: false,
      error: error instanceof Error ? error.message : 'Internal server error'
    });
  }
}