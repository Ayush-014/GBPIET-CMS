import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function JobCard() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3001/api/v1/hiring/latest", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const jobList = res.data?.data;
        if (Array.isArray(jobList) && jobList.length > 0) {
          console.log("✅ All job posts:", jobList);
          setJobs(jobList);
        } else {
          console.log("ℹ️ No job data available.");
        }
      } catch (err) {
        console.error("❌ Failed to fetch job posts:", err);
      }
    };

    fetchJobs();
  }, []);

  if (jobs.length === 0) {
    return <div className="p-6 text-gray-500 italic text-sm">No job post available yet.</div>;
  }

  const handleViewJob = (job) => {
    navigate("/description", { state: { job } });
  };

  return (
    <div className="space-y-4">
      {jobs.map((job, index) => {
        const { companyName, role, type, lastDate } = job;
        const formattedDate = new Date(lastDate).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });

        return (
          <div
            key={job._id || index}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between border rounded-lg p-4 sm:p-6 bg-white shadow-sm gap-3 "
          >
            <div className="mb-1 sm:mb-0">
              <div className="font-sB text-base sm:text-lg">{companyName}</div>
            </div>
            <div className="flex flex-col sm:items-center mb-2 sm:mb-0">
              <div className="text-md font-sL">{role}</div>
              <div className="text-sm text-gray-500 font-sL">{type}</div>
              <div className="text-sm text-gray-500 font-sL">Apply by {formattedDate}</div>
            </div>
            <button
              onClick={() => handleViewJob(job)}
              className="w-full sm:w-auto bg-gradient-to-b from-[#3C89C9] to-[#235782] text-white px-6 py-2 rounded-3xl flex items-center justify-center gap-1 hover:bg-blue-700 transition font-sL mt-2 sm:mt-0"
            >
              View
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        );
      })}
    </div>
  );
}
