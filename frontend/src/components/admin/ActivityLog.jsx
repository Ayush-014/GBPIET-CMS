// src/components/admin/ActivityLog.jsx
import React from "react";
import { HiOutlineClipboardList } from "react-icons/hi";

export default function ActivityLog({ logs }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full ">
      <div className="flex items-center gap-2 mb-4 text-[#235782]">
        <HiOutlineClipboardList size={22} />
        <h3 className="text-lg font-sB text-black">Recent Activities / Logs</h3>
      </div>

      <div className="space-y-4 pl-4 relative font-sR">
        {logs.map((log, index) => (
          <div key={index} className="relative">
            {/* Vertical line */}
            {/* {index < logs.length - 1 && (
              <span className="absolute left-0 top-0 h-full w-0.5 bg-gray-300" />
            )} */}

            <div className="flex items-start gap-4">
              {/* Dot */}
              <div className="w-3 h-3 mt-2 bg-[#235782] rounded-full relative z-10" />

              <div className="flex-1 text-md">
                <p className="">{log.message}</p>
                <span className="text-gray-500 text-xs">{log.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
