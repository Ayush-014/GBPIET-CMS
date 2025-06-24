import React, { useState } from "react";
import AdminLayout from "../../components/layouts/AdminLayout.jsx";
import InternshipsList from "../../components/common/InternshipsList.jsx";
import UploadDropdown from "../../components/admin/UploadDropdown.jsx";

export default function PostInternships() {
  const [search, setSearch] = useState("");

  const handleViewJob = (job) => {
    alert(`Viewing internship at ${job.company}: ${job.role}`);
  };

  const handleAddJob = () => {
    alert("Open internship posting form (to be implemented)");
  };

  return (
    <AdminLayout active="Post Internships">
      <div className="max-w-full mx-auto p-4 sm:p-6">
        <h2 className="text-2xl font-sB mb-8 -mt-6 -ml-2">Recently Posted Internships</h2>
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <div className="flex w-full justify-between mx-auto">
            <input
              type="text"
              placeholder="Search Internships..."
              className="px-4 py-2 rounded-full w-full sm:w-72 shadow-sm focus:outline-none focus:ring-1 focus:ring-[#235782] text-sm sm:text-base border border-gray-300"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="ml-2">
              <UploadDropdown />
            </div>

          </div>
        </div>
        <InternshipsList onViewJob={handleViewJob} search={search} />
      </div>
    </AdminLayout>
  );
}
