import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

function RequiredRoute({ children }) {
    const user = useSelector((state) => state?.auth?.user);
    const location = useLocation();

    if (!user) {
        // Pass only the pathname to the state
        return <Navigate to="/login" state={{ from: location.pathname }} replace />;
    }

    return children;
}

export default RequiredRoute;
