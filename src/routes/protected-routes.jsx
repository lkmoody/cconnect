import {Outlet} from "react-router-dom";
import {Dashboard} from "../components/dashboard/dashboard.jsx";


export const ProtectedRoutes = () => {
    return (
        <Dashboard navLinks={[]}>
            <Outlet/>
        </Dashboard>
    )
}