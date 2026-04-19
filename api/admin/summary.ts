import type { VercelRequest, VercelResponse } from '@vercel/node';
import { buildAdminSummary } from '../../lib/score';
import { getSql } from '../../lib/db';
import type { SubmissionRecord } from '../../lib/types';

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    const sql = getSql();

    const rows = await sql`
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

    const records: SubmissionRecord[] = rows.map((row: any) => ({
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