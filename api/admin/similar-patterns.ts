import type { VercelRequest, VercelResponse } from '@vercel/node';
import { querySimilar } from '../../lib/pinecone';

const patternVectors = [
  {
    label: '短期利益重視型',
    vector: [1, 1, 1, 1, 1, 1]
  },
  {
    label: 'バランス型',
    vector: [3, 3, 3, 3, 3, 3]
  },
  {
    label: '長期価値志向型',
    vector: [5, 5, 5, 5, 5, 5]
  }
];

function padTo1024(base: number[]) {
  const vector = [...base];
  while (vector.length < 1024) vector.push(0);
  return vector.slice(0, 1024);
}

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    const matches = [];

    for (const pattern of patternVectors) {
      const result = await querySimilar(padTo1024(pattern.vector));

      if (result[0]) {
        matches.push({
          ...result[0],
          metadata: {
            ...(result[0].metadata ?? {}),
            label: pattern.label
          }
        });
      } else {
        matches.push({
          id: pattern.label,
          score: 0,
          metadata: {
            label: pattern.label
          }
        });
      }
    }

    return res.status(200).json({ matches });
  } catch (error) {
    console.error('GET /api/admin/similar-patterns failed', error);
    return res.status(500).json({
      ok: false,
      error: error instanceof Error ? error.message : 'Internal server error'
    });
  }
}