import React, { useState } from "react";
import Layout from "../../components/layouts/StudentLayout";
import JobsList from "../../components/common/JobsList";

import { FaGraduationCap } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

export default function JobsDescription() {
  const [search, setSearch] = useState("");

  const handleViewJob = (job) => {
    alert(`Viewing job at ${job.company}: ${job.role}`);
  };

  return (
    <Layout active="Jobs">
      <div className="flex justify-end mb-5">
        <input
          type="text"
          placeholder="Search jobs..."
          className="border rounded-full px-4 py-2 w-full sm:w-64"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      yoikhkbjk

      <div className="">
      <div className="flex-1 p-10 space-y-6 overflow-auto">

        <div>
          <h2 className="text-xl font-semibold">Microsoft
            Data Analyst - Remote • Full Time • 27th May
          </h2>
        </div>

        <div className="p-6 rounded-md">
          <p><span>Duration:</span> 6 Months</p>
          <p><span>Location:</span> remote</p>
          <p>
            <span>eligibility:</span> Sttrong economics, or related fields
          </p>
          <p><span>experience:</span> fresher</p>
          <p><span>stipend:</span> ₹1200</p>

          <div>
            <h3 className="text-lg font-semibold mt-4 mb-2">Job desc</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>data handling: sources.</li>
              <li>analysis: perform data.</li>
              <li>visualization: support.</li>
              <li>reporting: utilize ms.</li>
              <li>query execution: write.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mt-4 mb-2">qualifications</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>education: fields</li>
              <li>skills: proficiency in sql</li>
              <li>soft skills: strong</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
      
    </Layout>
  );
}
