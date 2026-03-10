"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/admin", label: "Dashboard", icon: "dashboard" },
  { href: "/admin/coupons", label: "Coupons", icon: "tag" },
  { href: "/admin/stores", label: "Stores", icon: "folder" },
  { href: "/admin/blog", label: "Blog", icon: "pen" },
  { href: "/admin/analytics", label: "Analytics", icon: "chart" },
  { href: "/admin/tracking", label: "Click Tracking", icon: "cursor" },
];

function NavIcon({ name }: { name: string }) {
  const c = "w-5 h-5 shrink-0";
  if (name === "dashboard") return <svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z M14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z M4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z M14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>;
  if (name === "tag") return <svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>;
  if (name === "folder") return <svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>;
  if (name === "pen") return <svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>;
  if (name === "chart") return <svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;
  if (name === "cursor") return <svg className={c} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>;
  return null;
}

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  useEffect(() => {
    const q = (e: MediaQueryListEvent) => {
      if (e.matches) setSidebarOpen(false);
    };
    const m = window.matchMedia("(min-width: 768px)");
    m.addEventListener("change", q);
    return () => m.removeEventListener("change", q);
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-50/80">
      {/* Mobile overlay */}
      <button
        type="button"
        aria-label="Close menu"
        onClick={() => setSidebarOpen(false)}
        className={`fixed inset-0 z-20 bg-black/50 transition-opacity md:hidden ${sidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-30 h-full w-60 shrink-0 bg-slate-900 text-slate-300 flex flex-col transition-transform duration-200 ease-out md:relative md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-4 sm:p-5 border-b border-slate-700/80 flex items-center justify-between">
          <div>
            <h1 className="text-base font-bold text-white tracking-tight">
              Admin Panel
            </h1>
            <p className="mt-0.5 text-xs text-slate-400">Stores & Coupons</p>
          </div>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-2 -m-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <nav className="p-3 flex-1 overflow-y-auto">
          {nav.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-amber-600/25 text-amber-200 border-l-4 border-amber-500 -ml-[2px] pl-[14px]"
                    : "text-slate-300 hover:bg-slate-700 hover:text-white border-l-4 border-transparent"
                }`}
              >
                <NavIcon name={item.icon} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-slate-700/80">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
          >
            ← Back to site
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <header className="h-14 shrink-0 bg-white border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between gap-3 shadow-sm">
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setSidebarOpen(true)}
            className="md:hidden p-2 -m-2 rounded-lg text-slate-600 hover:bg-slate-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          <span className="text-slate-600 text-sm font-medium truncate">
            Welcome back
          </span>
          <Link
            href="/"
            className="shrink-0 inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-2 text-xs sm:text-sm font-medium text-white hover:bg-emerald-500 transition-colors"
          >
            View Promotions
            <span className="hidden sm:inline">→</span>
          </Link>
        </header>
        <main className="flex-1 p-4 sm:p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
