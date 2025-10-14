import {Typography} from "@mui/material";

export const ErrorPage = ({message}) => {
    return (
        <Typography variant="body2" component="div">{message}</Typography>
    )
}