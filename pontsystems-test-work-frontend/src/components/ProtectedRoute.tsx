import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth"; // importáld a useAuth hook-ot

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();

  const isLoggedin = isAuthenticated();

  if (!isLoggedin) {
    console.error("ProtectedRoute: user is not authenticated");
    return <Navigate to="/login" />;
  }

  return children; // Ha autentikált, rendereld a gyereket
};

export default ProtectedRoute;
