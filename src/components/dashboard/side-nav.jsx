import {Box, Drawer, Link, MenuItem, MenuList, Typography, useMediaQuery, useTheme} from "@mui/material"
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";

export const SideNav = ({navLinks, open, toggleOpen, smUp}) => {
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
            variant={smUp ? 'temporary': 'permanent'}
            anchor={'left'}
            open={smUp ? open : true}
            onClose={toggleOpen}
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