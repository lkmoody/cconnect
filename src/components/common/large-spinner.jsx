import {Box, CircularProgress} from "@mui/material";

export const LargeSpinner = ({navLinks, children}) => {
    return (
        <Box sx={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
        }}>
            <CircularProgress size={160} />
        </Box>
    )
}