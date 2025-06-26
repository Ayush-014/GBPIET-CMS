import React from "react";
import "../index.css"
import AdminDashboard from "../pages/admin/AdminDashboard";
import StudentsData from "../pages/admin/StudentsData";
import PostJobs from "../pages/admin/PostJobs";
import PostTrainings from "../pages/admin/PostTrainings";
import PostInternships from "../pages/admin/PostInternships";
import UploadOpportunities from "../pages/admin/UploadOpportunities";
import JobDescription from "../pages/student/JobDescription";

const adminRoutes = [
  { path: "/admin/dashboard", element: <AdminDashboard /> },
  { path: "/admin/students", element: <StudentsData /> },
  { path: "/admin/jobs", element: <PostJobs /> },
  { path: "/admin/trainings", element: <PostTrainings /> },
  { path: "/admin/internships", element: <PostInternships /> },
  { path: "/admin/post-opportunity", element: <UploadOpportunities />},
  {
      path: "/description",
      element: (  
        <JobDescription />
      )
    },
];

export default adminRoutes;