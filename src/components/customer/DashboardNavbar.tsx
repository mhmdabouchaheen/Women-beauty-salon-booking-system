"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { LayoutGrid, History, Users, User, HelpCircle, LogOut, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutGrid },
  { name: "History", href: "/dashboard/history", icon: History },
  { name: "Experts", href: "/dashboard/experts", icon: Users },
  { name: "Profile", href: "/dashboard/profile", icon: User },
];

interface Props {
  userName: string;
  avatar?: string;
}

export default function DashboardNavbar({ userName, avatar }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  function isActive(href: string) {
    return href === "/dashboard"
      ? pathname === "/dashboard"
      : pathname === href || pathname?.startsWith(`${href}/`);
  }

  // TODO(backend): wire this up to a real "logout" endpoint (e.g. POST
  // /api/auth/logout) once a backend exists again.
  function handleLogout() {
    router.replace("/login");
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-rose-100 bg-white/95 shadow-md backdrop-blur-xl"
            : "bg-white/60 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <Link
            href="/dashboard"
            className="font-display text-4xl italic tracking-tight text-rose-700"
          >
            Glow
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-10 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative text-[15px] font-medium transition-colors duration-300 after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:bg-rose-700 after:transition-all after:duration-300 ${
                  isActive(item.href)
                    ? "text-rose-700 after:w-full"
                    : "text-gray-700 after:w-0 hover:text-rose-700 hover:after:w-full"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Right */}
          <div className="hidden items-center gap-4 lg:flex">
            <Link
              href="/dashboard/profile"
              className="flex items-center gap-3 rounded-full py-1 pl-1 pr-4 transition hover:bg-rose-50"
            >
              <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-rose-200 relative shrink-0 bg-rose-50">
                {avatar && (
                  <Image
                    src={avatar}
                    alt={`${userName}'s profile portrait`}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <span className="text-[15px] font-medium text-gray-700">
                {userName}
              </span>
            </Link>

            <button
              onClick={handleLogout}
              className="rounded-full border border-rose-200 p-2.5 text-rose-700 transition hover:bg-rose-50"
              aria-label="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(true)}
            className="rounded-full p-2 text-rose-700 transition hover:bg-rose-50 lg:hidden"
          >
            <Menu size={28} />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-black/40 transition-opacity duration-300 ${
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div
          className={`absolute right-0 top-0 flex h-full w-72 flex-col bg-white shadow-2xl transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-rose-200 relative shrink-0 bg-rose-50">
                {avatar && (
                  <Image
                    src={avatar}
                    alt={`${userName}'s profile portrait`}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <span className="font-medium text-gray-700">{userName}</span>
            </div>

            <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
              <X />
            </button>
          </div>

          <nav className="flex flex-col p-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-4 border-b py-4 text-lg transition ${
                    isActive(item.href)
                      ? "text-rose-700"
                      : "text-gray-700 hover:text-rose-700"
                  }`}
                >
                  <Icon size={20} />
                  {item.name}
                </Link>
              );
            })}

            <Link
              href="/support"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-4 border-b py-4 text-lg text-gray-700 transition hover:text-rose-700"
            >
              <HelpCircle size={20} />
              Support
            </Link>

            <button
              onClick={() => {
                setMenuOpen(false);
                handleLogout();
              }}
              className="mt-8 flex items-center justify-center gap-3 rounded-xl border border-rose-200 py-3 text-center font-medium text-rose-700 transition hover:bg-rose-50"
            >
              <LogOut size={18} />
              Logout
            </button>
          </nav>
        </div>
      </div>
    </>
  );
}
