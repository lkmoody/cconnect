import {Outlet} from "react-router-dom";
import {Dashboard} from "../components/dashboard/dashboard.jsx";


export const ProtectedRoutes = () => {
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