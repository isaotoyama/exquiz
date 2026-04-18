import type { VercelRequest, VercelResponse } from '@vercel/node';
import { answersToVector } from '../server/src/embed';
import { querySimilar } from '../server/src/pinecone';

type SubmissionPayload = {
  answers: Record<string, number>;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  try {
    const payload = req.body as SubmissionPayload;

    if (!payload || !payload.answers) {
      return res.status(400).json({ ok: false, error: 'Invalid payload' });
    }

    const vector = answersToVector(payload.answers);
    const matches = await querySimilar(vector);

    return res.status(200).json({
      ok: true,
      matches
    });
  } catch (error) {
    console.error('POST /api/search-similar failed', error);
    return res.status(500).json({
      ok: false,
      error: error instanceof Error ? error.message : 'Internal server error'
    });
  }
}