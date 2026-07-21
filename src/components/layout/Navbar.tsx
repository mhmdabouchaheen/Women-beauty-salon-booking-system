"use client";

import Link from "next/link";
import { Menu, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import Button from "../ui/Button";

const links = [
  { name: "Services", href: "#services" },
  { name: "Experts", href: "#experts" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#footer" },
];

export default function Navbar() {
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
            href="/"
            className="font-display text-4xl italic tracking-tight text-rose-700"
          >
            Glow
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-10 lg:flex">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative text-[15px] font-medium text-gray-700 transition-colors duration-300 hover:text-rose-700 after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-0 after:bg-rose-700 after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Right */}
          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/login"
              className="rounded-full border border-rose-200 p-2.5 text-rose-700 transition hover:bg-rose-50"
            >
              <User size={20} />
            </Link>

            <Link href="/register">
              <Button>Book Now</Button>
            </Link>
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
            <span className="font-display text-3xl italic text-rose-700">
              Glow
            </span>

            <button onClick={() => setMenuOpen(false)}>
              <X />
            </button>
          </div>

          <nav className="flex flex-col p-6">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="border-b py-4 text-lg text-gray-700 transition hover:text-rose-700"
              >
                {link.name}
              </a>
            ))}

            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="mt-8 rounded-xl border border-rose-200 py-3 text-center font-medium text-rose-700 transition hover:bg-rose-50"
            >
              Login
            </Link>

            <Link
              href="/register"
              onClick={() => setMenuOpen(false)}
              className="mt-4"
            >
              <Button className="w-full">Book Now</Button>
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}