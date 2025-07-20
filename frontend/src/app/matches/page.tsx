"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UsersIcon, ArrowLeftIcon, FaceFrownIcon, FunnelIcon, XMarkIcon, PlusIcon } from "@heroicons/react/24/solid";
import Card from "../components/Card";
import Button from "../components/Button";

const INDUSTRY_OPTIONS = ["All", "Tech", "Finance", "Education", "Healthcare", "Retail", "Other"];
const AUDIENCE_OPTIONS = ["All", "Students", "Professionals", "General Public", "Other"];
const STAGE_OPTIONS = ['New', 'Contacted', 'In Discussion', 'Proposal Sent', 'Negotiation', 'Deal Closed', 'Rejected'];

interface Match {
  _id: string;
  matchPercent?: number;
  sponsor?: { email: string };
  studentClub?: { email: string };
  stage?: string;
}

export default function Matches() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [industry, setIndustry] = useState("All");
  const [audience, setAudience] = useState("All");

  useEffect(() => {
    setIsClient(true);
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("userRole");
    const userEmail = localStorage.getItem("userEmail");
    if (!token) {
      router.replace("/login");
      return;
    }
    setRole(userRole || "");
    setEmail(userEmail || "");
    setLoading(true);
    // Build query string
    const params = [];
    if (industry !== "All") params.push(`industry=${encodeURIComponent(industry)}`);
    if (audience !== "All") params.push(`audience=${encodeURIComponent(audience)}`);
    const query = params.length ? `?${params.join("&")}` : "";
    fetch(`http://localhost:5000/api/matches${query}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        const sorted = (data.matches || []).sort((a: Match, b: Match) => (b.matchPercent || 0) - (a.matchPercent || 0));
        setMatches(sorted);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load matches");
        setLoading(false);
      });
  }, [router, industry, audience]);

  if (!isClient) return null;

  const createDummyMatch = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/matches/dummy", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to create dummy match");
      // Reload matches
      router.refresh();
    } catch (err) {
      setError("Failed to create dummy match");
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setIndustry("All");
    setAudience("All");
  };

  const getStageColor = (stage: string) => {
    const colors = {
      'New': 'bg-blue-100 text-blue-700 border-blue-200',
      'Contacted': 'bg-yellow-100 text-yellow-700 border-yellow-200',
      'In Discussion': 'bg-orange-100 text-orange-700 border-orange-200',
      'Proposal Sent': 'bg-purple-100 text-purple-700 border-purple-200',
      'Negotiation': 'bg-indigo-100 text-indigo-700 border-indigo-200',
      'Deal Closed': 'bg-green-100 text-green-700 border-green-200',
      'Rejected': 'bg-red-100 text-red-700 border-red-200'
    };
    return colors[stage as keyof typeof colors] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const getMatchColor = (percent: number) => {
    if (percent >= 80) return 'from-green-500 to-emerald-600';
    if (percent >= 60) return 'from-blue-500 to-cyan-600';
    if (percent >= 40) return 'from-yellow-500 to-orange-500';
    return 'from-gray-500 to-gray-600';
  };

  return (
    <div className="min-h-[calc(100vh-80px)] w-full bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 py-6 px-4 sm:py-8 sm:px-6">
      <div className="w-full max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 hover:shadow-md transition-shadow duration-300">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
                <UsersIcon className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
                  {role === "studentClub" ? "Student Club Matches" : "Sponsor Matches"}
                </h1>
                {email && (
                  <p className="text-sm text-gray-600 mt-1">
                    Logged in as: <span className="font-semibold text-blue-600">{email}</span>
                  </p>
                )}
              </div>
            </div>
            
            {role === "sponsor" && (
              <button
                onClick={createDummyMatch}
                disabled={loading}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-indigo-700 transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <PlusIcon className="h-5 w-5" />
                Create Test Match
              </button>
            )}
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center gap-3 mb-4">
            <FunnelIcon className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
          </div>
          
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Industry</label>
              <select 
                value={industry} 
                onChange={e => setIndustry(e.target.value)} 
                className="px-4 py-2 border border-gray-200 rounded-xl bg-gray-50 hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium text-gray-700 transition-colors"
              >
                {INDUSTRY_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Audience</label>
              <select 
                value={audience} 
                onChange={e => setAudience(e.target.value)} 
                className="px-4 py-2 border border-gray-200 rounded-xl bg-gray-50 hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium text-gray-700 transition-colors"
              >
                {AUDIENCE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
          </div>

          {/* Active Filters */}
          {(industry !== "All" || audience !== "All") && (
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm font-medium text-gray-600">Active filters:</span>
              {industry !== "All" && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium border border-blue-200">
                  Industry: {industry}
                  <button onClick={() => setIndustry("All")} className="hover:bg-blue-200 rounded-full p-0.5 transition-colors">
                    <XMarkIcon className="h-3 w-3" />
                  </button>
                </span>
              )}
              {audience !== "All" && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium border border-purple-200">
                  Audience: {audience}
                  <button onClick={() => setAudience("All")} className="hover:bg-purple-200 rounded-full p-0.5 transition-colors">
                    <XMarkIcon className="h-3 w-3" />
                  </button>
                </span>
              )}
              <button 
                onClick={clearFilters}
                className="text-sm text-gray-500 hover:text-gray-700 underline font-medium transition-colors"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 flex items-center gap-2">
            <div className="h-2 w-2 bg-red-500 rounded-full"></div>
            {error}
          </div>
        )}

        {/* Matches Grid */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-2 border-blue-200 border-t-blue-500 mb-4"></div>
              <p className="text-gray-600 font-medium">Finding your perfect matches...</p>
            </div>
          ) : matches.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="p-6 bg-gray-100 rounded-2xl mb-6">
                <FaceFrownIcon className="h-12 w-12 text-gray-400 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No matches found</h3>
              <p className="text-gray-600 max-w-md leading-relaxed">
                Try adjusting your filters or check back later for new opportunities. 
                We're constantly working to find the perfect matches for you!
              </p>
              {(industry !== "All" || audience !== "All") && (
                <button 
                  onClick={clearFilters}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-800">
                  {matches.length} Match{matches.length !== 1 ? 'es' : ''} Found
                </h3>
                <div className="text-sm text-gray-500">
                  Sorted by match percentage
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {matches.map((match, idx) => {
                  const other = role === "studentClub" ? match.sponsor : match.studentClub;
                  const avatarLetter = other?.email ? other.email[0].toUpperCase() : '?';
                  const matchPercent = match.matchPercent || 0;
                  
                  return (
                    <div 
                      key={match._id || idx}
                      className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:border-gray-300 transition-all duration-300 relative group"
                    >
                      {/* Match Percentage Badge */}
                      <div className={`absolute -top-3 -right-3 px-3 py-1 rounded-full text-white font-bold text-sm shadow-lg bg-gradient-to-r ${getMatchColor(matchPercent)}`}>
                        {matchPercent}% Match
                      </div>
                      
                      {/* Profile Section */}
                      <div className="flex items-center gap-4 mb-4">
                        <div className="relative">
                          <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold text-lg shadow-sm">
                            {avatarLetter}
                          </div>
                          <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-400 rounded-full border-2 border-white"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-gray-800 text-lg truncate">{other?.email}</h4>
                          <p className="text-sm text-gray-500">
                            {role === "studentClub" ? "Sponsor" : "Student Club"}
                          </p>
                        </div>
                      </div>

                      {/* Stage Section */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-gray-700">Status:</span>
                        </div>
                        
                        {role === "sponsor" ? (
                          <select
                            value={match.stage || 'New'}
                            onChange={async e => {
                              const newStage = e.target.value;
                              setLoading(true);
                              setError("");
                              try {
                                const token = localStorage.getItem("token");
                                const res = await fetch(`http://localhost:5000/api/matches/${match._id}/stage`, {
                                  method: "PATCH",
                                  headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                                  body: JSON.stringify({ stage: newStage })
                                });
                                if (!res.ok) throw new Error("Failed to update stage");
                                // Reload matches
                                router.refresh();
                              } catch (err) {
                                setError("Failed to update stage");
                              } finally {
                                setLoading(false);
                              }
                            }}
                            className="w-full px-3 py-2 border border-gray-200 rounded-xl bg-gray-50 hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium text-gray-700 transition-colors"
                            disabled={loading}
                          >
                            {STAGE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                          </select>
                        ) : (
                          <div className={`inline-flex items-center px-3 py-2 rounded-xl text-sm font-semibold border ${getStageColor(match.stage || 'New')}`}>
                            <div className="h-2 w-2 rounded-full bg-current mr-2"></div>
                            {match.stage || 'New'}
                          </div>
                        )}
                      </div>

                      {/* Progress Bar */}
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                          <span>Match Quality</span>
                          <span>{matchPercent}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div 
                            className={`h-full bg-gradient-to-r ${getMatchColor(matchPercent)} transition-all duration-500 ease-out`}
                            style={{ width: `${matchPercent}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <a 
            href="/dashboard" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-gray-600 hover:to-gray-700 transform hover:-translate-y-0.5 transition-all duration-200"
          >
            <ArrowLeftIcon className="h-5 w-5" /> 
            Back to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}







// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { UsersIcon, ArrowLeftIcon, FaceFrownIcon } from "@heroicons/react/24/solid";
// import Card from "../components/Card";
// import Button from "../components/Button";

// const INDUSTRY_OPTIONS = ["All", "Tech", "Finance", "Education", "Healthcare", "Retail", "Other"];
// const AUDIENCE_OPTIONS = ["All", "Students", "Professionals", "General Public", "Other"];
// const STAGE_OPTIONS = ['New', 'Contacted', 'In Discussion', 'Proposal Sent', 'Negotiation', 'Deal Closed', 'Rejected'];

// interface Match {
//   _id: string;
//   matchPercent?: number;
//   sponsor?: { email: string };
//   studentClub?: { email: string };
//   stage?: string;
// }

// export default function Matches() {
//   const router = useRouter();
//   const [isClient, setIsClient] = useState(false);
//   const [role, setRole] = useState("");
//   const [email, setEmail] = useState("");
//   const [matches, setMatches] = useState<Match[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [industry, setIndustry] = useState("All");
//   const [audience, setAudience] = useState("All");

//   useEffect(() => {
//     setIsClient(true);
//     const token = localStorage.getItem("token");
//     const userRole = localStorage.getItem("userRole");
//     const userEmail = localStorage.getItem("userEmail");
//     if (!token) {
//       router.replace("/login");
//       return;
//     }
//     setRole(userRole || "");
//     setEmail(userEmail || "");
//     setLoading(true);
//     // Build query string
//     const params = [];
//     if (industry !== "All") params.push(`industry=${encodeURIComponent(industry)}`);
//     if (audience !== "All") params.push(`audience=${encodeURIComponent(audience)}`);
//     const query = params.length ? `?${params.join("&")}` : "";
//     fetch(`http://localhost:5000/api/matches${query}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//       .then(res => res.json())
//       .then(data => {
//         const sorted = (data.matches || []).sort((a: Match, b: Match) => (b.matchPercent || 0) - (a.matchPercent || 0));
//         setMatches(sorted);
//         setLoading(false);
//       })
//       .catch(() => {
//         setError("Failed to load matches");
//         setLoading(false);
//       });
//   }, [router, industry, audience]);

//   if (!isClient) return null;

//   const createDummyMatch = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const token = localStorage.getItem("token");
//       const res = await fetch("http://localhost:5000/api/matches/dummy", {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//       });
//       if (!res.ok) throw new Error("Failed to create dummy match");
//       // Reload matches
//       router.refresh();
//     } catch (err) {
//       setError("Failed to create dummy match");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-[calc(100vh-80px)] w-full flex flex-col items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-8 px-2">
//       <div className="w-full max-w-4xl bg-white/90 rounded-3xl shadow-2xl border border-green-100 p-8 flex flex-col items-center">
//         {role === "sponsor" && (
//           <Button onClick={createDummyMatch} className="mb-4">
//             + Create Dummy Match
//           </Button>
//         )}
//         <div className="flex items-center gap-3 mb-6">
//           <UsersIcon className="h-12 w-12 text-green-500" />
//           <h2 className="text-4xl font-extrabold tracking-tight text-green-700">Matches</h2>
//         </div>
//         <div className="mb-2 text-2xl font-bold text-blue-700">
//           {role === "studentClub" ? "Student Club Matches" : "Sponsor Matches"}
//         </div>
//         {email && <div className="mb-6 text-lg text-gray-600">Email: <span className="font-mono text-green-700">{email}</span></div>}
//         {/* Filters */}
//         <div className="mb-8 flex flex-wrap gap-4 w-full justify-center">
//           <select value={industry} onChange={e => setIndustry(e.target.value)} className="border rounded-lg p-2 bg-blue-50 font-semibold text-blue-700">
//             {INDUSTRY_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
//           </select>
//           <select value={audience} onChange={e => setAudience(e.target.value)} className="border rounded-lg p-2 bg-blue-50 font-semibold text-blue-700">
//             {AUDIENCE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
//           </select>
//         </div>
//         {/* Active filters */}
//         <div className="mb-4 flex gap-2 flex-wrap">
//           {industry !== "All" && <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm">Industry: {industry}</span>}
//           {audience !== "All" && <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 font-semibold text-sm">Audience: {audience}</span>}
//         </div>
//         {loading ? (
//           <div className="text-gray-400 text-lg">Loading matches...</div>
//         ) : error ? (
//           <div className="text-red-600 mb-4">{error}</div>
//         ) : matches.length === 0 ? (
//           <div className="text-gray-500 text-lg">No matches found.</div>
//         ) : (
//           <ul className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 fadeInUp">
//             {matches.map((match, idx) => {
//               const other = role === "studentClub" ? match.sponsor : match.studentClub;
//               const avatarLetter = other?.email ? other.email[0].toUpperCase() : '?';
//               return (
//                 <Card key={match._id || idx}>
//                   <div className="flex items-center gap-3 mb-2">
//                     <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-br from-green-400 to-blue-400 text-white font-bold text-lg shadow">
//                       {avatarLetter}
//                     </span>
//                     <span className="font-bold text-green-700 text-lg">{other?.email}</span>
//                   </div>
//                   <div className="text-sm text-gray-500">Role: {role === "studentClub" ? "Sponsor" : "Student Club"}</div>
//                   <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r from-green-400 to-blue-400 text-white font-bold text-sm shadow">
//                     {match.matchPercent || 0}% Match
//                   </span>
//                   <div className="mt-2 w-full">
//                     <span className="font-semibold text-gray-700">Stage: </span>
//                     {role === "sponsor" ? (
//                       <select
//                         value={match.stage || 'New'}
//                         onChange={async e => {
//                           const newStage = e.target.value;
//                           setLoading(true);
//                           setError("");
//                           try {
//                             const token = localStorage.getItem("token");
//                             const res = await fetch(`http://localhost:5000/api/matches/${match._id}/stage`, {
//                               method: "PATCH",
//                               headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//                               body: JSON.stringify({ stage: newStage })
//                             });
//                             if (!res.ok) throw new Error("Failed to update stage");
//                             // Reload matches
//                             router.refresh();
//                           } catch (err) {
//                             setError("Failed to update stage");
//                           } finally {
//                             setLoading(false);
//                           }
//                         }}
//                         className="ml-2 border rounded-lg p-1 bg-blue-50 font-semibold text-blue-700"
//                         disabled={loading}
//                       >
//                         {STAGE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
//                       </select>
//                     ) : (
//                       <span className="ml-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm">{match.stage || 'New'}</span>
//                     )}
//                   </div>
//                 </Card>
//               );
//             })}
//           </ul>
//         )}
//         <a href="/dashboard" className="mt-10 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold text-lg shadow hover:from-green-600 hover:to-blue-600 transition">
//           <ArrowLeftIcon className="h-5 w-5" /> Back to Dashboard
//         </a>
//       </div>
//     </div>
//   );
// } 