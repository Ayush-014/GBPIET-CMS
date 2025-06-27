import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineArrowRight } from "react-icons/hi";
import axios from "axios";
import Pagination from "../common/Pagination";
import { FiTrash2, FiPlus } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TRAININGS_PER_PAGE = 8;

export default function TrainingsList({ search = "" }) {
  const [trainings, setTrainings] = useState([]);
  const [filteredTrainings, setFilteredTrainings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTrainings() {
      try {
        const res = await axios.get("http://localhost:3001/api/v1/hiring/type/training", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setTrainings(res.data?.data || []);
      } catch (err) {
        if (err.response?.status === 401) {
          toast.error("Session expired. Please login again.");
          localStorage.removeItem("token");
          window.location.href = "/login";
        } else {
          toast.error("Failed to fetch trainings. Try again later.");
          console.error("Error fetching trainings:", err);
        }
      }
    }

    fetchTrainings();
  }, []);

  useEffect(() => {
    const lowerSearch = search.toLowerCase();
    const filtered = trainings.filter((training) =>
      [
        training.companyName,
        training.role,
        training.location,
        new Date(training.lastDate).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
      ]
        .join(" ")
        .toLowerCase()
        .includes(lowerSearch)
    );
    setFilteredTrainings(filtered);
    setCurrentPage(1);
  }, [search, trainings]);

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
      await axios.delete(`http://localhost:3001/api/v1/hiring/training/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setTrainings((prev) => prev.filter((job) => job._id !== id));
      toast.success("Training deleted");
    } catch (error) {
      console.error("Error deleting Training:", error);
      toast.error("Failed to delete Training");
    }
  };

  const totalPages = Math.ceil(filteredTrainings.length / TRAININGS_PER_PAGE);
  const startIndex = (currentPage - 1) * TRAININGS_PER_PAGE;
  const visibleTrainings = filteredTrainings.slice(startIndex, startIndex + TRAININGS_PER_PAGE);

  const handleViewTraining = (training) => {
    navigate("/description", { state: { job: training } });
    console.log("training: " + training )
  };

  return (
    <div className="w-full">
      <div className="overflow-x-auto rounded shadow-sm border border-gray-200 bg-white w-full">
        <div className="divide-y divide-gray-200">
          {visibleTrainings.length > 0 ? (
            visibleTrainings.map((training, idx) => {
              const formattedDate = new Date(training.lastDate).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              });

              return (
                <div
                  key={training._id || idx}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-4 px-3 gap-2 hover:bg-gray-50"
                >
                  <span className="font-sB text-sm sm:text-base w-40 text-gray-800">
                    {training.companyName}
                  </span>

                  <div className="text-gray-700 text-sm sm:text-base font-sL text-center flex-1">
                    {training.role} • {training.location} • {formattedDate}
                  </div>

                  <button
                    className="font-sL bg-[#3C89C9] hover:bg-[#235782] text-white px-4 py-1.5 rounded text-xs sm:text-sm transition duration-150 shadow"
                    onClick={() => handleViewTraining(training)}
                  >
                    View <HiOutlineArrowRight className="inline-block ml-1 -mr-1" size={16} />
                  </button>
                  {isAdmin && (
                    <button
                      onClick={() => handleDelete(training._id)}
                      className="text-red-500 hover:text-red-600 transition"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  )}

                </div>
              );
            })
          ) : (
            <div className="py-10 px-3 text-center text-gray-400">No trainings found.</div>
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
