import React, { useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import Layout from "../../components/layouts/StudentLayout";
import { HiOutlineArrowRight } from "react-icons/hi";

export default function JobsDescription() {
  const [search, setSearch] = useState("");
  const location = useLocation();
  const job = location.state?.job;

  if (!job) {
    return (
      <Layout active="Jobs">
        <div className="p-10 text-red-500">No job data available. Please go back and try again.</div>
      </Layout>
    );
  }

  const deadlineFormattedDate = new Date(job.lastDate).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
const createdAtFormattedDate = new Date(job.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  return (
    <Layout active="Jobs">
      <div className="flex justify-end mb-5">
        <input
          type="text"
          placeholder="Search jobs..."
          className="border rounded-full px-4 py-2 w-full sm:w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex-1 p-10 space-y-6 overflow-auto">
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold">
            {job.role} - {job.location} • {createdAtFormattedDate}
          </h2>
          <Link
                    to={`${job.opportunityLink}`}
                    className="font-sL bg-[#3C89C9] hover:bg-[#235782] text-white px-4 py-1.5 rounded text-xs sm:text-sm transition duration-150 shadow"
                  >
                    Apply <HiOutlineArrowRight className="inline-block ml-1 -mr-1" size={16} />
                  </Link>
        </div>

        <div className="p-6 rounded-md">
          <p><strong>Deadline:</strong> {deadlineFormattedDate || "N/A"}</p>
          <p><strong>Location:</strong> {job.location}</p>
          <p><strong>Eligibility:</strong> {job.eligibility || "N/A"}</p>
          <p><strong>Stipend:</strong> {job.stipend || "N/A"}</p>
          <p><strong>Branch:</strong> {job.departments? job.departments.map((branch,idx) => {
              return (
                <span key={idx}>
                  {branch}
                </span>
              )
          }) : "N/A"}</p>

          <div>
            <h3 className="text-lg font-semibold mt-4 mb-2">Job Description</h3>
            <p>{job.description || "No description provided."}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mt-4 mb-2">Qualifications</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {job.qualifications
                ? job.qualifications.split('\n').map((line, index) => {
                  return (
                    <li key={index}>
                       {line}
                    </li>
                  );
                })
                : <li>N/A</li>}
            </ul>
          </div>

        </div>
      </div>
    </Layout>
  );
}
