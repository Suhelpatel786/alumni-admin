import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: any) => {
  const isLoggedIn = localStorage.getItem("login") === "true";
  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
