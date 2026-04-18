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
  const namespace = process.env.PINECONE_NAMESPACE || 'executive-questionnaire';

  if (!apiKey) throw new Error('Missing PINECONE_API_KEY');
  if (!host) throw new Error('Missing PINECONE_HOST');

  const pc = new Pinecone({ apiKey });
  const index = pc.index({ host });

  return { index, namespace };
}

export async function upsertVector(record: VectorRecord) {
  const { index, namespace } = getIndex();

  if (!record?.id) {
    throw new Error('record.id is missing');
  }

  if (!Array.isArray(record.values) || record.values.length === 0) {
    throw new Error('record.values is empty');
  }

  const result = await index.upsert({
    namespace,
    records: [record]
  });

  return result;
}

export async function querySimilar(vector: number[]) {
  const { index, namespace } = getIndex();

  if (!Array.isArray(vector) || vector.length === 0) {
    throw new Error('query vector is empty');
  }

  const result = await index.query({
    namespace,
    vector,
    topK: 5,
    includeMetadata: true
  });

  return result.matches ?? [];
}