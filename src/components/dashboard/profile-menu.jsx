import {useAuth} from "../../contexts/cognito-auth-context.jsx";
import {Menu, MenuItem} from "@mui/material";

export const ProfileMenu = ({anchorEl, onClose}) => {
    const { logout } = useAuth()
    const open = Boolean(anchorEl)

    const handleNavigation = (path) => {
        window.location = path
    }

    const handleSignOut = () => {
        logout()
    }

    return (
        <Menu
            id="profile-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={onClose}>
            <MenuItem onClick={handleSignOut}>
                Sign Out
            </MenuItem>
        </Menu>
    )
}