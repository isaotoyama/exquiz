import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { index } from "../server/src/pinecone";
import { answersToText, answersToVector } from "../server/src/embed";
import { calculateSummary } from "../server/src/score";
import crypto from "node:crypto";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/submissions", async (req, res) => {
  const payload = req.body;
  const summary = calculateSummary(payload.answers);
  const vector = answersToVector(payload.answers);
  const text = answersToText(payload.answers);
  const id = crypto.randomUUID();

  await index.namespace("executive-questionnaire").upsert([
    {
      id,
      values: vector,
      metadata: {
        name: payload.profile.name,
        company: payload.profile.company,
        title: payload.profile.title,
        email: payload.profile.email,
        locale: payload.locale,
        submittedAt: payload.submittedAt,
        text,
        overall: summary.overall,
        ...summary.byCategory
      }
    }
  ]);

  res.json({ ok: true, id, summary });
});

app.post("/api/search-similar", async (req, res) => {
  const vector = answersToVector(req.body.answers);

  const result = await index.namespace("executive-questionnaire").query({
    vector,
    topK: 5,
    includeMetadata: true
  });

  res.json({ matches: result.matches ?? [] });
});

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

export default app;