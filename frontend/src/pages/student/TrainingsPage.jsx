import React, { useState } from "react";
import Layout from "../../components/layouts/StudentLayout";
import TrainingsList from "../../components/common/TrainingsList";

export default function JobsPage() {
  const [search, setSearch] = useState("");

  const handleViewJob = (job) => {
    alert(`Viewing job at ${job.company}: ${job.role}`);
  };

  return (
    <Layout active="Jobs">
      <h1 className="text-2xl lg:text-4xl font-sR mb-4 sm:mb-6 text-center sm:text-left">Explore Opportunities</h1>
      <div className="flex justify-end mb-5">
        <input
          type="text"
          placeholder="Search jobs..."
          className="border rounded-full px-4 py-2 w-full sm:w-64"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <TrainingsList onViewJob={handleViewJob} search={search} />
    </Layout>
  );
}
