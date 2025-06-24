import React, { useState } from "react";
import { HiOutlineUserGroup, HiOutlineBriefcase, HiUsers } from "react-icons/hi";
import StatsCard from "../../components/admin/StatsCard";
import AdminList from "../../components/admin/AdminList";
import Layout from "../../components/layouts/AdminLayout";
import ActivityLog from "../../components/admin/ActivityLog";
import LineChart from "../../components/admin/LineChart"; // <-- Import your chart

export default function AdminDashboard() {
  const [admins, setAdmins] = useState([
    "Yashpreet Singh",
    "Ayush Joshi",
    "Vivek Pundir"
  ]);

  const logs = [
    { message: "Ayush Joshi added a new job post.", time: "07:23 AM" },
    { message: "Yashpreet Singh removed an admin", time: "05:41 PM" },
    { message: "24 more students enrolled yesterday!", time: "Yesterday" }
  ];

  const currentAdmin = "Yashpreet Singh";

  const handleDelete = (adminName) => {
    setAdmins(admins.filter(name => name !== adminName));
  };

  const handleAdd = () => {
    const newAdmin = prompt("Enter the name of new admin:");
    if (newAdmin && !admins.includes(newAdmin)) {
      setAdmins([...admins, newAdmin]);
    }
  };

  return (
    <Layout active="Dashboard">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 font-sB mb-6">
        <StatsCard title="Total Students Enrolled" count={1234} icon={<HiOutlineUserGroup />} />
        <StatsCard title="Total Jobs Posted" count={56} icon={<HiOutlineBriefcase />} />
        <StatsCard title="Total Admins" count={admins.length} icon={<HiUsers />} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <AdminList
          admins={admins}
          currentAdmin={currentAdmin}
          onDelete={handleDelete}
          onAdd={handleAdd}
        />
        <ActivityLog logs={logs} />
      </div>

      {/* Line Chart Section */}
      <div className="mt-6">
        <LineChart />
      </div>
    </Layout>
  );
}
