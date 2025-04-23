import { Navigate } from 'react-router-dom';
import useStore from '../../zustand/store';

const ProtectedRoute = ({ children, requiredRole }) => {
    const user = useStore((state) => state.user);

    // If user is NOT logged in, redirect to login
    if (!user?.id) {
        return <Navigate to="/login" replace />;
    }

    // If a role is required redirect to home
    if (requiredRole && user.role !== requiredRole) {
        return <Navigate to="/" replace />;
    }

    // If logged in and role matches (or no role required), allow access
    return children;
};

export default ProtectedRoute;
