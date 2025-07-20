"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
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
    <nav className="w-full px-6 py-4 bg-white/20 backdrop-blur-lg border-b border-white/30 shadow-lg shadow-black/5 flex items-center justify-between sticky top-0 z-50 transition-all duration-300">
      <div className="flex items-center gap-4">
        <div className="relative">
          <img
            src="/favicon.ico"
            alt="SponsorSync Logo"
            className="h-11 w-11 rounded-2xl shadow-lg shadow-blue-500/20 ring-2 ring-blue-100/60 transition-transform duration-200 hover:scale-105"
          />
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-200"></div>
        </div>
        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 bg-clip-text text-transparent tracking-tight">
          SponsorSync
        </span>
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:flex gap-2 items-center">
        <Link 
          href="/" 
          aria-label="Home" 
          className="group relative p-3 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-blue-50/80 transition-all duration-200 flex items-center justify-center"
        >
          <HomeIcon className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" aria-hidden="true" />
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
        </Link>
        
        <Link 
          href="/dashboard" 
          aria-label="Dashboard" 
          className="group relative p-3 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-blue-50/80 transition-all duration-200 flex items-center justify-center"
        >
          <Squares2X2Icon className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" aria-hidden="true" />
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
        </Link>
        
        <Link 
          href="/analytics" 
          aria-label="Analytics" 
          className="group relative p-3 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-blue-50/80 transition-all duration-200 flex items-center justify-center"
        >
          <ChartBarIcon className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" aria-hidden="true" />
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
        </Link>
        
        <Link 
          href="/explore" 
          aria-label="Explore" 
          className="group relative p-3 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-blue-50/80 transition-all duration-200 flex items-center justify-center"
        >
          <GlobeAltIcon className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" aria-hidden="true" />
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
        </Link>

        <div className="mx-2 h-6 w-px bg-gradient-to-b from-transparent via-slate-300 to-transparent"></div>
        
        <button 
          onClick={() => { localStorage.clear(); window.location.href = "/login"; }} 
          aria-label="Logout" 
          className="group relative ml-2 p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center overflow-hidden"
        >
          <ArrowRightOnRectangleIcon className="h-5 w-5 relative z-10 transition-transform duration-200 group-hover:scale-110" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
        </button>
      </div>

      {/* Hamburger Icon */}
      <button 
        className="md:hidden p-3 rounded-xl hover:bg-blue-50/80 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200" 
        onClick={() => setMenuOpen(!menuOpen)} 
        aria-label="Open menu"
      >
        {menuOpen ? 
          <XMarkIcon className="h-6 w-6 text-slate-700 transition-transform duration-200 rotate-90" /> : 
          <Bars3Icon className="h-6 w-6 text-slate-700 transition-transform duration-200 hover:scale-110" />
        }
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/20 backdrop-blur-sm flex justify-end md:hidden animate-in fade-in duration-200" onClick={() => setMenuOpen(false)}>
          <div className="w-72 bg-white/95 backdrop-blur-md h-full shadow-2xl shadow-slate-900/10 flex flex-col gap-2 p-6 border-l border-slate-200/60 animate-in slide-in-from-right duration-300" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200/60">
              <div className="flex items-center gap-3">
                <img
                  src="/favicon.ico"
                  alt="SponsorSync Logo"
                  className="h-8 w-8 rounded-lg shadow-md ring-1 ring-slate-200"
                />
                <span className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  SponsorSync
                </span>
              </div>
              <button 
                className="p-2 rounded-lg hover:bg-slate-100/80 transition-colors duration-200" 
                onClick={() => setMenuOpen(false)} 
                aria-label="Close menu"
              >
                <XMarkIcon className="h-6 w-6 text-slate-600" />
              </button>
            </div>
            
            <Link 
              href="/" 
              aria-label="Home" 
              className="group flex items-center gap-4 p-4 rounded-xl text-slate-700 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50/80 hover:to-purple-50/40 transition-all duration-200 border border-transparent hover:border-blue-200/40" 
              onClick={() => setMenuOpen(false)}
            >
              <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-blue-100 transition-colors duration-200">
                <HomeIcon className="h-5 w-5" aria-hidden="true" />
              </div>
              <span className="font-medium">Home</span>
            </Link>
            
            <Link 
              href="/dashboard" 
              aria-label="Dashboard" 
              className="group flex items-center gap-4 p-4 rounded-xl text-slate-700 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50/80 hover:to-purple-50/40 transition-all duration-200 border border-transparent hover:border-blue-200/40" 
              onClick={() => setMenuOpen(false)}
            >
              <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-blue-100 transition-colors duration-200">
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <span className="font-medium">Dashboard</span>
            </Link>
            
            <Link 
              href="/analytics" 
              aria-label="Analytics" 
              className="group flex items-center gap-4 p-4 rounded-xl text-slate-700 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50/80 hover:to-purple-50/40 transition-all duration-200 border border-transparent hover:border-blue-200/40" 
              onClick={() => setMenuOpen(false)}
            >
              <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-blue-100 transition-colors duration-200">
                <ChartBarIcon className="h-5 w-5" aria-hidden="true" />
              </div>
              <span className="font-medium">Analytics</span>
            </Link>
            
            <Link 
              href="/explore" 
              aria-label="Explore" 
              className="group flex items-center gap-4 p-4 rounded-xl text-slate-700 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50/80 hover:to-purple-50/40 transition-all duration-200 border border-transparent hover:border-blue-200/40" 
              onClick={() => setMenuOpen(false)}
            >
              <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-blue-100 transition-colors duration-200">
                <GlobeAltIcon className="h-5 w-5" aria-hidden="true" />
              </div>
              <span className="font-medium">Explore</span>
            </Link>

            <div className="mt-auto pt-6 border-t border-slate-200/60">
              <button 
                onClick={() => { localStorage.clear(); window.location.href = "/login"; }} 
                aria-label="Logout" 
                className="group w-full flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
              >
                <div className="p-2 rounded-lg bg-white/20">
                  <ArrowRightOnRectangleIcon className="h-5 w-5" aria-hidden="true" />
                </div>
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

// "use client";
// import Link from "next/link";
// import { useState, useEffect } from "react";
// import { Bars3Icon, XMarkIcon, HomeIcon, Squares2X2Icon, ChartBarIcon, GlobeAltIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";

// export default function NavBar() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [role, setRole] = useState<string | null>(null);

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       setRole(localStorage.getItem("userRole"));
//     }
//   }, []);

//   return (
//     <nav className="w-full px-4 py-3 bg-white/80 shadow-md flex items-center justify-between sticky top-0 z-50">
//       <div className="flex items-center gap-3">
//   <img
//     src="/favicon.ico"
//     alt="SponsorSync Logo"
//     className="h-10 w-10 rounded-full shadow"
//   />
//   <span className="text-2xl font-extrabold tracking-tight text-blue-700">SponsorSync
    
//   </span>
// </div>

//       {/* Desktop Nav */}
//       <div className="hidden md:flex gap-6 items-center text-base font-medium">
//         <Link href="/" aria-label="Home" className="hover:text-blue-600 transition flex items-center justify-center">
//           <HomeIcon className="h-6 w-6" aria-hidden="true" />
//         </Link>
//         <Link href="/dashboard" aria-label="Dashboard" className="hover:text-blue-600 transition flex items-center justify-center">
//           <Squares2X2Icon className="h-6 w-6" aria-hidden="true" />
//         </Link>
//         <Link href="/analytics" aria-label="Analytics" className="hover:text-blue-600 transition flex items-center justify-center">
//           <ChartBarIcon className="h-6 w-6" aria-hidden="true" />
//         </Link>
//         <Link href="/explore" aria-label="Explore" className="hover:text-blue-600 transition flex items-center justify-center">
//           <GlobeAltIcon className="h-6 w-6" aria-hidden="true" />
//         </Link>
//         <button onClick={() => { localStorage.clear(); window.location.href = "/login"; }} aria-label="Logout" className="ml-2 p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow hover:from-blue-600 hover:to-purple-600 transition flex items-center justify-center">
//           <ArrowRightOnRectangleIcon className="h-6 w-6" aria-hidden="true" />
//         </button>
//       </div>
//       {/* Hamburger Icon */}
//       <button className="md:hidden p-2 rounded focus:outline-none" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open menu">
//         {menuOpen ? <XMarkIcon className="h-7 w-7 text-blue-700" /> : <Bars3Icon className="h-7 w-7 text-blue-700" />}
//       </button>
//       {/* Mobile Menu */}
//       {menuOpen && (
//         <div className="fixed inset-0 z-50 bg-black/40 flex justify-end md:hidden" onClick={() => setMenuOpen(false)}>
//           <div className="w-64 bg-white h-full shadow-lg flex flex-col gap-6 p-6" onClick={e => e.stopPropagation()}>
//             <button className="self-end mb-4" onClick={() => setMenuOpen(false)} aria-label="Close menu">
//               <XMarkIcon className="h-7 w-7 text-blue-700" />
//             </button>
//             <Link href="/" aria-label="Home" className="hover:text-blue-600 transition py-2 flex items-center justify-center" onClick={() => setMenuOpen(false)}>
//               <HomeIcon className="h-6 w-6" aria-hidden="true" />
//             </Link>
//             <Link href="/dashboard" aria-label="Dashboard" className="hover:text-blue-600 transition py-2 flex items-center justify-center" onClick={() => setMenuOpen(false)}>
//               <Squares2X2Icon className="h-6 w-6" aria-hidden="true" />
//             </Link>
//             <Link href="/analytics" aria-label="Analytics" className="hover:text-blue-600 transition py-2 flex items-center justify-center" onClick={() => setMenuOpen(false)}>
//               <ChartBarIcon className="h-6 w-6" aria-hidden="true" />
//             </Link>
//             <Link href="/explore" aria-label="Explore" className="hover:text-blue-600 transition py-2 flex items-center justify-center" onClick={() => setMenuOpen(false)}>
//               <GlobeAltIcon className="h-6 w-6" aria-hidden="true" />
//             </Link>
//             <button onClick={() => { localStorage.clear(); window.location.href = "/login"; }} aria-label="Logout" className="mt-4 p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow hover:from-blue-600 hover:to-purple-600 transition flex items-center justify-center">
//               <ArrowRightOnRectangleIcon className="h-6 w-6" aria-hidden="true" />
//             </button>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// } 