import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    let scoreMod: any;
    try {
      scoreMod = await import('../../lib/score');
    } catch (error) {
      return res.status(500).json({
        ok: false,
        stage: 'import score',
        error: error instanceof Error ? error.message : String(error)
      });
    }

    let dbMod: any;
    try {
      dbMod = await import('../../lib/db');
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

    let rows: any[];
    try {
      rows = await sql`
        select
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
        from submissions
        order by submitted_at desc
      `;
    } catch (error) {
      return res.status(500).json({
        ok: false,
        stage: 'select submissions',
        error: error instanceof Error ? error.message : String(error)
      });
    }

    try {
      const records = rows.map((row: any) => ({
        id: row.id,
        submittedAt: new Date(row.submitted_at).toISOString(),
        locale: row.locale,
        profile: {
          name: row.profile_name,
          company: row.profile_company,
          title: row.profile_title,
          email: row.profile_email,
          country: row.profile_country,
          industry: row.profile_industry
        },
        answers:
          typeof row.answers === 'string' ? JSON.parse(row.answers) : (row.answers ?? {}),
        summary:
          typeof row.summary === 'string' ? JSON.parse(row.summary) : row.summary
      }));

      const summary = scoreMod.buildAdminSummary(records);
      return res.status(200).json(summary);
    } catch (error) {
      return res.status(500).json({
        ok: false,
        stage: 'build summary',
        error: error instanceof Error ? error.message : String(error)
      });
    }
  } catch (error) {
    return res.status(500).json({
      ok: false,
      stage: 'top-level',
      error: error instanceof Error ? error.message : String(error)
    });
  }
}