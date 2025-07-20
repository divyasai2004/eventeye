"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Bars3Icon, XMarkIcon, HomeIcon, Squares2X2Icon, ChartBarIcon, GlobeAltIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setRole(localStorage.getItem("userRole"));
    }
  }, []);

  return (
    <nav className="w-full px-4 py-3 bg-white/80 shadow-md flex items-center justify-between sticky top-0 z-50">
      {/* Brand/Logo */}
      <div className="flex items-center gap-3">
        <Image src="/favicon.ico" alt="SponsorSync Logo" width={40} height={40} className="rounded-lg" />
        <span className="text-2xl font-extrabold tracking-tight text-blue-700">SponsorSync</span>
      </div>
      {/* Desktop Nav */}
      <div className="hidden md:flex gap-6 items-center text-base font-medium">
        <Link href="/" aria-label="Home" className="hover:text-blue-600 transition flex items-center justify-center">
          <HomeIcon className="h-6 w-6" aria-hidden="true" />
        </Link>
        <Link href="/dashboard" aria-label="Dashboard" className="hover:text-blue-600 transition flex items-center justify-center">
          <Squares2X2Icon className="h-6 w-6" aria-hidden="true" />
        </Link>
        <Link href="/analytics" aria-label="Analytics" className="hover:text-blue-600 transition flex items-center justify-center">
          <ChartBarIcon className="h-6 w-6" aria-hidden="true" />
        </Link>
        <Link href="/explore" aria-label="Explore" className="hover:text-blue-600 transition flex items-center justify-center">
          <GlobeAltIcon className="h-6 w-6" aria-hidden="true" />
        </Link>
        <button onClick={() => { localStorage.clear(); window.location.href = "/login"; }} aria-label="Logout" className="ml-2 p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow hover:from-blue-600 hover:to-purple-600 transition flex items-center justify-center">
          <ArrowRightOnRectangleIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      {/* Hamburger Icon */}
      <button className="md:hidden p-2 rounded focus:outline-none" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open menu">
        {menuOpen ? <XMarkIcon className="h-7 w-7 text-blue-700" /> : <Bars3Icon className="h-7 w-7 text-blue-700" />}
      </button>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex justify-end md:hidden" onClick={() => setMenuOpen(false)}>
          <div className="w-72 max-w-full h-full bg-white shadow-lg flex flex-col p-6 relative animate-slideInRight" onClick={e => e.stopPropagation()}>
            {/* Close Button */}
            <button className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition" onClick={() => setMenuOpen(false)} aria-label="Close menu">
              <XMarkIcon className="h-7 w-7 text-blue-700" />
            </button>
            {/* Brand/Logo (only in mobile menu) */}
            <div className="flex flex-col items-center gap-2 mb-8 mt-2">
              <Image src="/favicon.ico" alt="SponsorSync Logo" width={40} height={40} className="rounded-lg" />
              <span className="text-2xl font-extrabold tracking-tight text-blue-700">SponsorSync</span>
            </div>
            <nav className="flex flex-col gap-6 items-center mt-8">
              <Link href="/" aria-label="Home" className="hover:text-blue-600 transition flex items-center justify-center" onClick={() => setMenuOpen(false)}>
                <HomeIcon className="h-6 w-6" aria-hidden="true" />
              </Link>
              <Link href="/dashboard" aria-label="Dashboard" className="hover:text-blue-600 transition flex items-center justify-center" onClick={() => setMenuOpen(false)}>
                <Squares2X2Icon className="h-6 w-6" aria-hidden="true" />
              </Link>
              <Link href="/analytics" aria-label="Analytics" className="hover:text-blue-600 transition flex items-center justify-center" onClick={() => setMenuOpen(false)}>
                <ChartBarIcon className="h-6 w-6" aria-hidden="true" />
              </Link>
              <Link href="/explore" aria-label="Explore" className="hover:text-blue-600 transition flex items-center justify-center" onClick={() => setMenuOpen(false)}>
                <GlobeAltIcon className="h-6 w-6" aria-hidden="true" />
              </Link>
              <button onClick={() => { localStorage.clear(); window.location.href = "/login"; }} aria-label="Logout" className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow hover:from-blue-600 hover:to-purple-600 transition flex items-center justify-center w-12 h-12 mt-4">
                <ArrowRightOnRectangleIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </nav>
          </div>
        </div>
      )}
      <style jsx global>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slideInRight {
          animation: slideInRight 0.3s cubic-bezier(0.4,0,0.2,1);
        }
      `}</style>
    </nav>
  );
} 