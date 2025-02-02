import {createContext, useCallback, useContext, useEffect, useState} from "react";
import {useAuth} from './cognito-auth-context.jsx'

const UserContext = createContext({})

export const UserProvider = ({children}) => {
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
            setCurrentUser({
                name: 'Larry'
            })
        } else {
            setCurrentUser({
                name: 'Guest'
            })
        }
    }, [user])

    useEffect(() => {
        if (isInitialized) {
            loadUserDetails()
        }
    }, [isInitialized])

    return <UserContext.Provider value={{
        currentUser,
        getUserViews
    }}>
        {children}
    </UserContext.Provider>
}

export const useCurrentUser = () => {
    return useContext(UserContext)
}