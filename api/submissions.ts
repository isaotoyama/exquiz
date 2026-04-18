import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'node:crypto';
import { calculateSummary } from '../lib/score';
import { answersToVector } from '../lib/embed';
import { upsertVector } from '../lib/pinecone';
import type { SubmissionPayload } from '../lib/types';
import { getSql } from '../lib/db';

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

    await upsertVector({
      id,
      values: vector,
      metadata: {
        name: payload.profile.name ?? '',
        company: payload.profile.company ?? '',
        title: payload.profile.title ?? '',
        email: payload.profile.email ?? '',
        country: payload.profile.country ?? '',
        industry: payload.profile.industry ?? '',
        locale: payload.locale ?? 'en',
        submittedAt: payload.submittedAt,
        overall: summary.overall,
        timeHorizon: summary.byCategory.timeHorizon,
        valueDefinition: summary.byCategory.valueDefinition,
        sourceOfTruth: summary.byCategory.sourceOfTruth,
        peopleCulture: summary.byCategory.peopleCulture,
        executionStyle: summary.byCategory.executionStyle,
        responsibilityEthics: summary.byCategory.responsibilityEthics
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