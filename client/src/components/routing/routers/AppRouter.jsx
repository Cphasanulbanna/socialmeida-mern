import React from "react";

//PACKAGES
import { Routes, Route } from "react-router-dom";

//COMPONENT IMPORTS
import Home from "../../home/Home";
import Login from "../../auth/Login";
import Register from "../../auth/Register";
import PrivateRoute from "../routes/PrivateRoute";

function AppRouter() {
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
