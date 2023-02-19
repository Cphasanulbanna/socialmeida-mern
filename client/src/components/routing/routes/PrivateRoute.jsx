import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const isAuthenticated = useSelector((state) => state.data.token);

    console.log(isAuthenticated, "********************");

    return isAuthenticated !== null ? children : <Navigate to="/" />;
};

export default PrivateRoute;
