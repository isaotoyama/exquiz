import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'node:crypto';
import { calculateSummary } from '../lib/score';
import { answersToVector } from '../lib/embed';
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

    const id = crypto.randomUUID();
    const summary = calculateSummary(payload.answers);
    const vector = answersToVector(payload.answers);

    let dbMod: any;
    try {
      dbMod = await import('../lib/db');
    } catch (error) {
      return res.status(500).json({
        ok: false,
        stage: 'import db',
        error: error instanceof Error ? error.message : String(error)
      });
    }

    let sql: any;
    try {
      sql = dbMod.getSql();
    } catch (error) {
      return res.status(500).json({
        ok: false,
        stage: 'getSql',
        error: error instanceof Error ? error.message : String(error)
      });
    }

    try {
      await sql`select 1 as ok`;
    } catch (error) {
      return res.status(500).json({
        ok: false,
        stage: 'select 1',
        error: error instanceof Error ? error.message : String(error)
      });
    }

    return res.status(200).json({
      ok: true,
      id,
      summary,
      vectorLength: vector.length,
      db: 'ok'
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      stage: 'top-level',
      error: error instanceof Error ? error.message : String(error)
    });
  }
}