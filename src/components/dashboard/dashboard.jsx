import {useCurrentUser} from '../../contexts/user-context.jsx'
import {AppBar, Box, Button, CircularProgress, Drawer, Toolbar, Typography, useTheme} from "@mui/material";
import {useAuth} from '../../contexts/cognito-auth-context.jsx'
import {useState} from "react";
import {TopBanner} from "./top-banner.jsx";

export const Dashboard = ({children}) => {
    const { logout } = useAuth()
    const { currentUser } = useCurrentUser()
    const theme = useTheme()

    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const handleClose = () => {
        setAnchorEl(null)
    }

    if(!currentUser) {
        return <CircularProgress size={20} />
    } else {
        return (
            <Box>
                <TopBanner />
                <Drawer
                    sx={{
                        '& .MuiDrawer-paper': {
                            width: theme.dashboard.sideNav.width
                        }
                    }}
                    variant={'permanent'}
                    anchor={'left'}
                    open={true}
                >
                </Drawer>
                <Box mx={1} my={4} sx={{ position: 'absolute', top: theme.dashboard.topBanner.height, left: theme.dashboard.sideNav.width, width: '100%', minWidth: 358 }}>{children}</Box>
            </Box>
        )
    }
}