import React, { useState, useEffect } from "react";
import { HiOutlineArrowRight } from "react-icons/hi";
import Pagination from "../common/Pagination"; // Make sure this exists

const jobs = [
  { company: "Microsoft", role: "Data Analyst", details: "On Site • Full Time", deadline: "27th May" },
  { company: "Google", role: "Frontend Developer", details: "On Site • 3 months", deadline: "28th May" },
  { company: "Amazon", role: "Data Analyst", details: "On Site • 6 months", deadline: "27th May" },
  { company: "Adobe", role: "Data Analyst", details: "On Site • 6 months", deadline: "27th May" },
  { company: "Infosys", role: "Data Analyst", details: "On Site • 6 months", deadline: "27th May" },
  { company: "IBM", role: "Data Analyst", details: "On Site • 6 months", deadline: "27th May" },
  { company: "TCS", role: "Data Analyst", details: "On Site • 6 months", deadline: "27th May" },
  { company: "S4BBI", role: "Data Analyst", details: "On Site • 6 months", deadline: "27th May" },
  { company: "Capgemini", role: "Backend Developer", details: "Remote • 3 months", deadline: "29th May" },
  { company: "Wipro", role: "UI/UX Designer", details: "Hybrid • 6 months", deadline: "30th May" },
];

const JOBS_PER_PAGE = 8;

export default function JobsList({ onViewJob, search = "" }) {
  const [currentPage, setCurrentPage] = useState(1);

  const filteredJobs = jobs.filter((job) =>
    [job.company, job.role, job.details, job.deadline]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE);
  const startIndex = (currentPage - 1) * JOBS_PER_PAGE;
  const visibleJobs = filteredJobs.slice(startIndex, startIndex + JOBS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  return (
    <div className="">
      <div className="overflow-x-auto rounded shadow-sm border border-gray-200 bg-white w-full">
        <div className="divide-y divide-gray-200">
          {visibleJobs.length > 0 ? (
            visibleJobs.map((job, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-4 px-3 gap-2 hover:bg-gray-50"
              >
                <span className="font-sB text-sm sm:text-base w-40 text-gray-800">{job.company}</span>

                <div className="text-gray-700 text-sm sm:text-base font-sL text-center flex-1">
                  {job.role} • {job.details} • {job.deadline}
                </div>

                <button
                  className="font-sL bg-[#3C89C9] hover:bg-[#235782] text-white px-4 py-1.5 rounded text-xs sm:text-sm transition duration-150 shadow"
                  onClick={() => onViewJob && onViewJob(job)}
                >
                  View <HiOutlineArrowRight className="inline-block ml-1 -mr-1" size={16} />
                </button>
              </div>
            ))
          ) : (
            <div className="py-10 px-3 text-center text-gray-400">No jobs found.</div>
          )}
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        <Pagination
          current={currentPage}
          total={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
