import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Layout from "../../components/layouts/StudentLayout";
import { HiOutlineArrowRight, HiArrowNarrowLeft } from "react-icons/hi";

export default function JobsDescription() {
  const [search, setSearch] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const job = location.state?.job;

  if (!job) {
    return (
      <Layout active="Jobs">
        <div className="p-10 text-red-500">No job data available.</div>
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
      <div className="flex-1 p-6 sm:p-10 space-y-6 overflow-auto text-gray-800">
        {/* Job Title & Apply */}
          {/* Back Button */}
          <div className="flex items-center text-sm font-medium text-[#3C89C9] cursor-pointer"
              onClick={() => navigate(-1)}>
            <HiArrowNarrowLeft className="mr-1" />
          </div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <h2 className="text-xl font-sB"> {job.companyName}</h2>
          <h2 className="text-xl font-sM text-gray-400">
            {job.role} - {job.location} • {createdAtFormattedDate}
          </h2>
          <Link
            to={job.opportunityLink}
            className="mt-3 sm:mt-0 bg-[#3C89C9] hover:bg-[#235782] text-white px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1"
          >
            Apply <HiOutlineArrowRight size={16} />
          </Link>
        </div>

        {/* Divider */}
        <hr className="border-t border-gray-300" />

        {/* Job Details */}
        <div className="text-sm leading-relaxed space-y-2">
          <span>Duration: 6 Months</span>
          <p><strong>Location:</strong> {job.location}</p>
          <p><strong>Eligibility:</strong> {job.eligibility || "N/A"}</p>
          <p><strong>For Batch:</strong> {job.batches ? job.batches.join(", ") : "N/A"}</p>
          <p><strong>For Department:</strong> {job.departments ? job.departments.join(", ") : "N/A"}</p>
          <p><strong>Stipend:</strong> {job.stipend || "N/A"}</p>
          <p><strong>Deadline:</strong> {deadlineFormattedDate || "N/A"}</p>
        </div>

        {/* Job Description */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Job Description</h3>
          <p className="text-sm text-gray-700">{job.description || "No description provided."}</p>
        </div>

        {/* Qualifications */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Qualifications</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
            {job.qualifications
              ? job.qualifications.split(". ").map((line, index) => (
                  <li key={index}>{line.trim()}</li>
                ))
              : <li>N/A</li>}
          </ul>
        </div>

      </div>
    </Layout>
  );
}
