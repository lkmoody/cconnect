import {useCallback, useEffect, useState} from 'react'
import {useAuth} from '../contexts/cognito-auth-context.jsx'
import {Box, Button, Container, FormControl, TextField, Typography} from "@mui/material";
import {useNavigate, useLocation} from "react-router-dom";
import {useTranslation} from "react-i18next";

export const LoginPage = () => {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newPasswordRequired, setNewPasswordRequired] = useState(false)
    const [loginError, setLoginError] = useState(null)
    const [loginErrorMessage, setLoginErrorMessage] = useState(null)
    const [windowHeight, setWindowHeight] = useState(window.innerHeight)

    const {t} = useTranslation()
    const {login, isAuthenticated, resetPassword} = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const handleLogin = async () => {
        if (userName && password) {
            try {
                setLoginError(null)
                setLoginErrorMessage('')
                const result = await login(userName, password)
                if(result?.message === 'newPasswordRequired') {
                    setNewPasswordRequired(true)
                }
            } catch (error) {
                setLoginError(error)
                if (error.message.includes('Incorrect username or password.')) {
                    setLoginErrorMessage(t('loginForm.incorrectLoginInfo'))
                }
            }
        }
    }

    const handleNewPassword = async () => {
        resetPassword(userName, password, newPassword)
    }

    const handleKeyUp = (event) => {
        if (event.keyCode === 13) {
            handleLogin()
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            if (location?.state?.redirectTo) {
                navigate(location?.state?.redirectTo, {replace: true, state: {redirectTo: null}})
            } else {
                navigate('/internal')
            }
        }
    }, [isAuthenticated])

    useEffect(() => {
        setWindowHeight(window.innerHeight)
    })

    const renderLoginForm = useCallback(() => {
        if(newPasswordRequired) {
            return (
                <FormControl fullWidth sx={{gap: 2, mt: 2}}>
                    <Typography variant="body2" color="textSecondary">
                        {t('loginForm.resetPasswordMessage')}
                    </Typography>
                    <TextField fullWidth type={'password'} placeholder={t('loginForm.password')}
                               value={newPassword}
                               onChange={(event) => setNewPassword(event.target.value)}/>
                    <Button
                        fullWidth
                        variant={'contained'}
                        disableRipple
                        onClick={async () => await handleNewPassword()}
                        className="loginButton"
                        type="submit"
                        disabled={!userName || !password}
                    >
                        {t('loginForm.resetPassword')}
                    </Button>
                </FormControl>
            )
        } else {
            return (
                <FormControl fullWidth sx={{gap: 2, mt: 2}}>
                    <TextField fullWidth onKeyUp={handleKeyUp} value={userName} placeholder={t('loginForm.userName')}
                               onChange={(event) => setUserName(event.target.value)}/>
                    <TextField fullWidth onKeyUp={handleKeyUp} type={'password'} placeholder={t('loginForm.password')}
                               value={password}
                               onChange={(event) => setPassword(event.target.value)}/>
                    <Button
                        fullWidth
                        variant={'contained'}
                        disableRipple
                        onClick={async () => await handleLogin()}
                        className="loginButton"
                        type="submit"
                        disabled={!userName || !password}
                    >
                        {t('loginForm.login')}
                    </Button>
                    {loginError &&
                        <Typography align={'center'} sx={{mt: 1}} variant="caption" color="error">
                            {loginErrorMessage}
                        </Typography>
                    }
                </FormControl>
            )
        }
    },[newPasswordRequired, newPassword, t, userName, password, handleKeyUp, handleNewPassword])

    return (
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                height: windowHeight,
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Box sx={{
                width: 328,
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column'
            }}>
                <Typography align={'center'} variant="h4" color="textSecondary">{t('appName')}</Typography>
                {renderLoginForm()}
            </Box>
        </Box>
    )
}