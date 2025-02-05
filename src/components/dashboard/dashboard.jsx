import {useCurrentUser} from '../../contexts/user-context.jsx'
import {Box, CircularProgress, Container, useMediaQuery, useTheme} from "@mui/material";
import {TopBanner} from "./top-banner.jsx";
import {SideNav} from "./side-nav.jsx";
import {useState} from "react";

export const Dashboard = ({navLinks, children}) => {
    const theme = useTheme()
    const smUp = useMediaQuery((theme) => theme.breakpoints.down('sm'))

    const [sideNavOpen, setSideNavOpen] = useState(false)

    const handleToggleDrawer = () => {
        setSideNavOpen(!sideNavOpen)
    }


    return (
        <>
            <TopBanner toggleDrawer={handleToggleDrawer} smUp={smUp} />
            <SideNav open={sideNavOpen} navLinks={navLinks} smUp={smUp} />
            <Box
                sx={{
                    position: 'absolute',
                    top: theme.dashboard.topBanner.height,
                    left: smUp ? 0 : theme.dashboard.sideNav.width
                }}
            >
                <Container>{children}</Container>
            </Box>
        </>
    )
}