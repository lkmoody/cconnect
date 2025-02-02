import {useAuth} from '../contexts/cognito-auth-context.jsx'
import {useLocation, Outlet, Navigate} from "react-router-dom";
import {Dashboard} from "../components/dashboard/dashboard.jsx";
import {useCurrentUser} from "../contexts/user-context.jsx";

export const ProtectedRoutes = () => {
    const {isAuthenticated} = useAuth()
    const { getUserViews } = useCurrentUser()
    const location = useLocation()

    const navLinks = getUserViews()

    return isAuthenticated ? (
            <Dashboard navLinks={navLinks}>
                <Outlet />
            </Dashboard>
        ) :
        (
            <Navigate to='/login' replace state={{redirectTo: location.pathname}}/>
        )
}