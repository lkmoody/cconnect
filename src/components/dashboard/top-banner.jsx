import {AppBar, Avatar, Box, Button, Toolbar, Typography, useTheme} from "@mui/material";
import {useState} from "react";
import {ProfileMenu} from "./profile-menu.jsx";
import {useAuth} from "../../contexts/cognito-auth-context.jsx";

export const TopBanner = () => {
    const {isAuthenticated} = useAuth()
    const [anchorEl, setAnchorEl] = useState(null)
    const theme = useTheme()
    const handleClick = event => {
        event.preventDefault()
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <AppBar position='relative' sx={{zIndex: theme.zIndex.drawer + 1}} component='nav'>
            <Toolbar sx={{height: theme.dashboard.topBanner.height, display: 'flex', justifyContent: 'space-between'}}>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Button
                        href='/'
                        sx={{
                            color: 'white',
                            textTransform: 'none'
                        }}
                    >
                        <Typography variant='h6' sx={{flexGrow: 1, cursor: 'pointer'}}>
                            Constituent Connect
                        </Typography>
                    </Button>
                    {isAuthenticated &&
                        <Button color='inherit' onClick={handleClick}>
                            <Avatar alt='Larry Moody'/>
                        </Button>
                    }
                </Box>
            </Toolbar>
            {isAuthenticated &&
                <ProfileMenu anchorEl={anchorEl} onClose={handleClose}/>
            }
        </AppBar>
    )
}