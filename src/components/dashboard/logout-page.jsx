import {useAuth} from "../../contexts/cognito-auth-context.jsx";
import {Button} from "@mui/material";
import useLocalStorage from "use-local-storage"
import {Navigate, useLocation} from "react-router-dom";
import {useEffect} from "react";

export const LogoutPage = () => {
    const {logout} = useAuth()

    logout()
    return (<Navigate to='/' />)
}