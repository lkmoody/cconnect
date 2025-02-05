import {useLocation} from "react-router-dom";
import {useApi} from "../hooks/use-api.js";
import {useEffect, useState} from "react";

export const SubscriberHome = () => {
    // const [done, setDone] = useState(false);
    // const { api } = useApi()
    //
    // const fetchTest = async () => {
    //     const result = api.getTest()
    //     setDone(true)
    // }
    //
    // useEffect(() => {
    //     if(!done) {
    //         fetchTest()
    //     }
    // }, []);
    return (
        <div>
            <h1>This is the Subscriber Home Page</h1>
        </div>
    )
}