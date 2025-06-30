import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) return <div>Loading...</div>;
  

  if (user) return children;

  return (
    <Navigate
      to="/signin"
      state={{ from: location }}
      replace={true}
    />
  );
};

export default PrivateRoute;
