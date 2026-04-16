# UX Executive Questionnaire

Bilingual React + TypeScript + Vite frontend with an Express + TypeScript backend.

## Features
- English / Japanese questionnaire
- 18 executive UX questions
- Score calculation by category
- Admin dashboard with radar chart and clustering overview
- Pinecone integration via backend only
- Local JSON persistence for easy testing

## Quick start

```bash
npm install
npm run dev
```

Frontend: http://localhost:5173
Backend: http://localhost:8787

## Environment

Create `server/.env`:

```env
PORT=8787
PINECONE_API_KEY=your_key_here
PINECONE_INDEX_NAME=ux-exec-questionnaire
PINECONE_INDEX_HOST=https://ux-yzsz40u.svc.aped-4627-b74a.pinecone.io
PINECONE_NAMESPACE=executive-questionnaire
```

If `PINECONE_API_KEY` is omitted, the app still runs using local JSON storage and skips Pinecone writes/queries.

## Notes
- The current vectorizer pads questionnaire answers to 1024 dimensions so the index dimensions match immediately.
- Replace `answersToVector` with a real 1024-dim embedding pipeline for semantic retrieval.
