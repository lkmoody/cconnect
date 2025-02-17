import {useLocation} from "react-router-dom";
import {useApi} from "../hooks/use-api.js";
import {useEffect, useState} from "react";

export const SubscriberHome = () => {
    const [queryResult, setQueryResult] = useState(null);
    const { api } = useApi()

    const fetchCurrentUser = async () => {
        console.log(import.meta.env.VITE_BASE_URL)
        console.log(import.meta.env.VITE_ENV)

        const result = await api.getCurrentUser()
        console.log(result)
        setQueryResult(true)
    }

    useEffect(() => {
        if(!queryResult) {
            fetchCurrentUser()
        }
    }, []);
    return (
        <div>
            <h1>This is the Subscriber Home Page!</h1>
        </div>
    )
}