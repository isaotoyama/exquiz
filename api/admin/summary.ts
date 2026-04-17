import type { VercelRequest, VercelResponse } from '@vercel/node';
import { buildAdminSummary } from '../../server/src/score.js';

// Temporary in-memory fallback.
// Replace with real DB reads in production.
const records: any[] = [];

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    const summary = buildAdminSummary(records);
    return res.status(200).json(summary);
  } catch (error) {
    console.error('GET /api/admin/summary failed', error);
    return res.status(500).json({
      ok: false,
      error: error instanceof Error ? error.message : 'Internal server error'
    });
  }
}