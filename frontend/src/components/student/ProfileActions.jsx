import React from 'react';
import { HiOutlineUpload, HiOutlinePlus } from "react-icons/hi";

export default function ProfileActions() {
  return (
    <div className="bg-white rounded-xl shadow p-3 sm:p-4 flex flex-col gap-2 sm:gap-3 font-sM w-full">
      <button className="flex items-center justify-between w-full py-2 px-2 sm:px-3 rounded hover:bg-gray-100 transition text-sm sm:text-base">
        Upload Resume <HiOutlineUpload size={20} />
      </button>
      <button className="flex items-center justify-between w-full py-2 px-2 sm:px-3 rounded hover:bg-gray-100 transition text-sm sm:text-base">
        Add CGPA <HiOutlinePlus size={20} />
      </button>
      <button className="flex items-center justify-between w-full py-2 px-2 sm:px-3 rounded hover:bg-gray-100 transition text-sm sm:text-base">
        Add Skills <HiOutlinePlus size={20} />
      </button>
      <button className="flex items-center justify-between w-full py-2 px-2 sm:px-3 rounded hover:bg-gray-100 transition text-sm sm:text-base">
        Add Achievements <HiOutlinePlus size={20} />
      </button>
    </div>
  );
}
