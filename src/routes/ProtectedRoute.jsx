import { Navigate, Outlet } from "react-router-dom"

function ProtectedRoute({ user, allowedRole }) {
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (user.role !== allowedRole) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;