import React from "react";
import "../index.css";
import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/Login";
import AuthRedirect from "../pages/auth/AuthRedirect";

const publicRoutes = [
  {
    path: "/",
    element: (
      <AuthRedirect>
        <Signup />
      </AuthRedirect>
    )
  },
  {
    path: "/signup",
    element: (
      <AuthRedirect>
        <Signup />
      </AuthRedirect>
    )
  },
  {
    path: "/login",
    element: (
      <AuthRedirect>
        <Login />
      </AuthRedirect>
    )
  },
  {
    path: "*",
    element: <div className="text-center mt-20 text-xl font-sB">404 - Page Not Found</div>
  }
];

export default publicRoutes;
