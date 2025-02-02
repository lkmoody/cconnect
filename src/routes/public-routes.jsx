import {Outlet} from "react-router-dom";
import {Dashboard} from "../components/dashboard/dashboard.jsx";
import {useCurrentUser} from "../contexts/user-context.jsx";

export const PublicRoutes = () => {
    const { getUserViews } = useCurrentUser()
    const navLinks = getUserViews()
    return (
        <Dashboard
            navLinks={navLinks}
        >
            <Outlet/>
        </Dashboard>
    )
}