import React from "react";
import "../index.css";
import StudentDashboard from "../pages/student/StudentDashboard";
import JobsPage from "../pages/student/JobsPage";
import JobDescription from "../pages/student/JobDescription";
import InternshipsPage from "../pages/student/InternshipsPage";
import TrainingsPage from "../pages/student/TrainingsPage";
import StudentProfile from "../pages/student/StudentProfile";
import ResetPassword from "../components/student/ResetPassword";
import ProtectedRoute from "../pages/auth/ProtectedRoute";  // <== Import

const studentRoutes = [
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <StudentDashboard />
      </ProtectedRoute>
    )
  },
  {
    path: "/jobs",
    element: (
        <JobsPage />
    )
  },
  {
    path: "/description",
    element: (  
      <JobDescription />
    )
  },
  {
    path: "/internships",
    element: (
      <ProtectedRoute>
        <InternshipsPage />
      </ProtectedRoute>
    )
  },
  {
    path: "/trainings",
    element: (
      <ProtectedRoute>
        <TrainingsPage />
      </ProtectedRoute>
    )
  },
  {
    path: "/profile/:id",
    element: (
      <ProtectedRoute>
        <StudentProfile />
      </ProtectedRoute>
    )
  },
  {
    path: "/reset-password/:token",
    element: <ResetPassword />
  }
];

export default studentRoutes;
