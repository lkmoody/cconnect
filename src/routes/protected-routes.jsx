import {Navigate, Outlet} from "react-router-dom";
import {Dashboard} from "../components/dashboard/dashboard.jsx";
import {useAuth} from "../contexts/cognito-auth-context.jsx";


export const ProtectedRoutes = () => {
    const { isAuthenticated } = useAuth()

    if(!isAuthenticated){
        return <Navigate to="/login" />
    }

    return (
        <Dashboard navLinks={[{
            id: 'secret',
            path: '/secret',
            name: 'Secret'
        }]}>
            <Outlet/>
        </Dashboard>
    )
}