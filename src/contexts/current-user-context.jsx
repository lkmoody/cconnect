import {createContext, useCallback, useContext, useEffect, useState} from "react";
import {useAuth} from "./cognito-auth-context.jsx";
import {useApi} from "../hooks/use-api.js";

const CurrentUserContext = createContext(null);
export const useCurrentUser = () => useContext(CurrentUserContext);

export const CurrentUserProvider = ({children}) => {
    const { api } = useApi()
    const {isInitialized, user, isAuthenticated, logout} = useAuth()
    const [currentUser, setCurrentUser] = useState(null)

    const getUserViews = useCallback(() => {
        if (isAuthenticated) {
            return [
                {
                    id: 'secret',
                    name: 'Secret',
                    path: '/secret'
                },
                {
                    id: 'secret2',
                    name: 'Secret 2',
                    path: '/secret2'
                }
            ]
        } else {
            return [
                {
                    id: 'login',
                    name: 'Login',
                    path: '/login'
                }
            ]
        }
    })

    const loadUserDetails = useCallback(async () => {
        // Load details from db here
        if (user) {
            //Get name and stuff from database
            const result = await api.getCurrentUser()
            setCurrentUser(result)
        } else {
            setCurrentUser({})
        }
    }, [user])

    useEffect(() => {
        if (isInitialized && !currentUser) {
            loadUserDetails()
        }
    }, [isInitialized])

    return (
        <CurrentUserContext.Provider value={{currentUser, setCurrentUser}}>
            {children}
        </CurrentUserContext.Provider>
    )
}