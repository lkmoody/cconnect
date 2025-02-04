import {Outlet} from "react-router-dom";
import {PublicDashboard} from "../components/dashboard/public-dashboard.jsx";

export const PublicRoutes = () => {
    return (
        <PublicDashboard
            navLinks={[]}
        >
            <Outlet/>
        </PublicDashboard>
    )
}