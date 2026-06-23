/* ===========================================================
   GiveTime Backend API, Project 2
   A simple Express server: GET/POST endpoints for volunteering
   opportunities, with validation, JSON responses, and proper
   HTTP status codes. Data is in memory (no database yet).
   =========================================================== */
import express from "express";
import opportunitiesRouter from "./src/opportunities.routes.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// request log
app.use((req, _res, next) => {
  console.log(`${new Date().toISOString()}  ${req.method} ${req.url}`);
  next();
});

app.get("/api/health", (_req, res) => {
  res.status(200).json({ status: "ok", service: "givetime-api", version: 1 });
});

app.get("/", (_req, res) => {
  res.status(200).json({
    name: "GiveTime API, Project 2",
    endpoints: {
      "GET /api/health": "health check",
      "GET /api/opportunities": "list (?cause= & ?search=)",
      "GET /api/opportunities/:id": "one opportunity",
      "POST /api/opportunities": "create one (JSON body)",
    },
  });
});

app.use("/api/opportunities", opportunitiesRouter);

// 404
app.use((req, res) => {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.url}` });
});

// errors (incl. malformed JSON)
app.use((err, _req, res, _next) => {
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ error: "Request body is not valid JSON." });
  }
  console.error(err);
  res.status(500).json({ error: "Internal server error." });
});

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`\n  GiveTime API running →  http://localhost:${PORT}`);
    console.log(`  Try:  http://localhost:${PORT}/api/opportunities\n`);
  });
}

export default app;
