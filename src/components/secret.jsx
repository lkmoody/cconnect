import { useAuth } from '../contexts/cognito-auth-context.jsx'
import {Button, FormControl, Typography} from "@mui/material";

export const Secret = () => {
    const auth = useAuth();

    const handleLogout = async () => {
        await auth.logout()
    }

    return (
        <>
            <Typography variant="h4" color="textSecondary">Constituent Connect</Typography>
            <FormControl sx={{gap: 2, mt: 2}}>
                <Button onClick={async () => await handleLogout()} className="logoutButton"
                        type="submit">Logout</Button>
            </FormControl>
        </>
    );
};