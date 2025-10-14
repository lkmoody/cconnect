import {Box, CircularProgress, Container, useMediaQuery, useTheme} from "@mui/material";
import {TopBanner} from "./top-banner.jsx";
import {SideNav} from "./side-nav.jsx";
import {useState} from "react";
import {useView} from "../../contexts/user-view-context.jsx";
import {Outlet} from "react-router-dom";
import {LargeSpinner} from "../common/large-spinner.jsx";
import {useCurrentUser} from "../../contexts/current-user-context.jsx";

export const Dashboard = ({navLinks, children}) => {
    const theme = useTheme()
    const smUp = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    const { currentUser } = useCurrentUser()
    const userViews = useView()

    const [sideNavOpen, setSideNavOpen] = useState(false)

    const handleToggleDrawer = () => {
        setSideNavOpen(!sideNavOpen)
    }

    if (!userViews === null) {
        return <LargeSpinner />
    }

    return (
        <>
            <TopBanner toggleDrawer={handleToggleDrawer} smUp={smUp}/>
            <SideNav open={sideNavOpen} navLinks={userViews?.navLinks} smUp={smUp} />
            <Box
                sx={{
                    position: 'absolute',
                    top: theme.dashboard.topBanner.height,
                    left: smUp ? 0 : theme.dashboard.sideNav.width
                }}
            >
                <Container>
                    <Outlet/>
                </Container>
            </Box>
        </>
    )
}