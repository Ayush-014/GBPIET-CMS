import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Layout from "../../components/layouts/StudentLayout";
import { HiOutlineArrowRight, HiChevronLeft } from "react-icons/hi";

export default function JobsDescription() {
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
      <div className="flex-1 px-4 sm:px-6 md:px-10 py-4 space-y-6 overflow-auto text-gray-800">
        {/* Header Section */}
        <div className="flex  sm:flex-row sm:justify-between sm:items-center gap-4">
          <div
            className="flex items-center gap-2 text-[#3C89C9] cursor-pointer text-base font-medium"
            onClick={() => navigate(-1)}
          >
            <HiChevronLeft className="h-6 w-6" />
          
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-2">
            <h2 className="text-lg sm:text-xl font-sB text-gray-800">{job.companyName}</h2>
            <p className="text-lg font-sR text-gray-600">
              {job.role} - {job.location} • {createdAtFormattedDate}
            </p>
            <Link
              to={job.opportunityLink}
              target="_blank"
              className="bg-[#3C89C9] hover:bg-[#235782] text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-1 self-start sm:self-auto font-sR"
            >
              Apply <HiOutlineArrowRight size={16} />
            </Link>
          </div>
        </div>

        <hr className="border-gray-300" />

        {/* Job Info */}
        <div className="space-y-3 text-base sm:text-lg font-sR px-1 sm:px-4 lg:pl-10">
          <p><strong className="font-sB">Duration:</strong> {job.duration} Months</p>
          <p><strong className="font-sB">Location:</strong> {job.location}</p>
          <p><strong className="font-sB">Eligibility:</strong> {job.eligibility || "N/A"}</p>
          <p><strong className="font-sB">For Batch:</strong> {job.batch ? job.batch.join(", ") : "N/A"}</p>
          <p><strong className="font-sB">For Department:</strong> {job.departments ? job.departments.join(", ") : "N/A"}</p>
          <p><strong className="font-sB">Stipend:</strong> {job.stipend || "N/A"} /month</p>
          <p><strong className="font-sB">Deadline:</strong> {deadlineFormattedDate || "N/A"}</p>
        </div>

        {/* Job Description */}
        <div className="px-1 sm:px-4 lg:pl-10">
          <h3 className="font-sB text-lg mb-1">Job Description:</h3>
          <p className="text-gray-700 font-sR">{job.description || "No description provided."}</p>
        </div>

        {/* Qualifications */}
        <div className="px-1 sm:px-4 pb-10 lg:pl-10">
          <h3 className="font-sB text-lg mb-1">Qualifications:</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1 font-sR">
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
