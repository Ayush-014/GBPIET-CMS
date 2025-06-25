import React, { useState, useEffect } from "react";
import axios from "axios";
import { HiUsers } from "react-icons/hi";
import { FiTrash2, FiPlus } from "react-icons/fi";

export default function AdminList() {
  const [admins, setAdmins] = useState([]);
  const [isSuperAdmin, setIsSuperAdmin] = useState(true);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/v1/admin/all", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        console.log(response.data);
        setAdmins(response?.data?.data || []);
      } catch (error) {
        console.error("Error fetching admins:", error);
        setAdmins([]);
      }
    };

    fetchAdmins();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/v1/admins/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      setAdmins((prev) => prev.filter((admin) => admin._id !== id));
    } catch (error) {
      console.error("Error deleting admin:", error);
    }
  };

  const handleAddAdmin = () => {
    const name = prompt("Enter admin name:");
    if (name) {
      const newAdmin = {
        _id: Date.now().toString(),
        name,
        email: `${name}@example.com`,
        role: "admin"
      };
      setAdmins([...admins, newAdmin]);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-3xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-sB flex items-center gap-2">
          <HiUsers className="text-[#3C89C9]" />
          Admins
        </h2>
        {isSuperAdmin && (
          <button
            onClick={handleAddAdmin}
            className="flex items-center gap-2 bg-[#3C89C9] hover:bg-[#235782] text-white text-sm font-medium px-3 py-1.5 rounded-lg transition"
          >
            Add <FiPlus />
          </button>
        )}
      </div>

      {admins && admins.length > 0 ? (
        <ul className="space-y-3 font-sR">
          {admins.map((admin) => (
            <li key={admin._id} className="flex items-center justify-between border-b pb-2 text-gray-700">
              <span>{admin.name || admin.email}</span>
              {isSuperAdmin && (
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
    </div>
  );
}
