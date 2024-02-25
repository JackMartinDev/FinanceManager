import { Navigate, Outlet } from "react-router";

import { useAuth } from "../context/AuthContext";

export function ProtectedRoute() {
    const {user} = useAuth();
    console.log(user)

    if (!user) {
        return <Navigate to="/login"/>;
    } else {
        return (
            <Outlet />
        );
    }
}
