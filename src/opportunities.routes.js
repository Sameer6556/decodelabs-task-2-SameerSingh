/* ===========================================================
   Opportunity routes, week 2 scope: GET + POST.
   Full CRUD (PUT/PATCH/DELETE) lands in week 3 with the database.
   =========================================================== */
import { Router } from "express";
import { store } from "./store.js";
import { validateOpportunity } from "./validate.js";

const router = Router();

// GET /api/opportunities  (?cause= & ?search=)
router.get("/", (req, res) => {
  const { cause, search } = req.query;
  const data = store.list({ cause, search });
  res.status(200).json({ count: data.length, data });
});

// GET /api/opportunities/:id
router.get("/:id", (req, res) => {
  const item = store.find(req.params.id);
  if (!item) {
    return res.status(404).json({ error: `No opportunity with id ${req.params.id}.` });
  }
  res.status(200).json({ data: item });
});

// POST /api/opportunities
router.post("/", (req, res) => {
  const errors = validateOpportunity(req.body);
  if (errors.length) {
    return res.status(400).json({ error: "Validation failed", details: errors });
  }
  const created = store.create(req.body);
  res.status(201).json({ message: "Opportunity created", data: created });
});

export default router;
