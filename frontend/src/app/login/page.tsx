"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("https://eventeye.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      localStorage.setItem("token", data.token);
      localStorage.setItem("userEmail", data.user.email);
      localStorage.setItem("userRole", data.user.role);
      router.push("/dashboard"); // To be implemented
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
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center py-8">
      <div className="max-w-md w-full mx-auto p-8 bg-white border border-gray-100 rounded-3xl shadow-2xl shadow-gray-200/20 relative overflow-hidden transition-all duration-500 hover:shadow-3xl hover:shadow-gray-300/30 hover:-translate-y-1">
        {/* Subtle animated background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30 opacity-60"></div>
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-gradient-to-tr from-purple-200/20 to-pink-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="relative z-10">
          <h2 className="text-4xl font-black mb-2 text-center bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent tracking-tight">Login</h2>
          <p className="text-center text-gray-500 mb-8 font-medium">Welcome back to your account</p>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="relative group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full px-5 py-4 bg-gray-50/80 border-2 border-gray-100 rounded-2xl text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 hover:border-gray-200 hover:bg-white group-hover:shadow-lg"
              />
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                className="w-full px-5 py-4 bg-gray-50/80 border-2 border-gray-100 rounded-2xl text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 hover:border-gray-200 hover:bg-white group-hover:shadow-lg"
              />
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>
            
            <button 
              type="submit" 
              className="relative w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-2xl shadow-xl shadow-blue-600/25 hover:shadow-2xl hover:shadow-blue-600/40 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none overflow-hidden group" 
              disabled={loading}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 flex items-center justify-center">
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
                    Logging in...
                  </>
                ) : (
                  <>
                    Login
                    <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
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
          
          <div className="mt-8 text-center text-sm">
            <span className="text-gray-600">Don&apos;t have an account?</span>{" "}
            <a 
              href="/register" 
              className="font-bold text-blue-600 hover:text-blue-700 transition-all duration-200 hover:underline decoration-2 underline-offset-4 relative group"
            >
              Register
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}





// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);
//     try {
//       const res = await fetch("http://localhost:5000/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Login failed");
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("userEmail", data.user.email);
//       localStorage.setItem("userRole", data.user.role);
//       router.push("/dashboard"); // To be implemented
//     } catch (err) {
//       if (err instanceof Error) {
//       setError(err.message);
//       } else {
//         setError("An unknown error occurred");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
//       <h2 className="text-2xl font-bold mb-4">Login</h2>
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
//         <button type="submit" className="bg-blue-600 text-white p-2 rounded" disabled={loading}>
//           {loading ? "Logging in..." : "Login"}
//         </button>
//       </form>
//       {error && <div className="text-red-600 mt-2">{error}</div>}
//       <div className="mt-4 text-sm">
//         Don&apos;t have an account? <a href="/register" className="text-blue-600 underline">Register</a>
//       </div>
//     </div>
//   );
// } 