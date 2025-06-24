import React from "react";
import Layout from "../../components/layouts/AdminLayout";
import StudentsTable from "../../components/admin/StudentTable.jsx";

export default function StudentsData() {
  return (
    <Layout active="Students Data">
      <h2 className="text-2xl font-sB ml-4 ">Students Data</h2>
      <StudentsTable />
    </Layout>
  );
}
