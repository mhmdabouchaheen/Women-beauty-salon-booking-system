# Merge notes (frontend-only)

This is the customer-facing frontend (from `project.zip`) merged with the
admin dashboard frontend (from the salon admin dashboard zip) — **no
backend**. Everything is a static/client-side Next.js app; there is no
database, no API routes, and no real authentication.

Routes live under `src/app/` (not a top-level `app/`), matching the
original `project.zip` layout.

## What was removed
- `app/api/*` — the entire backend REST API
- `src/models/*`, `src/repositories/*`, `src/validations/*` — Mongoose
  models, DB access, and Zod schemas
- `src/lib/auth.ts`, `src/lib/api.ts`, `src/lib/db/`, `src/lib/admin.ts`,
  `src/lib/email/`, `src/lib/date-time.ts` — auth/session, DB connection,
  and email-sending helpers
- `src/config/salon.ts` — only used by the backend
- The demo-login flow (`/api/demo-login` + the "Try the Demo" button) —
  it only existed to exercise the backend, so it went with it
- Backend-only npm packages: `mongoose`, `bcryptjs`, `jsonwebtoken`, `zod`,
  `resend`, plus their `@types/*` packages

## Customer-facing pages (from `project.zip`) — reverted to static/mock
- `/login`, `/register` — forms are UI-only now; submitting just routes to
  `/dashboard` without calling anything (see the `TODO(backend)` comment on
  each `handleSubmit`)
- `/dashboard`, `/dashboard/history`, `/dashboard/profile` — now render
  from `src/data/customer-mock.ts` (a static placeholder user + a few
  sample appointments) instead of fetching a real session/DB
- "Cancel Appointment", "Save Changes" (profile), and "Logout" are now
  no-op/placeholder handlers — each has a `TODO(backend)` comment marking
  exactly what endpoint to call once there's a backend again
- The `/booking` page and its components are still removed, per your
  earlier request — not part of this change, just noting it's still gone

## Admin section — left as originally given
Per your instruction, `app/admin/*` and `src/components/admin/*` are
**untouched** — every `fetch("/api/admin/...")`, every Add/Edit/Delete
modal, is exactly as it was in the original admin dashboard zip. Since
there's no backend, those calls will simply fail (404) if you click them —
that's expected, and it's what "ready to add the backend back" means here:
nothing about the admin UI needed to change, only the backend it talks to
is missing.

The **one** necessary change on the admin side: `app/admin/layout.tsx`
used to redirect to `/login` unless a real (JWT-backed) session existed.
That check depended on `src/lib/auth.ts`, which is gone, so the redirect
was removed — otherwise the entire admin section would be permanently
unreachable. The original check is preserved as a comment in that file for
when the backend comes back.

## Reconnecting a backend later
The previous (backend-included) version of this project had all of the
above already built and working — Mongo/Mongoose models, JWT auth, Zod
validation, a full REST API. If you want that back, say so and I can
restore it; nothing about this frontend-only pass makes that harder, since
the component/prop shapes were left as-is (e.g. `UpcomingAppointments`,
`HistoryList`, `ProfileView` still take the same props — only *where those
props come from* changed, from a live fetch to a static mock file).

## Running this
```bash
npm install
npm run dev
```
No `.env` file is needed — there's nothing to configure.
