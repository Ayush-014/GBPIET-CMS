import React, { useState } from "react";
import AdminLayout from "../../components/layouts/AdminLayout.jsx";
import TrainingsList from "../../components/common/TrainingsList.jsx";
import UploadDropdown from "../../components/admin/UploadButton.jsx";

export default function PostTrainings() {
  const [search, setSearch] = useState("");

  const handleViewTraining = (training) => {
    alert(`Viewing training at ${training.organization}: ${training.title}`);
  };

  const handleAddTraining = () => {
    alert("Open training posting form (to be implemented)");
  };

  return (
    <AdminLayout active="Post Trainings">
      <div className="max-w-full mx-auto p-4 sm:p-6">
        <h2 className="text-2xl font-sB mb-8 -mt-6 -ml-2">Recently Posted Trainings</h2>
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <div className="flex w-full justify-between mx-auto">
            <input
              type="text"
              placeholder="Search Trainings..."
              className="px-4 py-2 rounded-full w-full sm:w-72 shadow-sm focus:outline-none focus:ring-1 focus:ring-[#235782] text-sm sm:text-base border border-gray-300"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <div className="ml-2">
              <UploadDropdown />
            </div>
          </div>
        </div>
        <TrainingsList onViewTraining={handleViewTraining} search={search} />
      </div>
    </AdminLayout>
  );
}
