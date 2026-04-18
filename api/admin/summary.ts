import type { VercelRequest, VercelResponse } from '@vercel/node';
import { buildAdminSummary } from '../../server/src/score';

type SubmissionRecord = {
  id: string;
  submittedAt: string;
  summary: {
    overall: number;
    byCategory: {
      timeHorizon: number;
      valueDefinition: number;
      sourceOfTruth: number;
      investmentLogic: number;
      researchEvidence: number;
      orgAlignment: number;
    };
  };
};

const records: SubmissionRecord[] = [];

export default function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    const summary = buildAdminSummary(records as any);
    return res.status(200).json(summary);
  } catch (error) {
    console.error('GET /api/admin/summary failed', error);
    return res.status(500).json({
      ok: false,
      error: error instanceof Error ? error.message : 'Internal server error'
    });
  }
}