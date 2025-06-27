import React, { useState } from "react";
import Layout from "../../components/layouts/StudentLayout";
import JobsList from "../../components/common/TrainingsList"; // Reusable component

export default function TrainingsPage() {
  const [search, setSearch] = useState("");

  return (
    <Layout active="Trainings">
      <h1 className="text-2xl lg:text-4xl font-sR mb-4 sm:mb-6 text-center sm:text-left">
        Explore Trainings
      </h1>
      <div className="flex justify-end mb-5">
        <input
          type="text"
          placeholder="Search trainings..."
          className="border rounded-full px-4 py-2 w-full sm:w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <JobsList search={search} />
    </Layout>
  );
}
