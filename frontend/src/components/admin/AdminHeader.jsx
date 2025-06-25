import React, { useState } from 'react';
import { HiOutlineUserCircle, HiOutlineMenu, HiOutlineX,
  HiOutlineLogout,
  HiOutlineBriefcase,
  HiOutlineAcademicCap,
  HiOutlineClipboardList,
  HiOutlineTemplate,
  HiOutlineIdentification,
  HiOutlineUserGroup
} from "react-icons/hi";
import { Link } from "react-router-dom";

export default function AdminHeader() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    <>
      <header className="flex items-center justify-between gap-10 sm:gap-0 m-6 sm:m-8 ">
        {/* Hamburger Menu - Mobile Only */}
        <button 
          onClick={() => setSidebarOpen(true)} 
          className="sm:hidden text-gray-700"
          aria-label="Open menu"
        >
          <HiOutlineMenu size={26} />
        </button>

        <p className='font-sM'></p>

        {/* Search Bar
        <input
          type="text"
          placeholder="Search"
          className="w-full sm:w-1/3 px-4 py-2 rounded-full border border-gray-300 shadow-sm focus:outline-none text-sm sm:text-base"
        /> */}

        {/* Profile */}
        {/* <div className="flex items-center justify-end gap-2">
          <HiOutlineUserCircle size={28} className="text-gray-700" />
          <span className="font-sM text-gray-700 text-sm sm:text-base hidden sm:flex">Yashpreet Singh</span>
        </div> */}
      </header>

      {/* Sidebar - Mobile Only */}
      {/* Container with backdrop */}
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
                        >
                          {icon}
                          {label}
                        </Link>
                      );
                    })}
                  </nav>
        </div>
      </div>
    </>
  );
}
