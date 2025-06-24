import React, { useState } from "react";
import Layout from "../../components/layouts/AdminLayout";
import { HiUsers } from "react-icons/hi";
import { FiTrash2, FiPlus } from "react-icons/fi";

export default function AdminList() {
  const [admins, setAdmins] = useState([
    { id: 1, name: "Yashpreet Singh", isCurrent: true },
    { id: 2, name: "Ayush Joshi", isCurrent: false },
    { id: 3, name: "Vivek Pundir", isCurrent: false }
  ]);

  const handleDelete = (id) => {
    setAdmins((prev) => prev.filter((admin) => admin.id !== id));
  };

  const handleAddAdmin = () => {
    const name = prompt("Enter admin name:");
    if (name) {
      const newAdmin = {
        id: Date.now(),
        name,
        isCurrent: false
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
          <button
            onClick={handleAddAdmin}
            className="flex items-center gap-2 bg-[#3C89C9] hover:bg-[#235782] text-white text-sm font-medium px-3 py-1.5 rounded-lg transition"
          >
            Add <FiPlus />
          </button>
        </div>
        <ul className="space-y-3 font-sR">
          {admins.map((admin) => (
            <li
              key={admin.id}
              className="flex items-center justify-between border-b pb-2 text-gray-700"
            >
              <span>
                {admin.name} {admin.isCurrent && <span className="text-sm text-gray-500">(You)</span>}
              </span>
              {!admin.isCurrent && (
                <button
                  onClick={() => handleDelete(admin.id)}
                  className="text-red-500 hover:text-red-600 transition"
                >
                  <FiTrash2 size={18} />
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
  );
}
