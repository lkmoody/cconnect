import {createContext, useContext, useEffect, useState} from "react"
import {useCurrentUser} from "./current-user-context.jsx";
import {LargeSpinner} from "../components/common/large-spinner.jsx";

const UserViewContext = createContext(null)
export const useView = () => useContext(UserViewContext)

export const UserViewProvider = ({children}) => {
    const {currentUser} = useCurrentUser()
    const [userViews, setUserViews] = useState(null)

    function getUserViews() {
        setUserViews(null)
        let navLinks = []
        navLinks.push(
            {id: 'home', path: '/', name: 'Home'}
        )
        if (currentUser.roles.includes("internal")) {
            navLinks.push(
                {id: 'internal', path: '/internal', name: 'Internal'}
            )
        } else if (currentUser.roles.includes("elected")) {
            navLinks.push(
                {id: 'elected', path: '/elected', name: 'Elected'},
                {id: 'profile', path: '/profile', name: 'Profile'},
            )
        }

        setUserViews({navLinks})

    }

    // If the currentUser changes due to an auth change then the views will be updated
    useEffect(() => {
        if (currentUser) {
            getUserViews()
        }
    }, [currentUser])

    console.log('User views:', userViews)
    console.log('Current user:', currentUser)

    // if (userViews === null) {
    //     return <LargeSpinner/>
    // }

    return (
        <UserViewContext.Provider value={userViews}>
            {children}
        </UserViewContext.Provider>
    )
}