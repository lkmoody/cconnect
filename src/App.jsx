import {useContext, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {CognitoAuthContext} from "./contexts/CognitoAuthContext.jsx";
import {Button, FormControl, InputLabel, TextField, Typography} from "@mui/material";

function App() {
    const [count, setCount] = useState(0)
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const { isAuthenticated, logout, login } = useContext(CognitoAuthContext)

    // console.log(isAuthenticated)
    // if(isAuthenticated){
    //     console.log('Logged in')
    //     //logout()
    // } else {
    //     console.log('Logged out')
    //     login('lkmoody@gmail.com', 'SaveM0ney!!')
    // }

    const handleLogin = async () => {
        console.log('login')
        if(userName && password){
            await login(userName, password)
        }
    }

    const handleLogout = async () => {
        console.log('logout')
        await logout()
    }

    function renderPage() {
        if(isAuthenticated) {
            return (
                <>
                    <Typography variant="h4" color="textSecondary">Constituent Connect</Typography>
                    <FormControl sx={{ gap: 2, mt: 2 }}>
                        <Button onClick={async () => await handleLogout()} className="logoutButton" type="submit">Logout</Button>
                    </FormControl>
                </>
            )
        } else {
            return (
                <>
                    <Typography variant="h4" color="textSecondary">Constituent Connect</Typography>
                    <FormControl sx={{ gap: 2, mt: 2 }}>
                        <TextField value={userName} placeholder={'Username'} onChange={(event) => setUserName(event.target.value)} />
                        <TextField type={'password'} placeholder={'Password'} value={password} onChange={(event) => setPassword(event.target.value)} />
                        <Button onClick={async () => await handleLogin()} className="loginButton" type="submit">Login</Button>
                    </FormControl>
                </>
            )
        }
    }

    return (
        <>
            {renderPage()}
        </>
    )
}

export default App
