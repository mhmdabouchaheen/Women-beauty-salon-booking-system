This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Development database seed

Add the database connection and a long random authentication secret to `.env.local`:

```env
MONGODB_URI=mongodb+srv://...
JWT_SECRET=replace-with-a-long-random-secret
GMAIL_USER=your-salon-email@gmail.com
GMAIL_APP_PASSWORD=your-16-character-google-app-password
EMAIL_FROM_NAME=Women Beauty Salon
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Appointment times are interpreted and displayed in the salon timezone, currently
centralized as `Asia/Beirut` in `src/config/salon.ts`. After a booking is stored,
the server sends its confirmation through Gmail SMTP to the email on the
authenticated User record. `GMAIL_APP_PASSWORD` must be a Google App Password,
not the normal password for the Gmail account. The Google account must have
2-Step Verification enabled before an App Password can be created.
An email delivery failure does not roll back the appointment; the API returns
`notification.emailSent: false` with HTTP 201.

## Stripe test payments

Stripe Checkout is integrated in test mode. Create a Stripe account, enable a
test sandbox, and copy its test secret key into `.env.local`. Never commit secret
or webhook keys.

For local webhook testing, install the Stripe CLI, sign in, and forward events:

```bash
stripe login
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Copy the displayed `whsec_...` signing secret to `STRIPE_WEBHOOK_SECRET`, then
restart the development server. Book an appointment using "Pay securely with
Stripe" and test a successful payment with:

```text
Card: 4242 4242 4242 4242
Expiry: any future date, such as 12/34
CVC: any three digits
```

The browser never sends card details to this application. Prices are loaded
server-side from MongoDB. A temporary booking reservation is created before
Checkout; a verified payment converts it into an appointment, while cancelling
or expiration releases the slot. "Pay at the salon" remains available.

Then start the development server:

```bash
npm run dev
```

Seed and verify the database from PowerShell:

```powershell
Invoke-RestMethod -Method POST -Uri http://localhost:3000/api/seed
```

Or use curl:

```bash
curl -X POST http://localhost:3000/api/seed
```

Refresh MongoDB Atlas Data Explorer. The `woman-beauty-salon-db` database should
appear with the `users`, `services`, `staff`, and `appointments` collections.

To remove only the development seed records:

```bash
curl -X DELETE http://localhost:3000/api/seed/cleanup
```

Both endpoints are disabled when `NODE_ENV` is `production`.

## Backend API

The Next.js backend provides these routes:

- `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/logout`
- `GET`, `PATCH /api/auth/me`
- `POST /api/auth/forgot-password`, `POST /api/auth/reset-password`
- `GET /api/services` and `GET /api/services/:id`
- `GET /api/staff` and `GET /api/staff/:id`
- `GET /api/appointments`, `POST /api/appointments`
- `GET /api/appointments/:id`, `PATCH /api/appointments/:id`
- `POST /api/payments/checkout`, `POST /api/payments/confirm`, `POST /api/payments/cancel`
- `POST /api/webhooks/stripe`
- `GET /api/admin/dashboard`
- `GET`, `POST /api/admin/customers` and `PATCH`, `DELETE /api/admin/customers/:id`
- `GET`, `PATCH /api/admin/profile`
- `GET`, `PUT /api/admin/settings`

Authentication uses a secure HTTP-only cookie. Service and staff writes require an
admin account. Customers can view their own appointments and cancel them; admins
can view all appointments and change their status.

The `/admin` routes require an authenticated admin session and redirect to
`/login` otherwise. Dashboard statistics, appointments, services, staff,
customers, profile details, salon settings, staff schedules, and holidays are
loaded from and saved to MongoDB.

Customer routes under `/dashboard` also require authentication. The customer
dashboard, appointment history, cancellation, profile editing, login,
registration, logout, and password reset flows use the live MongoDB-backed API.

Staff records support `weeklySchedule` entries using weekday numbers (`0` Sunday
through `6` Saturday) and `holidays` using `YYYY-MM-DD` salon-local dates. Booking
is allowed only when the entire service duration fits within that staff member's
working hours and the date is not a holiday.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
