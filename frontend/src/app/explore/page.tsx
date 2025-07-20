"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Card from "../components/Card";
import Button from "../components/Button";

interface ClubProfile {
  _id: string;
  user: { email: string };
  eventName: string;
  description: string;
  theme: string;
  targetAudience: string;
  expectedReach: number;
  socialStats?: string;
  pastEvents?: string;
  sponsorshipRequirements: string;
}

export default function ExploreClubs() {
  const [clubs, setClubs] = useState<ClubProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    // Removed role check so both sponsors and student clubs can access
    fetch("https://eventeye.onrender.com/api/profile/clubs", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        setClubs(data.clubs || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load student club events");
        setLoading(false);
      });
  }, [router]);

  // Fallback dummy data for demo
  const dummyClubs: ClubProfile[] = [
    {
      _id: "demo1",
      user: { email: "techfest@demo.com" },
      eventName: "TechFest 2025",
      description: "A national-level tech festival with workshops, hackathons, and talks.",
      theme: "Technology",
      targetAudience: "Students",
      expectedReach: 1200,
      socialStats: "5k followers",
      pastEvents: "TechFest 2024, CodeMania 2023",
      sponsorshipRequirements: "Looking for tech and finance sponsors",
    },
    {
      _id: "demo2",
      user: { email: "ecosummit@demo.com" },
      eventName: "EcoSummit",
      description: "Annual summit on sustainability and green innovation.",
      theme: "Environment",
      targetAudience: "Students",
      expectedReach: 800,
      socialStats: "2k followers",
      pastEvents: "EcoSummit 2023",
      sponsorshipRequirements: "Seeking eco-friendly brands",
    },
    {
      _id: "demo3",
      user: { email: "bizconclave@demo.com" },
      eventName: "BizConclave",
      description: "Business conclave with case competitions and guest speakers.",
      theme: "Business",
      targetAudience: "Students",
      expectedReach: 1000,
      socialStats: "3k followers",
      pastEvents: "BizConclave 2023, MarketMinds 2022",
      sponsorshipRequirements: "Open to all industries",
    },
  ];

  return (
    <div className="min-h-[calc(100vh-80px)] w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-50/80 via-indigo-50/40 to-blue-50/60 py-12 px-4">
      <div className="w-full max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-slate-800 via-indigo-700 to-blue-700 bg-clip-text text-transparent mb-4 tracking-tight">
            Explore Events
          </h2>
          <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Discover amazing opportunities to partner with student organizations and make a meaningful impact
          </p>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-6 py-4 mb-8 shadow-sm">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-red-400 rounded-full mr-3"></div>
              <span className="text-red-700 font-medium">{error}</span>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-3 border-indigo-200 border-t-indigo-600 mb-6"></div>
            <p className="text-slate-500 text-lg font-medium">Loading events...</p>
          </div>
        ) : clubs.length === 0 ? (
          /* Empty State */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dummyClubs.map(club => (
              <div 
                key={club._id}
                className="group bg-white rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                {/* Card Header */}
                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 px-6 py-5 border-b border-slate-100">
                  <h3 className="text-xl font-bold text-slate-800 mb-2 leading-tight group-hover:text-indigo-700 transition-colors duration-200">
                    {club.eventName}
                  </h3>
                  <div className="flex items-center text-sm text-slate-600">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full mr-2"></div>
                    <span>by </span>
                    <span className="font-mono text-indigo-700 bg-indigo-50 px-2 py-1 rounded-md ml-1 text-xs">
                      {club.user.email}
                    </span>
                  </div>
                </div>
                {/* Card Content */}
                <div className="p-6 space-y-4">
                  {/* Key Details */}
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center justify-between py-2 border-b border-slate-50">
                      <span className="text-sm font-medium text-slate-500">Theme</span>
                      <span className="text-sm font-semibold text-slate-800 bg-slate-100 px-3 py-1 rounded-full">
                        {club.theme}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-slate-50">
                      <span className="text-sm font-medium text-slate-500">Audience</span>
                      <span className="text-sm font-semibold text-slate-800 bg-slate-100 px-3 py-1 rounded-full">
                        {club.targetAudience}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-slate-50">
                      <span className="text-sm font-medium text-slate-500">Expected Reach</span>
                      <span className="text-sm font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full">
                        {club.expectedReach.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-slate-50">
                      <span className="text-sm font-medium text-slate-500">Past Events</span>
                      <span className="text-sm font-semibold text-slate-800 bg-slate-100 px-3 py-1 rounded-full">
                        {club.pastEvents || "N/A"}
                      </span>
                    </div>
                  </div>
                  {/* Sponsorship Requirements */}
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-amber-800 mb-2 flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                      Sponsorship Requirements
                    </h4>
                    <p className="text-sm text-amber-700 leading-relaxed">
                      {club.sponsorshipRequirements}
                    </p>
                  </div>
                  {/* Description */}
                  <div className="border-t border-slate-100 pt-4">
                    <p className="text-slate-700 leading-relaxed text-sm">
                      {club.description}
                    </p>
                  </div>
                </div>
                {/* Card Footer - Status */}
                <div className="bg-slate-50/50 px-6 py-4 border-t border-slate-100">
                  <div className="flex items-center text-xs text-slate-500">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                    Available for partnership
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Events Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {clubs.map(club => (
              <div 
                key={club._id}
                className="group bg-white rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                {/* Card Header */}
                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 px-6 py-5 border-b border-slate-100">
                  <h3 className="text-xl font-bold text-slate-800 mb-2 leading-tight group-hover:text-indigo-700 transition-colors duration-200">
                    {club.eventName}
                  </h3>
                  <div className="flex items-center text-sm text-slate-600">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full mr-2"></div>
                    <span>by </span>
                    <span className="font-mono text-indigo-700 bg-indigo-50 px-2 py-1 rounded-md ml-1 text-xs">
                      {club.user.email}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-4">
                  {/* Key Details */}
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center justify-between py-2 border-b border-slate-50">
                      <span className="text-sm font-medium text-slate-500">Theme</span>
                      <span className="text-sm font-semibold text-slate-800 bg-slate-100 px-3 py-1 rounded-full">
                        {club.theme}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-slate-50">
                      <span className="text-sm font-medium text-slate-500">Audience</span>
                      <span className="text-sm font-semibold text-slate-800 bg-slate-100 px-3 py-1 rounded-full">
                        {club.targetAudience}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-slate-50">
                      <span className="text-sm font-medium text-slate-500">Expected Reach</span>
                      <span className="text-sm font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full">
                        {club.expectedReach.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-slate-50">
                      <span className="text-sm font-medium text-slate-500">Past Events</span>
                      <span className="text-sm font-semibold text-slate-800 bg-slate-100 px-3 py-1 rounded-full">
                        {club.pastEvents || "N/A"}
                      </span>
                    </div>
                  </div>

                  {/* Sponsorship Requirements */}
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-amber-800 mb-2 flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                      Sponsorship Requirements
                    </h4>
                    <p className="text-sm text-amber-700 leading-relaxed">
                      {club.sponsorshipRequirements}
                    </p>
                  </div>

                  {/* Description */}
                  <div className="border-t border-slate-100 pt-4">
                    <p className="text-slate-700 leading-relaxed text-sm">
                      {club.description}
                    </p>
                  </div>
                </div>

                {/* Card Footer - Status */}
                <div className="bg-slate-50/50 px-6 py-4 border-t border-slate-100">
                  <div className="flex items-center text-xs text-slate-500">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                    Available for partnership
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import Card from "../components/Card";
// import Button from "../components/Button";

// interface ClubProfile {
//   _id: string;
//   user: { email: string };
//   eventName: string;
//   description: string;
//   theme: string;
//   targetAudience: string;
//   expectedReach: number;
//   socialStats?: string;
//   pastEvents?: string;
//   sponsorshipRequirements: string;
// }

// export default function ExploreClubs() {
//   const [clubs, setClubs] = useState<ClubProfile[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const router = useRouter();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const role = localStorage.getItem("userRole");
//     if (role !== "sponsor") {
//       router.replace("/dashboard");
//       return;
//     }
//     fetch("http://localhost:5000/api/profile/clubs", {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//       .then(res => res.json())
//       .then(data => {
//         setClubs(data.clubs || []);
//         setLoading(false);
//       })
//       .catch(() => {
//         setError("Failed to load student club events");
//         setLoading(false);
//       });
//   }, [router]);

//   return (
//     <div className="min-h-[calc(100vh-80px)] w-full flex flex-col items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-8 px-2">
//       <div className="w-full max-w-5xl bg-white/90 rounded-3xl shadow-2xl border border-green-100 p-8 flex flex-col items-center">
//         <h2 className="text-4xl font-extrabold tracking-tight text-green-700 mb-6">Explore Student Club Events</h2>
//         {error && <div className="text-red-600 mb-4">{error}</div>}
//         {loading ? (
//           <div className="text-gray-400 text-lg">Loading events...</div>
//         ) : clubs.length === 0 ? (
//           <div className="text-gray-500 text-lg">No student club events found.</div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full fadeInUp">
//             {clubs.map(club => (
//               <Card key={club._id}>
//                 <div className="font-bold text-green-700 text-xl mb-1">{club.eventName}</div>
//                 <div className="text-gray-600 mb-2">by <span className="font-mono">{club.user.email}</span></div>
//                 <div className="text-sm text-gray-500 mb-2">Theme: <span className="font-semibold text-blue-700">{club.theme}</span></div>
//                 <div className="text-sm text-gray-500 mb-2">Audience: <span className="font-semibold text-blue-700">{club.targetAudience}</span></div>
//                 <div className="text-sm text-gray-500 mb-2">Expected Reach: <span className="font-semibold text-blue-700">{club.expectedReach}</span></div>
//                 <div className="text-sm text-gray-500 mb-2">Past Events: <span className="font-semibold text-blue-700">{club.pastEvents || "N/A"}</span></div>
//                 <div className="text-sm text-gray-500 mb-2">Sponsorship Needs: <span className="font-semibold text-blue-700">{club.sponsorshipRequirements}</span></div>
//                 <div className="text-gray-700 mt-2">{club.description}</div>
//               </Card>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// } 