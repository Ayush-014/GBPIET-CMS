import React, { useEffect, useState } from "react";
import StudentLayout from "../../components/layouts/StudentLayout";
import { HiOutlineAcademicCap, HiPencilAlt } from "react-icons/hi";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../../components/common/Loader"; // 👈 Import your loader

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
    resume: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // 👈 loader state

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      fetchUserFromBackend(storedUser._id);
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchUserFromBackend = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:3001/api/v1/students/profile/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(res.data.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch profile");
    } finally {
      setIsLoading(false); // 👈 stop loader
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
  }
  ;

  if (isLoading) return <div className="flex justify-center mt-20"><Loader /></div>; // 👈 Loader while fetching

  return (
    <StudentLayout>
      <div className="max-w-5xl mx-auto p-6 sm:p-10 -mt-12">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-10 font-sB tracking-tight">
          My Profile
        </h2>

        <div className="bg-white rounded-3xl shadow-xl px-8 py-10 space-y-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-[#235782] flex items-center justify-center">
              <HiOutlineAcademicCap className="text-white text-3xl" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{user.name || "Student Name"}</h3>
              <p className="text-gray-500 text-sm">{user.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm md:text-base">
            <ProfileField label="Department" value={user.department} />
            <ProfileField label="Institute ID" value={user.instituteId} />
            <ProfileField label="Batch" value={user.batch} />
            <ProfileField
              label="CGPA"
              name="cgpa"
              value={user.cgpa}
              editable={editMode}
              onChange={handleChange}
            />
            <ProfileField
              label="Achievements"
              name="achievements"
              value={user.achievements}
              editable={editMode}
              onChange={handleChange}
            />
            <ProfileField
              label="Skills"
              name="skills"
              value={user.skills}
              editable={editMode}
              onChange={handleChange}
            />

            <div className="col-span-full">
              <span className="text-gray-500 font-medium mb-1 block">Resume</span>
              {editMode ? (
                <div className="space-y-2">
                  <input
                    id="resume-upload"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="block text-sm text-gray-500 file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#235782] file:text-white hover:file:bg-[#1e4b6d]"
                  />
                  {file && <span className="text-green-600 text-sm">Selected: {file.name}</span>}
                </div>
              ) : user.resume ? (
                <a
                  href={`http://localhost:3001${user.resume}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline text-sm"
                >
                  View Resume
                </a>
              ) : (
                <span className="text-gray-800 text-sm">Not Uploaded</span>
              )}
            </div>
          </div>

          <div className="pt-6 text-center">
            {editMode ? (
              <>
                <button
                  onClick={handleSave}
                  className="bg-[#235782] text-white px-6 py-2 rounded-xl hover:bg-[#1d476a] transition mr-4"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setEditMode(false);
                    setFile(null);
                  }}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-xl hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="bg-[#235782] text-white px-6 py-2 rounded-xl hover:bg-[#1d476a] transition flex items-center gap-2 justify-center"
                >
                  <HiPencilAlt size={18} />
                  Edit Profile
              </button>
              )}
          </div>
        </div>

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
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
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#235782]"
        />
      ) : (
        <span className="text-gray-800 text-sm">
          {Array.isArray(value) ? value.join(", ") : value || "Not Provided"}
        </span>
      )}
    </div>
  );
}