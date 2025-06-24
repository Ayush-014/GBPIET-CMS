import React from "react";
import "../index.css"
import AdminDashboard from "../pages/admin/AdminDashboard";
import StudentsData from "../pages/admin/StudentsData";
import PostJobs from "../pages/admin/PostJobs";
import PostTrainings from "../pages/admin/PostTrainings";
import PostInternships from "../pages/admin/PostInternships";
import UploadJobs from '../pages/admin/UploadJobs';
import UploadInternships from '../pages/admin/UploadJobs';
import UploadTrainings from '../pages/admin/UploadJobs';


const adminRoutes = [
  { path: "/admin/dashboard", element: <AdminDashboard /> },
  { path: "/admin/students", element: <StudentsData /> },
  { path: "/admin/jobs", element: <PostJobs /> },
  { path: "/admin/trainings", element: <PostTrainings /> },
  { path: "/admin/internships", element: <PostInternships /> },
  { path: "/admin/post-job", element: <UploadJobs />},
  { path: "/admin/post-internship", element: <UploadInternships />},
  { path: "/admin/post-training", element: <UploadTrainings />},
];

export default adminRoutes;
