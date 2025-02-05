import {AppBar, Avatar, Box, Button, IconButton, Toolbar, Typography, useTheme} from "@mui/material";
import {useState} from "react";
import {ProfileMenu} from "./profile-menu.jsx";
import {useAuth} from "../../contexts/cognito-auth-context.jsx";
import {Menu} from "@mui/icons-material";

export const TopBanner = ({toggleDrawer, smUp}) => {
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
        <AppBar elevation={0} position='relative' sx={{zIndex: theme.zIndex.drawer + 1}} component='nav'>
            <Toolbar sx={{height: theme.dashboard.topBanner.height, display: 'flex'}}>
                {smUp &&
                    <IconButton
                        onClick={toggleDrawer}
                    >
                        <Menu fontSize="small" sx={{color: 'white'}}/>
                    </IconButton>
                }
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