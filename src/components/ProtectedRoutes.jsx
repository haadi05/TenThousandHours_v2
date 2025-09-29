import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";

function ProtectedRoutes({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to={"/loginform"} state={{ from: location }} replace />;
  }
  return children;
}

export default ProtectedRoutes;
