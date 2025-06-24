// src/pages/admin/PostTrainings.jsx
import React from "react";
import AdminLayout from "../../components/layouts/AdminLayout";
import UploadForm from "../../components/admin/UploadForm";

export default function PostTrainings() {
  return (
    <AdminLayout active="Post Internships">
      <h2 className="text-2xl mb-8 ml-4 font-sB">Post an Internship</h2>
      <UploadForm type="training" />
    </AdminLayout>
  );
}
