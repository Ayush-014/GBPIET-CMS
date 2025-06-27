import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  HiOutlineUser,
  HiOutlineMenu,
  HiOutlineX,
  HiOutlineTemplate,
  HiOutlineLogout,
  HiOutlineBriefcase,
  HiOutlineAcademicCap,
  HiOutlineClipboardList,
  HiOutlineIdentification
} from "react-icons/hi";
import { Link } from "react-router-dom";

export default function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?._id;

  const navItems = [
    {
      label: "Dashboard",
      icon: <HiOutlineTemplate size={22} />,
      to: "/dashboard"
    },
    {
      label: "Jobs",
      icon: <HiOutlineBriefcase size={22} />,
      to: "/jobs"
    },
    {
      label: "Internships",
      icon: <HiOutlineClipboardList size={22} />,
      to: "/internships"
    },
    {
      label: "Trainings",
      icon: <HiOutlineIdentification size={22} />,
      to: "/trainings"
    },
    {
      label: "Profile",
      icon: <HiOutlineUser size={22} />, 
      to: `/profile/${userId}`
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    setSidebarOpen(false);
  };

  return (
    <>
      <header className="flex items-center justify-between gap-10 sm:gap-0 m-6 sm:m-8">
        {/* Hamburger Menu - Mobile Only */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="sm:hidden text-gray-700"
          aria-label="Open menu"
        >
          <HiOutlineMenu size={26} />
        </button>

        {/* Profile (Optional) */}
        {/* <div className="flex items-center justify-end gap-2 hover:text-blue-600 transition cursor-pointer"
          onClick={() => navigate(`/profile/${user._id}`)} >
          <HiOutlineUserCircle size={28} className="text-gray-700" />
          <span className="font-sM text-gray-700 text-sm sm:text-base hidden sm:flex">{user.name}</span>
        </div> */}
      </header>

      {/* Sidebar - Mobile Only */}
      <div className={`fixed inset-0 z-40 sm:hidden transition-opacity duration-300 ${sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black opacity-40"
          onClick={() => setSidebarOpen(false)}
        ></div>

        {/* Sidebar Panel */}
        <div className={`absolute top-0 left-0 h-full w-64 p-6 shadow-lg transform transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          bg-gradient-to-b from-[#3C89C9] to-[#235782] text-white`}>

          {/* Close Button */}
          <button
            className="self-end mb-4 text-white"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
          >
            <HiOutlineX size={24} />
          </button>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-2 text-center font-sM">
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
                  onClick={() => setSidebarOpen(false)}
                >
                  {icon}
                  {label}
                </Link>
              );
            })}

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="mt-6 flex items-center gap-3 px-4 py-3 rounded-lg bg-[#498BC6] hover:bg-[#5f8db4] transition font-sB text-white"
            >
              <HiOutlineLogout size={22} />
              Logout
            </button>
          </nav>
        </div>
      </div>
    </>
  );
}
