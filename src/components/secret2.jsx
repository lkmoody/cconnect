import { useAuth } from '../contexts/cognito-auth-context.jsx'
import {Button, FormControl, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

export const Secret2 = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout()
        navigate('/login')
    }

    return (
        <>
            <Typography variant="h4" color="textSecondary">Constituent Connect</Typography>
            <FormControl sx={{gap: 2, mt: 2}}>
                <Button onClick={async () => await handleLogout()} className="logoutButton"
                        type="submit">Logout 2</Button>
            </FormControl>
        </>
    );
};