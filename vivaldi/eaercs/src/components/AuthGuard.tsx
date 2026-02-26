import { Navigate, Outlet } from "react-router-dom";

// This is a basic implementation of an AuthGuard
// We check local storage for a token mock implementation
// A real app would validate this token against the backend or use a Context provider
const AuthGuard = () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default AuthGuard;
