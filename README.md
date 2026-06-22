# GiveTime — Project 2: Backend API Development

Week 2. The brain behind the GiveTime volunteering board: a **REST API** built
with **Node.js + Express** that exposes `GET` and `POST` endpoints for
opportunities, validates input, and replies with proper JSON + status codes.

> Data is held **in memory** this week (it resets on restart). Week 3 moves it
> into a **MySQL** database.

## Run it

```bash
npm install      # installs Express
npm start        # http://localhost:4000
npm test         # automated endpoint checks
```

Then open <http://localhost:4000/api/opportunities>.

## Requirements coverage

| Brief | Where |
|---|---|
| Create API endpoints (GET / POST) | `GET /api/opportunities`, `GET /api/opportunities/:id`, `POST /api/opportunities` in `src/opportunities.routes.js` |
| Handle user input and responses | `express.json()` parses bodies; structured JSON + status codes everywhere |
| Validate basic data | `src/validate.js` checks title/organization/cause/location/date/slots → `400` with a list of errors |

## Endpoints

| Method | Path | Description | Success | Errors |
|---|---|---|---|---|
| GET | `/api/health` | health check | 200 | — |
| GET | `/api/opportunities` | list (`?cause=`, `?search=`) | 200 | — |
| GET | `/api/opportunities/:id` | one | 200 | 404 |
| POST | `/api/opportunities` | create (JSON) | 201 | 400 |

Status codes: 200, 201, 400 (validation), 404 (missing), 500.

## curl

```bash
curl http://localhost:4000/api/opportunities

curl -X POST http://localhost:4000/api/opportunities \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"Park bench painting\",\"organization\":\"City Volunteers\",\"cause\":\"Community\",\"location\":\"Lalbagh, Lucknow\",\"date\":\"2026-08-01\",\"slots\":10}"
```

## Files

```
project-2-backend-api/
├── server.js
├── src/
│   ├── store.js                  # in-memory data + seed
│   ├── validate.js               # input validation
│   └── opportunities.routes.js   # GET / POST handlers
├── test/smoke-test.js
├── requests.http
└── package.json
```
