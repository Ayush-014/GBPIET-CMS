// src/components/admin/AdminCard.jsx
import React from 'react';

export default function AdminCard({ title, count, icon, color = "bg-white", textColor = "text-[#235782]" }) {
  return (
    <div className={`w-full p-6 rounded-2xl shadow-md ${color} flex items-center justify-between`}>
      <div className="flex flex-col gap-2">
        <h3 className={`text-sm sm:text-base font-medium ${textColor}`}>{title}</h3>
        <p className={`text-2xl font-bold ${textColor}`}>{count}</p>
      </div>
      <div className="text-4xl sm:text-5xl text-gray-300">
        {icon}
      </div>
    </div>
  );
}
