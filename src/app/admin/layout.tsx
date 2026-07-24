import AdminShell from "@/src/components/admin/layout/AdminShell";

// NOTE: the real session check used to live here (redirect to /login unless
// an admin session cookie was present). It's removed because it depended on
// the backend (JWT verification via src/lib/auth.ts), which has been
// stripped out per request. Everything else under app/admin and
// src/components/admin is untouched from the original admin dashboard -
// its fetch("/api/admin/...") calls are still in place, so wiring this back
// up is just: restore src/lib/auth.ts + app/api/*, then re-add the guard
// below:
//
//   const auth = await getAuthUser();
//   if (!auth) redirect("/login?next=/admin");
//   if (auth.role !== "admin") redirect("/");

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
