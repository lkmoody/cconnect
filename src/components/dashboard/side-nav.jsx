import {Box, Drawer, Link, MenuItem, MenuList, Typography, useTheme} from "@mui/material"
import {useLocation} from "react-router-dom";

export const SideNav = ({navLinks}) => {
    const theme = useTheme()
    const location = useLocation()

    return (
        <Drawer
            elevation={0}
            sx={{
                '& .MuiDrawer-paper': {
                    width: theme.dashboard.sideNav.width
                }
            }}
            variant={'permanent'}
            anchor={'left'}
            open={true}
        >
            <Box
                sx={{
                    height: theme.dashboard.topBanner.height
                }}
            />
            <MenuList>
                {navLinks.map(link => (
                        <MenuItem
                            key={link.id}
                            component={Link}
                            href={link.path}
                            disableRipple
                            selected={link.path === location.pathname}
                        >
                            <Typography
                                variant="h6"
                                px={2}
                            >
                                {link.name}
                            </Typography>
                        </MenuItem>
                ))}
            </MenuList>
        </Drawer>
    )
}