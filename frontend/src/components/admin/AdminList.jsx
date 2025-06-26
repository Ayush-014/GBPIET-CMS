import React, { useState, useEffect } from "react";
import axios from "axios";
import { HiUsers } from "react-icons/hi";
import { FiTrash2, FiPlus } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminList() {
  const [admins, setAdmins] = useState([]);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
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

    fetchAdmins();
  }, [admins]);

  useEffect(() => {
    const getUserData = () => {
      try {
        const userData = JSON.parse(localStorage.getItem("user"));
        setCurrentUser(userData);
        console.log("userData: " + userData);
        setIsSuperAdmin(userData?.role === "superadmin");
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    };

    getUserData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/v1/admin/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setAdmins((prev) => prev.filter((admin) => admin._id !== id));
      toast.success("Admin deleted");
    } catch (error) {
      console.error("Error deleting admin:", error);
      toast.error("Failed to delete admin");
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
      toast.error("Password must include uppercase, lowercase, number, and special character (8+ chars).");
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
        setAdmins([...admins, response.data.data]);
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

      {admins && admins.length > 0 ? (
        <ul className="space-y-3 text-sm">
          {admins.map((admin) => (
            <li key={admin._id} className="flex items-center justify-between border-b pb-2 text-gray-700">
              <div>
                <span>{admin.name}</span>
                {admin._id === currentUser?.id && (
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded ml-2">You</span>
                )}
              </div>
              {isSuperAdmin && admin._id !== currentUser?.id && (
                <button
                  onClick={() => handleDelete(admin._id)}
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 backdrop-blur-xl  bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
            <h3 className="text-lg font-semibold mb-4 text-center">Add New Admin</h3>
            <form onSubmit={handleFormSubmit} className="space-y-4 ">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Enter name"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Enter email"
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Enter temporary password"
              />
              <p className="text-xs text-gray-500">
                Must include uppercase, lowercase, number, and special character.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-1.5 text-sm bg-gray-200 hover:bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-sm bg-[#3C89C9] text-white rounded hover:bg-[#2a6c9e]"
                >
                  Add Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}