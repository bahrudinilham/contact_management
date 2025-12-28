import React from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

export function withRouter(WrappedComponent) {
    return function WithRouterProps(props) {
        const navigate = useNavigate();
        const params = useParams();
        const location = useLocation();
        return <WrappedComponent {...props} navigate={navigate} params={params} location={location} />;
    };
}
