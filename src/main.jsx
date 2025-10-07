import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginForm, Home, Dashboard, ProtectedRoutes } from "./importStore.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: (
          <ProtectedRoutes>
            <Home />
          </ProtectedRoutes>
        ),
      },
      {
        path: ":id",
        element: (
          <ProtectedRoutes>
            <Dashboard />
          </ProtectedRoutes>
        ),
      },
    ],
  },
  { path: "loginform", element: <LoginForm /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
