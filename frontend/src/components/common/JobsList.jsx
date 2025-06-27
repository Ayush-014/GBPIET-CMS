import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineArrowRight } from "react-icons/hi";
import axios from "axios";
import Pagination from "../common/Pagination";
import { FiTrash2 } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Loader from "../common/Loader"; // ✅ Import the Loader component

const JOBS_PER_PAGE = 8;

export default function JobsList({ search = "" }) {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // ✅ Loading state
  const navigate = useNavigate();

  // Fetch jobs from backend on mount
  useEffect(() => {
    async function fetchJobs() {
      setIsLoading(true); // ✅ Start loader
      try {
        const res = await axios.get(
          "http://localhost:3001/api/v1/hiring/type/job",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
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
      } finally {
        setIsLoading(false); // ✅ Stop loader
      }
    }
    fetchJobs();
  }, []);

  useEffect(() => {
    const getUserData = () => {
      try {
        const userData = JSON.parse(localStorage.getItem("user"));
        setCurrentUser(userData);
        setIsAdmin(
          userData?.role === "superadmin" || userData?.role === "admin"
        );
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    };

    getUserData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/v1/hiring/job/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setJobs((prev) => prev.filter((job) => job._id !== id));
      toast.success("Job deleted");
    } catch (error) {
      console.error("Error deleting job:", error);
      toast.error("Failed to delete job");
    }
  };

  // Filter jobs whenever `jobs` or `search` changes
  useEffect(() => {
    const filtered = jobs.filter((job) =>
      [
        job.companyName,
        job.role,
        job.location,
        new Date(job.lastDate).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
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
  const visibleJobs = filteredJobs.slice(
    startIndex,
    startIndex + JOBS_PER_PAGE
  );

  const handleViewJob = (job) => {
    console.log(job);
    navigate("/description", { state: { job } });
  };

  return (
    <div className="w-full">
      <ToastContainer />

      {isLoading ? ( // ✅ Conditional rendering
        <Loader />
      ) : (
        <>
          <div className="overflow-x-auto rounded shadow-sm border border-gray-200 bg-white w-full">
            <div className="divide-y divide-gray-200">
              {visibleJobs.length > 0 ? (
                visibleJobs.map((job, idx) => {
                  const formattedDate = new Date(
                    job.lastDate
                  ).toLocaleDateString("en-GB", {
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
                        View{" "}
                        <HiOutlineArrowRight
                          className="inline-block ml-1 -mr-1"
                          size={16}
                        />
                      </button>

                      {isAdmin && (
                        <button
                          onClick={() => handleDelete(job._id)}
                          className="text-red-500 hover:text-red-600 transition"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="py-10 px-3 text-center text-gray-400">
                  No jobs found.
                </div>
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
        </>
      )}
    </div>
  );
}
