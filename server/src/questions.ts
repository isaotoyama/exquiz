import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'node:crypto';
import type { SubmissionPayload } from '../server/src/types.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  try {
    const payload = req.body as SubmissionPayload;

    if (!payload || !payload.answers) {
      return res.status(400).json({ ok: false, error: 'Invalid payload' });
    }

    return res.status(200).json({
      ok: true,
      id: crypto.randomUUID(),
      summary: {
        overall: 3,
        byCategory: {
          timeHorizon: 3,
          valueDefinition: 3,
          sourceOfTruth: 3,
          investmentLogic: 3,
          researchEvidence: 3,
          orgAlignment: 3
        },
        orientation: {
          en: 'test',
          ja: 'test'
        }
      }
    });
  } catch (error) {
    console.error('submissions failed', error);
    return res.status(500).json({
      ok: false,
      error: error instanceof Error ? error.message : 'Internal server error'
    });
  }
}