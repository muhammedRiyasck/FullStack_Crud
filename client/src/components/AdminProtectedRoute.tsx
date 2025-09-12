import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

export const AdminProtectedRoute = ({ children }: { children: ReactNode }) => {
  const user = useSelector((store: {userReducer: {  userData: any } }) => store.userReducer.userData);

  if (!user || !user.name) {
    // User not logged in at all
    return <Navigate to="/authForm" replace />;
  }

  if (user.role !== "admin") {
    // User logged in but not an admin
    return <Navigate to="/" replace />;
  }

  // User logged in and is admin
  return children;
 
};
