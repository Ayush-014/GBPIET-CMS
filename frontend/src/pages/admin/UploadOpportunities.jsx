import React, { useState, useRef, useEffect } from "react";
import AdminLayout from "../../components/layouts/AdminLayout";
import UploadForm from "../../components/admin/UploadForm";
import { HiChevronDown } from "react-icons/hi";

export default function UploadOpportunities() {
  const [selectedType, setSelectedType] = useState("training"); // default type
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const types = ["job", "internship", "training"];

  return (
    <AdminLayout active="Post Internships">
      <div className="flex items-center justify-between flex-wrap px-4 mb-8">
        <h2 className="text-lg md:text-2xl font-sB">Post an Opportunity</h2>

        <div className="relative" ref={dropdownRef}>
          <button
            className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-full shadow-sm hover:shadow-md text-sm font-medium cursor-pointer font-sM"
            onClick={() => setOpen(!open)}
          >
            {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}
            <HiChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-md z-10">
              {types.map((type) => (
                <button
                  key={type}
                  className={`block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${
                    selectedType === type ? "bg-gray-100" : ""
                  }`}
                  onClick={() => {
                    setSelectedType(type);
                    setOpen(false);
                    console.log("Selected opportunity type:", type);
                  }}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Pass selected type to the form */}
      <UploadForm type={selectedType} />
    </AdminLayout>
  );
}
