import React, { useState, useEffect, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UploadForm({ type }) {
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    location: "",
    deadline: "",
    eligibility: "",
    batch: [],
    branch: "",
    description: "",
    qualifications: "",
  });

  const [showBatchDropdown, setShowBatchDropdown] = useState(false);
  const batchOptions = ["2022-2026", "2023-2027", "2024-2028"];
  const batchRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (batchRef.current && !batchRef.current.contains(event.target)) {
        setShowBatchDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = Object.entries(formData);
    for (let [field, value] of requiredFields) {
      if (Array.isArray(value) && value.length === 0) {
        toast.error(`Please select at least one ${field}`, { position: "top-right" });
        return;
      } else if (typeof value === "string" && !value.trim()) {
        toast.error(`Please fill in the ${field} field.`, { position: "top-right" });
        return;
      }
    }

    const payload = {
      companyName: formData.company,
      role: formData.role,
      location: formData.location,
      lastDate: formData.deadline,
      eligibility: formData.eligibility,
      batch: formData.batch,
      description: formData.description,
      qualifications: formData.qualifications,
      departments: [formData.branch],
      type,
    };

    console.log("Payload being sent:", payload);

    try {
      const res = await fetch("http://localhost:3001/api/v1/hiring/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      console.log("Server response:", result);

      if (res.ok) {
        toast.success("Opportunity posted successfully!", { position: "top-right" });
        setFormData({
          company: "",
          role: "",
          location: "",
          deadline: "",
          eligibility: "",
          batch: [],
          branch: "",
          description: "",
          qualifications: "",
        });
      } else {
        toast.error(result.message || "Something went wrong", { position: "top-right" });
      }
    } catch (err) {
      toast.error("Server error. Please try again later.", { position: "top-right" });
      console.error("Submission error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full px-4 md:px-10">
      <ToastContainer />
      <div className="font-sL grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label>Company Name</label>
          <input
            name="company"
            value={formData.company}
            onChange={handleChange}
            type="text"
            className="w-full border border-[#9A9A9A] rounded-xl p-2 mt-1"
          />
        </div>

        <div>
          <label>Role</label>
          <input
            name="role"
            value={formData.role}
            onChange={handleChange}
            type="text"
            className="w-full border border-[#9A9A9A] rounded-xl p-2 mt-1"
          />
        </div>

        <div className="flex gap-6 w-full">
          <div className="w-1/2">
            <label>Location</label>
          <select
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border border-[#9A9A9A] rounded-xl p-2 mt-1"
          >
            <option value="">Select Location</option>
            <option value="On-site">On-Site</option>
            <option value="Remote">Remote</option>
          </select>
          </div>
          <div className="w-1/2">
            <label>Deadline</label>
            <input
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              type="date"
              className="w-full border border-[#9A9A9A] rounded-xl p-2 mt-1"
            />
          </div>
        </div>

        <div>
          <label>Eligibility</label>
          <input
            name="eligibility"
            value={formData.eligibility}
            onChange={handleChange}
            type="text"
            className="w-full border border-[#9A9A9A] rounded-xl p-2 mt-1"
          />
        </div>

        {/* Batch Dropdown with Checkboxes */}
        <div className="w-full relative" ref={batchRef}>
          <label>For Batch</label>
          <div
            className="border border-[#9A9A9A] rounded-xl mt-1 p-2 cursor-pointer"
            onClick={() => setShowBatchDropdown((prev) => !prev)}
          >
            {formData.batch.length > 0 ? formData.batch.join(", ") : "Select Batches"}
          </div>
          {showBatchDropdown && (
            <div className="absolute z-10 mt-1 bg-white border border-gray-300 rounded-md shadow-md max-h-40 overflow-y-auto w-full">
              {batchOptions.map((batch) => (
                <label key={batch} className="flex items-center p-2 hover:bg-gray-100">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={formData.batch.includes(batch)}
                    onChange={(e) => {
                      const updatedBatch = e.target.checked
                        ? [...formData.batch, batch]
                        : formData.batch.filter((b) => b !== batch);
                      setFormData((prev) => ({ ...prev, batch: updatedBatch }));
                    }}
                  />
                  {batch}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Department Dropdown */}
        <div className="w-full">
          <label>For Branch</label>
          <select
            name="branch"
            value={formData.branch}
            onChange={handleChange}
            className="w-full border border-[#9A9A9A] rounded-xl p-2 mt-1"
          >
            <option value="">Select Department</option>
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
            <option value="ME">ME</option>
            <option value="CE">CE</option>
            <option value="CSE (AIML)">CSE (AIML)</option>
            <option value="EE">EE</option>
            <option value="BT">BT</option>
          </select>
        </div>

        {/* Description */}
        <div className="md:col-span-1">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            className="w-full border border-[#9A9A9A] rounded-xl p-2 mt-1"
          />
        </div>

        {/* Qualifications */}
        <div className="md:col-span-1">
          <label>Qualifications</label>
          <textarea
            name="qualifications"
            value={formData.qualifications}
            onChange={handleChange}
            rows={5}
            className="w-full border border-[#9A9A9A] rounded-xl p-2 mt-1"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end mt-8 font-sR">
        <button
          type="submit"
          className="bg-gradient-to-b from-[#3C89C9] to-[#235782] text-white px-6 py-2 rounded-full shadow hover:opacity-90"
        >
          Post →
        </button>
      </div>
    </form>
  );
}
