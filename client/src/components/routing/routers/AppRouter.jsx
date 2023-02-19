import React from "react";
//PACKAGES
import { Routes, Route } from "react-router-dom";
//COMPONENT IMPORTS
import Home from "../../home/Home";
import Login from "../../auth/Login";
import ProfilePage from "../../profile/ProfileBox";
import Register from "../../auth/Register";
import { useSelector } from "react-redux";
import PrivateRoute from "../routes/PrivateRoute";

function AppRouter() {
    const accessToken = useSelector((state) => state.data.token);
    return (
        <Routes>
            <Route
                path="/"
                element={<Login />}
            />
            <Route
                path="/home"
                element={
                    <PrivateRoute>
                        <Home />
                    </PrivateRoute>
                }
            />

            <Route
                path="/register"
                element={<Register />}
            />
        </Routes>
    );
}

export default AppRouter;
