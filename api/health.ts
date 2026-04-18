import { buildAdminSummary } from '../lib/score';

const records: any[] = [];
export default async function handler() {
  return new Response(JSON.stringify({ ok: true, route: 'health' }), {
    headers: { 'content-type': 'application/json' }
  });
}