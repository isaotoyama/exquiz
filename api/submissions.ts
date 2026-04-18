import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ ok: false, error: 'Method not allowed' });
    }

    let scoreMod: any;
    try {
      scoreMod = await import('../lib/score');
    } catch (error) {
      console.error('failed importing score', error);
      return res.status(500).json({
        ok: false,
        stage: 'import score',
        error: error instanceof Error ? error.message : String(error)
      });
    }

    let typesMod: any;
    try {
      typesMod = await import('../lib/types');
    } catch (error) {
      console.error('failed importing types', error);
      return res.status(500).json({
        ok: false,
        stage: 'import types',
        error: error instanceof Error ? error.message : String(error)
      });
    }

    const payload = req.body as any;

    if (!payload || !payload.answers) {
      return res.status(400).json({ ok: false, error: 'Invalid payload' });
    }

    let summary: any;
    try {
      summary = scoreMod.calculateSummary(payload.answers);
    } catch (error) {
      console.error('failed calculating summary', error);
      return res.status(500).json({
        ok: false,
        stage: 'calculateSummary',
        error: error instanceof Error ? error.message : String(error)
      });
    }

    return res.status(200).json({
      ok: true,
      summary
    });
  } catch (error) {
    console.error('top-level handler failure', error);
    return res.status(500).json({
      ok: false,
      stage: 'top-level',
      error: error instanceof Error ? error.message : String(error)
    });
  }
}