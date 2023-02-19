import React from "react";

//PACKAGES
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const isAuthenticated = useSelector((state) => state.data.token);

    return isAuthenticated !== null ? children : <Navigate to="/" />;
};

export default PrivateRoute;
