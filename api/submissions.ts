import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'node:crypto';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  try {
    const payload = req.body;

    if (!payload || !payload.answers) {
      return res.status(400).json({ ok: false, error: 'Invalid payload' });
    }

    return res.status(200).json({
      ok: true,
      id: crypto.randomUUID(),
      summary: {
        overall: 0,
        byCategory: {
          timeHorizon: 0,
          valueDefinition: 0,
          sourceOfTruth: 0,
          investmentLogic: 0,
          researchEvidence: 0,
          orgAlignment: 0
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