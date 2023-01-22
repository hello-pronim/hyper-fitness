import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ user, children }) =>
  !user ? <Navigate to="/sign-in" /> : children;

export default ProtectedRoute;
