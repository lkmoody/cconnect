import {useAuth} from '../contexts/cognito-auth-context.jsx'
import {useLocation, Outlet, Navigate} from "react-router-dom";

export const ProtectedRoutes = () => {
    const {isAuthenticated} = useAuth()
    const location = useLocation()

    return isAuthenticated ? <Outlet /> : <Navigate to='/login' replace state={{ redirectTo: location.pathname }} />
}