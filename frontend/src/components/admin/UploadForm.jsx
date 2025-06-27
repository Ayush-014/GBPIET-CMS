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
    branch: [],
    stipend: "",
    duration: "", // NEW FIELD
    opportunityLink: "",
    description: "",
    qualifications: "",
  });

  const [showBatchDropdown, setShowBatchDropdown] = useState(false);
  const [showBranchDropdown, setShowBranchDropdown] = useState(false);

  const batchOptions = ["2022-2026", "2023-2027", "2024-2028"];
  const branchOptions = ["CSE", "ECE", "ME", "CE", "CSE (AIML)", "EE", "BT"];

  const batchRef = useRef(null);
  const branchRef = useRef(null);

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
      if (branchRef.current && !branchRef.current.contains(event.target)) {
        setShowBranchDropdown(false);
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
      stipend: formData.stipend,
      duration: formData.duration, // INCLUDED IN PAYLOAD
      opportunityLink: formData.opportunityLink,
      batch: formData.batch,
      departments: formData.branch,
      description: formData.description,
      qualifications: formData.qualifications,
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
      if (res.ok) {
        toast.success("Opportunity posted successfully!", { position: "top-right" });
        setFormData({
          company: "",
          role: "",
          location: "",
          deadline: "",
          eligibility: "",
          batch: [],
          branch: [],
          stipend: "",
          duration: "",
          opportunityLink: "",
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
        {/* Company and Role */}
        <div>
          <label>Company Name</label>
          <input name="company" value={formData.company} onChange={handleChange} type="text"
            className="w-full border border-[#9A9A9A] rounded-xl p-2 mt-1" />
        </div>

        <div>
          <label>Role</label>
          <input name="role" value={formData.role} onChange={handleChange} type="text"
            className="w-full border border-[#9A9A9A] rounded-xl p-2 mt-1" />
        </div>

        {/* Location and Deadline */}
        <div>
          <label>Location</label>
          <input name="location" value={formData.location} onChange={handleChange} type="text"
            placeholder="e.g., Remote / On-site / Hybrid"
            className="w-full border border-[#9A9A9A] rounded-xl p-2 mt-1" />
        </div>

        <div>
          <label>Deadline</label>
          <input name="deadline" value={formData.deadline} onChange={handleChange} type="date"
            className="w-full border border-[#9A9A9A] rounded-xl p-2 mt-1" />
        </div>

        {/* Eligibility */}
        <div>
          <label>Eligibility</label>
          <input name="eligibility" value={formData.eligibility} onChange={handleChange} type="text"
            className="w-full border border-[#9A9A9A] rounded-xl p-2 mt-1" />
        </div>

        {/* Stipend and Duration side-by-side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label>Stipend</label>
            <input name="stipend" value={formData.stipend} onChange={handleChange} type="text"
              placeholder="e.g., ₹10,000/month"
              className="w-full border border-[#9A9A9A] rounded-xl p-2 mt-1" />
          </div>
          <div>
            <label>Duration</label>
            <input name="duration" value={formData.duration} onChange={handleChange} type="text"
              placeholder="e.g., 6 Months"
              className="w-full border border-[#9A9A9A] rounded-xl p-2 mt-1" />
          </div>
        </div>

        {/* Opportunity Link */}
        <div className="md:col-span-2">
          <label>Opportunity Apply Link</label>
          <input name="opportunityLink" value={formData.opportunityLink} onChange={handleChange} type="url"
            placeholder="https://example.com/apply"
            className="w-full border border-[#9A9A9A] rounded-xl p-2 mt-1" />
        </div>

        {/* Batch Dropdown */}
        <div className="w-full relative" ref={batchRef}>
          <label>For Batch</label>
          <div className="border border-[#9A9A9A] rounded-xl mt-1 p-2 cursor-pointer"
            onClick={() => setShowBatchDropdown((prev) => !prev)}>
            {formData.batch.length > 0 ? formData.batch.join(", ") : "Select Batches"}
          </div>
          {showBatchDropdown && (
            <div className="absolute z-10 mt-1 bg-white border border-gray-300 rounded-md shadow-md max-h-40 overflow-y-auto w-full">
              {batchOptions.map((batch) => (
                <label key={batch} className="flex items-center p-2 hover:bg-gray-100">
                  <input type="checkbox" className="mr-2"
                    checked={formData.batch.includes(batch)}
                    onChange={(e) => {
                      const updatedBatch = e.target.checked
                        ? [...formData.batch, batch]
                        : formData.batch.filter((b) => b !== batch);
                      setFormData((prev) => ({ ...prev, batch: updatedBatch }));
                    }} />
                  {batch}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Branch Dropdown */}
        <div className="w-full relative" ref={branchRef}>
          <label>For Branch</label>
          <div className="border border-[#9A9A9A] rounded-xl mt-1 p-2 cursor-pointer"
            onClick={() => setShowBranchDropdown((prev) => !prev)}>
            {formData.branch.length > 0 ? formData.branch.join(", ") : "Select Departments"}
          </div>
          {showBranchDropdown && (
            <div className="absolute z-10 mt-1 bg-white border border-gray-300 rounded-md shadow-md max-h-40 overflow-y-auto w-full">
              {branchOptions.map((branch) => (
                <label key={branch} className="flex items-center p-2 hover:bg-gray-100">
                  <input type="checkbox" className="mr-2"
                    checked={formData.branch.includes(branch)}
                    onChange={(e) => {
                      const updatedBranch = e.target.checked
                        ? [...formData.branch, branch]
                        : formData.branch.filter((b) => b !== branch);
                      setFormData((prev) => ({ ...prev, branch: updatedBranch }));
                    }} />
                  {branch}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Description and Qualifications */}
        <div className="md:col-span-1">
          <label>Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows={5}
            className="w-full border border-[#9A9A9A] rounded-xl p-2 mt-1" />
        </div>

        <div className="md:col-span-1">
          <label>Qualifications</label>
          <textarea name="qualifications" value={formData.qualifications} onChange={handleChange} rows={5}
            className="w-full border border-[#9A9A9A] rounded-xl p-2 mt-1" />
        </div>
      </div>

      <div className="flex justify-end mt-8 font-sR">
        <button type="submit"
          className="bg-gradient-to-b from-[#3C89C9] to-[#235782] text-white px-6 py-2 rounded-full shadow hover:opacity-90">
          Post →
        </button>
      </div>
    </form>
  );
}
