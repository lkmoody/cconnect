import {createContext, useCallback, useContext, useEffect, useState} from "react";
import {useAuth} from './cognito-auth-context.jsx'

const UserContext = createContext({})

export const UserProvider = ({ children }) => {
    const { isInitialized, user } = useAuth()
    const [currentUser, setCurrentUser] = useState(null)

    const loadUserDetails = useCallback(async () => {
        // Load details from db here
        if(user) {
            //Get name and stuff from database
            setCurrentUser({
                name: 'Larry'
            })
        } else {
            setCurrentUser({
                name: 'Guest'
            })
        }
    }, [])

    useEffect(() => {
        if(isInitialized) {
            loadUserDetails()
        }
    }, [isInitialized])

    return <UserContext.Provider value={{ currentUser }}>{children}</UserContext.Provider>
}

export const useCurrentUser = () => {
    return useContext(UserContext)
}