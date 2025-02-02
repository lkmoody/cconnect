import {useEffect, useState} from 'react'
import {useAuth} from '../contexts/cognito-auth-context.jsx'
import {Button, FormControl, TextField, Typography} from "@mui/material";
import {useNavigate, useLocation} from "react-router-dom";

export const LoginPage = () => {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const {login, isAuthenticated} = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const handleLogin = async () => {
        if (userName && password) {
            await login(userName, password)
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            if (location?.state?.redirectTo) {
                navigate(location?.state?.redirectTo, {replace: true, state: {redirectTo: null}})
            } else {
                navigate('/')
            }
        }
    }, [isAuthenticated])

    return (
        <>
            <Typography variant="h4" color="textSecondary">Constituent Connect</Typography>
            <FormControl sx={{gap: 2, mt: 2}}>
                <TextField value={userName} placeholder={'Username'}
                           onChange={(event) => setUserName(event.target.value)}/>
                <TextField type={'password'} placeholder={'Password'} value={password}
                           onChange={(event) => setPassword(event.target.value)}/>
                <Button onClick={async () => await handleLogin()} className="loginButton"
                        type="submit">Login</Button>
            </FormControl>
        </>
    )
}