import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../contexts/cognito-auth-context.jsx";
import {useCurrentUser} from "../contexts/current-user-context.jsx";


export const ProtectedRoutes = ({roles = []}) => {
    const { isAuthenticated } = useAuth()
    const { currentUser } = useCurrentUser()

    if(!isAuthenticated){
        return <Navigate to="/login" />
    }

    if(roles.length > 0 && !roles.some(role => currentUser.roles.includes(role))) {
        return <Navigate to="/" />
    }

    return (
        <Outlet/>
    )
}