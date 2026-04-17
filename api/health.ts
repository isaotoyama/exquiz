import type { VercelRequest, VercelResponse } from '@vercel/node';

export default {
  async fetch(_request: Request) {
    return new Response(JSON.stringify({ ok: true, route: "health" }), {
      headers: { "content-type": "application/json" }
    });
  },
};