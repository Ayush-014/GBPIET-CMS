// src/components/layouts/AdminLayout.jsx
import React from "react";
import AdminSidebar from "../admin/AdminSidebar";
import AdminHeader from "../admin/AdminHeader";

export default function AdminLayout({ active, children }) {
  return (
    <div className="flex bg-[#F5F5F5] h-full">
      <div className="hidden md:flex">
        <AdminSidebar active={active} />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
