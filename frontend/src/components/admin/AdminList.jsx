import React, { useState, useEffect } from "react";
import axios from "axios";
import { HiUsers } from "react-icons/hi";
import { FiTrash2, FiPlus, FiEye, FiEyeOff } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminList() {
  const [admins, setAdmins] = useState([]);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const fetchAdmins = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/v1/admin/all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setAdmins(response?.data?.data || []);
    } catch (error) {
      console.error("Error fetching admins:", error);
      setAdmins([]);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  useEffect(() => {
    const getUserData = () => {
      try {
        const userData = JSON.parse(localStorage.getItem("user"));
        setCurrentUser(userData);
        setIsSuperAdmin(userData?.role === "superadmin");
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    };

    getUserData();
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/api/v1/admin/${confirmDeleteId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setAdmins((prev) => prev.filter((admin) => admin._id !== confirmDeleteId));
      toast.success("Admin deleted");
      setConfirmDeleteId(null);
    } catch (error) {
      console.error("Error deleting admin:", error);
      toast.error("Failed to delete admin");
      setConfirmDeleteId(null);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    if (!name || !email || !password) {
      toast.error("Please fill all fields.");
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must include uppercase, lowercase, number, and special character (8+ chars)."
      );
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/admin/register",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        fetchAdmins();
        toast.success("Admin added!");
        setFormData({ name: "", email: "", password: "" });
        setShowModal(false);
      } else {
        toast.error("Failed to add admin.");
      }
    } catch (error) {
      console.error("Error adding admin:", error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-3xl relative">
      <ToastContainer />
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <HiUsers className="text-[#3C89C9]" />
          Admins
        </h2>
        {isSuperAdmin && (
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-[#3C89C9] hover:bg-[#235782] text-white text-sm font-medium px-3 py-1.5 rounded-lg transition"
          >
            Add <FiPlus />
          </button>
        )}
      </div>

      {admins.length > 0 ? (
        <ul className="space-y-3 text-sm">
          {admins.map((admin) => (
            <li
              key={admin._id}
              className="flex items-center justify-between border-b pb-2 text-gray-700"
            >
              <div>
                <span>{admin.name}</span>
                {admin._id === currentUser?.id && (
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded ml-2">
                    You
                  </span>
                )}
              </div>
              {isSuperAdmin && admin._id !== currentUser?.id && (
                <button
                  onClick={() => setConfirmDeleteId(admin._id)}
                  className="text-red-500 hover:text-red-600 transition"
                >
                  <FiTrash2 size={18} />
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-gray-400 text-sm text-center">No admins found.</div>
      )}

      {/* Add Admin Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-30 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 font-sM border border-gray-200">
            <h3 className="text-xl font-sB text-left text-gray-800 mb-6">Add New Admin</h3>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                  placeholder="Enter name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                  placeholder="Enter email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                    placeholder="Enter password"
                  />
                  <span
                    className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                  </span>
                </div>
                <p className="text-xs text-red-400 mt-1">
                  Must include uppercase, lowercase, number, and special character*
                </p>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-md transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm bg-[#3C89C9] text-white rounded-md hover:bg-[#2a6c9e] transition"
                >
                  Add Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm text-center font-sM border border-gray-200">
            <h3 className="text-lg font-sB mb-4 text-gray-800">Confirm Deletion</h3>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete this admin? This action cannot be undone.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-md transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-sm bg-red-500 text-white hover:bg-red-600 rounded-md transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
