import React from "react";
import { HiOutlineUpload } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export default function UploadButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/admin/post-opportunity");
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-2 bg-gradient-to-b from-[#3C89C9] to-[#235782] text-white px-5 py-2 rounded-full font-sM text-sm md:text-base shadow transition duration-200 hover:brightness-110 cursor-pointer"
    >
      <span className="flex items-center gap-2">
        Upload
        <HiOutlineUpload className="w-5 h-5" />
      </span>
    </button>
  );
}
