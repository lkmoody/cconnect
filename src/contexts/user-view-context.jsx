import {createContext, useContext, useEffect, useState} from "react"
import {useCurrentUser} from "./current-user-context.jsx";
import {LargeSpinner} from "../components/common/large-spinner.jsx";

const UserViewContext = createContext(null)
export const useView = () => useContext(UserViewContext)

export const UserViewProvider = ({children}) => {
    const {currentUser} = useCurrentUser()
    const [userViews, setUserViews] = useState(null)

    function getUserViews() {
        if (currentUser.roles.includes("internal")) {
            const navLinks = [{id: 'internal', path: '/internal', name: 'Internal'}]
            setUserViews({navLinks})
        } else {
            const navLinks = [{id: 'home', path: '/', name: 'Home'}]
            setUserViews({navLinks})
        }
    }

    useEffect(() => {
        if (currentUser && !userViews) {
            getUserViews()
        }
    }, [currentUser])

    console.log('User views:', userViews)
    console.log('Current user:', currentUser)

    if (userViews === null) {
        return <LargeSpinner/>
    }

    return (
        <UserViewContext.Provider value={userViews}>
            {children}
        </UserViewContext.Provider>
    )
}