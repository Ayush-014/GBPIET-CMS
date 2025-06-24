import React from "react";

export default function UploadForm() {
  return (
    <div className="w-full px-10">
      
      <div className="font-sL grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label>Company Name</label>
          <input type="text" className="w-full border-1 border-[#9A9A9A] rounded-xl p-2 mt-1" />
        </div>

        <div>
          <label>Role</label>
          <input type="text" className="w-full border-1 border-[#9A9A9A] rounded-xl p-2 mt-1" />
        </div>

        <div>
          <label>Location</label>
          <input type="text" className="w-full border-1 border-[#9A9A9A] rounded-xl p-2 mt-1" />
        </div>

        <div>
          <label>Deadline</label>
          <input type="date" className="w-full border-1 border-[#9A9A9A] rounded-xl p-2 mt-1" />
        </div>

        <div>
          <label>Eligibility</label>
          <input type="text" className="w-full border-1 border-[#9A9A9A] rounded-xl p-2 mt-1" />
        </div>

        <div>
          <label>For Batch</label>
          <input type="text" className="w-full border-1 border-[#9A9A9A] rounded-xl p-2 mt-1" />
        </div>

        <div className="md:col-span-1">
          <label>Description</label>
          <textarea rows={5} className="w-full border-1 border-[#9A9A9A] rounded-xl p-2 mt-1" />
        </div>

        <div className="md:col-span-1">
          <label>Qualifications</label>
          <textarea rows={5} className="w-full border-1 border-[#9A9A9A] rounded-xl p-2 mt-1" />
        </div>
      </div>

      <div className="flex justify-end mt-8 font-sR">
        <button className="bg-gradient-to-b from-[#3C89C9] to-[#235782] text-white px-6 py-2 rounded-full shadow hover:opacity-90">
          Post →
        </button>
      </div>
    </div>
  );
}
