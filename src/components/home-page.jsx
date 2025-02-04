import {useLocation} from "react-router-dom";
import {useApi} from "../hooks/use-api.js";
import {useEffect, useState} from "react";

export const HomePage = () => {
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
         <h1>This is the Home Page</h1>
     </div>
 )
}