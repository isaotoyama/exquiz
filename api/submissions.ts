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
      return res.status(500).json({
        ok: false,
        stage: 'import score',
        error: error instanceof Error ? error.message : String(error)
      });
    }

    let embedMod: any;
    try {
      embedMod = await import('../lib/embed');
    } catch (error) {
      return res.status(500).json({
        ok: false,
        stage: 'import embed',
        error: error instanceof Error ? error.message : String(error)
      });
    }

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

    let pineconeMod: any;
    try {
      pineconeMod = await import('../lib/pinecone');
    } catch (error) {
      return res.status(500).json({
        ok: false,
        stage: 'import pinecone',
        error: error instanceof Error ? error.message : String(error)
      });
    }

    const payload = req.body as any;

    if (!payload || !payload.profile || !payload.answers || !payload.submittedAt) {
      return res.status(400).json({ ok: false, error: 'Invalid payload' });
    }

    let summary: any;
    try {
      summary = scoreMod.calculateSummary(payload.answers);
    } catch (error) {
      return res.status(500).json({
        ok: false,
        stage: 'calculateSummary',
        error: error instanceof Error ? error.message : String(error)
      });
    }

    let vector: number[];
    try {
      vector = embedMod.answersToVector(payload.answers);
    } catch (error) {
      return res.status(500).json({
        ok: false,
        stage: 'answersToVector',
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

    return res.status(200).json({
      ok: true,
      stage: 'debug-ok',
      vectorLength: vector.length,
      summary
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      stage: 'top-level',
      error: error instanceof Error ? error.message : String(error)
    });
  }
}