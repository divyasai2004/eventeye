// import Link from "next/link";
// import { UserGroupIcon, ChatBubbleLeftRightIcon, SparklesIcon } from "@heroicons/react/24/solid";

// export default function Home() {
//   return (
//     <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
//       {/* Enhanced background with floating elements */}
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(147,197,253,0.1),transparent_50%)] opacity-60"></div>
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(196,181,253,0.08),transparent_50%)] opacity-50"></div>
//       <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,rgba(59,130,246,0.02),rgba(147,51,234,0.02),rgba(59,130,246,0.02))]"></div>
      
//       {/* Floating geometric shapes - responsive positioning */}
//       <div className="absolute top-10 sm:top-20 left-4 sm:left-10 w-20 sm:w-32 h-20 sm:h-32 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-xl animate-pulse"></div>
//       <div className="absolute top-20 sm:top-40 right-8 sm:right-20 w-16 sm:w-24 h-16 sm:h-24 bg-gradient-to-br from-pink-200/15 to-blue-200/15 rounded-full blur-lg animate-pulse" style={{animationDelay: '1s'}}></div>
//       <div className="absolute bottom-16 sm:bottom-32 left-1/4 sm:left-1/3 w-12 sm:w-20 h-12 sm:h-20 bg-gradient-to-br from-indigo-200/10 to-cyan-200/10 rounded-full blur-md animate-pulse" style={{animationDelay: '2s'}}></div>
      
//       {/* Subtle grid pattern */}
//       <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.03)_1px,transparent_1px)] bg-[size:40px_40px] sm:bg-[size:60px_60px] opacity-30"></div>
      
//       <section className="relative w-full max-w-6xl flex flex-col items-center justify-center py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8 text-center z-10">
//         {/* Header Section with enhanced styling - responsive */}
//         <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-8 sm:mb-12 group">
//           <div className="relative">
//             <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-2xl sm:rounded-3xl blur-lg scale-110 opacity-60 group-hover:opacity-80 transition-all duration-500"></div>
//             <img
//               src="/favicon.ico"
//               alt="SponsorSync Logo"
//               className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-2xl sm:rounded-3xl shadow-2xl shadow-blue-500/25 ring-2 sm:ring-4 ring-white/60 backdrop-blur-sm group-hover:scale-105 transition-all duration-500"
//             />
//             <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-6 sm:h-6 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-full shadow-lg animate-pulse"></div>
//           </div>
//           <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black bg-gradient-to-r from-slate-800 via-blue-700 to-purple-800 bg-clip-text text-transparent tracking-tight drop-shadow-sm">
//             SponsorSync
//           </h1>
//         </div>

//         {/* Revolutionary subtitle design - responsive */}
//         <div className="relative mb-12 sm:mb-16 max-w-5xl w-full">
//           {/* Layered glow effects */}
//           <div className="absolute inset-0 bg-gradient-to-r from-blue-300/20 via-purple-300/20 to-pink-300/20 rounded-2xl sm:rounded-[2.5rem] blur-2xl sm:blur-3xl scale-110 opacity-50 animate-pulse"></div>
//           <div className="absolute inset-0 bg-gradient-to-r from-purple-200/30 via-blue-200/30 to-indigo-200/30 rounded-xl sm:rounded-[2rem] blur-xl sm:blur-2xl scale-105 opacity-60"></div>
          
//           {/* Main subtitle container with glass morphism */}
//           <div className="relative group">
//             <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-white/50 to-white/70 backdrop-blur-xl rounded-xl sm:rounded-[2rem] border border-white/60 shadow-2xl"></div>
//             <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-purple-50/30 to-pink-50/30 rounded-xl sm:rounded-[2rem] opacity-50 group-hover:opacity-70 transition-all duration-700"></div>
            
//             <div className="relative px-6 sm:px-8 md:px-12 py-6 sm:py-8 md:py-10 rounded-xl sm:rounded-[2rem]">
//               {/* Premium floating particles - responsive */}
//               <div className="absolute top-2 sm:top-4 left-4 sm:left-8 w-2 sm:w-3 h-2 sm:h-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-lg animate-bounce opacity-80"></div>
//               <div className="absolute top-3 sm:top-6 right-6 sm:right-12 w-2 sm:w-2.5 h-2 sm:h-2.5 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full shadow-md animate-bounce opacity-70" style={{animationDelay: '0.7s'}}></div>
//               <div className="absolute bottom-4 sm:bottom-8 left-1/4 sm:left-1/3 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full shadow-sm animate-bounce opacity-60" style={{animationDelay: '1.4s'}}></div>
//               <div className="absolute bottom-3 sm:bottom-6 right-1/4 w-2.5 sm:w-3.5 h-2.5 sm:h-3.5 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full shadow-lg animate-bounce opacity-75" style={{animationDelay: '2.1s'}}></div>
              
//               <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-slate-900 via-blue-800 to-purple-900 bg-clip-text text-transparent leading-tight mb-2">
//                 Smart Sponsorship &
//                 <span className="block mt-1 sm:mt-2 bg-gradient-to-r from-purple-700 via-pink-700 to-blue-700 bg-clip-text text-transparent">
//                   Brand Matchmaking Engine
//                 </span>
//               </h2>
              
//               {/* Animated premium underline */}
//               <div className="flex justify-center mt-4 sm:mt-6">
//                 <div className="w-24 sm:w-40 h-1 sm:h-1.5 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 rounded-full shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-700 relative overflow-hidden">
//                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse"></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Enhanced description with premium styling - responsive */}
//         <div className="relative mb-12 sm:mb-16 max-w-5xl w-full">
//           {/* Main tagline with premium typography */}
//           <div className="relative group mb-8 sm:mb-12">
//             <p className="text-lg sm:text-2xl md:text-3xl lg:text-4xl leading-relaxed font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 bg-clip-text text-transparent text-center tracking-wide drop-shadow-sm px-4">
//               Connect student clubs and sponsors for smarter, easier event partnerships.
//             </p>
//           </div>
          
//           {/* Revolutionary action words section - responsive */}
//           <div className="relative group mb-8 sm:mb-12">
//             <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-6 mb-6 sm:mb-8">
//               {/* Discover - Enhanced */}
//               <div className="group/discover relative w-full sm:w-auto">
//                 <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-xl sm:rounded-2xl blur-lg sm:blur-xl opacity-50 group-hover/discover:opacity-80 transition-all duration-500 animate-pulse"></div>
//                 <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-cyan-300 rounded-xl sm:rounded-2xl blur-md sm:blur-lg opacity-30 scale-110"></div>
//                 <div className="relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 rounded-xl sm:rounded-2xl text-white font-black text-lg sm:text-xl md:text-2xl shadow-2xl group-hover/discover:shadow-3xl group-hover/discover:scale-105 sm:group-hover/discover:scale-110 transition-all duration-500 border border-white/20">
//                   <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-xl sm:rounded-2xl"></div>
//                   <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3 tracking-wide">
//                     <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white rounded-full animate-pulse"></div>
//                     Discover
//                     <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
//                   </span>
//                 </div>
//               </div>

//               {/* Premium animated connector - hidden on mobile */}
//               <div className="hidden sm:flex items-center gap-2">
//                 <div className="w-3 h-3 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full animate-pulse shadow-lg"></div>
//                 <div className="w-6 sm:w-8 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 rounded-full animate-pulse shadow-md" style={{animationDelay: '0.3s'}}></div>
//                 <div className="w-3 h-3 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full animate-pulse shadow-lg" style={{animationDelay: '0.6s'}}></div>
//               </div>

//               {/* Match - Enhanced */}
//               <div className="group/match relative w-full sm:w-auto">
//                 <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl sm:rounded-2xl blur-lg sm:blur-xl opacity-50 group-hover/match:opacity-80 transition-all duration-500 animate-pulse" style={{animationDelay: '0.7s'}}></div>
//                 <div className="absolute inset-0 bg-gradient-to-r from-purple-300 to-pink-300 rounded-xl sm:rounded-2xl blur-md sm:blur-lg opacity-30 scale-110"></div>
//                 <div className="relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 rounded-xl sm:rounded-2xl text-white font-black text-lg sm:text-xl md:text-2xl shadow-2xl group-hover/match:shadow-3xl group-hover/match:scale-105 sm:group-hover/match:scale-110 transition-all duration-500 border border-white/20">
//                   <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-xl sm:rounded-2xl"></div>
//                   <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3 tracking-wide">
//                     <SparklesIcon className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" style={{animationDuration: '3s'}} />
//                     Match
//                     <SparklesIcon className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" style={{animationDuration: '3s', animationDelay: '1.5s'}} />
//                   </span>
//                 </div>
//               </div>

//               {/* Premium animated connector - hidden on mobile */}
//               <div className="hidden sm:flex items-center gap-2">
//                 <div className="w-3 h-3 bg-gradient-to-br from-pink-400 to-indigo-500 rounded-full animate-pulse shadow-lg" style={{animationDelay: '0.8s'}}></div>
//                 <div className="w-6 sm:w-8 h-1 bg-gradient-to-r from-pink-400 via-indigo-400 to-violet-400 rounded-full animate-pulse shadow-md" style={{animationDelay: '1.1s'}}></div>
//                 <div className="w-3 h-3 bg-gradient-to-br from-indigo-400 to-violet-500 rounded-full animate-pulse shadow-lg" style={{animationDelay: '1.4s'}}></div>
//               </div>

//               {/* Collaborate - Enhanced */}
//               <div className="group/collaborate relative w-full sm:w-auto">
//                 <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-violet-400 rounded-xl sm:rounded-2xl blur-lg sm:blur-xl opacity-50 group-hover/collaborate:opacity-80 transition-all duration-500 animate-pulse" style={{animationDelay: '1.4s'}}></div>
//                 <div className="absolute inset-0 bg-gradient-to-r from-indigo-300 to-violet-300 rounded-xl sm:rounded-2xl blur-md sm:blur-lg opacity-30 scale-110"></div>
//                 <div className="relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-500 rounded-xl sm:rounded-2xl text-white font-black text-lg sm:text-xl md:text-2xl shadow-2xl group-hover/collaborate:shadow-3xl group-hover/collaborate:scale-105 sm:group-hover/collaborate:scale-110 transition-all duration-500 border border-white/20">
//                   <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-xl sm:rounded-2xl"></div>
//                   <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3 tracking-wide">
//                     <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
//                     Collaborate
//                     <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white rounded-full animate-bounce" style={{animationDelay: '1.7s'}}></div>
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Enhanced closing line */}
//           <div className="relative text-center px-4">
//             <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-slate-800 via-indigo-700 to-purple-800 bg-clip-text text-transparent tracking-wide drop-shadow-sm">
//               with the right brands or clubs for your next big event
//               <span className="text-xl sm:text-3xl ml-2 sm:ml-3">✨</span>
//             </p>
//           </div>
//         </div>

//         {/* Premium CTA Buttons - responsive */}
//         <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-16 sm:mb-20 w-full sm:w-auto px-4 sm:px-0">
//           <Link 
//             href="/register" 
//             className="group relative px-8 sm:px-12 py-4 sm:py-5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white font-black text-lg sm:text-xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-500 overflow-hidden border border-white/20"
//           >
//             <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//             <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
//             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
//             <span className="relative flex items-center justify-center gap-2 sm:gap-3 tracking-wide">
//               Get Started
//               <SparklesIcon className="h-5 w-5 sm:h-7 sm:w-7 animate-spin drop-shadow-md" style={{animationDuration: '3s', animationDelay: '1.5s'}} />
//             </span>
//           </Link>
//           <Link 
//             href="/login" 
//             className="group relative px-8 sm:px-12 py-4 sm:py-5 rounded-xl sm:rounded-2xl border-2 border-slate-200 bg-white/90 backdrop-blur-md text-slate-700 font-black text-lg sm:text-xl hover:border-blue-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-800 transform hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-500 shadow-xl hover:shadow-2xl overflow-hidden"
//           >
//             <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//             <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//             <span className="relative flex items-center justify-center gap-2 sm:gap-3 tracking-wide">
//               Login
//               <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-500 shadow-md"></div>
//             </span>
//           </Link>
//         </div>

//         {/* Revolutionary "How It Works" Section - responsive */}
//         <div className="w-full max-w-6xl mt-8 sm:mt-12">
//           <div className="relative mb-12 sm:mb-16">
//             <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
//             <div className="relative bg-white px-4 sm:px-8 mx-auto w-fit">
//               <h3 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-slate-800 to-slate-700 bg-clip-text text-transparent mb-2 sm:mb-3 tracking-wide">How SponsorSync Works</h3>
//               <div className="w-24 sm:w-32 h-1 sm:h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full mx-auto shadow-lg"></div>
//             </div>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 px-4 sm:px-0">
//             {/* Step 1 - Revolutionary Design - responsive */}
//             <div className="group relative p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white/80 via-white/70 to-white/80 backdrop-blur-xl border-2 border-white/60 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 sm:hover:-translate-y-3 transition-all duration-700 overflow-hidden">
//               {/* Background effects */}
//               <div className="absolute inset-0 bg-gradient-to-br from-purple-50/80 to-pink-50/80 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
//               <div className="absolute -top-16 sm:-top-20 -right-16 sm:-right-20 w-32 sm:w-40 h-32 sm:h-40 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-2xl sm:blur-3xl opacity-50 group-hover:opacity-80 transition-all duration-700"></div>
              
//               <div className="relative flex flex-col items-center">
//                 <div className="relative mb-6 sm:mb-8">
//                   <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl opacity-40 group-hover:opacity-70 transition-all duration-700 scale-110"></div>
//                   <div className="absolute inset-0 bg-gradient-to-br from-purple-300 to-pink-300 rounded-2xl sm:rounded-3xl blur-lg sm:blur-xl opacity-30 scale-105"></div>
//                   <div className="relative p-4 sm:p-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl sm:rounded-3xl shadow-xl border border-white/50">
//                     <UserGroupIcon className="h-8 w-8 sm:h-12 sm:w-12 text-purple-700 group-hover:scale-125 group-hover:rotate-6 transition-all duration-700 drop-shadow-lg" />
//                   </div>
//                   <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 w-4 h-4 sm:w-6 sm:h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-bounce shadow-lg"></div>
//                 </div>
//                 <div className="font-black text-xl sm:text-2xl mb-3 sm:mb-4 bg-gradient-to-r from-slate-800 to-purple-800 bg-clip-text text-transparent group-hover:from-purple-700 group-hover:to-pink-700 transition-all duration-700 tracking-wide">Create Your Profile</div>
//                 <div className="text-slate-600 leading-relaxed text-center font-medium text-base sm:text-lg">Student clubs and sponsors set up detailed profiles to showcase their needs and offerings.</div>
//               </div>
//             </div>

//             {/* Step 2 - Revolutionary Design - responsive */}
//             <div className="group relative p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white/80 via-white/70 to-white/80 backdrop-blur-xl border-2 border-white/60 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 sm:hover:-translate-y-3 transition-all duration-700 overflow-hidden">
//               {/* Background effects */}
//               <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/80 to-cyan-50/80 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
//               <div className="absolute -top-16 sm:-top-20 -left-16 sm:-left-20 w-32 sm:w-40 h-32 sm:h-40 bg-gradient-to-br from-emerald-200/30 to-cyan-200/30 rounded-full blur-2xl sm:blur-3xl opacity-50 group-hover:opacity-80 transition-all duration-700"></div>
              
//               <div className="relative flex flex-col items-center">
//                 <div className="relative mb-6 sm:mb-8">
//                   <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl opacity-40 group-hover:opacity-70 transition-all duration-700 scale-110"></div>
//                   <div className="absolute inset-0 bg-gradient-to-br from-emerald-300 to-cyan-300 rounded-2xl sm:rounded-3xl blur-lg sm:blur-xl opacity-30 scale-105"></div>
//                   <div className="relative p-4 sm:p-6 bg-gradient-to-br from-emerald-100 to-cyan-100 rounded-2xl sm:rounded-3xl shadow-xl border border-white/50">
//                     <SparklesIcon className="h-8 w-8 sm:h-12 sm:w-12 text-emerald-700 group-hover:scale-125 group-hover:rotate-12 transition-all duration-700 drop-shadow-lg" />
//                   </div>
//                   <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 w-4 h-4 sm:w-6 sm:h-6 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full animate-bounce shadow-lg" style={{animationDelay: '0.5s'}}></div>
//                 </div>
//                 <div className="font-black text-xl sm:text-2xl mb-3 sm:mb-4 bg-gradient-to-r from-slate-800 to-emerald-800 bg-clip-text text-transparent group-hover:from-emerald-700 group-hover:to-cyan-700 transition-all duration-700 tracking-wide">Smart Matchmaking</div>
//                 <div className="text-slate-600 leading-relaxed text-center font-medium text-base sm:text-lg">Our engine connects the right clubs and brands for meaningful partnerships.</div>
//               </div>
//             </div>

//             {/* Step 3 - Revolutionary Design - responsive */}
//             <div className="group relative p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white/80 via-white/70 to-white/80 backdrop-blur-xl border-2 border-white/60 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 sm:hover:-translate-y-3 transition-all duration-700 overflow-hidden">
//               {/* Background effects */}
//               <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 to-indigo-50/80 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
//               <div className="absolute -bottom-16 sm:-bottom-20 -right-16 sm:-right-20 w-32 sm:w-40 h-32 sm:h-40 bg-gradient-to-br from-blue-200/30 to-indigo-200/30 rounded-full blur-2xl sm:blur-3xl opacity-50 group-hover:opacity-80 transition-all duration-700"></div>
              
//               <div className="relative flex flex-col items-center">
//                 <div className="relative mb-6 sm:mb-8">
//                   <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl opacity-40 group-hover:opacity-70 transition-all duration-700 scale-110"></div>
//                   <div className="absolute inset-0 bg-gradient-to-br from-blue-300 to-indigo-300 rounded-2xl sm:rounded-3xl blur-lg sm:blur-xl opacity-30 scale-105"></div>
//                   <div className="relative p-4 sm:p-6 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl sm:rounded-3xl shadow-xl border border-white/50">
//                     <ChatBubbleLeftRightIcon className="h-8 w-8 sm:h-12 sm:w-12 text-blue-700 group-hover:scale-125 group-hover:-rotate-6 transition-all duration-700 drop-shadow-lg" />
//                   </div>
//                   <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 w-4 h-4 sm:w-6 sm:h-6 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full animate-bounce shadow-lg" style={{animationDelay: '1s'}}></div>
//                 </div>
//                 <div className="font-black text-xl sm:text-2xl mb-3 sm:mb-4 bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-indigo-700 transition-all duration-700 tracking-wide">Easy Messaging</div>
//                 <div className="text-slate-600 leading-relaxed text-center font-medium text-base sm:text-lg">Chat, negotiate, and collaborate directly within the platform.</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }







import Link from "next/link";
import { UserGroupIcon, ChatBubbleLeftRightIcon, SparklesIcon } from "@heroicons/react/24/solid";

export default function Home() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 bg-grid-slate-100/50 bg-[size:20px_20px] opacity-30"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-100/40 to-purple-100/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-indigo-100/40 to-cyan-100/40 rounded-full blur-3xl"></div>
      
      <section className="relative w-full max-w-5xl flex flex-col items-center justify-center py-20 px-6 text-center z-10">
        {/* Header Section */}
        {/* <div className="flex items-center gap-5 mb-8">
          <img
            src="/favicon.ico"
            alt="SponsorSync Logo"
            className="h-16 w-16 rounded-2xl shadow-lg shadow-blue-500/20 ring-2 ring-blue-100/60"
          />
          <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 bg-clip-text text-transparent tracking-tight">
            
          </h1>
        </div> */}

        {/* Enhanced Subtitle with animated elements */}
        <div className="relative mb-8">
          {/* Background glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-200/60 via-blue-200/60 to-indigo-200/60 rounded-3xl blur-2xl scale-110 opacity-40 animate-pulse"></div>
          
          {/* Main subtitle container */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-100/80 via-blue-100/80 to-indigo-100/80 rounded-3xl blur-xl opacity-70 group-hover:opacity-90 transition-opacity duration-500"></div>
            
            <div className="relative px-8 py-6 bg-white/80 backdrop-blur-md rounded-3xl border-2 border-white/50 shadow-xl group-hover:shadow-2xl transition-all duration-500">
              {/* Animated sparkle decorations */}
              <div className="absolute -top-2 -left-2 w-4 h-4 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full opacity-70 animate-bounce"></div>
              <div className="absolute -top-1 -right-3 w-3 h-3 bg-gradient-to-br from-pink-300 to-purple-400 rounded-full opacity-80 animate-bounce" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute -bottom-2 left-1/4 w-2 h-2 bg-gradient-to-br from-blue-300 to-cyan-400 rounded-full opacity-60 animate-bounce" style={{animationDelay: '1s'}}></div>
              
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black bg-gradient-to-r from-slate-700 via-blue-700 to-purple-700 bg-clip-text text-transparent leading-tight">
                Smart Sponsorship &
                <span className="block mt-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                  Brand Matchmaking Engine
                </span>
              </h2>
              
              {/* Subtle animated underline */}
              <div className="w-32 h-1 bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 rounded-full mx-auto mt-4 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"></div>
            </div>
          </div>
        </div>

         <div className="flex items-center gap-5 mb-8">
          <img
            src="/favicon.ico"
            alt="SponsorSync Logo"
            className="h-16 w-16 rounded-2xl shadow-lg shadow-blue-500/20 ring-2 ring-blue-100/60"
          />
          <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 bg-clip-text text-transparent tracking-tight">
            
          </h1>
        </div>

        {/* Enhanced Description - Direct on page without container layer */}
        <div className="relative mb-12 max-w-4xl">
          {/* Main tagline with enhanced styling */}
          {/* <div className="relative group mb-1 sm:mb-8">
            <p className="text-center text-sm sm:text-2xl md:text-3xl lg:text-4xl leading-snug font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 bg-clip-text text-transparent tracking-wide drop-shadow-sm max-w-[90vw] sm:max-w-2xl mx-auto break-words">
              Connect student clubs and sponsors for smarter, easier event partnerships
            </p>
          </div> */}
          {/* Discover-Match-Collaborate section - ultra compact and stable on mobile */}
          <div className="relative group mb-1 sm:mb-8">
            <div className="flex flex-row items-center justify-center gap-0.5 sm:gap-6 mb-1 sm:mb-8 w-full overflow-x-auto whitespace-nowrap no-scrollbar py-1 flex-nowrap max-w-full">
              {/* Discover */}
              <div className="group/discover relative min-w-[90px] sm:min-w-[120px] md:min-w-[140px] max-w-xs mx-0.5 flex items-center justify-center">
                <div className="relative w-full flex items-center justify-center">
                  <div className="px-3 py-1.5 sm:px-6 sm:py-3 md:px-8 md:py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full text-white font-bold text-sm sm:text-lg md:text-xl shadow flex items-center justify-center">
                    Discover
                  </div>
                </div>
              </div>
              {/* Connector */}
              <div className="flex items-center gap-0.5 sm:gap-2 min-w-[16px] sm:min-w-[32px] mx-0.5">
                <div className="w-1 h-1 sm:w-2 sm:h-2 md:w-3 md:h-3 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full animate-pulse shadow-lg"></div>
                <div className="w-2 sm:w-6 md:w-10 h-0.5 sm:h-1 md:h-1.5 bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 rounded-full animate-pulse shadow-md" style={{animationDelay: '0.3s'}}></div>
                <div className="w-1 h-1 sm:w-2 sm:h-2 md:w-3 md:h-3 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full animate-pulse shadow-lg" style={{animationDelay: '0.6s'}}></div>
              </div>
              {/* Match */}
              <div className="group/match relative min-w-[90px] sm:min-w-[120px] md:min-w-[140px] max-w-xs mx-0.5 flex items-center justify-center">
                <div className="relative w-full flex items-center justify-center">
                  <div className="px-3 py-1.5 sm:px-6 sm:py-3 md:px-8 md:py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-bold text-sm sm:text-lg md:text-xl shadow flex items-center justify-center">
                    Match
                  </div>
                </div>
              </div>
              {/* Connector */}
              <div className="flex items-center gap-0.5 sm:gap-2 min-w-[16px] sm:min-w-[32px] mx-0.5">
                <div className="w-1 h-1 sm:w-2 sm:h-2 md:w-3 md:h-3 bg-gradient-to-br from-pink-400 to-indigo-500 rounded-full animate-pulse shadow-lg" style={{animationDelay: '0.8s'}}></div>
                <div className="w-2 sm:w-6 md:w-10 h-0.5 sm:h-1 md:h-1.5 bg-gradient-to-r from-pink-400 via-indigo-400 to-violet-400 rounded-full animate-pulse shadow-md" style={{animationDelay: '1.1s'}}></div>
                <div className="w-1 h-1 sm:w-2 sm:h-2 md:w-3 md:h-3 bg-gradient-to-br from-indigo-400 to-violet-500 rounded-full animate-pulse shadow-lg" style={{animationDelay: '1.4s'}}></div>
              </div>
              {/* Collaborate */}
              <div className="group/collaborate relative min-w-[90px] sm:min-w-[120px] md:min-w-[140px] max-w-xs mx-0.5 flex items-center justify-center">
                <div className="relative w-full flex items-center justify-center">
                  <div className="px-3 py-1.5 sm:px-6 sm:py-3 md:px-8 md:py-4 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full text-white font-bold text-sm sm:text-lg md:text-xl shadow flex items-center justify-center">
                    Celebrate
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Enhanced closing line */}
          <div className="relative text-center px-2 mt-1">
            <p className="text-center text-sm sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-slate-800 via-indigo-700 to-purple-800 bg-clip-text text-transparent tracking-wide drop-shadow-sm max-w-[90vw] sm:max-w-2xl mx-auto leading-snug">
The Link Between Brands and Campus Buzz             <span className="text-xl sm:text-3xl ml-1 sm:ml-3"></span>
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 mb-16">
          <Link 
            href="/register" 
            className="group relative px-10 py-4 rounded-2xl bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 text-white font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative flex items-center justify-center gap-2">
              Get Started
              <SparklesIcon className="h-6 w-6 animate-spin" style={{animationDuration: '3s', animationDelay: '1.5s'}} />
            </span>
          </Link>
          <Link 
            href="/login" 
            className="group relative px-8 sm:px-12 py-4 sm:py-5 rounded-full bg-white text-blue-700 font-bold text-lg sm:text-xl shadow border border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 flex items-center justify-center gap-3 overflow-hidden focus:outline-none focus:ring-4 focus:ring-blue-100/40"
          >
            <span className="relative flex items-center justify-center gap-2 sm:gap-3 tracking-wide">
              Login
              <svg className="w-5 h-5 sm:w-6 sm:h-6 ml-1 group-hover:translate-x-1 transition-transform duration-200 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </Link>
        </div>

        {/* Revolutionary "How It Works" Section - responsive */}
        <div className="w-full max-w-6xl mt-8 sm:mt-12">
          <div className="relative mb-12 sm:mb-16">
            <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
            <div className="relative bg-white px-4 sm:px-8 mx-auto w-fit">
              <h3 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-slate-800 to-slate-700 bg-clip-text text-transparent mb-2 sm:mb-3 tracking-wide">How SponsorSync Works</h3>
              <div className="w-24 sm:w-32 h-1 sm:h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full mx-auto shadow-lg"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 px-4 sm:px-0">
            {/* Step 1 - Revolutionary Design - responsive */}
            <div className="group relative p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white/80 via-white/70 to-white/80 backdrop-blur-xl border-2 border-white/60 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 sm:hover:-translate-y-3 transition-all duration-700 overflow-hidden">
              {/* Background effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50/80 to-pink-50/80 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="absolute -top-16 sm:-top-20 -right-16 sm:-right-20 w-32 sm:w-40 h-32 sm:h-40 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-2xl sm:blur-3xl opacity-50 group-hover:opacity-80 transition-all duration-700"></div>
              
              <div className="relative flex flex-col items-center">
                <div className="relative mb-6 sm:mb-8">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl opacity-40 group-hover:opacity-70 transition-all duration-700 scale-110"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-300 to-pink-300 rounded-2xl sm:rounded-3xl blur-lg sm:blur-xl opacity-30 scale-105"></div>
                  <div className="relative p-4 sm:p-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl sm:rounded-3xl shadow-xl border border-white/50">
                    <UserGroupIcon className="h-8 w-8 sm:h-12 sm:w-12 text-purple-700 group-hover:scale-125 group-hover:rotate-6 transition-all duration-700 drop-shadow-lg" />
                  </div>
                  <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 w-4 h-4 sm:w-6 sm:h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-bounce shadow-lg"></div>
                </div>
                <div className="font-black text-xl sm:text-2xl mb-3 sm:mb-4 bg-gradient-to-r from-slate-800 to-purple-800 bg-clip-text text-transparent group-hover:from-purple-700 group-hover:to-pink-700 transition-all duration-700 tracking-wide">Create Your Profile</div>
                <div className="text-slate-600 leading-relaxed text-center font-medium text-base sm:text-lg">Student clubs and sponsors set up detailed profiles to showcase their needs and offerings.</div>
              </div>
            </div>

            {/* Step 2 - Revolutionary Design - responsive */}
            <div className="group relative p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white/80 via-white/70 to-white/80 backdrop-blur-xl border-2 border-white/60 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 sm:hover:-translate-y-3 transition-all duration-700 overflow-hidden">
              {/* Background effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/80 to-cyan-50/80 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="absolute -top-16 sm:-top-20 -left-16 sm:-left-20 w-32 sm:w-40 h-32 sm:h-40 bg-gradient-to-br from-emerald-200/30 to-cyan-200/30 rounded-full blur-2xl sm:blur-3xl opacity-50 group-hover:opacity-80 transition-all duration-700"></div>
              
              <div className="relative flex flex-col items-center">
                <div className="relative mb-6 sm:mb-8">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl opacity-40 group-hover:opacity-70 transition-all duration-700 scale-110"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-300 to-cyan-300 rounded-2xl sm:rounded-3xl blur-lg sm:blur-xl opacity-30 scale-105"></div>
                  <div className="relative p-4 sm:p-6 bg-gradient-to-br from-emerald-100 to-cyan-100 rounded-2xl sm:rounded-3xl shadow-xl border border-white/50">
                    <SparklesIcon className="h-8 w-8 sm:h-12 sm:w-12 text-emerald-700 group-hover:scale-125 group-hover:rotate-12 transition-all duration-700 drop-shadow-lg" />
                  </div>
                  <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 w-4 h-4 sm:w-6 sm:h-6 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full animate-bounce shadow-lg" style={{animationDelay: '0.5s'}}></div>
                </div>
                <div className="font-black text-xl sm:text-2xl mb-3 sm:mb-4 bg-gradient-to-r from-slate-800 to-emerald-800 bg-clip-text text-transparent group-hover:from-emerald-700 group-hover:to-cyan-700 transition-all duration-700 tracking-wide">Smart Matchmaking</div>
                <div className="text-slate-600 leading-relaxed text-center font-medium text-base sm:text-lg">Our engine connects the right clubs and brands for meaningful partnerships.</div>
              </div>
            </div>

            {/* Step 3 - Revolutionary Design - responsive */}
            <div className="group relative p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white/80 via-white/70 to-white/80 backdrop-blur-xl border-2 border-white/60 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 sm:hover:-translate-y-3 transition-all duration-700 overflow-hidden">
              {/* Background effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 to-indigo-50/80 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="absolute -bottom-16 sm:-bottom-20 -right-16 sm:-right-20 w-32 sm:w-40 h-32 sm:h-40 bg-gradient-to-br from-blue-200/30 to-indigo-200/30 rounded-full blur-2xl sm:blur-3xl opacity-50 group-hover:opacity-80 transition-all duration-700"></div>
              
              <div className="relative flex flex-col items-center">
                <div className="relative mb-6 sm:mb-8">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl opacity-40 group-hover:opacity-70 transition-all duration-700 scale-110"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-300 to-indigo-300 rounded-2xl sm:rounded-3xl blur-lg sm:blur-xl opacity-30 scale-105"></div>
                  <div className="relative p-4 sm:p-6 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl sm:rounded-3xl shadow-xl border border-white/50">
                    <ChatBubbleLeftRightIcon className="h-8 w-8 sm:h-12 sm:w-12 text-blue-700 group-hover:scale-125 group-hover:-rotate-6 transition-all duration-700 drop-shadow-lg" />
                  </div>
                  <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 w-4 h-4 sm:w-6 sm:h-6 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full animate-bounce shadow-lg" style={{animationDelay: '1s'}}></div>
                </div>
                <div className="font-black text-xl sm:text-2xl mb-3 sm:mb-4 bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-indigo-700 transition-all duration-700 tracking-wide">Easy Messaging</div>
                <div className="text-slate-600 leading-relaxed text-center font-medium text-base sm:text-lg">Chat, negotiate, and collaborate directly within the platform.</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// import Link from "next/link";
// import { UserGroupIcon, ChatBubbleLeftRightIcon, SparklesIcon } from "@heroicons/react/24/solid";

// export default function Home() {
//   return (
//     <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-green-50">
//       <section className="w-full max-w-4xl flex flex-col items-center justify-center py-20 px-4 text-center">
//         <div className="flex items-center gap-4 mb-6">
//           <img
//   src="/favicon.ico"
//   alt="SponsorSync Logo"
//   className="h-16 w-16 rounded-full shadow-lg"
// />

//           <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-blue-700">SponsorSync</h1>
//         </div>
//         <h2 className="text-2xl sm:text-3xl font-semibold text-purple-700 mb-4">Smart Sponsorship & Brand Matchmaking Engine</h2>
//         <p className="text-lg text-gray-600 mb-8 max-w-2xl">
//           Connect student clubs and sponsors for smarter, easier event partnerships. Discover, match, and collaborate with the right brands or clubs for your next big event.
//         </p>
//         <div className="flex flex-col sm:flex-row gap-4 mb-12">
//           <Link href="/register" className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold text-lg shadow hover:from-blue-600 hover:to-purple-600 transition">Get Started</Link>
//           <Link href="/login" className="px-8 py-3 rounded-lg border-2 border-blue-500 text-blue-700 font-semibold text-lg hover:bg-blue-50 transition">Login</Link>
//         </div>
//         <div className="w-full max-w-3xl mt-12">
//           <h3 className="text-xl font-bold text-blue-700 mb-6">How SponsorSync Works</h3>
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
//             <div className="flex flex-col items-center">
//               <UserGroupIcon className="h-12 w-12 text-purple-500 mb-2" />
//               <div className="font-semibold text-lg mb-1">Create Your Profile</div>
//               <div className="text-gray-500 text-sm">Student clubs and sponsors set up detailed profiles to showcase their needs and offerings.</div>
//             </div>
//             <div className="flex flex-col items-center">
//               <SparklesIcon className="h-12 w-12 text-green-500 mb-2" />
//               <div className="font-semibold text-lg mb-1">Smart Matchmaking</div>
//               <div className="text-gray-500 text-sm">Our engine connects the right clubs and brands for meaningful partnerships.</div>
//             </div>
//             <div className="flex flex-col items-center">
//               <ChatBubbleLeftRightIcon className="h-12 w-12 text-blue-500 mb-2" />
//               <div className="font-semibold text-lg mb-1">Easy Messaging</div>
//               <div className="text-gray-500 text-sm">Chat, negotiate, and collaborate directly within the platform.</div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }
