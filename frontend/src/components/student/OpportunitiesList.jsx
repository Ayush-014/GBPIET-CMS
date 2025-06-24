import React, { useState } from "react";
import OpportunityDetail from "./OpportunityDetail";
import { opportunities } from '../data/opportunitiesData';

export default function OpportunitiesList() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="relative">
      <div className="bg-white rounded-xl shadow p-2 sm:p-6 overflow-x-auto divide-y max-w-3xl mx-auto">
        {opportunities.map((item, i) => (
          <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-4 gap-2">
            <span className="font-sB text-base sm:text-lg">{item.company}</span>
            <span className="text-gray-700 text-sm sm:text-base font-sL text-center sm:text-left w-full sm:w-auto">
              {item.role} - {item.details} - {item.deadline}
            </span>
            <button
              className="font-sR bg-gradient-to-b from-[#3C89C9] to-[#235782] text-white px-6 py-2 rounded-md flex items-center gap-2 shadow text-sm"
              onClick={() => setSelected(item)}
            >
              View
            </button>
          </div>
        ))}
      </div>
      {selected && (
        <OpportunityDetail
          opportunity={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
