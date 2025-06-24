import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";


import {
  HiOutlineLogout,
  HiOutlineBriefcase,
  HiOutlineAcademicCap,
  HiOutlineClipboardList,
  HiOutlineTemplate,
  HiOutlineIdentification,
  HiOutlineUserGroup
} from "react-icons/hi";

export default function AdminSidebar() {
  const location = useLocation();

   const navigate = useNavigate();
  
    const handleLogout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
      toast.success("Logged out successfully!");
    };

  const navItems = [
    {
      label: "Dashboard",
      icon: <HiOutlineTemplate size={22} />,
      to: "/admin/dashboard"
    },
    {
      label: "Students Data",
      icon: <HiOutlineUserGroup size={22} />,
      to: "/admin/students"
    },
    {
      label: "Post Jobs",
      icon: <HiOutlineBriefcase size={22} />,
      to: "/admin/jobs"
    },
    {
      label: "Post Internships",
      icon: <HiOutlineClipboardList size={22} />,
      to: "/admin/internships"
    },
    {
      label: "Post Trainings",
      icon: <HiOutlineIdentification size={22} />,
      to: "/admin/trainings"
    },
  ];

  return (
    <aside className="w-64 bg-gradient-to-b from-[#3C89C9] to-[#235782] text-white flex flex-col justify-between py-8 px-4 rounded-2xl my-5 ml-10">
      <div>
        <div className="flex flex-col items-center mb-10">
          <div className="bg-[#498BC6] w-24 h-24 rounded-full p-4 mb-2 flex justify-center items-center">
            <HiOutlineAcademicCap size={48} />
          </div>
          <h2 className="text-lg mt-2 font-sM">Admin Panel</h2>
        </div>
        <nav className="flex flex-col gap-2 font-sM">
          {navItems.map(({ label, icon, to }) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={label}
                to={to}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition 
                  ${isActive
                    ? 'bg-white text-[#235782] font-bold'
                    : 'text-gray-200 hover:bg-[#498BC6] hover:text-white'
                  }`}
              >
                {icon}
                {label}
              </Link>
            );
          })}
        </nav>
      </div>

      <button className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#5f8db4] transition font-sB"
      
        onClick={handleLogout}>
        <HiOutlineLogout size={22} />
        Logout
      </button>
    </aside>
  );
}
