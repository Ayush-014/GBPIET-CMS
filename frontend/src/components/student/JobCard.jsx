import React from 'react';
// src/components/JobCard.js
export default function JobCard({ company, role, type, duration, deadline }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border rounded-lg p-4 sm:p-6 bg-white shadow-sm gap-3">
      {/* Company */}
      <div className="mb-1 sm:mb-0">
        <div className="font-sB text-base sm:text-lg">{company}</div>
      </div>
      {/* Role & Details */}
      <div className="flex flex-col sm:items-center mb-2 sm:mb-0">
        <div className="text-md font-sL">{role}</div>
        <div className="text-sm text-gray-500 font-sL">{type} • {duration}</div>
        <div className="text-sm text-gray-500 font-sL">{deadline}</div>
      </div>
      {/* Apply Button */}
      <button className="w-full sm:w-auto bg-gradient-to-b from-[#3C89C9] to-[#235782] text-white px-6 py-2 rounded-3xl flex items-center justify-center gap-1 hover:bg-blue-700 transition font-sL mt-2 sm:mt-0">
        Apply
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </button>
    </div>
  );
}
