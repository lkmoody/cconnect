import {createContext, useCallback, useContext, useEffect, useState} from "react";
import {useAuth} from "./cognito-auth-context.jsx";
import {useApi} from "../hooks/use-api.js";
import {ErrorPage} from "../components/common/error-page.jsx";

const CurrentUserContext = createContext(null);
export const useCurrentUser = () => useContext(CurrentUserContext);

export const CurrentUserProvider = ({children}) => {
    const {api} = useApi()
    const {isInitialized, user, isAuthenticated, logout} = useAuth()
    const [currentUser, setCurrentUser] = useState(null)
    const [errorGettingUser, setErrorGettingUser] = useState(null)

    const loadUserDetails = useCallback(async () => {
        try {
            //throw 'This is an error'
            // Load details from db here
            if (user) {
                //Get name and stuff from database
                const result = await api.getCurrentUser()
                setCurrentUser(result)
            } else {
                setCurrentUser({roles: ['guest']})
            }
        } catch (error) {
            setErrorGettingUser(error)
        }
    }, [api, user])

    useEffect(() => {
        if (isInitialized && !currentUser && !errorGettingUser) {
            loadUserDetails()
        }
    }, [isInitialized, currentUser, errorGettingUser])

    if(errorGettingUser) {
        return (
            <ErrorPage message={errorGettingUser} />
        )
    } else {
        return (
            <CurrentUserContext.Provider value={{currentUser, setCurrentUser}}>
                {children}
            </CurrentUserContext.Provider>
        )
    }
}