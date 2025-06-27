import React, { useState, useEffect } from "react";
import { HiOutlineArrowRight } from "react-icons/hi";
import axios from "axios";
import Pagination from "../common/Pagination";
import { useNavigate } from "react-router-dom";
import { FiTrash2, FiPlus } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const INTERNSHIPS_PER_PAGE = 8;

export default function InternshipsList({ search = "" }) {
  const [internships, setInternships] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
    const [isAdmin, setIsAdmin] = useState(false);
    const [currentUser, setCurrentUser] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchInternships() {
      try {
        const res = await axios.get("http://localhost:3001/api/v1/hiring/type/internship", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        // Just in case, ensure filtering type === "internship"
        const internshipData = (res.data?.data || []).filter(
          (item) => item.type === "internship"
        );
        setInternships(internshipData);
      } catch (err) {
        if (err.response?.status === 401) {
          toast.error("Session expired. Please login again.");
          localStorage.removeItem("token");
          window.location.href = "/login";
        } else {
          toast.error("Failed to fetch internships. Try again later.");
          console.error("Error fetching internships:", err);
        }
      }
    }

    fetchInternships();
  }, []);

  useEffect(() => {
    const lower = search.toLowerCase();
    const filteredData = internships.filter((job) =>
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
        .includes(lower)
    );
    setFiltered(filteredData);
    setCurrentPage(1);
  }, [search, internships]);

  useEffect(() => {
        const getUserData = () => {
          try {
            const userData = JSON.parse(localStorage.getItem("user"));
            setCurrentUser(userData);
            console.log("userData: " + userData);
            setIsAdmin(userData?.role === "superadmin" || userData?.role === "admin");
          } catch (error) {
            console.error("Error parsing user data:", error);
          }
        };
    
        getUserData();
      }, []);

  const handleDelete = async (id) => {
        try {
          await axios.delete(`http://localhost:3001/api/v1/hiring/internship/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          setInternships((prev) => prev.filter((job) => job._id !== id));
          toast.success("Internship deleted");
        } catch (error) {
          console.error("Error deleting internship:", error);
          toast.error("Failed to delete internship");
        }
      };

  const totalPages = Math.ceil(filtered.length / INTERNSHIPS_PER_PAGE);
  const startIndex = (currentPage - 1) * INTERNSHIPS_PER_PAGE;
  const visibleInternships = filtered.slice(startIndex, startIndex + INTERNSHIPS_PER_PAGE);

  const handleViewInternship = (job) => {
    navigate("/description", { state: { job } });
  };

  return (
    <div className="w-full">
      <div className="overflow-x-auto rounded shadow-sm border border-gray-200 bg-white w-full">
        <div className="divide-y divide-gray-200">
          {visibleInternships.length > 0 ? (
            visibleInternships.map((job, idx) => {
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
                    onClick={() => handleViewInternship(job)}
                  >
                    View <HiOutlineArrowRight className="inline-block ml-1 -mr-1" size={16} />
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
            <div className="py-10 px-3 text-center text-gray-400">No internships found.</div>
          )}
        </div>
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex justify-center">
          <Pagination current={currentPage} total={totalPages} onPageChange={setCurrentPage} />
        </div>
      )}
    </div>
  );
}
