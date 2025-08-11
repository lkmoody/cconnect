import {createContext, useContext} from "react"
import {useCurrentUser} from "./current-user-context.jsx";
import {CircularProgress} from "@mui/material";

const UserViewContext = createContext(null)
export const useView = () => useContext(UserViewContext)

export const UserViewProvider = ({ children }) => {
    const { currentUser } = useCurrentUser()

    if(!currentUser) return <CircularProgress />

    console.log(currentUser)

    return (
        <UserViewContext.Provider value={{

        }}>
            {children}
        </UserViewContext.Provider>
    )
}