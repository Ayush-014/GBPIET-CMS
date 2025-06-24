import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./pages/App";

import studentRoutes from "./routes/studentRoutes";
import adminRoutes from "./routes/adminRoutes";
import publicRoutes from "./routes/publicRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      ...publicRoutes,
      ...studentRoutes,
      ...adminRoutes,
      { path: "*", element: <div>404 - Not Found</div> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
