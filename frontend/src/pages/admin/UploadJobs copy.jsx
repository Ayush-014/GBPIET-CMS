// src/pages/admin/PostJobs.jsx
import React from "react";
import AdminLayout from "../../components/layouts/AdminLayout";
import UploadForm from "../../components/admin/UploadForm";

export default function UploadJobs() {
  return (
    <AdminLayout active="Post Jobs">
      <h2 className="text-2xl mb-6">Post a Job</h2>
      <UploadForm type="job" />
    </AdminLayout>
  );
}
