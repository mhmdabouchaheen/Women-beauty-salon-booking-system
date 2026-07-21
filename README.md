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
```

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
- `GET /api/auth/me`
- `GET /api/services` and `GET /api/services/:id`
- `GET /api/staff` and `GET /api/staff/:id`
- `GET /api/appointments`, `POST /api/appointments`
- `GET /api/appointments/:id`, `PATCH /api/appointments/:id`

Authentication uses a secure HTTP-only cookie. Service and staff writes require an
admin account. Customers can view their own appointments and cancel them; admins
can view all appointments and change their status.

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
