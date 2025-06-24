import React, { useState, useEffect } from "react";
import { HiOutlineArrowRight } from "react-icons/hi";
import Pagination from "./Pagination";

const trainings = [
  { organization: "NPTEL", title: "AI for Everyone", details: "Online • 6 weeks", deadline: "10th June" },
  { organization: "IIT Bombay", title: "Cybersecurity Basics", details: "Hybrid • 1 month", deadline: "12th June" },
  { organization: "Coursera", title: "Full Stack Web Dev", details: "Online • 2 months", deadline: "15th June" },
  { organization: "IIRS ISRO", title: "Remote Sensing", details: "Online • 4 weeks", deadline: "18th June" },
  { organization: "Skill India", title: "Data Science Bootcamp", details: "On Site • 6 weeks", deadline: "20th June" },
  { organization: "TCS iON", title: "Career Edge", details: "Online • Self-paced", deadline: "22nd June" },
  { organization: "Great Learning", title: "Machine Learning", details: "Online • 3 months", deadline: "25th June" },
  { organization: "edX", title: "Cloud Computing", details: "Online • 6 weeks", deadline: "27th June" },
  { organization: "Google", title: "Digital Marketing", details: "Online • 4 weeks", deadline: "28th June" },
  { organization: "Udemy", title: "UI/UX Design", details: "Online • Self-paced", deadline: "30th June" },
];

const TRAININGS_PER_PAGE = 8;

export default function TrainingsList({ onViewTraining, search = "" }) {
  const [currentPage, setCurrentPage] = useState(1);

  const filteredTrainings = trainings.filter((training) =>
    [training.organization, training.title, training.details, training.deadline]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTrainings.length / TRAININGS_PER_PAGE);
  const startIndex = (currentPage - 1) * TRAININGS_PER_PAGE;
  const visibleTrainings = filteredTrainings.slice(startIndex, startIndex + TRAININGS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  return (
    <div className="">
      <div className="overflow-x-auto rounded shadow-sm border border-gray-200 bg-white w-full">
        <div className="divide-y divide-gray-200">
          {visibleTrainings.length > 0 ? (
            visibleTrainings.map((training, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-4 px-3 gap-2 hover:bg-gray-50"
              >
                <span className="font-sB text-sm sm:text-base w-40 text-gray-800">{training.organization}</span>

                <div className="text-gray-700 text-sm sm:text-base font-sL text-center flex-1">
                  {training.title} • {training.details} • {training.deadline}
                </div>

                <button
                  className="font-sL bg-[#3C89C9] hover:bg-[#235782] text-white px-4 py-1.5 rounded text-xs sm:text-sm transition duration-150 shadow"
                  onClick={() => onViewTraining && onViewTraining(training)}
                >
                  View <HiOutlineArrowRight className="inline-block ml-1 -mr-1" size={16} />
                </button>
              </div>
            ))
          ) : (
            <div className="py-10 px-3 text-center text-gray-400">No trainings found.</div>
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
