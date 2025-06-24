
import React, { useEffect, useState } from "react";
import StudentLayout from '../../components/layouts/StudentLayout';
import { HiOutlineAcademicCap } from "react-icons/hi";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ProfilePage() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    instituteId: "",
    department: "",
    batch: "",
    cgpa: "",
    skills: [],
    achievements: [],
    resume: ""
  });

  const [editMode, setEditMode] = useState(false);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      fetchUserFromBackend(storedUser._id);
    }
  }, []);

  const fetchUserFromBackend = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`http://localhost:3001/api/v1/students/profile/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(res.data.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch profile");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

const handleSave = async () => {
  try {
    const formData = new FormData();
    formData.append("cgpa", user.cgpa);

    // Split only at save time
    const achievementsArray = typeof user.achievements === "string"
      ? user.achievements.split(",").map(s => s.trim()).filter(s => s)
      : user.achievements;

    const skillsArray = typeof user.skills === "string"
      ? user.skills.split(",").map(s => s.trim()).filter(s => s)
      : user.skills;

    formData.append("achievements", JSON.stringify(achievementsArray));
    formData.append("skills", JSON.stringify(skillsArray));

    if (file) {
      formData.append("resume", file);
    }

    const token = localStorage.getItem("token");
    const res = await axios.put(
      `http://localhost:3001/api/v1/students/profile/${user._id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setUser(res.data.data);
    setEditMode(false);
    setFile(null);
    toast.success("Profile updated successfully!");
  } catch (err) {
    console.error(err);
    toast.error("Failed to update profile");
  }
};

  return (
    <StudentLayout>
      <div className="max-w-5xl mx-auto p-6 sm:p-8">
        <h2 className="text-3xl font-bold text-[#235782] text-center mb-8 font-sB">My Profile</h2>

        <div className="bg-white rounded-2xl shadow-md p-6 sm:p-10">
          <div className="flex flex-col sm:flex-row items-center justify-center sm:items-start gap-6 mb-8">
            <div className="w-32 h-32 bg-[#3C89C9] text-white rounded-full flex items-center justify-center text-5xl">
              <HiOutlineAcademicCap size={48} />
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-2xl font-semibold text-[#235782]">{user.name || "Student Name"}</h3>
              <p className="text-gray-500 text-sm">{user.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm sm:text-base font-sM">
            <ProfileField label="Department" value={user.department} editable={false} />
            <ProfileField label="Institute ID" value={user.instituteId} editable={false} />
            <ProfileField label="Batch" value={user.batch} editable={false} />
            <ProfileField label="CGPA" name="cgpa" value={user.cgpa} editable={editMode} onChange={handleChange} />
            <ProfileField label="Achievements" name="achievements" value={user.achievements} editable={editMode} onChange={handleChange} />
            <ProfileField label="Skills" name="skills" value={user.skills} editable={editMode} onChange={handleChange} />

            <div className="flex flex-col">
              <span className="text-gray-500 font-medium mb-1">Resume</span>
              {editMode ? (
                <>
                  <div className="relative inline-block w-max">
                    <button
                      type="button"
                      className="bg-[#235782] text-white px-4 py-2 rounded-lg hover:bg-[#1d476a] transition"
                      onClick={() => document.getElementById('resume-upload').click()}
                    >
                      {file ? "Change File" : "Upload Resume (PDF)"}
                    </button>
                    <input
                      id="resume-upload"
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="absolute left-0 top-0 opacity-0 w-full h-full cursor-pointer"
                    />
                  </div>
                  {file && (
                    <span className="text-green-600 mt-2 text-sm">
                      Selected: {file.name}
                    </span>
                  )}
                </>
              ) : (
                user.resume ? (
                  <a
                    href={`http://localhost:3001${user.resume}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    View Resume
                  </a>
                ) : (
                  <span className="text-gray-800">Not Uploaded</span>
                )
              )}
            </div>
          </div>

          <div className="mt-8 text-center">
            {editMode ? (
              <>
                <button onClick={handleSave} className="bg-[#235782] text-white px-6 py-2 rounded-lg hover:bg-[#1d476a] transition mr-4">
                  Save
                </button>
                <button onClick={() => { setEditMode(false); setFile(null); }} className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition">
                  Cancel
                </button>
              </>
            ) : (
              <button onClick={() => setEditMode(true)} className="bg-[#235782] text-white px-6 py-2 rounded-lg hover:bg-[#1d476a] transition">
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </StudentLayout>
  );
}

function ProfileField({ label, value, name, editable, onChange }) {
  return (
    <div className="flex flex-col">
      <span className="text-gray-500 font-medium mb-1">{label}</span>
      {editable ? (
        <input
          type="text"
          name={name}
          value={Array.isArray(value) ? value.join(", ") : value || ""}
          onChange={onChange}
          className="border border-gray-300 rounded px-2 py-1"
        />
      ) : (
        <span className="text-gray-800">
          {Array.isArray(value) ? value.join(", ") : value || "Not Provided"}
        </span>
      )}
    </div>
  );
}
