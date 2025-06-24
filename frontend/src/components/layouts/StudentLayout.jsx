// src/components/Layout.jsx
import React from "react";
import StudentHeader from "../common/Header";
import StudentSidebar from "../student/StudentSidebar";

export default function StudentLayout({ children, active }) {
  return (
    <div className="flex bg-[#F5F5F5] h-full">
      {/* Sidebar */}
      <div className="hidden md:flex">
        <StudentSidebar active={active} />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        <StudentHeader />
        <main className="flex-1 p-4 sm:p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
