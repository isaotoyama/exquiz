import { Pinecone } from '@pinecone-database/pinecone';

const apiKey = process.env.PINECONE_API_KEY;
const indexHost = process.env.PINECONE_INDEX_HOST;
const indexName = process.env.PINECONE_INDEX_NAME || 'ux-exec-questionnaire';
const namespace = process.env.PINECONE_NAMESPACE || 'executive-questionnaire';

let index: ReturnType<Pinecone['index']> | null = null;

if (apiKey && indexHost) {
  const client = new Pinecone({ apiKey });
  index = client.index(indexName, indexHost);
}

export async function upsertVector(params: { id: string; values: number[]; metadata: Record<string, unknown> }) {
  if (!index) return { skipped: true };
  await index.namespace(namespace).upsert([{ id: params.id, values: params.values, metadata: params.metadata }]);
  return { skipped: false };
}

export async function querySimilar(vector: number[]) {
  if (!index) return [];
  const result = await index.namespace(namespace).query({ vector, topK: 5, includeMetadata: true });
  return result.matches ?? [];
}
