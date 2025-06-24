// src/pages/admin/PostInternships.jsx
import React from "react";
import AdminLayout from "../../components/layouts/AdminLayout";
import UploadForm from "../../components/admin/UploadForm";

export default function PostInternships() {
  return (
    <AdminLayout active="Post Internships">
      <h2 className="text-2xl mb-6 ml-10 font-sB">Post an Internship</h2>
      <UploadForm type="internship" />
    </AdminLayout>
  );
}
