import { useAuth } from '../contexts/cognito-auth-context.jsx'
import {Button, Container, FormControl, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {useApi} from "../hooks/use-api.js";

export const Secret = () => {
    const [secret, setSecret] = useState(null)
    const auth = useAuth();
    const { api } = useApi();

    const handleLogout = async () => {
        await auth.logout()
    }

    const fetchSecret = async () => {
        const data = await api.getTest()
        setSecret(data)
    }

    useEffect(() => {
        if(!secret){
            fetchSecret()
        }
    })

    return (
        <Container>
            Hello
        </Container>
    );
};