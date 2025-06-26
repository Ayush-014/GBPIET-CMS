import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineArrowRight } from "react-icons/hi";
import axios from "axios";
import Pagination from "../common/Pagination"; 
import { toast, ToastContainer } from "react-toastify";

const JOBS_PER_PAGE = 8;

export default function JobsList({ search = "" }) {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  // Fetch jobs from backend on mount
  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await axios.get("http://localhost:3001/api/v1/hiring", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setJobs(res.data.data || []);
      } catch (err) {
      if (err.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        localStorage.removeItem("token");
        window.location.href = "/login";
      } else {
        toast.error("Failed to fetch jobs. Please try again later.");
        console.error("Error fetching jobs:", err);
      }
}

    }
    fetchJobs();
  }, []);

  // Filter jobs whenever `jobs` or `search` changes
  useEffect(() => {
    const filtered = jobs.filter((job) =>
      [
        job.companyName,
        job.role,
        job.location,
        new Date(job.lastDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
      ]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
    setFilteredJobs(filtered);
    setCurrentPage(1);
  }, [jobs, search]);

  const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE);
  const startIndex = (currentPage - 1) * JOBS_PER_PAGE;
  const visibleJobs = filteredJobs.slice(startIndex, startIndex + JOBS_PER_PAGE);

  // Go to detail view with job data passed via state
  const handleViewJob = (job) => {
    navigate("/description", { state: { job } });
  };

  return (
    <div className="w-full">
      <div className="overflow-x-auto rounded shadow-sm border border-gray-200 bg-white w-full">
        <div className="divide-y divide-gray-200">
          {visibleJobs.length > 0 ? (
            visibleJobs.map((job, idx) => {
              const formattedDate = new Date(job.lastDate).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              });
              return (
                <div
                  key={job._id || idx}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-4 px-3 gap-2 hover:bg-gray-50"
                >
                  <span className="font-sB text-sm sm:text-base w-40 text-gray-800">
                    {job.companyName}
                  </span>

                  <div className="text-gray-700 text-sm sm:text-base font-sL text-center flex-1">
                    {job.role} • {job.location} • {formattedDate}
                  </div>

                  <button
                    className="font-sL bg-[#3C89C9] hover:bg-[#235782] text-white px-4 py-1.5 rounded text-xs sm:text-sm transition duration-150 shadow"
                    onClick={() => handleViewJob(job)}
                  >
                    View <HiOutlineArrowRight className="inline-block ml-1 -mr-1" size={16} />
                  </button>
                </div>
              );
            })
          ) : (
            <div className="py-10 px-3 text-center text-gray-400">No jobs found.</div>
          )}
        </div>
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex justify-center">
          <Pagination
            current={currentPage}
            total={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}
