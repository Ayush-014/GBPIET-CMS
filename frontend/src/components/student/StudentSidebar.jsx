import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from "react-toastify";
import {
  HiOutlineTemplate,
  HiOutlineBriefcase,
  HiOutlineClipboardList,
  HiOutlineIdentification,
  HiOutlineAcademicCap,
  HiOutlineLogout,
  HiOutlineUser,
  HiMenu
} from "react-icons/hi";

export default function StudentSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    toast.success("Logged out successfully!");
  };

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?._id;

  const navItems = [
    { label: "Dashboard", icon: <HiOutlineTemplate size={22} />, to: "/dashboard" },
    { label: "Jobs", icon: <HiOutlineBriefcase size={22} />, to: "/jobs" },
    { label: "Internships", icon: <HiOutlineClipboardList size={22} />, to: "/internships" },
    { label: "Trainings", icon: <HiOutlineIdentification size={22} />, to: "/trainings" },
    { label: "Profile", icon: <HiOutlineUser size={22} />, to: `/profile/${userId}` },
  ];

  return (
    <>
      {/* Mobile Header with Hamburger */}
      <div className="md:hidden p-4 flex justify-between items-center bg-[#235782] text-white">
        <div className="text-xl font-bold">T&P Portal</div>
        <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
          <HiMenu size={28} />
        </button>
      </div>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gradient-to-b from-[#3C89C9] to-[#235782] text-white p-6 space-y-6 min-h-screen z-50 shadow-md rounded-b-xl">
          {/* Logo */}
          <div className="flex flex-col items-center mb-6">
            <div className="bg-[#498BC6] w-20 h-20 rounded-full p-4 flex justify-center items-center">
              <HiOutlineAcademicCap size={42} />
            </div>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-col gap-3 text-center font-sM">
            {navItems.map(({ label, icon, to }) => {
              const isActive = location.pathname === to;
              return (
                <Link
                  key={label}
                  to={to}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                    isActive
                      ? 'bg-white text-[#235782] font-bold'
                      : 'text-gray-200 hover:bg-[#498BC6] hover:text-white'
                  }`}
                  onClick={() => setMobileMenuOpen(false)} // close on click
                >
                  {icon}
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Logout Button */}
          <button
            onClick={() => {
              handleLogout();
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-3 px-4 py-2 rounded-lg bg-[#498BC6] hover:bg-[#5f8db4] transition font-sB w-full"
          >
            <HiOutlineLogout size={22} />
            Logout
          </button>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 h-screen bg-gradient-to-b from-[#3C89C9] to-[#235782] text-white flex-col justify-between py-8 px-4 rounded-2xl my-10 ml-10">
        <div>
          <div className="flex flex-col items-center mb-10">
            <div className="bg-[#498BC6] w-24 h-24 rounded-full p-4 mb-2 flex justify-center items-center">
              <HiOutlineAcademicCap size={48} />
            </div>
          </div>

          <nav className="flex flex-col gap-2 text-center font-sM">
            {navItems.map(({ label, icon, to }) => {
              const isActive = location.pathname === to;
              return (
                <Link
                  key={label}
                  to={to}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    isActive
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

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#5f8db4] transition font-sB"
        >
          <HiOutlineLogout size={22} />
          Logout
        </button>
      </aside>
    </>
  );
}
