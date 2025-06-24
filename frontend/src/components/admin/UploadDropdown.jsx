import React, { useState, useRef, useEffect } from "react";
import { HiOutlineUpload } from "react-icons/hi";
import { HiChevronDown } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

export default function UploadDropdown() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleNavigate = (type) => {
    setOpen(false);
    navigate(`/admin/post-${type}`);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center gap-2 bg-gradient-to-b from-[#3C89C9] to-[#235782] text-white px-5 py-2 rounded-full font-sM text-sm md:text-base shadow transition duration-200 hover:brightness-110 cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="flex items-center gap-2">
          Upload
          <HiOutlineUpload className="w-5 h-5" />
        </span>
        <HiChevronDown
          className={`w-4 h-4 transform transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-20 overflow-hidden animate-fadeIn font-sM ">
          {["job", "internship", "training"].map((type) => (
            <button
              key={type}
              className="w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition duration-150"
              onClick={() => handleNavigate(type)}
            >
              Post {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
