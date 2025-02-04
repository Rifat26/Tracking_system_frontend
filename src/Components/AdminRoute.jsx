import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { logout } from '../app/fetchers/auth/authSlice';

function AdminRoute({ children }) {
    const user = useSelector((state) => state?.auth?.user);
    const location = useLocation();
    const dispatch = useDispatch();

    if (!user || user.role !== "admin") {

        dispatch(logout());


        return <Navigate to="/login" state={{ from: location }} replace />;
    }


    return children;
}

export default AdminRoute;
