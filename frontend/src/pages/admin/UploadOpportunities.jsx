import React, { useState, useRef, useEffect } from "react";
import AdminLayout from "../../components/layouts/AdminLayout";
import UploadForm from "../../components/admin/UploadForm";
import { HiChevronDown } from "react-icons/hi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UploadOpportunities() {
  const [selectedType, setSelectedType] = useState("select"); // default: Select Opportunity
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const types = ["select", "job", "internship", "training"];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setOpen(false);
    if (type !== "select") {
      console.log("Selected opportunity type:", type);
    }
  };

  return (
    <AdminLayout active="Post Internships">
      <ToastContainer />
      <div className="flex items-center justify-between flex-wrap px-4 mb-8 -mt-5">
        <h2 className="text-lg md:text-2xl font-sB">Post an Opportunity</h2>

        <div className="relative" ref={dropdownRef}>
          <button
            className="flex items-center gap-2 bg-gradient-to-b from-[#3C89C9] to-[#235782] text-white border border-gray-300 px-5 py-4 rounded-full shadow-sm hover:shadow-md text-sm cursor-pointer font-sM"
            onClick={() => setOpen(!open)}
          >
            {selectedType === "select" ? "Select Opportunity" : selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}
            <HiChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-md z-10">
              {types.map((type) => (
                <button
                  key={type}
                  className={`block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${
                    selectedType === type ? "bg-gray-100" : ""
                  }`}
                  onClick={() => handleTypeSelect(type)}
                >
                  {type === "select" ? "Select Opportunity" : type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedType === "select" ? (
        <div className="text-center text-red-500 font-sM mt-6">
          Please select an opportunity type from the dropdown above to proceed.
        </div>
      ) : (
        <UploadForm type={selectedType} />
      )}
    </AdminLayout>
  );
}
