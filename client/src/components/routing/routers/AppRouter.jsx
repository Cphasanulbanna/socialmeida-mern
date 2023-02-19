import React from "react";
//PACKAGES
import { Routes, Route } from "react-router-dom";
//COMPONENT IMPORTS
import Home from "../../home/Home";
import Login from "../../auth/Login";
import ProfilePage from "../../profile/ProfileBox";
import Register from "../../auth/Register";
import { useSelector } from "react-redux";

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
                element={<Home />}
            />

            <Route
                path="/register"
                element={<Register />}
            />
        </Routes>
    );
}

export default AppRouter;
