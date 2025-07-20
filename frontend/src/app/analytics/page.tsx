"use client";
import { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart, BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend } from "chart.js";
Chart.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

export default function SponsorAnalytics() {
  type AnalyticsData = {
    byTheme: Record<string, number>;
    byAudience: Record<string, number>;
    totalMatches: number;
  };
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [role, setRole] = useState<string | null>(null);
  useEffect(() => {
    setRole(localStorage.getItem("userRole"));
    fetch("http://localhost:5000/api/matches/analytics", {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => res.json()).then(setData);
  }, []);

  // Show a message if there is no data
  if (data && (!Object.keys(data.byTheme ?? {}).length || !Object.keys(data.byAudience ?? {}).length)) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-md text-center">
          <h2 className="text-2xl font-bold mb-2 text-gray-800">No Analytics Data</h2>
          <p className="text-gray-600 mb-4">You have no matches yet, so there is no analytics data to display.</p>
          <p className="text-gray-400">Once you have matches, analytics will appear here!</p>
        </div>
      </div>
    );
  }

  if (!data) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="w-12 h-12 border-3 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Loading Analytics</h3>
          <div className="flex space-x-1 justify-center">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
      </div>
    </div>
  );

  const themeLabel = role === "studentClub" ? "Matches by Sponsor Industry" : "Matches by Event Theme";
  const audienceLabel = role === "studentClub" ? "Matches by Sponsor Audience" : "Matches by Audience";

  const themeData = {
    labels: Object.keys(data?.byTheme ?? {}),
    datasets: [{
      label: themeLabel,
      data: Object.values(data?.byTheme ?? {}),
      backgroundColor: [
        "#3B82F6", "#8B5CF6", "#06B6D4", "#10B981", "#F59E0B", "#EF4444", "#EC4899"
      ].slice(0, Object.keys(data?.byTheme ?? {}).length),
      borderWidth: 0,
      borderRadius: 8,
      borderSkipped: false,
      barThickness: "flex" as const,
      maxBarThickness: 60,
    }]
  };

  const audienceData = {
    labels: Object.keys(data?.byAudience ?? {}),
    datasets: [{
      label: audienceLabel,
      data: Object.values(data?.byAudience ?? {}),
      backgroundColor: [
        "#3B82F6", "#8B5CF6", "#06B6D4", "#10B981", "#F59E0B", "#EF4444", "#EC4899"
      ].slice(0, Object.keys(data?.byAudience ?? {}).length),
      borderWidth: 3,
      borderColor: "#ffffff",
      hoverBorderWidth: 4,
      hoverBorderColor: "#ffffff",
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          font: { size: 13, family: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", weight: 'bold' },
          color: '#374151',
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
          boxWidth: 8,
          boxHeight: 8
        }
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.96)',
        titleColor: '#111827',
        bodyColor: '#374151',
        borderColor: 'rgba(209, 213, 219, 0.8)',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        titleFont: { size: 14, weight: 'bold' },
        bodyFont: { size: 13, weight: 'bold' },
        displayColors: true,
        boxPadding: 6,
        caretSize: 6,
        shadowOffsetX: 0,
        shadowOffsetY: 4,
        shadowBlur: 12,
        shadowColor: 'rgba(0, 0, 0, 0.1)'
      }
    },
    animation: {
      duration: 1200,
      easing: 'easeInOutQuad' as const,
    }
  };

  const barOptions = {
    ...chartOptions,
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: '#6B7280',
          font: { size: 12, family: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", weight: '500' },
          padding: 8
        },
        border: {
          color: '#E5E7EB'
        }
      },
      y: {
        grid: {
          color: '#F3F4F6',
          lineWidth: 1,
          drawBorder: false
        },
        ticks: {
          color: '#6B7280',
          font: { size: 12, family: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", weight: '500' },
          padding: 8
        },
        border: {
          display: false
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Analytics
          </h1>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Comprehensive insights and performance metrics for your sponsorship campaigns
          </p>
          <div className="flex justify-center mt-6">
            <div className="h-0.5 w-16 bg-blue-500 rounded-full"></div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          
          {/* Bar Chart Section */}
          <div className="lg:col-span-8">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800">{themeLabel}</h3>
                </div>
                <div className="flex items-center space-x-2 px-3 py-1 bg-gray-50 rounded-full">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-gray-600">Live</span>
                </div>
              </div>
              <div className="relative h-72 sm:h-80 lg:h-96 bg-gray-50/50 rounded-xl p-4">
                <Bar data={themeData} options={barOptions} />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Pie Chart */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-violet-500 rounded-full"></div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800">{audienceLabel}</h3>
                </div>
              </div>
              <div className="relative h-64 sm:h-72 bg-gray-50/50 rounded-xl p-4">
                <Pie data={audienceData} options={chartOptions} />
              </div>
            </div>

            {/* Total Matches Card */}
            <div className="bg-gradient-to-br from-blue-50 to-violet-50 border border-blue-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="text-center">
                <div className="mb-4">
                  <div className="inline-flex items-center space-x-2 bg-white/80 px-3 py-1.5 rounded-full shadow-sm">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Total Performance</span>
                  </div>
                </div>
                <h4 className="text-sm font-medium text-gray-600 mb-2 uppercase tracking-wider">Total Matches</h4>
                <div className="relative">
                  <span className="text-4xl sm:text-5xl font-bold text-gray-900 tabular-nums">
                    {(data.totalMatches ?? 0).toLocaleString()}
                  </span>
                </div>
                <div className="mt-4 flex justify-center">
                  <div className="h-0.5 w-12 bg-blue-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="text-center mt-12 pt-8 border-t border-gray-100">
          <div className="flex justify-center space-x-2 mb-4">
            {[1,2,3,4,5].map((i) => (
              <div 
                key={i}
                className="w-1.5 h-1.5 bg-gray-300 rounded-full opacity-60"
              ></div>
            ))}
          </div>
          <p className="text-sm text-gray-500">
            Data updates in real-time • Last updated: {new Date().toLocaleTimeString()}
          </p>
        </div>
      </div>

      <style jsx global>{`
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
      `}</style>
    </div>
  );
}



// "use client";
// import { useEffect, useState } from "react";
// import { Bar, Pie } from "react-chartjs-2";
// import { Chart, BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend } from "chart.js";
// Chart.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

// export default function SponsorAnalytics() {
//   type AnalyticsData = {
//     byTheme: Record<string, number>;
//     byAudience: Record<string, number>;
//     totalMatches: number;
//   };
//   const [data, setData] = useState<AnalyticsData | null>(null);
//   useEffect(() => {
//     fetch("http://localhost:5000/api/matches/analytics", {
//       headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//     })
//       .then(res => res.json()).then(setData);
//   }, []);
//   if (!data) return <div className="p-8 text-center">Loading analytics...</div>;

//   const themeData = {
//     labels: Object.keys(data.byTheme ?? {}),
//     datasets: [{ label: "Matches by Event Theme", data: Object.values(data.byTheme ?? {}), backgroundColor: "rgba(99,102,241,0.7)" }]
//   };
//   const audienceData = {
//     labels: Object.keys(data.byAudience ?? {}),
//     datasets: [{ label: "Matches by Audience", data: Object.values(data.byAudience ?? {}), backgroundColor: "rgba(34,197,94,0.7)" }]
//   };

//   return (
//     <div className="w-full min-h-[calc(100vh-80px)] flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 px-2 py-6 animate-fadeIn">
//       <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
//         <h2 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-green-500 mb-2 text-center drop-shadow-lg">
//           Sponsor Analytics
//         </h2>
//         <div className="w-32 h-1 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 mb-8 animate-pulse" />
//         <div className="w-full flex flex-col md:flex-row gap-8 items-center justify-center">
//           <div className="flex-1 w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl bg-white/90 rounded-2xl shadow-2xl p-6 mb-6 md:mb-0 hover:scale-[1.03] hover:shadow-3xl transition-all duration-300 ease-in-out border-t-4 border-blue-400 animate-fadeInUp">
//             <Bar data={themeData} options={{responsive:true, maintainAspectRatio:false, plugins:{legend:{labels:{font:{size:16}}}}}} height={220} />
//           </div>
//           <div className="flex-1 w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl bg-white/90 rounded-2xl shadow-2xl p-6 hover:scale-[1.03] hover:shadow-3xl transition-all duration-300 ease-in-out border-t-4 border-green-400 animate-fadeInUp">
//             <Pie data={audienceData} options={{responsive:true, maintainAspectRatio:false, plugins:{legend:{labels:{font:{size:16}}}}}} height={220} />
//           </div>
//         </div>
//         <div className="mt-10 text-2xl sm:text-3xl font-extrabold text-green-600 text-center drop-shadow-lg animate-fadeInUp">
//           <span className="inline-block px-6 py-3 rounded-2xl bg-gradient-to-r from-green-200 via-blue-100 to-purple-100 shadow font-bold">
//             Total Matches: <span className="text-3xl sm:text-4xl text-blue-700 font-black">{data.totalMatches}</span>
//           </span>
//         </div>
//       </div>
//       <style jsx global>{`
//         @keyframes fadeIn {
//           0% { opacity: 0; transform: translateY(30px); }
//           100% { opacity: 1; transform: translateY(0); }
//         }
//         .animate-fadeIn { animation: fadeIn 0.8s cubic-bezier(0.4,0,0.2,1) both; }
//         .animate-fadeInUp { animation: fadeIn 1.2s cubic-bezier(0.4,0,0.2,1) both; }
//       `}</style>
//     </div>
//   );
// } 