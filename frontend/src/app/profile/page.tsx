"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Card from "../components/Card";
import Button from "../components/Button";

interface Field {
  name: string;
  label: string;
  required?: boolean;
  type?: string;
}

const studentClubFields: Field[] = [
  { name: "eventName", label: "Event Name", required: true },
  { name: "description", label: "Description", required: true },
  { name: "theme", label: "Theme", required: true },
  { name: "targetAudience", label: "Target Audience", required: true },
  { name: "expectedReach", label: "Expected Reach", required: true, type: "number" },
  { name: "socialStats", label: "Social Stats" },
  { name: "pastEvents", label: "Past Events" },
  { name: "sponsorshipRequirements", label: "Sponsorship Requirements", required: true },
];
const sponsorFields: Field[] = [
  { name: "brandName", label: "Brand Name", required: true },
  { name: "website", label: "Website" },
  { name: "industry", label: "Industry", required: true },
  { name: "targetAudience", label: "Target Audience", required: true },
  { name: "goals", label: "Goals", required: true },
  { name: "region", label: "Region" },
  { name: "budget", label: "Budget" },
];

export default function Profile() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
    fetch("http://localhost:5000/api/profile/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) throw new Error(data.error);
        setProfile(data.studentClubProfile || data.sponsorProfile || {});
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, [router]);

  if (!isClient) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:5000/api/profile/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profile),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save profile");
      setSuccess("Profile saved successfully!");
    } catch (err) {
      if (err instanceof Error) {
      setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setSaving(false);
    }
  };

  const fields = role === "studentClub" ? studentClubFields : sponsorFields;
  const avatarLetter = email ? email[0].toUpperCase() : "?";

  return (
    <div className="min-h-[calc(100vh-80px)] w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 py-8 px-4">
      <div className="w-full max-w-4xl flex flex-col items-center">
        <div className="w-full max-w-3xl bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-slate-200/50 border border-white/60 p-8 md:p-12">
          
          {/* Avatar and Header Section */}
          <div className="flex flex-col items-center text-center mb-10">
            <div className="relative mb-6">
              <div className="h-24 w-24 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-3xl shadow-lg shadow-indigo-200/50 ring-4 ring-white/50">
                {avatarLetter}
              </div>
              <div className="absolute -bottom-1 -right-1 h-8 w-8 bg-emerald-500 rounded-full border-4 border-white shadow-md"></div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 via-indigo-700 to-purple-700 bg-clip-text text-transparent mb-3 tracking-tight">
              Profile Management
            </h1>
            
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-full mb-4">
              <div className="h-2 w-2 bg-indigo-500 rounded-full mr-2 animate-pulse"></div>
              <span className="text-lg font-semibold text-indigo-700">
                {role === "studentClub" ? "Student Club Profile" : "Sponsor Profile"}
              </span>
            </div>
            
            {email && (
              <div className="text-slate-600 text-lg bg-slate-50/80 px-4 py-2 rounded-xl border border-slate-200/60">
                {email}
              </div>
            )}
          </div>

          {/* Feedback Messages */}
          {error && (
            <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-400 rounded-xl shadow-sm">
              <div className="flex items-center">
                <div className="h-5 w-5 text-red-500 mr-3">⚠️</div>
                <p className="text-red-700 font-medium">{error}</p>
              </div>
            </div>
          )}
          
          {success && (
            <div className="mb-6 p-4 bg-gradient-to-r from-emerald-50 to-green-50 border-l-4 border-emerald-400 rounded-xl shadow-sm">
              <div className="flex items-center">
                <div className="h-5 w-5 text-emerald-500 mr-3">✅</div>
                <p className="text-emerald-700 font-medium">{success}</p>
              </div>
            </div>
          )}

          {/* Main Content */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="relative">
                <div className="h-12 w-12 rounded-full border-4 border-slate-200"></div>
                <div className="absolute top-0 left-0 h-12 w-12 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin"></div>
              </div>
              <p className="text-slate-500 text-lg mt-6 font-medium">Loading your profile...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Form Fields */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {fields.map((field, index) => (
                  <div key={field.name} className="group">
                    <label 
                      htmlFor={field.name} 
                      className="block text-sm font-semibold text-slate-700 mb-2 group-focus-within:text-indigo-600 transition-colors duration-200"
                    >
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    <div className="relative">
                      <input
                        id={field.name}
                        name={field.name}
                        type={field.type || "text"}
                        value={profile[field.name] || ""}
                        onChange={handleChange}
                        required={field.required}
                        className="w-full px-4 py-3.5 bg-white/70 border-2 border-slate-200/60 rounded-xl 
                                 focus:outline-none focus:ring-4 focus:ring-indigo-100/80 focus:border-indigo-400
                                 hover:border-slate-300/80 hover:bg-white/90
                                 transition-all duration-200 ease-in-out
                                 text-slate-700 placeholder-slate-400
                                 shadow-sm hover:shadow-md focus:shadow-lg"
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Save Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full relative overflow-hidden px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 
                           text-white font-semibold text-lg rounded-xl
                           hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700
                           focus:outline-none focus:ring-4 focus:ring-indigo-200/70
                           disabled:opacity-50 disabled:cursor-not-allowed
                           transition-all duration-300 ease-in-out
                           shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]
                           group"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {saving ? (
                      <>
                        <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                        Saving Profile...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Save Profile
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </form>
          )}

          {/* AI Proposal Button - Student Clubs Only */}
          {role === "studentClub" && (
            <div className="mt-8 pt-6 border-t border-slate-200/60">
              <button
                onClick={async () => {
                  const res = await fetch('http://localhost:5000/api/profile/generate-proposal', {
                    method: 'POST',
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                  });
                  if (res.ok) {
                    const blob = await res.blob();
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'proposal.pdf';
                    a.click();
                  } else {
                    alert('Failed to generate proposal');
                  }
                }}
                className="w-full px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600
                         text-white font-semibold text-base rounded-xl
                         hover:from-emerald-600 hover:to-teal-700
                         focus:outline-none focus:ring-4 focus:ring-emerald-200/70
                         transition-all duration-200 ease-in-out
                         shadow-md hover:shadow-lg transform hover:scale-[1.01]
                         flex items-center justify-center group"
              >
                <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Generate AI Proposal PDF
              </button>
            </div>
          )}

          {/* Back to Dashboard Link */}
          <div className="mt-10 pt-6 border-t border-slate-200/60 flex justify-center">
            <a 
              href="/dashboard" 
              className="inline-flex items-center gap-3 px-6 py-3 
                       bg-white/80 hover:bg-slate-50 
                       text-slate-700 hover:text-slate-900 
                       font-semibold text-base rounded-xl
                       border-2 border-slate-200 hover:border-slate-300
                       transition-all duration-200 ease-in-out
                       shadow-sm hover:shadow-md
                       group"
            >
              <ArrowLeftIcon className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-200" />
              Back to Dashboard
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
// import { ArrowLeftIcon } from "@heroicons/react/24/solid";
// import Card from "../components/Card";
// import Button from "../components/Button";

// interface Field {
//   name: string;
//   label: string;
//   required?: boolean;
//   type?: string;
// }

// const studentClubFields: Field[] = [
//   { name: "eventName", label: "Event Name", required: true },
//   { name: "description", label: "Description", required: true },
//   { name: "theme", label: "Theme", required: true },
//   { name: "targetAudience", label: "Target Audience", required: true },
//   { name: "expectedReach", label: "Expected Reach", required: true, type: "number" },
//   { name: "socialStats", label: "Social Stats" },
//   { name: "pastEvents", label: "Past Events" },
//   { name: "sponsorshipRequirements", label: "Sponsorship Requirements", required: true },
// ];
// const sponsorFields: Field[] = [
//   { name: "brandName", label: "Brand Name", required: true },
//   { name: "website", label: "Website" },
//   { name: "industry", label: "Industry", required: true },
//   { name: "targetAudience", label: "Target Audience", required: true },
//   { name: "goals", label: "Goals", required: true },
//   { name: "region", label: "Region" },
//   { name: "budget", label: "Budget" },
// ];

// export default function Profile() {
//   const router = useRouter();
//   const [isClient, setIsClient] = useState(false);
//   const [role, setRole] = useState("");
//   const [email, setEmail] = useState("");
//   const [profile, setProfile] = useState<Record<string, string>>({});
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

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
//     fetch("http://localhost:5000/api/profile/me", {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//       .then(res => res.json())
//       .then(data => {
//         if (data.error) throw new Error(data.error);
//         setProfile(data.studentClubProfile || data.sponsorProfile || {});
//         setLoading(false);
//       })
//       .catch((err: Error) => {
//         setError(err.message);
//         setLoading(false);
//       });
//   }, [router]);

//   if (!isClient) return null;

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setProfile((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setSaving(true);
//     setError("");
//     setSuccess("");
//     const token = localStorage.getItem("token");
//     try {
//       const res = await fetch("http://localhost:5000/api/profile/me", {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(profile),
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Failed to save profile");
//       setSuccess("Profile saved successfully!");
//     } catch (err) {
//       if (err instanceof Error) {
//       setError(err.message);
//       } else {
//         setError("An unknown error occurred");
//       }
//     } finally {
//       setSaving(false);
//     }
//   };

//   const fields = role === "studentClub" ? studentClubFields : sponsorFields;
//   const avatarLetter = email ? email[0].toUpperCase() : "?";

//   return (
//     <div className="min-h-[calc(100vh-80px)] w-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 py-4 px-1 sm:py-8 sm:px-2">
//       <div className="w-full max-w-2xl flex flex-col items-center">
//         <Card className="w-full fadeInUp">
//         {/* Avatar and Header */}
//         <div className="flex flex-col items-center gap-2 mb-6">
//           <span className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white font-extrabold text-4xl shadow-lg">
//             {avatarLetter}
//           </span>
//           <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-blue-700 mt-2">Profile Management</h2>
//           <div className="mb-2 text-lg sm:text-2xl font-bold text-purple-700">
//             {role === "studentClub" ? "Student Club Profile" : "Sponsor Profile"}
//           </div>
//           {email && <div className="text-base sm:text-lg text-gray-600">{email}</div>}
//         </div>
//         {/* Feedback banners */}
//           {error && <div className="w-full text-red-600 mb-4 text-center bg-red-50 border border-red-200 rounded-lg p-2 fadeInUp">{error}</div>}
//           {success && <div className="w-full text-green-600 mb-4 text-center bg-green-50 border border-green-200 rounded-lg p-2 fadeInUp">{success}</div>}
//         {/* Profile Form */}
//         <div className="w-full flex flex-col items-center">
//           {loading ? (
//             <div className="flex flex-col items-center justify-center py-12">
//               <svg className="animate-spin h-8 w-8 text-blue-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>
//               <p className="text-gray-400 text-lg">Loading profile...</p>
//             </div>
//           ) : (
//             <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                 {fields.map(f => (
//                   <div key={f.name} className="flex flex-col items-start w-full">
//                     <label className="font-medium mb-1 text-blue-700" htmlFor={f.name}>{f.label}{f.required && <span className="text-red-500">*</span>}</label>
//                     <input
//                       id={f.name}
//                       name={f.name}
//                       type={f.type || "text"}
//                       value={profile[f.name] || ""}
//                       onChange={handleChange}
//                       required={f.required}
//                       className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-blue-50 transition-all duration-150"
//                     />
//                   </div>
//                 ))}
//               </div>
//                 <Button type="submit" disabled={saving} className="w-full mt-2">
//                 {saving ? "Saving..." : "Save Profile"}
//                 </Button>
//             </form>
//           )}
//         </div>
//         {role === "studentClub" && (
//             <Button
//               className="mt-4"
//             onClick={async () => {
//               const res = await fetch('http://localhost:5000/api/profile/generate-proposal', {
//                 method: 'POST',
//                 headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//               });
//               if (res.ok) {
//                 const blob = await res.blob();
//                 const url = window.URL.createObjectURL(blob);
//                 const a = document.createElement('a');
//                 a.href = url;
//                 a.download = 'proposal.pdf';
//                 a.click();
//               } else {
//                 alert('Failed to generate proposal');
//               }
//             }}
//           >
//             Generate AI Proposal PDF
//             </Button>
//         )}
//         <a href="/dashboard" className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold text-lg shadow hover:from-blue-600 hover:to-purple-600 transition">
//           <ArrowLeftIcon className="h-5 w-5" /> Back to Dashboard
//         </a>
//         </Card>
//       </div>
//     </div>
//   );
// } 