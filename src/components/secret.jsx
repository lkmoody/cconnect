import {Box, CircularProgress, Container, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {useApi} from "../hooks/use-api.js";

export const Secret = () => {
    const [secret, setSecret] = useState(null)
    const {api, isLoading} = useApi();
    const [windowHeight, setWindowHeight] = useState(window.innerHeight)

    const fetchSecret = async () => {
        if (!isLoading) {
            try {
                const data = await api.getTest()
                setSecret(data)
            } catch (error) {
                setSecret('Jenkins')
                console.error(error)
            }
        }
    }

    useEffect(() => {
        if (!secret) {
            fetchSecret()
        }
    })

    if (!secret) {
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
                <CircularProgress/>
            </Box>
        )
    }
    return (
        <Container>
            <Typography>{`Hello ${secret}`}</Typography>
        </Container>
    );
};