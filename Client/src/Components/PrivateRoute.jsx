import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return (
            <div className="flex justify-center items-center w-full h-screen">
                <div className="w-10 h-10 animate-spin rounded-full border-t-4 border-purple-500 border-solid"></div>
            </div>
        );
    }


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
