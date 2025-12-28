import React from "react";
import { Navigate, Outlet } from "react-router-dom";

class ProtectedRoute extends React.Component {
    render() {
        const token = localStorage.getItem("token");

        if (!token) {
            return <Navigate to="/login" replace />;
        }

        return <Outlet />;
    }
}

export default ProtectedRoute;
