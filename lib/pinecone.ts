import { Pinecone } from '@pinecone-database/pinecone';

type MetadataValue = string | number | boolean;
type VectorRecord = {
  id: string;
  values: number[];
  metadata?: Record<string, MetadataValue>;
};

function getIndex() {
  const apiKey = process.env.PINECONE_API_KEY;
  const host = process.env.PINECONE_HOST;
  const indexName = process.env.PINECONE_INDEX_NAME || 'ux-exec-questionnaire';
  const namespace = process.env.PINECONE_NAMESPACE || 'executive-questionnaire';

  if (!apiKey) throw new Error('Missing PINECONE_API_KEY');
  if (!host) throw new Error('Missing PINECONE_HOST');

  const pc = new Pinecone({ apiKey });
  const index = pc.index(indexName, host);

  return { index, namespace };
}

export async function upsertVector(record: VectorRecord) {
  const { index, namespace } = getIndex();
  await index.namespace(namespace).upsert([record]);
}

export async function querySimilar(vector: number[]) {
  const { index, namespace } = getIndex();
  const result = await index.namespace(namespace).query({
    vector,
    topK: 5,
    includeMetadata: true
  });
  return result.matches ?? [];
}