"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("studentClub");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const res = await fetch("https://eventeye.onrender.com/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");
      setSuccess("Registration successful! You can now log in.");
      setTimeout(() => router.push("/login"), 1500);
    } catch (err) {
      if (err instanceof Error) {
      setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white border border-gray-100 rounded-3xl shadow-2xl shadow-gray-200/20 relative overflow-hidden transition-all duration-500 hover:shadow-3xl hover:shadow-gray-300/30 hover:-translate-y-1">
      {/* Subtle animated background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 via-transparent to-blue-50/30 opacity-60"></div>
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-green-200/20 to-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-gradient-to-tr from-blue-200/20 to-purple-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="relative z-10">
        <h2 className="text-4xl font-black mb-2 text-center bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent tracking-tight">Register</h2>
        <p className="text-center text-gray-500 mb-8 font-medium">Create your new account</p>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="relative group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full px-5 py-4 bg-gray-50/80 border-2 border-gray-100 rounded-2xl text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10 transition-all duration-300 hover:border-gray-200 hover:bg-white group-hover:shadow-lg"
            />
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400 group-focus-within:text-green-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
            </div>
          </div>
          
          <div className="relative group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full px-5 py-4 bg-gray-50/80 border-2 border-gray-100 rounded-2xl text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10 transition-all duration-300 hover:border-gray-200 hover:bg-white group-hover:shadow-lg"
            />
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400 group-focus-within:text-green-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
          
          <div className="relative group">
            <select 
              value={role} 
              onChange={e => setRole(e.target.value)} 
              className="w-full px-5 py-4 bg-gray-50/80 border-2 border-gray-100 rounded-2xl text-gray-800 focus:outline-none focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10 transition-all duration-300 hover:border-gray-200 hover:bg-white group-hover:shadow-lg appearance-none cursor-pointer"
            >
              <option value="studentClub">Student Club</option>
              <option value="sponsor">Sponsor</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400 group-focus-within:text-green-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          
          <button 
            type="submit" 
            className="relative w-full py-4 px-6 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold rounded-2xl shadow-xl shadow-green-600/25 hover:shadow-2xl hover:shadow-green-600/40 focus:outline-none focus:ring-4 focus:ring-green-500/20 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] overflow-hidden group disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={loading}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-green-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10 flex items-center justify-center">
              {loading ? (
                <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
              ) : (
                "Register"
              )}
              {!loading && (
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              )}
            </div>
          </button>
        </form>
        
        {error && (
          <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-400 rounded-r-xl flex items-center space-x-3 animate-in slide-in-from-left duration-300">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-red-700 font-medium text-sm">{error}</div>
          </div>
        )}
        
        {success && (
          <div className="mt-6 p-4 bg-green-50 border-l-4 border-green-400 rounded-r-xl flex items-center space-x-3 animate-in slide-in-from-left duration-300">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-green-700 font-medium text-sm">{success}</div>
          </div>
        )}
        
        <div className="mt-8 text-center text-sm">
          <span className="text-gray-600">Already have an account?</span>{" "}
          <a 
            href="/login" 
            className="font-bold text-green-600 hover:text-green-700 transition-all duration-200 hover:underline decoration-2 underline-offset-4 relative group"
          >
            Login
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-green-600 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
          </a>
        </div>
      </div>
    </div>
  );
}


// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function Register() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("studentClub");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");
//     try {
//       const res = await fetch("http://localhost:5000/api/auth/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password, role }),
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Registration failed");
//       setSuccess("Registration successful! You can now log in.");
//       setTimeout(() => router.push("/login"), 1500);
//     } catch (err) {
//       if (err instanceof Error) {
//       setError(err.message);
//       } else {
//         setError("An unknown error occurred");
//       }
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
//       <h2 className="text-2xl font-bold mb-4">Register</h2>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={e => setEmail(e.target.value)}
//           required
//           className="border p-2 rounded"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={e => setPassword(e.target.value)}
//           required
//           className="border p-2 rounded"
//         />
//         <select value={role} onChange={e => setRole(e.target.value)} className="border p-2 rounded">
//           <option value="studentClub">Student Club</option>
//           <option value="sponsor">Sponsor</option>
//         </select>
//         <button type="submit" className="bg-blue-600 text-white p-2 rounded">Register</button>
//       </form>
//       {error && <div className="text-red-600 mt-2">{error}</div>}
//       {success && <div className="text-green-600 mt-2">{success}</div>}
//       <div className="mt-4 text-sm">
//         Already have an account? <a href="/login" className="text-blue-600 underline">Login</a>
//       </div>
//     </div>
//   );
// } 