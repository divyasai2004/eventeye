import React from "react";

export default function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white/90 rounded-2xl shadow-lg border border-blue-100 p-6 transition-all duration-200 hover:shadow-2xl hover:scale-[1.02] ${className}`} style={{ animation: 'fadeInUp 0.5s' }}>
      {children}
    </div>
  );
} 