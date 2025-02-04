import {useCurrentUser} from '../../contexts/user-context.jsx'
import {Box, CircularProgress, Container, useTheme} from "@mui/material";
import {TopBanner} from "./top-banner.jsx";
import {SideNav} from "./side-nav.jsx";

export const Dashboard = ({navLinks, children}) => {
    const theme = useTheme()


    return (
        <>
            <TopBanner/>
            <SideNav navLinks={navLinks}/>
            <Box
                sx={{
                    position: 'absolute',
                    top: theme.dashboard.topBanner.height,
                    left: theme.dashboard.sideNav.width
                }}
            >
                <Container>{children}</Container>
            </Box>
        </>
    )
}