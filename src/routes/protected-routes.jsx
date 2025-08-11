import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../contexts/cognito-auth-context.jsx";


export const ProtectedRoutes = () => {
    const { isAuthenticated } = useAuth()

    if(!isAuthenticated){
        return <Navigate to="/login" />
    }

    return <Outlet />
}