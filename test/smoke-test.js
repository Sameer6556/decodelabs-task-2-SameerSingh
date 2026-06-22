/* Smoke test for the Project 2 API. Run with: npm test */
process.env.NODE_ENV = "test";
const { default: app } = await import("../server.js");

let passed = 0, failed = 0;
const check = (label, cond) => {
  if (cond) { passed++; console.log(`  ✓ ${label}`); }
  else { failed++; console.error(`  ✗ ${label}`); }
};

const server = app.listen(0);
await new Promise((r) => server.once("listening", r));
const base = `http://localhost:${server.address().port}`;
const json = (m, p, b) =>
  fetch(base + p, { method: m, headers: b ? { "Content-Type": "application/json" } : undefined, body: b ? JSON.stringify(b) : undefined });

try {
  check("GET /api/health → 200", (await json("GET", "/api/health")).status === 200);

  let res = await json("GET", "/api/opportunities");
  let body = await res.json();
  check("GET list → 200 with seeds", res.status === 200 && body.count >= 5);

  res = await json("GET", "/api/opportunities?cause=Environment");
  body = await res.json();
  check("filter by cause", body.data.every((o) => o.cause === "Environment"));

  res = await json("GET", "/api/opportunities?search=gomti");
  body = await res.json();
  check("search matches", body.data.length >= 1);

  check("GET one → 200", (await json("GET", "/api/opportunities/1")).status === 200);
  check("GET missing → 404", (await json("GET", "/api/opportunities/9999")).status === 404);

  res = await json("POST", "/api/opportunities", {
    title: "Park bench painting", organization: "City Volunteers", cause: "Community",
    location: "Lalbagh, Lucknow", date: "2026-08-01", slots: 10,
  });
  body = await res.json();
  check("POST valid → 201", res.status === 201 && body.data.id && body.data.filled === 0);

  check("POST invalid → 400", (await json("POST", "/api/opportunities", { title: "x" })).status === 400);
} finally {
  server.closeAllConnections?.();
  await new Promise((r) => server.close(r));
}

console.log(`\n  ${passed} passed, ${failed} failed\n`);
process.exitCode = failed === 0 ? 0 : 1;
