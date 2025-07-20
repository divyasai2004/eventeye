"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserCircleIcon, BuildingStorefrontIcon, ChatBubbleLeftRightIcon, UsersIcon, ArrowRightIcon } from "@heroicons/react/24/solid";

export default function Dashboard() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userEmail = localStorage.getItem("userEmail");
    const userRole = localStorage.getItem("userRole");
    if (!token) {
      router.replace("/login");
    } else {
      setEmail(userEmail || "");
      setRole(userRole || "");
    }
  }, [router]);

  return (
    <div className="min-h-[calc(100vh-80px)] w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 py-12 px-4">
      {/* Main Dashboard Card */}
      <div className="w-full max-w-5xl bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200/50 overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-slate-50 to-blue-50/50 px-8 py-8 border-b border-slate-100">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="p-3 rounded-xl bg-white shadow-sm border border-slate-200/60">
              {role === "studentClub" ? 
                <UserCircleIcon className="h-8 w-8 text-blue-600" /> : 
                <BuildingStorefrontIcon className="h-8 w-8 text-indigo-600" />
              }
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Dashboard
            </h1>
          </div>
          
          {/* Welcome Message */}
          <div className="text-center space-y-2">
            <div className="text-xl sm:text-2xl font-semibold text-slate-700">
              Welcome back, <span className="text-blue-700 font-bold">{email}</span>
            </div>
            <div className="inline-flex items-center px-4 py-2 bg-white/80 rounded-full border border-slate-200/60 shadow-sm">
              <span className="text-sm text-slate-600 font-medium">Role:</span>
              <span className="ml-2 px-3 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 text-sm font-semibold rounded-full border border-blue-200/50">
                {role}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="p-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Profile Card */}
            <a href="/profile" className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/80 border border-blue-200/60 shadow-sm hover:shadow-lg hover:shadow-blue-200/40 transition-all duration-300 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative p-6 flex flex-col items-center text-center h-full">
                <div className="p-3 rounded-xl bg-white/80 shadow-sm border border-blue-200/40 mb-4 group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                  <UserCircleIcon className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="font-bold text-slate-800 mb-2 text-lg group-hover:text-blue-800 transition-colors">
                  Manage Profile
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4 flex-grow">
                  Edit your details and showcase your brand or club identity
                </p>
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 group-hover:bg-blue-200 transition-colors">
                  <ArrowRightIcon className="h-4 w-4 text-blue-600 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </a>

            {/* Messages Card */}
            <a href="/messages" className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50/80 border border-indigo-200/60 shadow-sm hover:shadow-lg hover:shadow-indigo-200/40 transition-all duration-300 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative p-6 flex flex-col items-center text-center h-full">
                <div className="p-3 rounded-xl bg-white/80 shadow-sm border border-indigo-200/40 mb-4 group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                  <ChatBubbleLeftRightIcon className="h-7 w-7 text-indigo-600" />
                </div>
                <h3 className="font-bold text-slate-800 mb-2 text-lg group-hover:text-indigo-800 transition-colors">
                  Messages
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4 flex-grow">
                  Chat with sponsors or clubs directly and build connections
                </p>
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 group-hover:bg-indigo-200 transition-colors">
                  <ArrowRightIcon className="h-4 w-4 text-indigo-600 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </a>

            {/* Matches Card */}
            <a href="/matches" className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-emerald-50 to-green-50/80 border border-emerald-200/60 shadow-sm hover:shadow-lg hover:shadow-emerald-200/40 transition-all duration-300 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative p-6 flex flex-col items-center text-center h-full">
                <div className="p-3 rounded-xl bg-white/80 shadow-sm border border-emerald-200/40 mb-4 group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                  <UsersIcon className="h-7 w-7 text-emerald-600" />
                </div>
                <h3 className="font-bold text-slate-800 mb-2 text-lg group-hover:text-emerald-800 transition-colors">
                  View Matches
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4 flex-grow">
                  See your sponsorship matches and explore new opportunities
                </p>
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 group-hover:bg-emerald-200 transition-colors">
                  <ArrowRightIcon className="h-4 w-4 text-emerald-600 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}


// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { UserCircleIcon, BuildingStorefrontIcon, ChatBubbleLeftRightIcon, UsersIcon, ArrowRightIcon } from "@heroicons/react/24/solid";

// export default function Dashboard() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [role, setRole] = useState("");

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const userEmail = localStorage.getItem("userEmail");
//     const userRole = localStorage.getItem("userRole");
//     if (!token) {
//       router.replace("/login");
//     } else {
//       setEmail(userEmail || "");
//       setRole(userRole || "");
//     }
//   }, [router]);

//   return (
//     <div className="min-h-[calc(100vh-80px)] w-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 py-8 px-2">
//       <div className="w-full max-w-4xl bg-white/90 rounded-3xl shadow-2xl border border-blue-100 p-6 sm:p-10 flex flex-col items-center">
//         <div className="flex items-center gap-3 mb-6">
//           {role === "studentClub" ? <UserCircleIcon className="h-10 w-10 text-blue-500" /> : <BuildingStorefrontIcon className="h-10 w-10 text-purple-500" />}
//           <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-blue-700">Dashboard</h2>
//         </div>
//         <div className="mb-4 text-lg sm:text-2xl font-semibold text-purple-700 text-center">
//           Welcome, <span className="text-blue-700">{email}</span>!
//         </div>
//         <div className="mb-8 text-gray-600 text-base sm:text-lg text-center">Role: <span className="font-mono text-blue-700">{role}</span></div>
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
//           <a href="/profile" className="group p-6 rounded-2xl bg-blue-50 border border-blue-200 shadow hover:shadow-lg hover:bg-blue-100 transition flex flex-col items-center text-center">
//             <UserCircleIcon className="h-8 w-8 text-blue-500 mb-2 group-hover:scale-110 transition" />
//             <div className="font-bold text-blue-700 mb-1 text-base sm:text-lg">Manage Profile</div>
//             <div className="text-sm text-gray-500">Edit your details and showcase your brand or club.</div>
//             <ArrowRightIcon className="h-5 w-5 text-blue-400 mt-2 group-hover:translate-x-1 transition" />
//           </a>
//           <a href="/messages" className="group p-6 rounded-2xl bg-purple-50 border border-purple-200 shadow hover:shadow-lg hover:bg-purple-100 transition flex flex-col items-center text-center">
//             <ChatBubbleLeftRightIcon className="h-8 w-8 text-purple-500 mb-2 group-hover:scale-110 transition" />
//             <div className="font-bold text-purple-700 mb-1 text-base sm:text-lg">Messages</div>
//             <div className="text-sm text-gray-500">Chat with sponsors or clubs directly.</div>
//             <ArrowRightIcon className="h-5 w-5 text-purple-400 mt-2 group-hover:translate-x-1 transition" />
//           </a>
//           <a href="/matches" className="group p-6 rounded-2xl bg-green-50 border border-green-200 shadow hover:shadow-lg hover:bg-green-100 transition flex flex-col items-center text-center">
//             <UsersIcon className="h-8 w-8 text-green-500 mb-2 group-hover:scale-110 transition" />
//             <div className="font-bold text-green-700 mb-1 text-base sm:text-lg">View Matches</div>
//             <div className="text-sm text-gray-500">See your sponsorship matches and connections.</div>
//             <ArrowRightIcon className="h-5 w-5 text-green-400 mt-2 group-hover:translate-x-1 transition" />
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// } 