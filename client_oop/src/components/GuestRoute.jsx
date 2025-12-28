import React from "react";
import { Navigate, Outlet } from "react-router-dom";

class GuestRoute extends React.Component {
    render() {
        const token = localStorage.getItem("token");

        if (token) {
            return <Navigate to="/dashboard/contacts" replace />;
        }

        return <Outlet />;
    }
}

export default GuestRoute;
