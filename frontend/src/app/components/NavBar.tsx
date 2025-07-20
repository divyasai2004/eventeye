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
    <nav className="w-full px-6 py-4 bg-gradient-to-r from-white via-slate-50 to-white backdrop-blur-md border-b border-slate-200/60 shadow-sm sticky top-0 z-50 transition-all duration-300">
      {/* Brand/Logo */}
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-4 group">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-700 to-purple-700 p-2 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
            <Image 
              src="/favicon.ico" 
              alt="SponsorSync Logo" 
              width={32} 
              height={32} 
              className="rounded-lg filter brightness-0 invert" 
            />
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl"></div>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-slate-800 via-purple-800 to-slate-900 bg-clip-text text-transparent tracking-tight">
            SponsorSync
        </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-full px-3 py-2 shadow-md border border-slate-200/50">
          <Link 
            href="/" 
            aria-label="Home" 
            className="group relative p-3 rounded-full hover:bg-blue-50 transition-all duration-200 hover:shadow-md"
          >
            <HomeIcon className="h-5 w-5 text-slate-600 group-hover:text-blue-600 transition-colors duration-200" />
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-slate-800 text-white text-xs rounded-md px-2 py-1 whitespace-nowrap pointer-events-none">
              Home
            </div>
          </Link>
          
          <Link 
            href="/dashboard" 
            aria-label="Dashboard" 
            className="group relative p-3 rounded-full hover:bg-blue-50 transition-all duration-200 hover:shadow-md"
          >
            <Squares2X2Icon className="h-5 w-5 text-slate-600 group-hover:text-blue-600 transition-colors duration-200" />
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-slate-800 text-white text-xs rounded-md px-2 py-1 whitespace-nowrap pointer-events-none">
              Dashboard
            </div>
          </Link>
          
          <Link 
            href="/analytics" 
            aria-label="Analytics" 
            className="group relative p-3 rounded-full hover:bg-blue-50 transition-all duration-200 hover:shadow-md"
          >
            <ChartBarIcon className="h-5 w-5 text-slate-600 group-hover:text-blue-600 transition-colors duration-200" />
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-slate-800 text-white text-xs rounded-md px-2 py-1 whitespace-nowrap pointer-events-none">
              Analytics
            </div>
          </Link>
          
          <Link 
            href="/explore" 
            aria-label="Explore" 
            className="group relative p-3 rounded-full hover:bg-blue-50 transition-all duration-200 hover:shadow-md"
          >
            <GlobeAltIcon className="h-5 w-5 text-slate-600 group-hover:text-blue-600 transition-colors duration-200" />
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-slate-800 text-white text-xs rounded-md px-2 py-1 whitespace-nowrap pointer-events-none">
              Explore
            </div>
          </Link>

          <div className="w-px h-6 bg-slate-300 mx-2"></div>

          <button 
            onClick={() => { localStorage.clear(); window.location.href = "/login"; }} 
            aria-label="Logout" 
            className="group relative p-3 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 hover:from-red-600 hover:to-pink-600"
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5" />
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-slate-800 text-white text-xs rounded-md px-2 py-1 whitespace-nowrap pointer-events-none">
              Logout
            </div>
          </button>
      </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-3 rounded-xl bg-white/80 border border-slate-200 shadow-sm hover:bg-white hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20" 
          onClick={() => setMenuOpen(!menuOpen)} 
          aria-label="Open menu"
        >
          {menuOpen ? 
            <XMarkIcon className="h-6 w-6 text-slate-700" /> : 
            <Bars3Icon className="h-6 w-6 text-slate-700" />
          }
        </button>
      </div>

      {/* Mobile Menu Overlay - Full Screen */}
      {menuOpen && (
        <div className="fixed inset-0 z-[9999] md:hidden">
          <div className="absolute inset-0 bg-black/50 animate-fadeIn" onClick={() => setMenuOpen(false)}></div>
          <div 
            className="absolute top-0 left-0 right-0 bg-white shadow-lg animate-slideDown"
            onClick={e => e.stopPropagation()}
          >
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-700 to-purple-700 p-2 shadow-md">
                  <Image 
                    src="/favicon.ico" 
                    alt="SponsorSync Logo" 
                    width={28} 
                    height={28} 
                    className="rounded filter brightness-0 invert" 
                  />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-slate-800 via-purple-800 to-slate-900 bg-clip-text text-transparent">
                  SponsorSync
                </span>
              </div>
              
              <button 
                className="p-3 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 transition-all duration-200 shadow-sm hover:shadow-md" 
                onClick={() => setMenuOpen(false)} 
                aria-label="Close menu"
              >
                <XMarkIcon className="h-6 w-6 text-slate-600" />
              </button>
            </div>

            {/* Mobile Menu Items */}
            <div className="p-6 space-y-2 min-h-[calc(100vh-140px)]">
              <Link 
                href="/" 
                aria-label="Home" 
                className="group flex items-center gap-4 p-4 rounded-xl hover:bg-blue-50 active:bg-blue-100 transition-all duration-200 border border-transparent hover:border-blue-100 hover:shadow-sm" 
                onClick={() => setMenuOpen(false)}
              >
                <div className="flex-shrink-0 p-3 rounded-xl bg-blue-100 group-hover:bg-blue-200 transition-colors duration-200">
                  <HomeIcon className="h-6 w-6 text-blue-600" />
                </div>
                <span className="text-lg text-slate-700 font-semibold group-hover:text-blue-700 transition-colors duration-200">Home</span>
              </Link>
              
              <Link 
                href="/dashboard" 
                aria-label="Dashboard" 
                className="group flex items-center gap-4 p-4 rounded-xl hover:bg-blue-50 active:bg-blue-100 transition-all duration-200 border border-transparent hover:border-blue-100 hover:shadow-sm" 
                onClick={() => setMenuOpen(false)}
              >
                <div className="flex-shrink-0 p-3 rounded-xl bg-blue-100 group-hover:bg-blue-200 transition-colors duration-200">
                  <Squares2X2Icon className="h-6 w-6 text-blue-600" />
                </div>
                <span className="text-lg text-slate-700 font-semibold group-hover:text-blue-700 transition-colors duration-200">Dashboard</span>
              </Link>
              
              <Link 
                href="/analytics" 
                aria-label="Analytics" 
                className="group flex items-center gap-4 p-4 rounded-xl hover:bg-blue-50 active:bg-blue-100 transition-all duration-200 border border-transparent hover:border-blue-100 hover:shadow-sm" 
                onClick={() => setMenuOpen(false)}
              >
                <div className="flex-shrink-0 p-3 rounded-xl bg-blue-100 group-hover:bg-blue-200 transition-colors duration-200">
                  <ChartBarIcon className="h-6 w-6 text-blue-600" />
                </div>
                <span className="text-lg text-slate-700 font-semibold group-hover:text-blue-700 transition-colors duration-200">Analytics</span>
              </Link>
              
              <Link 
                href="/explore" 
                aria-label="Explore" 
                className="group flex items-center gap-4 p-4 rounded-xl hover:bg-blue-50 active:bg-blue-100 transition-all duration-200 border border-transparent hover:border-blue-100 hover:shadow-sm" 
                onClick={() => setMenuOpen(false)}
              >
                <div className="flex-shrink-0 p-3 rounded-xl bg-blue-100 group-hover:bg-blue-200 transition-colors duration-200">
                  <GlobeAltIcon className="h-6 w-6 text-blue-600" />
                </div>
                <span className="text-lg text-slate-700 font-semibold group-hover:text-blue-700 transition-colors duration-200">Explore</span>
              </Link>

              <div className="my-6 border-t border-slate-200"></div>

              <button 
                onClick={() => { 
                  setMenuOpen(false); 
                  localStorage.clear(); 
                  window.location.href = "/login"; 
                }} 
                aria-label="Logout" 
                className="w-full group flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-red-50 to-pink-50 hover:from-red-100 hover:to-pink-100 active:from-red-200 active:to-pink-200 border border-red-200 hover:border-red-300 transition-all duration-200 hover:shadow-sm"
              >
                <div className="flex-shrink-0 p-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-sm">
                  <ArrowRightOnRectangleIcon className="h-6 w-6" />
                </div>
                <span className="text-lg text-red-700 font-semibold group-hover:text-red-800 transition-colors duration-200">Logout</span>
            </button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes slideInRight {
          from { 
            transform: translateX(100%); 
            opacity: 0; 
          }
          to { 
            transform: translateX(0); 
            opacity: 1; 
          }
        }
        @keyframes slideDown {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-slideInRight {
          animation: slideInRight 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .animate-slideDown {
          animation: slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </nav>
  );
} 





// "use client";
// import Link from "next/link";
// import { useState, useEffect } from "react";
// import Image from "next/image";
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
//       {/* Brand/Logo */}
//       <div className="flex items-center gap-3">
//         <Image src="/favicon.ico" alt="SponsorSync Logo" width={40} height={40} className="rounded-lg" />
//         <span className="text-2xl font-extrabold tracking-tight text-blue-700">SponsorSync</span>
//       </div>
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
//           <div className="w-72 max-w-full h-full bg-white shadow-lg flex flex-col p-6 relative animate-slideInRight" onClick={e => e.stopPropagation()}>
//             {/* Close Button */}
//             <button className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition" onClick={() => setMenuOpen(false)} aria-label="Close menu">
//               <XMarkIcon className="h-7 w-7 text-blue-700" />
//             </button>
//             {/* Brand/Logo (only in mobile menu) */}
//             <div className="flex flex-col items-center gap-2 mb-8 mt-2">
//               <Image src="/favicon.ico" alt="SponsorSync Logo" width={40} height={40} className="rounded-lg" />
//               <span className="text-2xl font-extrabold tracking-tight text-blue-700">SponsorSync</span>
//             </div>
//             <nav className="flex flex-col gap-6 items-center mt-8">
//               <Link href="/" aria-label="Home" className="hover:text-blue-600 transition flex items-center justify-center" onClick={() => setMenuOpen(false)}>
//                 <HomeIcon className="h-6 w-6" aria-hidden="true" />
//               </Link>
//               <Link href="/dashboard" aria-label="Dashboard" className="hover:text-blue-600 transition flex items-center justify-center" onClick={() => setMenuOpen(false)}>
//                 <Squares2X2Icon className="h-6 w-6" aria-hidden="true" />
//               </Link>
//               <Link href="/analytics" aria-label="Analytics" className="hover:text-blue-600 transition flex items-center justify-center" onClick={() => setMenuOpen(false)}>
//                 <ChartBarIcon className="h-6 w-6" aria-hidden="true" />
//               </Link>
//               <Link href="/explore" aria-label="Explore" className="hover:text-blue-600 transition flex items-center justify-center" onClick={() => setMenuOpen(false)}>
//                 <GlobeAltIcon className="h-6 w-6" aria-hidden="true" />
//               </Link>
//               <button onClick={() => { localStorage.clear(); window.location.href = "/login"; }} aria-label="Logout" className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow hover:from-blue-600 hover:to-purple-600 transition flex items-center justify-center w-12 h-12 mt-4">
//                 <ArrowRightOnRectangleIcon className="h-6 w-6" aria-hidden="true" />
//               </button>
//             </nav>
//           </div>
//         </div>
//       )}
//       <style jsx global>{`
//         @keyframes slideInRight {
//           from { transform: translateX(100%); opacity: 0; }
//           to { transform: translateX(0); opacity: 1; }
//         }
//         .animate-slideInRight {
//           animation: slideInRight 0.3s cubic-bezier(0.4,0,0.2,1);
//         }
//       `}</style>
//     </nav>
//   );
// } 