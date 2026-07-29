# Women Beauty Salon Booking System — Developer Documentation

This document is a full handover reference for the project. It is written for a developer
who has no prior context and needs to understand, run, and continue building the system
without further explanation from the previous developer.

---

## 1. Project Overview and Purpose

This is a full-stack booking and management platform for a beauty salon. It has two sides:

- **Customer-facing site**: marketing pages, registration/login, browsing services and
  staff, booking appointments (pay at the salon or pay online via Stripe), viewing
  appointment history, a loyalty/rewards program, profile management, and a contact form.
- **Admin dashboard**: manage customers, services, staff (including working hours and
  holidays), appointments, salon settings, and view business metrics.

The system is built with Next.js (App Router) end-to-end — both the frontend (React
Server/Client Components) and the backend (API routes) live in the same codebase and are
deployed as a single application.

---

## 2. Technologies and Tools Used

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack), React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Database | MongoDB, via Mongoose ODM |
| Auth | Custom JWT-based auth (`jsonwebtoken`), stored in an HTTP-only cookie |
| Password hashing | `bcryptjs` |
| Validation | `zod` schemas for all API input |
| Payments | Stripe Checkout + Stripe Webhooks |
| Email | Nodemailer via Gmail SMTP (app password) |
| Icons | `lucide-react`, `react-icons`, plus Google "Material Symbols" font (used only on auth pages) |
| Alerts/toasts | `sweetalert2` |
| Animation | `framer-motion` |
| Linting | ESLint (`eslint-config-next`) |

There is no separate test runner configured (see "Known Issues" section).

---

## 3. Project Structure

```
app/                      → the ACTIVE Next.js router (pages + route re-exports)
  (marketing pages)/      → home, about, services, contact, etc.
  login/, register/       → auth pages
  dashboard/              → customer dashboard (protected, role="customer")
  admin/                  → admin dashboard (protected, role="admin")
  api/                    → thin re-export layer, see note below
  layout.tsx              → root HTML layout (fonts, metadata)
  globals.css             → Tailwind + design tokens
  auth-theme.css          → styling used by login/register pages

src/
  app/api/                → the REAL implementation of every API route
  components/             → all React components, grouped by feature:
    customer/              → customer dashboard components
    admin/                 → admin dashboard components
    auth/                  → login/register/forgot-password UI
    home/                  → marketing/homepage sections
    notifications/         → shared notification bell
    ui/                    → small reusable pieces (e.g. ExpertCard)
  models/                 → Mongoose schemas (one file per collection)
  repositories/           → data-access layer — all DB queries live here, never in
                             route handlers or components directly
  services/               → business logic that talks to third parties
                             (email.service.ts, stripe-booking.service.ts)
  lib/                    → cross-cutting utilities:
    auth.ts                → JWT create/verify, cookie config, getAuthUser()
    admin.ts                → requireAdmin() guard for admin-only routes
    db/mongoose.ts          → cached Mongoose connection
    customer-dashboard.ts   → aggregates dashboard data for the customer views
    appointment-availability.ts → computes bookable time slots
    date-time.ts             → salon timezone-aware date helpers
    email/gmail.ts            → Nodemailer transport
    api.ts                    → shared API response helpers (serverError, validationError)
  validations/            → zod schemas per feature (appointment, auth, service, etc.)
  types/                  → shared TypeScript interfaces for each model
  config/                 → static configuration:
    rewards.ts              → loyalty program constants (points per level, redemption cost)
    salon.ts                → salon timezone/business constants
    site.ts                 → site name/description/URL used in metadata

public/                  → static assets (images, icons, manifest)
```

### Why is there both `app/` and `src/app/`?

This is the most important structural decision to understand before editing anything:

- **`/app`** (project root) is the folder Next.js actually uses for routing. Every page,
  layout, and URL in the app is determined by this folder.
- **`/app/api/**/route.ts`** files are deliberately kept as **thin re-exports**, e.g.:

  ```ts
  // app/api/auth/login/route.ts
  export { POST } from "@/src/app/api/auth/login/route";
  ```

- **`/src/app/api/**/route.ts`** contains the actual handler logic (DB calls, validation,
  business rules).

**Rule of thumb:**
- Changing a page, layout, or adding a new route/URL → edit files under root `/app`.
- Changing what an API endpoint does → edit the corresponding file under `/src/app/api`.
- Everything else (components, models, repositories, services, lib, config) lives only
  under `/src` — there is no duplication there.

---

## 4. Setup and Installation

### Prerequisites
- Node.js 20+
- A MongoDB database (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- A Gmail account with an [App Password](https://myaccount.google.com/apppasswords)
  generated (for transactional email)
- (Optional) A [Stripe](https://dashboard.stripe.com/register) account, if online payment
  is required

### Steps

```bash
# 1. Install dependencies
npm install

# 2. Create your environment file
cp .env.example .env.local   # if .env.example exists, otherwise create manually — see section 5

# 3. Fill in the values in .env.local (see section 5)

# 4. Run the dev server
npm run dev
```

The app runs at `http://localhost:3000` by default (Next.js will automatically use the
next free port if 3000 is taken).

### Seeding the database

There are two seed endpoints for populating/clearing test data during development:

- `POST /api/seed` — inserts sample services, staff, and demo data
- `DELETE /api/seed/cleanup` — removes seeded data

These are plain HTTP endpoints (call them with `curl`, Postman, or the browser dev tools),
not CLI scripts. **They should be removed or protected before deploying to production**
(see "Known Issues").

---

## 5. Environment Variables

Create a `.env.local` file in the project root with the following:

```env
# --- Required ---
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>/<database>?retryWrites=true&w=majority
JWT_SECRET=some-long-random-string

# --- Required for transactional email (booking confirmations, contact form, password reset) ---
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-character-app-password
EMAIL_FROM_NAME=Women Beauty Salon

# --- Required for correct absolute URLs (Stripe redirects, emails, sitemap) ---
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# --- Only required if online payment (Stripe) is used ---
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxx
```

Notes:
- `JWT_SECRET` should be a long, random, unguessable string — used to sign session tokens.
  Changing it invalidates all existing logged-in sessions.
- `GMAIL_APP_PASSWORD` is not your normal Gmail password — Gmail requires a dedicated
  16-character App Password (2FA must be enabled on the account to generate one).
- Without Stripe keys configured, the app still works fully except the "Pay with Stripe"
  option in booking — "Pay at the salon" bookings are unaffected.
- To receive Stripe webhook events locally, use the Stripe CLI:
  `stripe listen --forward-to localhost:3000/api/webhooks/stripe` — it will print a
  webhook secret to use as `STRIPE_WEBHOOK_SECRET` for local testing.

**Security note:** never commit `.env.local` to version control, and rotate any credential
that has ever been shared outside of a secrets manager (e.g. pasted in chat, screenshots,
or committed by mistake).

---

## 6. Database Structure

MongoDB collections (each backed by a Mongoose model in `src/models/`):

### `users`
Customer and admin accounts.
| Field | Type | Notes |
|---|---|---|
| name, email, password | string | password is bcrypt-hashed |
| image | string | avatar URL |
| role | `"customer" \| "admin"` | |
| rewardPoints | number | current redeemable points |
| lifetimeRewardPoints | number | total ever earned, used to compute loyalty level |
| lastLoginAt | Date | |
| passwordResetTokenHash / passwordResetExpiresAt | string / Date | `select: false`, used for forgot-password flow |

### `services`
Salon services/treatments that can be booked.
`name`, `description`, `category`, `duration` (minutes), `price`, `image`, `featured`.

### `staff`
Salon staff/experts.
`name`, `specialty`, `image`, `active`, `serviceIds` (array of Service refs),
`weeklySchedule` (per-day working hours), `holidays` (specific dates off).

### `appointments`
A confirmed booking.
`userId`, `serviceId`, `staffId`, `appointmentDate`, `appointmentTime`,
`startDateTime`/`endDateTime` (computed, used for overlap checks),
`status` (`booked | completed | cancelled`), `rewardsAwarded` (boolean, prevents double-crediting points).

### `booking_reservations`
A temporary hold created when a customer starts a **Stripe** checkout, before payment is
confirmed. Prevents double-booking a slot while payment is in progress.
`status` (`pending | processing | completed | cancelled | expired`), `expiresAt`,
`stripeSessionId`, and a reference to the resulting `appointmentId` once completed.

### `notifications`
In-app notifications between users (e.g. contact form submissions to admin, appointment
updates). `senderId`, `recipientId`, `title`, `message`, `readAt`.

### `settings`
Singleton document (`key: "salon"`) holding salon address, phone, email, and opening hours.

### `image_assets`
Binary image uploads stored directly in MongoDB (`data: Buffer`, `select: false` by
default for performance — only loaded when explicitly requested via `/api/images/[id]`).

---

## 7. Main Features and Workflows

### Customer
1. **Register/Login** — email + password, JWT issued and stored in an HTTP-only cookie.
2. **Browse services** (`/dashboard/services` or public `/services`) and **staff**
   (`/dashboard/experts`).
3. **Book an appointment**:
   - Dedicated flow at `/dashboard/book` (`CustomerBookingForm`), or
   - Quick modal (`NewAppointmentModal`) accessible from the dashboard navbar/services page.
   - Both fetch real-time availability from `/api/appointments/availability`, which checks
     staff working hours, holidays, and existing bookings to return only free slots.
   - Payment: "Pay at the salon" creates the appointment directly via `POST /api/appointments`.
     "Pay with Stripe" creates a `BookingReservation`, redirects to Stripe Checkout, and the
     appointment is only finalized once the Stripe webhook confirms payment.
4. **View appointments** (`/dashboard/appointments`) — upcoming and past, with cancel
   support for upcoming ones.
5. **Loyalty/Rewards** — points are awarded on completed appointments; `GoldStatusCard`
   shows current points, level, and lets the customer redeem points once they cross the
   threshold defined in `src/config/rewards.ts`.
6. **Profile** — update name/email/password/avatar.
7. **Contact** — submits a message that is delivered to the admin as a `Notification` and
   an email.

### Admin
1. **Login** — same auth system, gated by `role: "admin"`.
2. **Dashboard** (`/admin`) — monthly appointment count, customer count, service/staff
   counts, and a feed of recent appointments.
3. **Manage customers** — list, view detail, delete.
4. **Manage services/staff** — full CRUD, including staff working hours and holidays.
5. **Manage settings** — salon contact info and opening hours shown on the public site.

---

## 8. API Routes

All routes below are implemented in `src/app/api/**` and exposed via the re-export files
in root `app/api/**`. Unless noted, responses are JSON: `{ success: boolean, message?, ...data }`.

### Auth (`/api/auth/*`)
| Route | Method | Purpose | Auth required |
|---|---|---|---|
| `/api/auth/register` | POST | Create a new customer account | No |
| `/api/auth/login` | POST | Verify credentials, issue session cookie | No |
| `/api/auth/logout` | POST | Clear session cookie | No |
| `/api/auth/me` | GET | Get current user's profile | Yes |
| `/api/auth/me` | PATCH | Update current user's profile | Yes |
| `/api/auth/forgot-password` | POST | Send password reset email | No |
| `/api/auth/reset-password` | POST | Reset password using emailed token | No |
| `/api/auth/rewards/redeem` | POST | Redeem loyalty points | Yes (customer) |

### Services / Staff (public read, admin write)
| Route | Method | Purpose | Auth |
|---|---|---|---|
| `/api/services` | GET | List all services | No |
| `/api/services` | POST | Create a service | Admin |
| `/api/services/[id]` | GET/PATCH/DELETE | Read/update/delete one service | Admin for write |
| `/api/staff` | GET | List all staff | No |
| `/api/staff` | POST | Create staff member | Admin |
| `/api/staff/[id]` | GET/PATCH/DELETE | Read/update/delete staff | Admin for write |

### Appointments
| Route | Method | Purpose | Auth |
|---|---|---|---|
| `/api/appointments` | GET | List appointments (own if customer, all if admin) | Yes |
| `/api/appointments` | POST | Create a "pay at salon" appointment | Yes |
| `/api/appointments/[id]` | GET/PATCH/DELETE | View/update status/cancel one appointment | Yes (owner or admin) |
| `/api/appointments/availability` | GET | Compute bookable time slots for a service+staff(+date) | Yes |

### Payments (Stripe)
| Route | Method | Purpose |
|---|---|---|
| `/api/payments/checkout` | POST | Create a `BookingReservation` + Stripe Checkout session, returns redirect URL |
| `/api/payments/confirm` | POST | Confirms a session client-side after redirect back from Stripe |
| `/api/payments/cancel` | POST | Marks a pending reservation as cancelled |
| `/api/webhooks/stripe` | POST | Stripe webhook — source of truth for finalizing payment and creating the real `Appointment` |

### Notifications
| Route | Method | Purpose | Auth |
|---|---|---|---|
| `/api/notifications` | GET | List current user's notifications + unread count | Yes |
| `/api/notifications` | POST | Create a notification (e.g. contact form → admin) | Yes |
| `/api/notifications/[id]` | PATCH | Mark as read | Yes |

### Images
| Route | Method | Purpose |
|---|---|---|
| `/api/images` | POST | Upload an image, stored as a Buffer in MongoDB |
| `/api/images/[id]` | GET | Serve the raw binary image |

### Admin-only
| Route | Method | Purpose |
|---|---|---|
| `/api/admin/dashboard` | GET | Business metrics for the admin home page |
| `/api/admin/customers` | GET/POST | List/create customers |
| `/api/admin/customers/[id]` | PATCH/DELETE | Update/delete a customer |
| `/api/admin/settings` | GET/PUT | Read/update salon settings |
| `/api/admin/profile` | GET/PATCH | Admin's own profile |

### Utility / Dev-only
| Route | Method | Purpose |
|---|---|---|
| `/api/test-db` | GET | Simple DB connectivity check |
| `/api/seed` | POST | Populate sample data (should be removed/protected before production) |
| `/api/seed/cleanup` | DELETE | Remove seeded data (same caveat) |

---

## 9. Authentication and Authorization Flow

1. On login/register, the server verifies credentials (bcrypt compare for login), then
   calls `createAuthToken({ userId, role })` (`src/lib/auth.ts`), which signs a JWT with
   `JWT_SECRET` and a 7-day expiry.
2. The token is set as an **HTTP-only, `SameSite=Lax` cookie** named `salon_session`
   (`authCookieOptions` in `src/lib/auth.ts`). `secure` is automatically enabled in
   production (`NODE_ENV === "production"`).
3. On every subsequent request, server components and API routes call
   `getAuthUser()`, which reads the cookie, verifies the JWT, and returns
   `{ userId, role } | null`.
4. **Route protection is manual, not via Next.js middleware** — there is no
   `middleware.ts` file. Each protected page/layout (e.g. `app/dashboard/layout.tsx`,
   `app/admin/layout.tsx`) and each protected API route independently checks
   `getAuthUser()` and redirects/`401`s if missing.
5. **Admin-only routes** use the `requireAdmin()` helper (`src/lib/admin.ts`), which wraps
   `getAuthUser()` and additionally checks `role === "admin"`, returning a ready-to-return
   `NextResponse` on failure so route handlers can do:
   ```ts
   const authorization = await requireAdmin();
   if (authorization.response) return authorization.response;
   ```
6. **Password reset** uses a separate short-lived token: a random token is generated,
   hashed, and stored as `passwordResetTokenHash`/`passwordResetExpiresAt` on the user
   document (both `select: false` so they're never returned by default queries), and the
   raw token is emailed to the user. The reset endpoint re-hashes the submitted token and
   compares it against the stored hash.

**If you need to add role-based route protection at the edge (e.g. for performance or to
avoid rendering protected pages before redirecting), consider introducing a
`middleware.ts` — none currently exists.**

---

## 10. Notable Technical Decisions

- **Repository pattern**: all direct Mongoose/model queries live in `src/repositories/*`.
  Route handlers and server components should call repository functions, not `Model.find()`
  directly — this keeps data-access logic centralized and testable.
- **Reservation-before-payment pattern for Stripe**: a `BookingReservation` is created
  *before* redirecting to Stripe, holding the slot temporarily (`expiresAt`) so two
  customers can't both check out for the same slot. The real `Appointment` is only created
  once the Stripe webhook confirms payment — the webhook is the single source of truth for
  payment status, not the client-side "confirm" call (which is UX-only, e.g. to show a
  success screen faster).
- **`rewardsAwarded` flag on Appointment**: prevents a customer from earning loyalty points
  more than once for the same appointment (e.g. if a background job or admin action marks
  the same appointment "completed" twice).
- **Timezone-aware scheduling**: all availability logic goes through
  `src/lib/date-time.ts` and `src/config/salon.ts` (`SALON_TIME_ZONE`) rather than relying
  on server-local time, since staff working hours are defined in salon-local time.
- **Images stored in MongoDB, not a file store/CDN**: uploaded images are stored as binary
  `Buffer` fields (`ImageAsset` model) and served via `/api/images/[id]`. This avoids needing
  external storage config for a small project, but does not scale well for large volume —
  see "Future Improvements."

---

## 11. Running, Testing, and Deploying

### Running locally
```bash
npm install
npm run dev     # http://localhost:3000
```

### Building for production
```bash
npm run build
npm run start
```

### Linting
```bash
npm run lint
```

### Testing
**There is currently no automated test suite** (no Jest/Vitest/Playwright configured) —
see "Known Issues."

### Deployment
This is a standard Next.js app and can be deployed to any platform that supports Next.js
(e.g. Vercel, or a Node server via `npm run build && npm run start`). Requirements:
- Set all environment variables from Section 5 in the hosting platform's environment
  variable settings (never commit them).
- MongoDB must be reachable from the deployment environment (e.g. MongoDB Atlas with the
  correct IP allowlist / "allow access from anywhere" for platforms with dynamic IPs).
- Configure the real Stripe webhook endpoint (`https://yourdomain.com/api/webhooks/stripe`)
  in the Stripe Dashboard once deployed, and use the production webhook signing secret.
- Set `NEXT_PUBLIC_SITE_URL` to the real production domain (used in Stripe redirect URLs
  and emails).

---

## 12. Known Issues and Future Improvements

- **No automated tests.** Adding unit tests for `src/lib` (especially
  `appointment-availability.ts` and `date-time.ts`, which contain the trickiest logic) and
  integration tests for the API routes would meaningfully reduce regression risk.
- **`/api/seed` and `/api/seed/cleanup` are unauthenticated** and should be removed or
  locked behind an admin check before going to production — right now anyone who knows the
  URL can wipe/reseed data.
- **No `middleware.ts`** — route protection is duplicated across every protected
  page/layout/API route via manual `getAuthUser()`/`requireAdmin()` checks. Centralizing
  this in middleware would reduce duplication and the risk of a route being accidentally
  left unprotected.
- **Images stored in MongoDB** as Buffers — fine for a small catalog of service/staff
  photos, but will not scale well for high volumes of user-uploaded images. Consider moving
  to object storage (e.g. S3, Cloudinary) with the database only storing a URL if usage grows.
- **Stripe Checkout supports one service per session** — the checkout flow
  (`/api/payments/checkout`) accepts a single `serviceId`/`staffId`/date/time. Multi-service
  cart checkout via Stripe is not implemented; multi-service booking is currently only
  supported for "pay at the salon" (looped calls to `POST /api/appointments`).
- **Material Symbols font** (used for icons on the login/register pages only) is loaded via
  a `<link>` to `fonts.googleapis.com` in `app/layout.tsx`. If offline support or stricter
  CSP is ever required, this should be self-hosted instead.
- **No rate limiting** on auth endpoints (`login`, `register`, `forgot-password`) — worth
  adding before production to mitigate brute-force/enumeration attempts.
