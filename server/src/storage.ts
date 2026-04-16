import fs from 'node:fs';
import path from 'node:path';
import { SubmissionRecord } from './types.js';

const dataDir = path.resolve(process.cwd(), 'data');
const filePath = path.join(dataDir, 'submissions.json');

function ensureStore() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, '[]', 'utf8');
}

export function loadRecords(): SubmissionRecord[] {
  ensureStore();
  return JSON.parse(fs.readFileSync(filePath, 'utf8')) as SubmissionRecord[];
}

export function saveRecord(record: SubmissionRecord) {
  const items = loadRecords();
  items.push(record);
  fs.writeFileSync(filePath, JSON.stringify(items, null, 2), 'utf8');
}
